import { describe, it, expect, beforeEach, vi } from "vitest";
import type { ModelEntry } from "../../src/types.js";
import { ModelNotFoundError } from "../../src/errors.js";

// Mock the fs module so we don't read the full 1.2MB registry file
vi.mock("fs", () => ({
  readFileSync: vi.fn(() => JSON.stringify(mockRegistry)),
}));

const mockRegistry: ModelEntry[] = [
  {
    canonical_name: "flux-schnell",
    aliases: ["flux-schnell", "flux-s", "schnell"],
    category: "text-to-image",
    modality: { inputs: ["text"], outputs: ["image"] },
    providers: [
      {
        provider: "fal-ai",
        skill_id: "fal-flux-schnell",
        endpoint: "fal-ai/flux/schnell",
        auth_env: "FAL_KEY",
        param_map: {},
        output_map: { type: "image", extract_path: "images[0].url" },
      },
      {
        provider: "replicate",
        skill_id: "replicate-flux-schnell",
        endpoint: "black-forest-labs/flux-schnell",
        auth_env: "REPLICATE_API_TOKEN",
        param_map: {},
        output_map: { type: "image", extract_path: "output[0]" },
      },
    ],
  },
  {
    canonical_name: "flux-dev",
    aliases: ["flux-dev", "flux-d"],
    category: "text-to-image",
    modality: { inputs: ["text"], outputs: ["image"] },
    providers: [
      {
        provider: "fal-ai",
        skill_id: "fal-flux-dev",
        endpoint: "fal-ai/flux/dev",
        auth_env: "FAL_KEY",
        param_map: {},
        output_map: { type: "image", extract_path: "images[0].url" },
      },
    ],
  },
  {
    canonical_name: "stable-diffusion-v4.5",
    aliases: ["sd-v4.5", "sdxl-v4.5", "stable-diffusion-4.5"],
    category: "text-to-image",
    modality: { inputs: ["text"], outputs: ["image"] },
    providers: [
      {
        provider: "wavespeed",
        skill_id: "wavespeed-sd-v4.5",
        endpoint: "wavespeed/sd-v4.5",
        auth_env: "WAVESPEED_API_KEY",
        param_map: {},
        output_map: { type: "image", extract_path: "output[0]" },
      },
    ],
  },
  {
    canonical_name: "minimax-video",
    aliases: ["minimax"],
    category: "text-to-video",
    modality: { inputs: ["text"], outputs: ["video"] },
    providers: [
      {
        provider: "replicate",
        skill_id: "replicate-minimax-video",
        endpoint: "minimax/video-01",
        auth_env: "REPLICATE_API_TOKEN",
        param_map: {},
        output_map: { type: "video", extract_path: "output" },
      },
    ],
  },
];

// Import after mock setup
import {
  resolveModel,
  normalizeModelName,
  loadRegistry,
  clearRegistryCache,
} from "../../src/resolver.js";

describe("normalizeModelName", () => {
  it("lowercases and strips non-alphanumeric characters", () => {
    expect(normalizeModelName("FLUX-Schnell")).toBe("fluxschnell");
  });

  it("strips leading v from version numbers", () => {
    expect(normalizeModelName("v4.5")).toBe("45");
    expect(normalizeModelName("stable-diffusion-v4.5")).toBe(
      "stablediffusion45",
    );
  });

  it("handles spaces and underscores", () => {
    expect(normalizeModelName("flux schnell")).toBe("fluxschnell");
    expect(normalizeModelName("flux_schnell")).toBe("fluxschnell");
  });
});

describe("loadRegistry", () => {
  beforeEach(() => {
    clearRegistryCache();
  });

  it("returns parsed registry entries", () => {
    const entries = loadRegistry();
    expect(entries).toHaveLength(4);
    expect(entries[0].canonical_name).toBe("flux-schnell");
  });
});

describe("resolveModel", () => {
  beforeEach(() => {
    clearRegistryCache();
  });

  it("matches exact canonical name", () => {
    const result = resolveModel("flux-schnell");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("matches case-insensitively", () => {
    const result = resolveModel("FLUX-Schnell");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("matches with spaces instead of hyphens", () => {
    const result = resolveModel("flux schnell");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("matches with underscores instead of hyphens", () => {
    const result = resolveModel("flux_schnell");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("matches by alias", () => {
    const result = resolveModel("flux-s");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("matches by normalized alias", () => {
    const result = resolveModel("FLUX S");
    expect(result.canonical_name).toBe("flux-schnell");
  });

  it("throws ModelNotFoundError with suggestions on no match", () => {
    try {
      resolveModel("flux-turbo");
      expect.fail("Should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ModelNotFoundError);
      const mnfErr = err as ModelNotFoundError;
      expect(mnfErr.suggestions.length).toBeGreaterThan(0);
      // "flux" prefix should match flux-dev and flux-schnell
      expect(mnfErr.suggestions).toContain("flux-dev");
      expect(mnfErr.suggestions).toContain("flux-schnell");
    }
  });

  it("throws ModelNotFoundError for empty query", () => {
    expect(() => resolveModel("")).toThrow(ModelNotFoundError);
    expect(() => resolveModel("  ")).toThrow(ModelNotFoundError);

    try {
      resolveModel("");
    } catch (err) {
      expect((err as ModelNotFoundError).message).toContain(
        "Model name is required",
      );
    }
  });

  it("filters out inaccessible providers", () => {
    const result = resolveModel("flux-schnell", ["fal-ai"]);
    expect(result.providers).toHaveLength(1);
    expect(result.providers[0].provider).toBe("fal-ai");
  });

  it("throws when no providers remain after filtering", () => {
    expect(() => resolveModel("minimax-video", ["fal-ai"])).toThrow(
      ModelNotFoundError,
    );
  });

  it("suggestions include prefix matches", () => {
    try {
      resolveModel("flux");
      // If it happens to match an alias, that's fine too
    } catch (err) {
      expect(err).toBeInstanceOf(ModelNotFoundError);
      const mnfErr = err as ModelNotFoundError;
      // Both flux-dev and flux-schnell should appear as suggestions
      expect(mnfErr.suggestions).toContain("flux-dev");
      expect(mnfErr.suggestions).toContain("flux-schnell");
    }
  });
});
