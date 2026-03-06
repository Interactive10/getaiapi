import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const ROOT_DIR = path.resolve(import.meta.dirname ?? __dirname, "..");
const SKILLS_DIR = path.join(ROOT_DIR, "skills");
const REGISTRY_DIR = path.join(ROOT_DIR, "registry");
const CATALOG_FILE = path.join(REGISTRY_DIR, "catalog.json");
const REGISTRY_FILE = path.join(REGISTRY_DIR, "registry.json");
const CATEGORIES_FILE = path.join(REGISTRY_DIR, "categories.json");
const SKIP_DIRS = new Set(["agent-roles", "cloudflare-r2"]);

// ---------------------------------------------------------------------------
// Types (mirroring src/types.ts without importing to avoid build deps)
// ---------------------------------------------------------------------------
type ProviderName = "fal-ai" | "replicate" | "wavespeed";
type OutputType = "image" | "video" | "audio" | "text" | "3d" | "segmentation";
type InputType = "text" | "image" | "audio" | "video";
type ModelCategory =
  | "text-to-image"
  | "image-to-image"
  | "text-to-video"
  | "image-to-video"
  | "text-to-audio"
  | "audio-to-text"
  | "image-to-3d"
  | "text-to-3d"
  | "upscale-image"
  | "upscale-video"
  | "remove-background"
  | "segmentation"
  | "image-edit"
  | "video-to-audio"
  | "moderation"
  | "training";

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

interface SkillData {
  skill_id: string;
  provider: ProviderName;
  model_family: string;
  category: ModelCategory;
  description: string;
  endpoint: string;
}

interface CatalogJson {
  categories: Record<string, string[]>;
  providers: Record<string, string[]>;
  duplicates: { canonical_name: string; skills: string[] }[];
  total: number;
}

// ---------------------------------------------------------------------------
// YAML frontmatter parser (same as catalog.ts)
// ---------------------------------------------------------------------------
function parseFrontmatter(content: string): { name: string; description: string; body: string } {
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fmMatch) return { name: "", description: "", body: content };

  const fmBlock = fmMatch[1];
  const body = content.slice(fmMatch[0].length);

  let name = "";
  let description = "";

  const lines = fmBlock.split("\n");
  let currentKey = "";
  let currentValue = "";

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w_-]*)\s*:\s*(.*)/);
    if (keyMatch) {
      if (currentKey === "name") name = currentValue.trim();
      if (currentKey === "description") description = currentValue.trim();
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();
      currentValue = val === ">" || val === "|" ? "" : val;
    } else if (currentKey && line.match(/^\s+/)) {
      currentValue += " " + line.trim();
    }
  }
  if (currentKey === "name") name = currentValue.trim();
  if (currentKey === "description") description = currentValue.trim();

  return { name, description, body };
}

// ---------------------------------------------------------------------------
// Provider detection
// ---------------------------------------------------------------------------
function detectProvider(dirName: string): { provider: ProviderName; stripped: string } | null {
  if (dirName.startsWith("fal-ai-")) return { provider: "fal-ai", stripped: dirName.slice("fal-ai-".length) };
  if (dirName.startsWith("replicate-")) return { provider: "replicate", stripped: dirName.slice("replicate-".length) };
  if (dirName.startsWith("wavespeed-")) return { provider: "wavespeed", stripped: dirName.slice("wavespeed-".length) };
  return null;
}

