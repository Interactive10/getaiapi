#!/usr/bin/env npx tsx
/**
 * fal-registry-fixer.ts
 *
 * Reads each fal-ai entry in registry.json, cross-references its skill file
 * output schema, and fixes extract_path + output type + category mismatches.
 *
 * Usage:
 *   npx tsx tools/fal-registry-fixer.ts --dry-run     # preview changes
 *   npx tsx tools/fal-registry-fixer.ts --apply        # write fixes to registry.json
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const REGISTRY_PATH = resolve(ROOT, "registry/registry.json");
const SKILLS_DIR = resolve(ROOT, "skills");

interface OutputMap {
  type: string;
  extract_path: string;
  content_type?: string;
}

interface ProviderEntry {
  provider: string;
  skill_id: string;
  endpoint: string;
  auth_env: string;
  param_map: Record<string, unknown>;
  output_map: OutputMap;
}

interface RegistryEntry {
  canonical_name: string;
  aliases: string[];
  category: string;
  modality: Record<string, unknown>;
  providers: ProviderEntry[];
}

interface Fix {
  skill_id: string;
  endpoint: string;
  field: string;
  old_value: string;
  new_value: string;
  reason: string;
}

/**
 * Parse a skill file and extract the output fields from the Output Schema table.
 * Returns an array of {name, type} objects.
 */
function parseSkillOutputFields(skillContent: string): Array<{ name: string; type: string }> {
  const outputSchemaPos = skillContent.indexOf("## Output Schema");
  if (outputSchemaPos === -1) return [];

  // Get content after "## Output Schema" until next ## heading
  const afterOutput = skillContent.slice(outputSchemaPos);
  const nextHeading = afterOutput.indexOf("\n## ", 1);
  const section = nextHeading !== -1 ? afterOutput.slice(0, nextHeading) : afterOutput;

  const fields: Array<{ name: string; type: string }> = [];
  const tableRows = section.matchAll(/\| `(\w+)` \| ([^|]+)\|/g);
  for (const match of tableRows) {
    fields.push({ name: match[1], type: match[2].trim() });
  }
  return fields;
}

/**
 * Determine the correct extract_path based on the output fields from the skill file.
 */
function determineExtractPath(fields: Array<{ name: string; type: string }>): {
  extract_path: string;
  output_type: string;
  content_type?: string;
} | null {
  const fieldNames = fields.map((f) => f.name);
  const fieldTypes = Object.fromEntries(fields.map((f) => [f.name, f.type]));

  // When both video and audio are present, prefer audio if the model
  // is clearly an audio extraction model (e.g., video-to-audio).
  // The video field in those cases is just the input echoed back.
  if (fieldNames.includes("video") && fieldNames.includes("audio")) {
    // If audio is a File/Audio type, prefer it (video-to-audio models)
    const at = fieldTypes.audio?.toLowerCase() ?? "";
    if (at.includes("audio") || at.includes("file")) {
      return { extract_path: "audio.url", output_type: "audio", content_type: "audio/mpeg" };
    }
  }

  // images array (plural) — the current default for many
  if (fieldNames.includes("images")) {
    const t = fieldTypes.images?.toLowerCase() ?? "";
    if (t.includes("list") || t.includes("array") || t.includes("image")) {
      return { extract_path: "images[].url", output_type: "image" };
    }
  }

  // image singular — but skip if type is VideoFile (e.g., wan-alpha)
  if (fieldNames.includes("image")) {
    const t = fieldTypes.image?.toLowerCase() ?? "";
    if (t.includes("videofile")) {
      // This is actually a video output misnamed as "image"
      // Fall through to video check
    } else if (t.includes("image") || t.includes("file")) {
      return { extract_path: "image.url", output_type: "image", content_type: "image/png" };
    }
  }

  // video
  if (fieldNames.includes("video")) {
    const t = fieldTypes.video?.toLowerCase() ?? "";
    if (t.includes("video") || t.includes("file")) {
      return { extract_path: "video.url", output_type: "video", content_type: "video/mp4" };
    }
  }

  // audio
  if (fieldNames.includes("audio")) {
    const t = fieldTypes.audio?.toLowerCase() ?? "";
    if (t.includes("audio") || t.includes("file")) {
      return { extract_path: "audio.url", output_type: "audio", content_type: "audio/mpeg" };
    }
  }

  // audio_file
  if (fieldNames.includes("audio_file")) {
    return { extract_path: "audio_file.url", output_type: "audio", content_type: "audio/mpeg" };
  }

  // audio_url (can be string URL or AudioFile object)
  if (fieldNames.includes("audio_url")) {
    return { extract_path: "audio_url", output_type: "audio", content_type: "audio/mpeg" };
  }

  // video_url (string URL)
  if (fieldNames.includes("video_url")) {
    return { extract_path: "video_url", output_type: "video", content_type: "video/mp4" };
  }

  // No recognizable media field
  return null;
}

/**
 * Determine the correct category based on output type and input fields.
 */
