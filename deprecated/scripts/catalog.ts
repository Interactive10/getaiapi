import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SKILLS_DIR = path.resolve(import.meta.dirname ?? __dirname, "..", "skills");
const OUTPUT_DIR = path.resolve(import.meta.dirname ?? __dirname, "..", "registry");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "catalog.json");
const SKIP_DIRS = new Set(["agent-roles", "cloudflare-r2"]);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface SkillEntry {
  skill_id: string;
  provider: string;
  model_family: string;
  category: string;
  description: string;
  endpoint: string;
  directory: string;
}

interface DuplicateGroup {
  canonical_name: string;
  skills: string[];
}

interface SkillCatalog {
  categories: Record<string, string[]>;
  providers: Record<string, string[]>;
  duplicates: DuplicateGroup[];
  total: number;
}

// ---------------------------------------------------------------------------
// YAML frontmatter parser (manual, no library)
// ---------------------------------------------------------------------------
function parseFrontmatter(content: string): { name: string; description: string; body: string } {
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fmMatch) return { name: "", description: "", body: content };

  const fmBlock = fmMatch[1];
  const body = content.slice(fmMatch[0].length);

  let name = "";
  let description = "";

  // Parse key: value pairs, handling multi-line ">" continuation
  const lines = fmBlock.split("\n");
  let currentKey = "";
  let currentValue = "";

  for (const line of lines) {
    // Check for a new top-level key
    const keyMatch = line.match(/^(\w[\w_-]*)\s*:\s*(.*)/);
    if (keyMatch) {
      // Save previous key
      if (currentKey === "name") name = currentValue.trim();
      if (currentKey === "description") description = currentValue.trim();

      currentKey = keyMatch[1];
      let val = keyMatch[2].trim();
      // Handle YAML block scalar indicator ">"
      if (val === ">" || val === "|") {
        currentValue = "";
      } else {
        currentValue = val;
      }
    } else if (currentKey && line.match(/^\s+/)) {
      // Continuation line
      currentValue += " " + line.trim();
    }
  }
  // Save last key
  if (currentKey === "name") name = currentValue.trim();
  if (currentKey === "description") description = currentValue.trim();

  return { name, description, body };
}

// ---------------------------------------------------------------------------
// Provider detection
// ---------------------------------------------------------------------------
const PROVIDER_PREFIXES = ["fal-ai-", "replicate-", "wavespeed-"] as const;

function detectProvider(dirName: string): { provider: string; stripped: string } | null {
  if (dirName.startsWith("fal-ai-")) return { provider: "fal-ai", stripped: dirName.slice("fal-ai-".length) };
  if (dirName.startsWith("replicate-")) return { provider: "replicate", stripped: dirName.slice("replicate-".length) };
  if (dirName.startsWith("wavespeed-")) return { provider: "wavespeed", stripped: dirName.slice("wavespeed-".length) };
  return null;
}

