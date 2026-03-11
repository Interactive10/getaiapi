import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ProviderName = "fal-ai" | "replicate" | "wavespeed";
export type ModelCategory =
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
  | "video-to-video"
  | "moderation"
  | "training";

export interface SkillData {
  skill_id: string;
  provider: ProviderName;
  model_family: string;
  category: ModelCategory;
  description: string;
  endpoint: string;
  directory: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const SKIP_DIRS = new Set(["agent-roles", "cloudflare-r2"]);

// ---------------------------------------------------------------------------
// YAML frontmatter parser (manual, no library)
// ---------------------------------------------------------------------------
export function parseFrontmatter(content: string): { name: string; description: string; body: string } {
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
export function detectProvider(dirName: string): { provider: ProviderName; stripped: string } | null {
  if (dirName.startsWith("fal-ai-")) return { provider: "fal-ai", stripped: dirName.slice("fal-ai-".length) };
  if (dirName.startsWith("replicate-")) return { provider: "replicate", stripped: dirName.slice("replicate-".length) };
  if (dirName.startsWith("wavespeed-")) return { provider: "wavespeed", stripped: dirName.slice("wavespeed-".length) };
  return null;
}

// ---------------------------------------------------------------------------
// Endpoint extraction
// ---------------------------------------------------------------------------
export function extractEndpoint(body: string): string {
  const endpointMatch = body.match(/\*\*Endpoint:\*\*\s*`([^`]+)`/);
  if (endpointMatch) return endpointMatch[1];
  const modelMatch = body.match(/\*\*Model:\*\*\s*`([^`]+)`/);
  if (modelMatch) return modelMatch[1];
  const urlMatch = body.match(/https:\/\/api\.\w+\.\w+\/[^\s"'`]+/);
  if (urlMatch) return urlMatch[0];
  return "";
}

// ---------------------------------------------------------------------------
// Category assignment
// ---------------------------------------------------------------------------
export function assignCategory(name: string, description: string, body: string): ModelCategory {
  const text = `${name} ${description}`.toLowerCase();
  const fullText = `${text} ${body.slice(0, 500)}`.toLowerCase();

  if (/audio.to.text|whisper|speech.to.text|\bstt\b|transcri|diariz/.test(text)) return "audio-to-text";
  if (/video.to.audio|foley|\bsfx\b|sound effect/.test(text)) return "video-to-audio";
  if (/remove.background|rembg|background.remov|bg.remov|matting/.test(text)) return "remove-background";
  if (/moderat|nsfw|content.moderat|safeguard/.test(text)) return "moderation";
  if (/training|trainer|fine.tun|lora.train/.test(text)) return "training";
  if (/segmentation|\bsam\b|segment/.test(text)) return "segmentation";
  if (/video.to.video|\bv2v\b|video.swap|animate.replace/.test(text)) return "video-to-video";
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
// Read all skills from disk
// ---------------------------------------------------------------------------
export function readAllSkills(skillsDir: string): { skills: SkillData[]; warnings: string[] } {
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const skills: SkillData[] = [];
  const warnings: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;

    const providerInfo = detectProvider(entry.name);
    if (!providerInfo) {
      warnings.push(`Skipping unknown provider directory: ${entry.name}`);
      continue;
    }

    const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
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
    const endpoint = extractEndpoint(parsed.body);
    const category = assignCategory(skillId, parsed.description, parsed.body);

    skills.push({
      skill_id: skillId,
      provider: providerInfo.provider,
      model_family: providerInfo.stripped,
      category,
      description: parsed.description,
      endpoint,
      directory: entry.name,
    });
  }

  return { skills, warnings };
}
