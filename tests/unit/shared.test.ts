import { describe, it, expect, vi } from "vitest";
import {
  parseFrontmatter,
  detectProvider,
  extractEndpoint,
  assignCategory,
  readAllSkills,
  SKIP_DIRS,
} from "../../scripts/shared.js";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";

// ---------------------------------------------------------------------------
// parseFrontmatter
// ---------------------------------------------------------------------------
describe("parseFrontmatter", () => {
  it("parses name and description from standard frontmatter", () => {
    const content = `---
name: my-skill
description: A cool skill
---

# Body`;
    const result = parseFrontmatter(content);
    expect(result.name).toBe("my-skill");
    expect(result.description).toBe("A cool skill");
    expect(result.body).toContain("# Body");
  });

  it("handles multi-line description with > block scalar", () => {
    const content = `---
name: my-skill
description: >
  This is a long
  multi-line description
---

Body here`;
    const result = parseFrontmatter(content);
    expect(result.name).toBe("my-skill");
    expect(result.description).toBe("This is a long multi-line description");
  });

  it("handles multi-line description with | block scalar", () => {
    const content = `---
name: my-skill
description: |
  Line one
  Line two
---

Body`;
    const result = parseFrontmatter(content);
    expect(result.description).toBe("Line one Line two");
  });

  it("returns empty name and description when no frontmatter", () => {
    const content = "# Just a heading\nSome text";
    const result = parseFrontmatter(content);
    expect(result.name).toBe("");
    expect(result.description).toBe("");
    expect(result.body).toBe(content);
  });

  it("returns empty strings when frontmatter has no name/description keys", () => {
    const content = `---
other_key: value
---

Body`;
    const result = parseFrontmatter(content);
    expect(result.name).toBe("");
    expect(result.description).toBe("");
  });

  it("handles description as last key in frontmatter", () => {
    const content = `---
name: test
description: last key value
---
`;
    const result = parseFrontmatter(content);
    expect(result.name).toBe("test");
    expect(result.description).toBe("last key value");
  });
});