function determineCategory(
  outputType: string,
  extractPath: string,
  skillContent: string,
  currentCategory: string,
): string | null {
  // Only fix obvious mismatches
  const hasImageInput = skillContent.includes("image_url") || skillContent.includes("image_urls");
  const hasVideoInput = skillContent.includes("video_url") && skillContent.indexOf("video_url") < skillContent.indexOf("## Output");

  if (outputType === "video" && currentCategory === "text-to-image") {
    if (hasImageInput) return "image-to-video";
    return "text-to-video";
  }

  if (outputType === "audio" && currentCategory === "text-to-image") {
    if (hasVideoInput) return "video-to-audio";
    return "text-to-audio";
  }

  if (outputType === "image" && currentCategory === "text-to-image" && hasImageInput) {
    // Could be image-edit, upscale, etc. - don't change unless clear
    return null;
  }

  return null;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const apply = args.includes("--apply");
  const filterPattern = args.find((a, i) => args[i - 1] === "--filter") ?? null;

  if (!dryRun && !apply) {
    console.error("Usage: npx tsx tools/fal-registry-fixer.ts [--dry-run|--apply] [--filter pattern]");
    process.exit(1);
  }

  const registry: RegistryEntry[] = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  const fixes: Fix[] = [];
  let skipped = 0;
  let noSkill = 0;

  for (const entry of registry) {
    for (const prov of entry.providers) {
      if (prov.provider !== "fal-ai") continue;
      if (filterPattern && !prov.skill_id.includes(filterPattern) && !prov.endpoint.includes(filterPattern)) continue;

      // Read skill file
      const skillPath = resolve(SKILLS_DIR, prov.skill_id, "SKILL.md");
      let skillContent: string;
      try {
        skillContent = readFileSync(skillPath, "utf-8");
      } catch {
        noSkill++;
        continue;
      }

      const fields = parseSkillOutputFields(skillContent);
      if (fields.length === 0) {
        skipped++;
        continue;
      }

      const correct = determineExtractPath(fields);
      if (!correct) {
        skipped++;
        continue;
      }

      // Check extract_path
      if (prov.output_map.extract_path !== correct.extract_path) {
        fixes.push({
          skill_id: prov.skill_id,
          endpoint: prov.endpoint,
          field: "extract_path",
          old_value: prov.output_map.extract_path,
          new_value: correct.extract_path,
          reason: `skill output fields: [${fields.map((f) => f.name).join(", ")}]`,
        });

        if (apply) {
          prov.output_map.extract_path = correct.extract_path;
        }
      }

      // Check output type
      if (prov.output_map.type !== correct.output_type) {
        fixes.push({
          skill_id: prov.skill_id,
          endpoint: prov.endpoint,
          field: "output_map.type",
          old_value: prov.output_map.type,
          new_value: correct.output_type,
          reason: `matches extract_path ${correct.extract_path}`,
        });

        if (apply) {
          prov.output_map.type = correct.output_type;
        }
      }

      // Check content_type if we have a specific one
      if (correct.content_type && prov.output_map.content_type !== correct.content_type) {
        // Only add content_type if it differs from common defaults
        const needsExplicit =
          (correct.output_type === "image" && correct.content_type !== "image/jpeg") ||
          (correct.output_type === "audio" && !prov.output_map.content_type) ||
          (correct.output_type === "video" && !prov.output_map.content_type);

        if (needsExplicit && !prov.output_map.content_type) {
          fixes.push({
            skill_id: prov.skill_id,
            endpoint: prov.endpoint,
            field: "output_map.content_type",
            old_value: prov.output_map.content_type ?? "(none)",
            new_value: correct.content_type,
            reason: `default for ${correct.output_type}`,
          });

          if (apply) {
            prov.output_map.content_type = correct.content_type;
          }
        }
      }

      // Check category
      const correctCategory = determineCategory(correct.output_type, correct.extract_path, skillContent, entry.category);
      if (correctCategory && entry.category !== correctCategory) {
        fixes.push({
          skill_id: prov.skill_id,
          endpoint: prov.endpoint,
          field: "category",
          old_value: entry.category,
          new_value: correctCategory,
          reason: `output is ${correct.output_type}, not image`,
        });

        if (apply) {
          entry.category = correctCategory;
        }
      }
    }
  }

  // Report
  const byField: Record<string, number> = {};
  for (const f of fixes) {
    byField[f.field] = (byField[f.field] || 0) + 1;
  }

  console.log(`\nFixes found: ${fixes.length}`);
  for (const [field, count] of Object.entries(byField).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${field}: ${count}`);
  }
  console.log(`Skipped (no recognizable media output): ${skipped}`);
  console.log(`Missing skill file: ${noSkill}\n`);

  if (fixes.length > 0) {
    console.log("Details:\n");
    for (const f of fixes) {
      console.log(`  ${f.skill_id}  [${f.field}]`);
      console.log(`    ${f.old_value} -> ${f.new_value}`);
      console.log(`    reason: ${f.reason}\n`);
    }
  }

  if (apply && fixes.length > 0) {
    writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
    console.log(`\nRegistry updated: ${REGISTRY_PATH}`);
    console.log(`${fixes.length} fixes applied.`);
  } else if (dryRun) {
    console.log("DRY RUN — no changes written. Use --apply to write fixes.");
  }

  // Write fix report
  const reportPath = resolve(ROOT, "tools/fal-fix-report.json");
  writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), fixes, skipped, noSkill }, null, 2));
  console.log(`Fix report written to: ${reportPath}`);
}

main();
