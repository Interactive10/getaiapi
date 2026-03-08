#!/usr/bin/env npx tsx
/**
 * fal-endpoint-verifier.ts
 *
 * Probes every fal-ai endpoint in registry.json to verify:
 * 1. The endpoint accepts queue submissions (POST to queue.fal.run)
 * 2. The correct HTTP status codes are returned
 * 3. Model names and endpoints match
 *
 * Usage:
 *   FAL_KEY=your_key npx tsx tools/fal-endpoint-verifier.ts
 *   FAL_KEY=your_key npx tsx tools/fal-endpoint-verifier.ts --endpoint fal-ai/nano-banana-pro/edit
 *   FAL_KEY=your_key npx tsx tools/fal-endpoint-verifier.ts --dry-run
 *
 * Exit codes:
 *   0 = all endpoints OK
 *   1 = some endpoints failed
 */

import { readFileSync } from "fs";
import { resolve } from "path";

interface ProviderEntry {
  provider: string;
  skill_id: string;
  endpoint: string;
  auth_env: string;
  param_map: Record<string, unknown>;
  output_map: {
    type: string;
    extract_path: string;
    content_type?: string;
  };
}

interface RegistryEntry {
  canonical_name: string;
  aliases: string[];
  category: string;
  modality: Record<string, unknown>;
  providers: ProviderEntry[];
}

interface ProbeResult {
  skill_id: string;
  endpoint: string;
  canonical_name: string;
  category: string;
  extract_path: string;
  queue_submit_status: number | string;
  queue_submit_ok: boolean;
  queue_error_detail?: string;
  // URL that was actually called
  submit_url: string;
  poll_url_pattern: string;
}

const QUEUE_BASE = "https://queue.fal.run";

function getBaseEndpoint(endpoint: string): string {
  const parts = endpoint.split("/");
  if (parts.length <= 2) return endpoint;
  return `${parts[0]}/${parts[1]}`;
}

/**
 * Probe a single endpoint by sending a minimal POST to queue.fal.run.
 * We send an intentionally minimal/empty body. Expected responses:
 *   - 422: Endpoint exists, validation failed (GOOD - queue works)
 *   - 200/201: Endpoint accepted the request (GOOD - but we'd need to cancel)
 *   - 401: Auth issue
 *   - 404: Endpoint doesn't exist
 *   - 405: Method not allowed (queue not supported for this endpoint)
 *   - 400: Bad request (still means endpoint exists)
 */
async function probeEndpoint(
  endpoint: string,
  auth: string,
  canonicalName: string,
  category: string,
  skillId: string,
  extractPath: string,
): Promise<ProbeResult> {
  const submitUrl = `${QUEUE_BASE}/${endpoint}`;
  const baseEndpoint = getBaseEndpoint(endpoint);
  const pollUrlPattern = `${QUEUE_BASE}/${baseEndpoint}/requests/{id}/status`;

  let status: number | string;
  let errorDetail: string | undefined;

  try {
    const response = await fetch(submitUrl, {
      method: "POST",
      headers: {
        Authorization: `Key ${auth}`,
        "Content-Type": "application/json",
      },
      // Send minimal body - enough to not be completely empty but will fail validation
      body: JSON.stringify({ prompt: "__probe__" }),
    });

    status = response.status;

    if (status !== 200 && status !== 201) {
      try {
        const body = await response.json();
        errorDetail = JSON.stringify(body).slice(0, 200);
      } catch {
        errorDetail = await response.text().catch(() => "no body");
        errorDetail = (errorDetail as string).slice(0, 200);
      }
    } else {
      // If 200/201, we accidentally submitted a job - grab request_id to cancel
      try {
        const body = await response.json() as { request_id?: string };
        if (body.request_id) {
          errorDetail = `submitted job ${body.request_id} (will attempt cancel)`;
          // Try to cancel it
          await fetch(`${QUEUE_BASE}/${baseEndpoint}/requests/${body.request_id}/cancel`, {
            method: "PUT",
            headers: { Authorization: `Key ${auth}` },
          }).catch(() => {});
        }
      } catch {}
    }
  } catch (err) {
    status = `error: ${(err as Error).message}`;
    errorDetail = (err as Error).message;
  }

  // 422 = validation error (endpoint exists, queue works)
  // 200/201 = accepted (endpoint exists, queue works)
  // 400 = bad request (endpoint exists, queue works)
  const queueOk =
    typeof status === "number" && [200, 201, 202, 400, 422].includes(status);

  return {
    skill_id: skillId,
    endpoint,
    canonical_name: canonicalName,
    category,
    extract_path: extractPath,
    queue_submit_status: status,
    queue_submit_ok: queueOk,
    queue_error_detail: errorDetail,
    submit_url: submitUrl,
    poll_url_pattern: pollUrlPattern,
  };
}

/**
 * Offline audit: cross-reference each fal-ai registry entry against its SKILL.md file.
 * Checks:
 *   1. Skill file exists
 *   2. Endpoint in skill matches registry endpoint
 *   3. Output schema in skill matches extract_path
 *   4. Queue API examples use the correct endpoint
 */