// ---------------------------------------------------------------------------
// detectProvider
// ---------------------------------------------------------------------------
describe("detectProvider", () => {
  it("detects fal-ai provider", () => {
    const result = detectProvider("fal-ai-flux-schnell");
    expect(result).toEqual({ provider: "fal-ai", stripped: "flux-schnell" });
  });

  it("detects replicate provider", () => {
    const result = detectProvider("replicate-stability-ai-sdxl");
    expect(result).toEqual({ provider: "replicate", stripped: "stability-ai-sdxl" });
  });

  it("detects wavespeed provider", () => {
    const result = detectProvider("wavespeed-wavespeed-ai-wan");
    expect(result).toEqual({ provider: "wavespeed", stripped: "wavespeed-ai-wan" });
  });

  it("returns null for unknown provider", () => {
    expect(detectProvider("unknown-model")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(detectProvider("")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// extractEndpoint
// ---------------------------------------------------------------------------
describe("extractEndpoint", () => {
  it("extracts from **Endpoint:** pattern", () => {
    const body = '**Endpoint:** `fal-ai/flux/schnell`\nMore text';
    expect(extractEndpoint(body)).toBe("fal-ai/flux/schnell");
  });

  it("extracts from **Model:** pattern", () => {
    const body = '**Model:** `stability-ai/sdxl`\nMore text';
    expect(extractEndpoint(body)).toBe("stability-ai/sdxl");
  });

  it("extracts from API URL pattern", () => {
    const body = "Call https://api.replicate.com/v1/models/foo/bar for results";
    expect(extractEndpoint(body)).toBe("https://api.replicate.com/v1/models/foo/bar");
  });

  it("returns empty string when no endpoint found", () => {
    expect(extractEndpoint("No endpoint here")).toBe("");
  });

  it("prefers Endpoint pattern over Model pattern", () => {
    const body = '**Endpoint:** `primary-endpoint`\n**Model:** `secondary`';
    expect(extractEndpoint(body)).toBe("primary-endpoint");
  });
});

// ---------------------------------------------------------------------------
// assignCategory
// ---------------------------------------------------------------------------
describe("assignCategory", () => {
  it("detects text-to-image", () => {
    expect(assignCategory("flux-schnell", "Generate image from text", "")).toBe("text-to-image");
  });

  it("detects image-to-video", () => {
    expect(assignCategory("wan-i2v", "Image to video generation", "")).toBe("image-to-video");
  });

  it("detects text-to-video", () => {
    expect(assignCategory("wan-t2v", "Text to video model", "")).toBe("text-to-video");
  });

  it("detects image-edit", () => {
    expect(assignCategory("flux-edit", "Edit images with AI", "")).toBe("image-edit");
  });

  it("detects remove-background", () => {
    expect(assignCategory("rembg", "Remove background from images", "")).toBe("remove-background");
  });

  it("detects upscale-image", () => {
    expect(assignCategory("aura-sr", "Upscale images with super resolution", "")).toBe("upscale-image");
  });

  it("detects upscale-video", () => {
    expect(assignCategory("video-upscale", "Upscale video resolution", "")).toBe("upscale-video");
  });

  it("detects text-to-audio", () => {
    expect(assignCategory("tts-model", "Text to speech synthesis", "")).toBe("text-to-audio");
  });

  it("detects audio-to-text", () => {
    expect(assignCategory("whisper", "Speech to text transcription", "")).toBe("audio-to-text");
  });

  it("detects video-to-audio", () => {
    expect(assignCategory("foley", "Video to audio sound effects", "")).toBe("video-to-audio");
  });

  it("detects image-to-3d", () => {
    expect(assignCategory("mesh-gen", "Image to 3d model generation", "")).toBe("image-to-3d");
  });

  it("detects text-to-3d", () => {
    expect(assignCategory("text-3d", "Generate 3d mesh from text", "")).toBe("text-to-3d");
  });

  it("detects segmentation", () => {
    expect(assignCategory("sam-model", "Segment anything model", "")).toBe("segmentation");
  });

  it("detects moderation", () => {
    expect(assignCategory("nsfw-check", "Content moderation filter", "")).toBe("moderation");
  });

  it("detects training", () => {
    expect(assignCategory("lora-trainer", "Fine tune lora training", "")).toBe("training");
  });

  it("detects video-to-video", () => {
    expect(assignCategory("video-to-video-model", "Video to video transformation", "")).toBe("video-to-video");
  });

  it("detects video swap as video-to-video", () => {
    expect(assignCategory("pixverse-swap", "Video swap face replacement", "")).toBe("video-to-video");
  });

  it("detects animate replace as video-to-video", () => {
    expect(assignCategory("wan-animate-replace", "Animate replace character", "")).toBe("video-to-video");
  });

  it("detects avatar as image-to-video", () => {
    expect(assignCategory("ai-avatar", "Create talking avatar", "")).toBe("image-to-video");
  });

  it("detects lip sync as image-to-video", () => {
    expect(assignCategory("lipsync-model", "Lip sync animation", "")).toBe("image-to-video");
  });

  it("detects inpaint as image-edit", () => {
    expect(assignCategory("inpaint-model", "Inpainting tool", "")).toBe("image-edit");
  });

  it("falls back to text-to-video when body mentions video", () => {
    expect(assignCategory("unknown-model", "some model", "generates video output")).toBe("text-to-video");
  });

  it("falls back to text-to-image when body mentions image", () => {
    expect(assignCategory("unknown-model", "some model", "generates image output")).toBe("text-to-image");
  });

  it("defaults to text-to-image when nothing matches", () => {
    expect(assignCategory("unknown", "unknown", "")).toBe("text-to-image");
  });
});

// ---------------------------------------------------------------------------
// SKIP_DIRS
// ---------------------------------------------------------------------------
describe("SKIP_DIRS", () => {
  it("contains agent-roles and cloudflare-r2", () => {
    expect(SKIP_DIRS.has("agent-roles")).toBe(true);
    expect(SKIP_DIRS.has("cloudflare-r2")).toBe(true);
  });

  it("has exactly 2 entries", () => {
    expect(SKIP_DIRS.size).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// readAllSkills
// ---------------------------------------------------------------------------
describe("readAllSkills", () => {
  it("reads skills from the actual skills directory", () => {
    const skillsDir = path.resolve(import.meta.dirname ?? __dirname, "..", "..", "skills");
    const { skills, warnings } = readAllSkills(skillsDir);

    expect(skills.length).toBeGreaterThan(100);
    expect(Array.isArray(warnings)).toBe(true);

    for (const skill of skills) {
      expect(skill.skill_id).toBeTruthy();
      expect(["fal-ai", "replicate", "wavespeed"]).toContain(skill.provider);
      expect(skill.category).toBeTruthy();
      expect(skill.model_family).toBeTruthy();
    }
  });

  it("skips directories in SKIP_DIRS", () => {
    const skillsDir = path.resolve(import.meta.dirname ?? __dirname, "..", "..", "skills");
    const { skills } = readAllSkills(skillsDir);

    const dirs = skills.map((s) => s.directory);
    expect(dirs).not.toContain("agent-roles");
    expect(dirs).not.toContain("cloudflare-r2");
  });

  it("warns for unknown provider directories", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    fs.mkdirSync(path.join(tmpDir, "unknown-provider"));
    fs.writeFileSync(path.join(tmpDir, "unknown-provider", "SKILL.md"), "---\nname: test\n---\n");

    const { skills, warnings } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(0);
    expect(warnings.some((w) => w.includes("Skipping unknown provider directory"))).toBe(true);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it("warns when SKILL.md is missing", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    fs.mkdirSync(path.join(tmpDir, "fal-ai-test-model"));

    const { skills, warnings } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(0);
    expect(warnings.some((w) => w.includes("No SKILL.md"))).toBe(true);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it("skips non-directory entries", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    fs.writeFileSync(path.join(tmpDir, "fal-ai-some-file.txt"), "not a dir");

    const { skills, warnings } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(0);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it("parses a valid skill from a temp directory", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    const skillDir = path.join(tmpDir, "fal-ai-test-model");
    fs.mkdirSync(skillDir);
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      `---\nname: fal-ai-test-model\ndescription: Generate image from text\n---\n\n**Endpoint:** \`fal-ai/test-model\`\n`,
    );

    const { skills } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(1);
    expect(skills[0].skill_id).toBe("fal-ai-test-model");
    expect(skills[0].provider).toBe("fal-ai");
    expect(skills[0].endpoint).toBe("fal-ai/test-model");
    expect(skills[0].category).toBe("text-to-image");
    expect(skills[0].model_family).toBe("test-model");
    expect(skills[0].directory).toBe("fal-ai-test-model");

    fs.rmSync(tmpDir, { recursive: true });
  });

  it("warns when SKILL.md cannot be read", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    const skillDir = path.join(tmpDir, "fal-ai-broken");
    fs.mkdirSync(skillDir);
    const skillFile = path.join(skillDir, "SKILL.md");
    fs.writeFileSync(skillFile, "content");
    // Make file unreadable
    fs.chmodSync(skillFile, 0o000);

    const { skills, warnings } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(0);
    expect(warnings.some((w) => w.includes("Failed to read"))).toBe(true);

    // Restore permissions for cleanup
    fs.chmodSync(skillFile, 0o644);
    fs.rmSync(tmpDir, { recursive: true });
  });

  it("uses directory name as skill_id when frontmatter has no name", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "skills-test-"));
    const skillDir = path.join(tmpDir, "replicate-some-model");
    fs.mkdirSync(skillDir);
    fs.writeFileSync(path.join(skillDir, "SKILL.md"), "# No frontmatter\nJust body");

    const { skills } = readAllSkills(tmpDir);
    expect(skills).toHaveLength(1);
    expect(skills[0].skill_id).toBe("replicate-some-model");

    fs.rmSync(tmpDir, { recursive: true });
  });

  it("every skill has a valid category", () => {
    const validCategories = [
      "text-to-image", "image-to-image", "text-to-video", "image-to-video",
      "text-to-audio", "audio-to-text", "image-to-3d", "text-to-3d",
      "upscale-image", "upscale-video", "remove-background", "segmentation",
      "image-edit", "video-to-audio", "video-to-video", "moderation", "training",
    ];
    const skillsDir = path.resolve(import.meta.dirname ?? __dirname, "..", "..", "skills");
    const { skills } = readAllSkills(skillsDir);

    for (const skill of skills) {
      expect(validCategories).toContain(skill.category);
    }
  });
});
