#!/usr/bin/env node
import { parseArgs } from "node:util";
import { generate, listModels, getModel } from "./index.js";

const HELP = `
getaiapi - Unified AI API Gateway CLI

Usage:
  getaiapi <command> [options]

Commands:
  generate    Generate content using an AI model
  list        List available models
  info        Show details for a specific model

Options:
  --help, -h  Show this help message

Examples:
  getaiapi generate --model flux-schnell --prompt "a cat"
  getaiapi list --category text-to-image --provider fal-ai
  getaiapi list --query flux
  getaiapi info flux-schnell
`.trim();

const GENERATE_HELP = `
Usage: getaiapi generate --model <name> --prompt <text> [options]

Options:
  --model, -m     Model name (required)
  --prompt, -p    Text prompt (required)
  --seed          Seed for reproducibility
  --count, -n     Number of outputs
  --size          Output size (e.g. "1024x1024")
  --guidance      Guidance scale
  --steps         Number of inference steps
  --format        Output format (png, jpeg, webp, mp4, etc.)
  --help, -h      Show this help
`.trim();

const LIST_HELP = `
Usage: getaiapi list [options]

Options:
  --category, -c   Filter by category (e.g. text-to-image)
  --provider, -p   Filter by provider (e.g. fal-ai)
  --query, -q      Search by name or alias
  --help, -h       Show this help
`.trim();

const INFO_HELP = `
Usage: getaiapi info <model-name>

Shows detailed information about a model including:
  - Canonical name
  - Category
  - Aliases
  - Available providers
`.trim();

function padRight(str: string, len: number): string {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}

function printTable(
  headers: string[],
  rows: string[][],
): void {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => (r[i] ?? "").length)),
  );
  const sep = widths.map((w) => "-".repeat(w)).join("  ");
  console.log(headers.map((h, i) => padRight(h, widths[i])).join("  "));
  console.log(sep);
  for (const row of rows) {
    console.log(row.map((cell, i) => padRight(cell ?? "", widths[i])).join("  "));
  }
}

async function cmdGenerate(args: string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      model: { type: "string", short: "m" },
      prompt: { type: "string", short: "p" },
      seed: { type: "string" },
      count: { type: "string", short: "n" },
      size: { type: "string" },
      guidance: { type: "string" },
      steps: { type: "string" },
      format: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
    strict: true,
  });

  if (values.help) {
    console.log(GENERATE_HELP);
    return;
  }

  if (!values.model) {
    console.error("Error: --model is required\n");
    console.log(GENERATE_HELP);
    process.exit(1);
  }

  if (!values.prompt) {
    console.error("Error: --prompt is required\n");
    console.log(GENERATE_HELP);
    process.exit(1);
  }

  const result = await generate({
    model: values.model,
    prompt: values.prompt,
    seed: values.seed ? Number(values.seed) : undefined,
    count: values.count ? Number(values.count) : undefined,
    size: values.size ?? undefined,
    guidance: values.guidance ? Number(values.guidance) : undefined,
    steps: values.steps ? Number(values.steps) : undefined,
    format: values.format as GenerateRequest["format"],
  });

  console.log(JSON.stringify(result, null, 2));
}

function cmdList(args: string[]): void {
  const { values } = parseArgs({
    args,
    options: {
      category: { type: "string", short: "c" },
      provider: { type: "string", short: "p" },
      query: { type: "string", short: "q" },
      help: { type: "boolean", short: "h" },
    },
    strict: true,
  });

  if (values.help) {
    console.log(LIST_HELP);
    return;
  }

  const models = listModels({
    category: values.category as ListModelsFilters["category"],
    provider: values.provider as ListModelsFilters["provider"],
    query: values.query ?? undefined,
  });

  if (models.length === 0) {
    console.log("No models found matching the given filters.");
    return;
  }

  const rows = models.map((m) => [
    m.canonical_name,
    m.category,
    m.providers.map((p) => p.provider).join(", "),
  ]);

  printTable(["Name", "Category", "Providers"], rows);
}

function cmdInfo(args: string[]): void {
  const { values, positionals } = parseArgs({
    args,
    options: {
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.help) {
    console.log(INFO_HELP);
    return;
  }

  const name = positionals[0];
  if (!name) {
    console.error("Error: model name is required\n");
    console.log(INFO_HELP);
    process.exit(1);
  }

  const model = getModel(name);

  console.log(`Name:       ${model.canonical_name}`);
  console.log(`Category:   ${model.category}`);
  console.log(`Aliases:    ${model.aliases.length > 0 ? model.aliases.join(", ") : "(none)"}`);
  console.log(`Providers:  ${model.providers.map((p) => p.provider).join(", ")}`);
  console.log();
  console.log("Provider details:");
  for (const p of model.providers) {
    console.log(`  ${p.provider}`);
    console.log(`    Skill:    ${p.skill_id}`);
    console.log(`    Endpoint: ${p.endpoint}`);
    console.log(`    Auth env: ${p.auth_env}`);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(HELP);
    return;
  }

  const command = args[0];
  const rest = args.slice(1);

  switch (command) {
    case "generate":
      await cmdGenerate(rest);
      break;
    case "list":
      cmdList(rest);
      break;
    case "info":
      cmdInfo(rest);
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP);
      process.exit(1);
  }
}

// Import types used in the file
import type { GenerateRequest } from "./types.js";
import type { ListModelsFilters } from "./discovery.js";

main().catch((err: Error) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
