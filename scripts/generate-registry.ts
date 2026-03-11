import * as fs from "node:fs";
import * as path from "node:path";
import { readAllSkills, type ProviderName, type ModelCategory } from "./shared.js";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const ROOT_DIR = path.resolve(import.meta.dirname ?? __dirname, "..");
const SKILLS_DIR = path.join(ROOT_DIR, "skills");
const REGISTRY_DIR = path.join(ROOT_DIR, "registry");
const CATALOG_FILE = path.join(REGISTRY_DIR, "catalog.json");
const REGISTRY_FILE = path.join(REGISTRY_DIR, "registry.json");
const CATEGORIES_FILE = path.join(REGISTRY_DIR, "categories.json");

// ---------------------------------------------------------------------------
// Types (mirroring src/types.ts without importing to avoid build deps)
// ---------------------------------------------------------------------------
type OutputType = "image" | "video" | "audio" | "text" | "3d" | "segmentation";
type InputType = "text" | "image" | "audio" | "video";

interface OutputMapping {
  type: OutputType;
  extract_path: string;
  content_type?: string;
}

interface ProviderBinding {
  provider: ProviderName;
  skill_id: string;
  endpoint: string;
  auth_env: string;
  param_map: Record<string, string>;
  output_map: OutputMapping;
}

interface ModelEntry {
  canonical_name: string;
  aliases: string[];
  category: ModelCategory;
  modality: {
    inputs: InputType[];
    outputs: OutputType[];
  };
  providers: ProviderBinding[];
}

// ---------------------------------------------------------------------------
// Modality inference from category
// ---------------------------------------------------------------------------
function inferModality(category: ModelCategory): { inputs: InputType[]; outputs: OutputType[] } {
  const map: Record<ModelCategory, { inputs: InputType[]; outputs: OutputType[] }> = {
    "text-to-image":      { inputs: ["text"],           outputs: ["image"] },
    "image-to-image":     { inputs: ["image", "text"],  outputs: ["image"] },
    "text-to-video":      { inputs: ["text"],           outputs: ["video"] },
    "image-to-video":     { inputs: ["image", "text"],  outputs: ["video"] },
    "text-to-audio":      { inputs: ["text"],           outputs: ["audio"] },
    "audio-to-text":      { inputs: ["audio"],          outputs: ["text"] },
    "image-to-3d":        { inputs: ["image"],          outputs: ["3d"] },
    "text-to-3d":         { inputs: ["text"],           outputs: ["3d"] },
    "upscale-image":      { inputs: ["image"],          outputs: ["image"] },
    "upscale-video":      { inputs: ["video"],          outputs: ["video"] },
    "remove-background":  { inputs: ["image"],          outputs: ["image"] },
    "segmentation":       { inputs: ["image"],          outputs: ["segmentation"] },
    "image-edit":         { inputs: ["image", "text"],  outputs: ["image"] },
    "video-to-audio":     { inputs: ["video"],          outputs: ["audio"] },
    "moderation":         { inputs: ["image"],          outputs: ["text"] },
    "training":           { inputs: ["image"],          outputs: ["text"] },
  };
  return map[category] ?? { inputs: ["text"], outputs: ["image"] };
}

// ---------------------------------------------------------------------------
// Auth env per provider
// ---------------------------------------------------------------------------
function authEnv(provider: ProviderName): string {
  const map: Record<ProviderName, string> = {
    "fal-ai": "FAL_KEY",
    "replicate": "REPLICATE_API_TOKEN",
    "wavespeed": "WAVESPEED_API_KEY",
  };
  return map[provider];
}

// ---------------------------------------------------------------------------
// Output mapping per provider + category
// ---------------------------------------------------------------------------
function buildOutputMap(provider: ProviderName, category: ModelCategory): OutputMapping {
  const outputType = inferModality(category).outputs[0];

  const contentTypeMap: Record<OutputType, string> = {
    image: "image/png",
    video: "video/mp4",
    audio: "audio/mpeg",
    text: "text/plain",
    "3d": "model/gltf-binary",
    segmentation: "image/png",
  };

  if (provider === "fal-ai") {
    if (outputType === "image" || outputType === "segmentation") return { type: outputType, extract_path: "images[].url", content_type: contentTypeMap[outputType] };
    if (outputType === "video") return { type: outputType, extract_path: "video.url", content_type: contentTypeMap[outputType] };
    if (outputType === "audio") return { type: outputType, extract_path: "audio.url", content_type: contentTypeMap[outputType] };
    if (outputType === "3d") return { type: outputType, extract_path: "model_mesh.url", content_type: contentTypeMap[outputType] };
    return { type: outputType, extract_path: "output", content_type: contentTypeMap[outputType] };
  }

  if (provider === "replicate") {
    return { type: outputType, extract_path: "output[]", content_type: contentTypeMap[outputType] };
  }

  // wavespeed
  return { type: outputType, extract_path: "data.outputs[]", content_type: contentTypeMap[outputType] };
}

// ---------------------------------------------------------------------------
// Alias generation
// ---------------------------------------------------------------------------
const STRIP_PREFIXES = [
  "bytedance-", "black-forest-labs-", "google-", "openai-", "meta-",
  "stability-ai-", "stabilityai-", "tencent-", "alibaba-",
  "minimax-", "nvidia-", "microsoft-", "adobe-",
  "awerks-", "cjwbw-", "lucataco-", "zsxkib-", "sakemin-",
  "andreasjansson-", "afiaka87-", "fermatresearch-",
  "851-labs-", "platform-kit-", "x-lance-",
  "wavespeed-ai-", "bria-ai-", "qwen-",
];