// ---------------------------------------------------------------------------
// Endpoint extraction
// ---------------------------------------------------------------------------
function extractEndpoint(body: string, provider: string): string {
  // Try "Endpoint:" pattern (fal-ai)
  const endpointMatch = body.match(/\*\*Endpoint:\*\*\s*`([^`]+)`/);
  if (endpointMatch) return endpointMatch[1];

  // Try "Model:" pattern (replicate, wavespeed)
  const modelMatch = body.match(/\*\*Model:\*\*\s*`([^`]+)`/);
  if (modelMatch) return modelMatch[1];

  // Try API URL patterns
  const urlMatch = body.match(/https:\/\/api\.\w+\.\w+\/[^\s"'`]+/);
  if (urlMatch) return urlMatch[0];

  return "";
}

// ---------------------------------------------------------------------------
// Category assignment
// ---------------------------------------------------------------------------
type Category =
  | "text-to-image"
  | "image-to-video"
  | "text-to-video"
  | "image-edit"
  | "upscale-image"
  | "upscale-video"
  | "remove-background"
  | "text-to-audio"
  | "audio-to-text"
  | "segmentation"
  | "text-to-3d"
  | "image-to-3d"
  | "video-to-audio"
  | "moderation"
  | "training"
  | "image-to-image"
  | "image-to-video"; // avatar/lipsync also maps here

function assignCategory(name: string, description: string, body: string): string {
  const text = `${name} ${description}`.toLowerCase();
  const fullText = `${text} ${body.slice(0, 500)}`.toLowerCase();

  // Order matters: more specific patterns first

  // Audio-to-text (before text-to-audio to avoid false matches)
  if (/audio.to.text|whisper|speech.to.text|\bstt\b|transcri|diariz/.test(text)) return "audio-to-text";

  // Video-to-audio
  if (/video.to.audio|foley|\bsfx\b|sound effect/.test(text)) return "video-to-audio";

  // Remove background
  if (/remove.background|rembg|background.remov|bg.remov|matting/.test(text)) return "remove-background";

  // Moderation
  if (/moderat|nsfw|content.moderat|safeguard/.test(text)) return "moderation";

  // Training
  if (/training|trainer|fine.tun|lora.train/.test(text)) return "training";

  // Segmentation
  if (/segmentation|\bsam\b|segment/.test(text)) return "segmentation";

  // Image-to-video (including avatar/lipsync)
  if (/image.to.video|\bi2v\b|avatar|talking|lip.sync|lipsync/.test(text)) return "image-to-video";

  // Text-to-video
  if (/text.to.video|\bt2v\b|video.generation/.test(text)) return "text-to-video";

  // Image-edit (inpaint, editing)
  if (/\bedit\b|editing|inpaint/.test(text)) return "image-edit";

  // Upscale
  if (/upscale|super.resolution|enhance|\bsr\b/.test(text)) {
    if (/video/.test(text)) return "upscale-video";
    return "upscale-image";
  }

  // 3D
  if (/\b3d\b|mesh|3d.model/.test(text)) {
    if (/image/.test(text)) return "image-to-3d";
    return "text-to-3d";
  }

  // Text-to-audio
  if (/text.to.audio|\btts\b|text.to.speech|music|\bsound\b|audio.gen/.test(text)) return "text-to-audio";

  // Image-to-image
  if (/image.to.image|style.transfer|coloriz/.test(text)) return "image-to-image";

  // Text-to-image (explicit)
  if (/text.to.image|generate.image|image.generation/.test(text)) return "text-to-image";

  // Fallback heuristics
  if (/video/.test(fullText)) return "text-to-video";
  if (/image/.test(fullText)) return "text-to-image";

  return "text-to-image";
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skills: SkillEntry[] = [];
  const warnings: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;

    const providerInfo = detectProvider(entry.name);
    if (!providerInfo) {
      warnings.push(`Skipping unknown provider directory: ${entry.name}`);
      continue;
    }

    const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      warnings.push(`No SKILL.md in ${entry.name}, skipping`);
      continue;
    }

    let content: string;
    try {
      content = fs.readFileSync(skillFile, "utf-8");
    } catch (err) {
      warnings.push(`Failed to read ${skillFile}: ${err}`);
      continue;
    }

    let parsed: ReturnType<typeof parseFrontmatter>;
    try {
      parsed = parseFrontmatter(content);
    } catch (err) {
      warnings.push(`Failed to parse frontmatter in ${entry.name}: ${err}`);
      continue;
    }

    const skillId = parsed.name || entry.name;
    const provider = providerInfo.provider;
    const modelFamily = providerInfo.stripped;
    const description = parsed.description;
    const endpoint = extractEndpoint(parsed.body, provider);
    const category = assignCategory(skillId, description, parsed.body);

    skills.push({
      skill_id: skillId,
      provider,
      model_family: modelFamily,
      category,
      description,
      endpoint,
      directory: entry.name,
    });
  }

  // Print warnings
  if (warnings.length > 0) {
    console.warn(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.warn(`  - ${w}`);
    console.warn("");
  }

  // Build catalog structure
  const categories: Record<string, string[]> = {};
  const providers: Record<string, string[]> = {};

  for (const skill of skills) {
    if (!categories[skill.category]) categories[skill.category] = [];
    categories[skill.category].push(skill.skill_id);

    if (!providers[skill.provider]) providers[skill.provider] = [];
    providers[skill.provider].push(skill.skill_id);
  }

  // Detect cross-provider duplicates
  const familyMap = new Map<string, string[]>();
  for (const skill of skills) {
    const existing = familyMap.get(skill.model_family);
    if (existing) {
      existing.push(skill.skill_id);
    } else {
      familyMap.set(skill.model_family, [skill.skill_id]);
    }
  }

  const duplicates: DuplicateGroup[] = [];
  for (const [family, skillIds] of familyMap) {
    if (skillIds.length > 1) {
      // Verify they are from different providers
      const skillProviders = new Set(
        skillIds.map((id) => skills.find((s) => s.skill_id === id)?.provider)
      );
      if (skillProviders.size > 1) {
        duplicates.push({ canonical_name: family, skills: skillIds });
      }
    }
  }

  const catalog: SkillCatalog = {
    categories,
    providers,
    duplicates,
    total: skills.length,
  };

  // Write output
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), "utf-8");

  // Print summary
  const categorySummary = Object.entries(categories)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([cat, ids]) => `${cat} (${ids.length})`)
    .join(", ");

  const providerSummary = Object.entries(providers)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([prov, ids]) => `  ${prov}: ${ids.length}`)
    .join("\n");

  console.log(`\nCataloger complete:`);
  console.log(`  Total skills: ${skills.length}`);
  console.log(providerSummary);
  console.log(`  Categories: ${categorySummary}`);
  console.log(`  Cross-provider duplicates: ${duplicates.length}`);
}

main();