interface AuditResult {
  skill_id: string;
  endpoint: string;
  canonical_name: string;
  category: string;
  extract_path: string;
  issues: string[];
  skill_endpoint?: string;
  skill_output_fields?: string[];
  skill_queue_endpoint?: string;
}

function auditEndpoint(
  skillsDir: string,
  endpoint: string,
  canonicalName: string,
  category: string,
  skillId: string,
  extractPath: string,
): AuditResult {
  const issues: string[] = [];
  const result: AuditResult = {
    skill_id: skillId,
    endpoint,
    canonical_name: canonicalName,
    category,
    extract_path: extractPath,
    issues,
  };

  // Check skill file exists
  const skillPath = resolve(skillsDir, skillId, "SKILL.md");
  let skillContent: string;
  try {
    skillContent = readFileSync(skillPath, "utf-8");
  } catch {
    issues.push(`MISSING skill file: ${skillPath}`);
    return result;
  }

  // Extract endpoint from skill file
  const endpointMatch = skillContent.match(/\*\*Endpoint:\*\*\s*`([^`]+)`/);
  if (endpointMatch) {
    result.skill_endpoint = endpointMatch[1];
    if (endpointMatch[1] !== endpoint) {
      issues.push(`ENDPOINT MISMATCH: registry="${endpoint}" skill="${endpointMatch[1]}"`);
    }
  } else {
    issues.push("Could not parse endpoint from skill file");
  }

  // Extract output fields from skill's Output Schema table
  const outputFields: string[] = [];
  const fieldMatches = skillContent.matchAll(/\| `(\w+)` \|/g);
  for (const m of fieldMatches) {
    // Skip input schema fields (they appear before "Output Schema")
    const fieldPos = skillContent.indexOf(m[0]);
    const outputSchemaPos = skillContent.indexOf("## Output Schema");
    if (outputSchemaPos !== -1 && fieldPos > outputSchemaPos) {
      outputFields.push(m[1]);
    }
  }
  result.skill_output_fields = outputFields;

  // Validate extract_path against output fields
  if (extractPath === "images[].url" && !outputFields.includes("images")) {
    issues.push(`extract_path="${extractPath}" but no 'images' field in skill output schema`);
  }
  if (extractPath === "video.url" && !outputFields.includes("video")) {
    issues.push(`extract_path="${extractPath}" but no 'video' field in skill output schema`);
  }
  if (extractPath === "audio.url" && !outputFields.includes("audio")) {
    issues.push(`extract_path="${extractPath}" but no 'audio' field in skill output schema`);
  }

  // Check queue API examples use correct endpoint
  const queueSubmitMatch = skillContent.match(/fal\.queue\.submit\("([^"]+)"/);
  if (queueSubmitMatch) {
    result.skill_queue_endpoint = queueSubmitMatch[1];
    if (queueSubmitMatch[1] !== endpoint) {
      issues.push(`QUEUE ENDPOINT MISMATCH: registry="${endpoint}" skill_queue="${queueSubmitMatch[1]}"`);
    }
  }

  // Check queue status uses base endpoint (SDK behavior)
  const queueStatusMatch = skillContent.match(/fal\.queue\.status\("([^"]+)"/);
  if (queueStatusMatch) {
    const statusEndpoint = queueStatusMatch[1];
    // SDK uses full endpoint for status (parseEndpointId strips internally)
    // So the skill should show the full endpoint
    if (statusEndpoint !== endpoint) {
      issues.push(`QUEUE STATUS uses different endpoint: "${statusEndpoint}" vs "${endpoint}"`);
    }
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const auditMode = args.includes("--audit");
  const singleEndpointIdx = args.indexOf("--endpoint");
  const singleEndpoint = singleEndpointIdx !== -1 ? args[singleEndpointIdx + 1] : null;
  const filterIdx = args.indexOf("--filter");
  const filterPattern = filterIdx !== -1 ? args[filterIdx + 1] : null;

  const falKey = process.env.FAL_KEY;
  if (!falKey && !dryRun && !auditMode) {
    console.error("ERROR: FAL_KEY environment variable required. Use --dry-run or --audit for offline modes.");
    process.exit(1);
  }

  // Load registry
  const registryPath = resolve(import.meta.dirname ?? __dirname, "../registry/registry.json");
  const registry: RegistryEntry[] = JSON.parse(readFileSync(registryPath, "utf-8"));

  // Extract all fal-ai provider entries
  const falEndpoints: Array<{
    endpoint: string;
    canonical_name: string;
    category: string;
    skill_id: string;
    extract_path: string;
  }> = [];

  for (const entry of registry) {
    for (const prov of entry.providers) {
      if (prov.provider === "fal-ai") {
        if (singleEndpoint && prov.endpoint !== singleEndpoint) continue;
        if (filterPattern && !prov.endpoint.includes(filterPattern) && !prov.skill_id.includes(filterPattern)) continue;
        falEndpoints.push({
          endpoint: prov.endpoint,
          canonical_name: entry.canonical_name,
          category: entry.category,
          skill_id: prov.skill_id,
          extract_path: prov.output_map.extract_path,
        });
      }
    }
  }

  console.log(`Found ${falEndpoints.length} fal-ai endpoints to verify.\n`);

  // AUDIT MODE - offline cross-reference against skill files
  if (auditMode) {
    const skillsDir = resolve(import.meta.dirname ?? __dirname, "../skills");
    console.log("AUDIT MODE - cross-referencing registry vs skill files:\n");

    const auditResults: AuditResult[] = [];
    for (const ep of falEndpoints) {
      const result = auditEndpoint(skillsDir, ep.endpoint, ep.canonical_name, ep.category, ep.skill_id, ep.extract_path);
      auditResults.push(result);
    }

    const withIssues = auditResults.filter((r) => r.issues.length > 0);
    const clean = auditResults.filter((r) => r.issues.length === 0);

    if (withIssues.length > 0) {
      console.log(`ISSUES FOUND: ${withIssues.length} endpoints\n`);
      for (const r of withIssues) {
        console.log(
          `  ${r.skill_id}\n` +
          `    endpoint:       ${r.endpoint}\n` +
          `    canonical:      ${r.canonical_name}\n` +
          `    category:       ${r.category}\n` +
          `    extract_path:   ${r.extract_path}\n` +
          `    skill_endpoint: ${r.skill_endpoint ?? "N/A"}\n` +
          `    output_fields:  ${r.skill_output_fields?.join(", ") ?? "N/A"}\n` +
          r.issues.map((i) => `    >> ${i}`).join("\n") + "\n"
        );
      }
    }

    console.log(`\nSUMMARY: ${clean.length} OK, ${withIssues.length} with issues out of ${auditResults.length} total`);

    // Write JSON report
    const reportPath = resolve(import.meta.dirname ?? __dirname, "../tools/fal-audit-report.json");
    const { writeFileSync } = await import("fs");
    writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), results: auditResults }, null, 2));
    console.log(`Full report written to: ${reportPath}`);

    process.exit(withIssues.length > 0 ? 1 : 0);
  }

  if (dryRun) {
    console.log("DRY RUN - listing endpoints without probing:\n");
    for (const ep of falEndpoints) {
      const base = getBaseEndpoint(ep.endpoint);
      const hasSub = ep.endpoint !== base;
      console.log(
        `  ${ep.skill_id}\n` +
        `    endpoint:  ${ep.endpoint}\n` +
        `    base:      ${base}${hasSub ? " (sub-path stripped for polling)" : ""}\n` +
        `    category:  ${ep.category}\n` +
        `    extract:   ${ep.extract_path}\n`
      );
    }
    return;
  }

  // Probe endpoints sequentially to be respectful to the API
  const results: ProbeResult[] = [];
  for (let i = 0; i < falEndpoints.length; i++) {
    const ep = falEndpoints[i];
    process.stdout.write(`[${i + 1}/${falEndpoints.length}] ${ep.endpoint} ... `);

    const result = await probeEndpoint(
      ep.endpoint,
      falKey!,
      ep.canonical_name,
      ep.category,
      ep.skill_id,
      ep.extract_path,
    );
    results.push(result);

    const icon = result.queue_submit_ok ? "OK" : "FAIL";
    console.log(`${icon} (${result.queue_submit_status})`);

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 200));
  }

  // Summary
  const ok = results.filter((r) => r.queue_submit_ok);
  const failed = results.filter((r) => !r.queue_submit_ok);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`RESULTS: ${ok.length} OK, ${failed.length} FAILED out of ${results.length} total`);
  console.log(`${"=".repeat(60)}\n`);

  if (failed.length > 0) {
    console.log("FAILED ENDPOINTS:\n");
    for (const r of failed) {
      console.log(
        `  ${r.skill_id}\n` +
        `    endpoint:     ${r.endpoint}\n` +
        `    canonical:    ${r.canonical_name}\n` +
        `    category:     ${r.category}\n` +
        `    status:       ${r.queue_submit_status}\n` +
        `    error:        ${r.queue_error_detail ?? "none"}\n` +
        `    submit_url:   ${r.submit_url}\n` +
        `    poll_pattern: ${r.poll_url_pattern}\n`
      );
    }
  }

  if (ok.length > 0) {
    console.log("OK ENDPOINTS:\n");
    for (const r of ok) {
      console.log(
        `  ${r.skill_id}\n` +
        `    endpoint:     ${r.endpoint}\n` +
        `    status:       ${r.queue_submit_status}\n` +
        `    extract_path: ${r.extract_path}\n`
      );
    }
  }

  // Write JSON report
  const reportPath = resolve(import.meta.dirname ?? __dirname, "../tools/fal-verification-report.json");
  const { writeFileSync } = await import("fs");
  writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2));
  console.log(`\nFull report written to: ${reportPath}`);

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