const CATEGORY_SUFFIXES = [
  "-text-to-image", "-image-to-image", "-text-to-video", "-image-to-video",
  "-text-to-audio", "-audio-to-text", "-image-to-3d", "-text-to-3d",
  "-upscale-image", "-upscale-video", "-remove-background", "-segmentation",
  "-image-edit", "-video-to-audio", "-moderation", "-training",
];

function generateAliases(canonicalName: string): string[] {
  const aliases = new Set<string>();
  aliases.add(canonicalName);

  for (const prefix of STRIP_PREFIXES) {
    if (canonicalName.startsWith(prefix)) {
      const stripped = canonicalName.slice(prefix.length);
      if (stripped.length > 2) {
        aliases.add(stripped);
      }
    }
  }

  for (const suffix of CATEGORY_SUFFIXES) {
    if (canonicalName.endsWith(suffix)) {
      const stripped = canonicalName.slice(0, -suffix.length);
      if (stripped.length > 2) {
        aliases.add(stripped);
      }
    }
  }

  const currentAliases = [...aliases];
  for (const alias of currentAliases) {
    for (const suffix of CATEGORY_SUFFIXES) {
      if (alias.endsWith(suffix)) {
        const stripped = alias.slice(0, -suffix.length);
        if (stripped.length > 2) aliases.add(stripped);
      }
    }
  }

  for (const alias of [...aliases]) {
    const versionDot = alias.match(/-v(\d+\.\d+)$/);
    if (versionDot) {
      aliases.add(alias.replace(/-v(\d+\.\d+)$/, `-${versionDot[1]}`));
    }
    const versionDash = alias.match(/-v(\d+)-(\d+)$/);
    if (versionDash) {
      aliases.add(alias.replace(/-v(\d+)-(\d+)$/, `-v${versionDash[1]}.${versionDash[2]}`));
      aliases.add(alias.replace(/-v(\d+)-(\d+)$/, `-${versionDash[1]}.${versionDash[2]}`));
    }
  }

  return [...aliases];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main(): void {
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error("ERROR: registry/catalog.json not found. Run 'npm run catalog' first.");
    process.exit(1);
  }

  console.log("Reading skills from disk...");
  const { skills } = readAllSkills(SKILLS_DIR);
  console.log(`  Found ${skills.length} skills`);

  // Group skills by model_family
  const familyMap = new Map<string, typeof skills>();
  for (const skill of skills) {
    const existing = familyMap.get(skill.model_family);
    if (existing) {
      existing.push(skill);
    } else {
      familyMap.set(skill.model_family, [skill]);
    }
  }

  console.log(`  Unique model families: ${familyMap.size}`);

  // Build model entries
  const registry: ModelEntry[] = [];
  const allAliases = new Map<string, string>();

  for (const [family, familySkills] of familyMap) {
    const category = familySkills[0].category as ModelCategory;
    const modality = inferModality(category);

    const rawAliases = generateAliases(family);
    const dedupedAliases: string[] = [];

    for (const alias of rawAliases) {
      const existing = allAliases.get(alias);
      if (existing && existing !== family) {
        continue;
      }
      allAliases.set(alias, family);
      dedupedAliases.push(alias);
    }

    const providers: ProviderBinding[] = familySkills.map((skill) => ({
      provider: skill.provider,
      skill_id: skill.skill_id,
      endpoint: skill.endpoint,
      auth_env: authEnv(skill.provider),
      param_map: {},
      output_map: buildOutputMap(skill.provider, category),
    }));

    registry.push({
      canonical_name: family,
      aliases: dedupedAliases,
      category,
      modality,
      providers,
    });
  }

  registry.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name));

  const categoryCounts: Record<string, number> = {};
  for (const entry of registry) {
    categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
  }

  // Write outputs
  fs.mkdirSync(REGISTRY_DIR, { recursive: true });
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), "utf-8");
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categoryCounts, null, 2), "utf-8");

  try {
    JSON.parse(fs.readFileSync(REGISTRY_FILE, "utf-8"));
    JSON.parse(fs.readFileSync(CATEGORIES_FILE, "utf-8"));
    console.log("\nJSON validation: PASSED");
  } catch (err) {
    console.error("\nJSON validation: FAILED", err);
    process.exit(1);
  }

  const multiProviderCount = registry.filter((e) => e.providers.length > 1).length;
  const totalAliases = registry.reduce((sum, e) => sum + e.aliases.length, 0);

  console.log("\n=== Registry Summary ===");
  console.log(`  Total models: ${registry.length}`);
  console.log(`  Total aliases: ${totalAliases}`);
  console.log(`  Multi-provider models: ${multiProviderCount}`);
  console.log(`  Single-provider models: ${registry.length - multiProviderCount}`);

  console.log("\n--- Models by category ---");
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCategories) {
    console.log(`  ${cat}: ${count}`);
  }

  console.log("\n--- Multi-provider models ---");
  const multiProvider = registry.filter((e) => e.providers.length > 1);
  for (const entry of multiProvider.slice(0, 10)) {
    const providerNames = entry.providers.map((p) => p.provider).join(", ");
    console.log(`  ${entry.canonical_name} [${providerNames}]`);
  }
  if (multiProvider.length > 10) {
    console.log(`  ... and ${multiProvider.length - 10} more`);
  }

  console.log(`\nOutput files:`);
  console.log(`  ${REGISTRY_FILE}`);
  console.log(`  ${CATEGORIES_FILE}`);
}

main();