// ---------------------------------------------------------------------------
// Endpoint extraction
// ---------------------------------------------------------------------------
function extractEndpoint(body: string): string {
  const endpointMatch = body.match(/\*\*Endpoint:\*\*\s*`([^`]+)`/);
  if (endpointMatch) return endpointMatch[1];
  const modelMatch = body.match(/\*\*Model:\*\*\s*`([^`]+)`/);
  if (modelMatch) return modelMatch[1];
  const urlMatch = body.match(/https:\/\/api\.\w+\.\w+\/[^\s"'`]+/);
  if (urlMatch) return urlMatch[0];
  return "";
}

// ---------------------------------------------------------------------------
// Category assignment (same logic as catalog.ts)
// ---------------------------------------------------------------------------
function assignCategory(name: string, description: string, body: string): ModelCategory {
  const text = `${name} ${description}`.toLowerCase();
  const fullText = `${text} ${body.slice(0, 500)}`.toLowerCase();

  if (/audio.to.text|whisper|speech.to.text|\bstt\b|transcri|diariz/.test(text)) return "audio-to-text";
  if (/video.to.audio|foley|\bsfx\b|sound effect/.test(text)) return "video-to-audio";
  if (/remove.background|rembg|background.remov|bg.remov|matting/.test(text)) return "remove-background";
  if (/moderat|nsfw|content.moderat|safeguard/.test(text)) return "moderation";
  if (/training|trainer|fine.tun|lora.train/.test(text)) return "training";
  if (/segmentation|\bsam\b|segment/.test(text)) return "segmentation";
  if (/image.to.video|\bi2v\b|avatar|talking|lip.sync|lipsync/.test(text)) return "image-to-video";
  if (/text.to.video|\bt2v\b|video.generation/.test(text)) return "text-to-video";
  if (/\bedit\b|editing|inpaint/.test(text)) return "image-edit";
  if (/upscale|super.resolution|enhance|\bsr\b/.test(text)) {
    if (/video/.test(text)) return "upscale-video";
    return "upscale-image";
  }
  if (/\b3d\b|mesh|3d.model/.test(text)) {
    if (/image/.test(text)) return "image-to-3d";
    return "text-to-3d";
  }
  if (/text.to.audio|\btts\b|text.to.speech|music|\bsound\b|audio.gen/.test(text)) return "text-to-audio";
  if (/image.to.image|style.transfer|coloriz/.test(text)) return "image-to-image";
  if (/text.to.image|generate.image|image.generation/.test(text)) return "text-to-image";
  if (/video/.test(fullText)) return "text-to-video";
  if (/image/.test(fullText)) return "text-to-image";
  return "text-to-image";
}

// ---------------------------------------------------------------------------
// Read all skills from disk (re-parses SKILL.md files)
// ---------------------------------------------------------------------------
function readAllSkills(): SkillData[] {
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skills: SkillData[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;

    const providerInfo = detectProvider(entry.name);
    if (!providerInfo) continue;

    const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    let content: string;
    try {
      content = fs.readFileSync(skillFile, "utf-8");
    } catch {
      continue;
    }

    const parsed = parseFrontmatter(content);
    const skillId = parsed.name || entry.name;
    const endpoint = extractEndpoint(parsed.body);
    const category = assignCategory(skillId, parsed.description, parsed.body);

    skills.push({
      skill_id: skillId,
      provider: providerInfo.provider,
      model_family: providerInfo.stripped,
      category: category as ModelCategory,
      description: parsed.description,
      endpoint,
    });
  }

  return skills;
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

  // Content type by output type
  const contentTypeMap: Record<OutputType, string> = {
    image: "image/png",
    video: "video/mp4",
    audio: "audio/mpeg",
    text: "text/plain",
    "3d": "model/gltf-binary",
    segmentation: "image/png",
  };

  // Extract path per provider and output type
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

  // Strip common prefixes
  for (const prefix of STRIP_PREFIXES) {
    if (canonicalName.startsWith(prefix)) {
      const stripped = canonicalName.slice(prefix.length);
      if (stripped.length > 2) {
        aliases.add(stripped);
      }
    }
  }

  // Strip category suffixes
  for (const suffix of CATEGORY_SUFFIXES) {
    if (canonicalName.endsWith(suffix)) {
      const stripped = canonicalName.slice(0, -suffix.length);
      if (stripped.length > 2) {
        aliases.add(stripped);
      }
    }
  }

  // Also strip prefix+suffix combos from derived aliases
  const currentAliases = [...aliases];
  for (const alias of currentAliases) {
    for (const suffix of CATEGORY_SUFFIXES) {
      if (alias.endsWith(suffix)) {
        const stripped = alias.slice(0, -suffix.length);
        if (stripped.length > 2) aliases.add(stripped);
      }
    }
  }

  // Version variants: v4.5 -> 4.5, v4-5
  for (const alias of [...aliases]) {
    // "v1.5" -> "1.5"
    const versionDot = alias.match(/-v(\d+\.\d+)$/);
    if (versionDot) {
      aliases.add(alias.replace(/-v(\d+\.\d+)$/, `-${versionDot[1]}`));
    }
    // "v4-5" -> "4.5" and vice versa
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
  // Verify catalog exists
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error("ERROR: registry/catalog.json not found. Run 'npm run catalog' first.");
    process.exit(1);
  }

  console.log("Reading skills from disk...");
  const skills = readAllSkills();
  console.log(`  Found ${skills.length} skills`);

  // Group skills by model_family
  const familyMap = new Map<string, SkillData[]>();
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
  const allAliases = new Map<string, string>(); // alias -> canonical_name (for dedup)

  for (const [family, familySkills] of familyMap) {
    // Use the category from the first skill (they should all match for same family)
    const category = familySkills[0].category as ModelCategory;
    const modality = inferModality(category);

    // Generate aliases
    const rawAliases = generateAliases(family);
    const dedupedAliases: string[] = [];

    for (const alias of rawAliases) {
      const existing = allAliases.get(alias);
      if (existing && existing !== family) {
        // Conflict: skip this alias
        continue;
      }
      allAliases.set(alias, family);
      dedupedAliases.push(alias);
    }

    // Build provider bindings
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

  // Sort registry by canonical_name for deterministic output
  registry.sort((a, b) => a.canonical_name.localeCompare(b.canonical_name));

  // Build categories summary
  const categoryCounts: Record<string, number> = {};
  for (const entry of registry) {
    categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
  }

  // Write outputs
  fs.mkdirSync(REGISTRY_DIR, { recursive: true });
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), "utf-8");
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categoryCounts, null, 2), "utf-8");

  // Validate JSON
  try {
    JSON.parse(fs.readFileSync(REGISTRY_FILE, "utf-8"));
    JSON.parse(fs.readFileSync(CATEGORIES_FILE, "utf-8"));
    console.log("\nJSON validation: PASSED");
  } catch (err) {
    console.error("\nJSON validation: FAILED", err);
    process.exit(1);
  }

  // Print summary
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
