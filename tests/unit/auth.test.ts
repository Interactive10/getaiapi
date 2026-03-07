import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { ModelEntry, ProviderBinding } from "../../src/types.js";
import { AuthError } from "../../src/errors.js";
import { AuthManager, configureAuth, resetAuth } from "../../src/auth.js";

/** Helper to create a minimal ModelEntry with the given provider names. */
function makeModel(providers: string[]): ModelEntry {
  return {
    canonical_name: "test-model",
    aliases: [],
    category: "text-to-image",
    modality: { inputs: ["text"], outputs: ["image"] },
    providers: providers.map(
      (p) =>
        ({
          provider: p,
          skill_id: `${p}/test`,
          endpoint: `https://${p}.example.com`,
          auth_env: "TEST",
          param_map: {},
          output_map: { type: "image", extract_path: "$.output" },
        }) as ProviderBinding,
    ),
  };
}

describe("AuthManager", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    // Save and clear all provider env vars
    for (const key of ["FAL_KEY", "REPLICATE_API_TOKEN", "WAVESPEED_API_KEY"]) {
      savedEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    // Restore original env vars
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  });

  it("detects keys from env vars correctly", () => {
    process.env.FAL_KEY = "fal-secret";
    process.env.REPLICATE_API_TOKEN = "rep-secret";

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("fal-secret");
    expect(auth.getKey("replicate")).toBe("rep-secret");
  });

  it("availableProviders() returns only providers with set keys", () => {
    process.env.WAVESPEED_API_KEY = "ws-secret";

    const auth = new AuthManager();
    const providers = auth.availableProviders();
    expect(providers).toEqual(["wavespeed"]);
  });

  it("getKey() throws AuthError with correct env var name when key missing", () => {
    const auth = new AuthManager();

    expect(() => auth.getKey("fal-ai")).toThrow(AuthError);

    try {
      auth.getKey("replicate");
    } catch (err) {
      expect(err).toBeInstanceOf(AuthError);
      const authErr = err as AuthError;
      expect(authErr.provider).toBe("replicate");
      expect(authErr.envVar).toBe("REPLICATE_API_TOKEN");
      expect(authErr.message).toContain("REPLICATE_API_TOKEN");
    }
  });

  it("canAccess() returns true when at least one provider binding has a key", () => {
    process.env.FAL_KEY = "fal-secret";

    const auth = new AuthManager();
    const model = makeModel(["fal-ai", "replicate"]);
    expect(auth.canAccess(model)).toBe(true);
  });

  it("canAccess() returns false when no provider has a key", () => {
    const auth = new AuthManager();
    const model = makeModel(["fal-ai", "replicate"]);
    expect(auth.canAccess(model)).toBe(false);
  });

  it("listAvailableModels() filters correctly", () => {
    process.env.REPLICATE_API_TOKEN = "rep-secret";

    const auth = new AuthManager();

    const accessible = makeModel(["replicate"]);
    const inaccessible = makeModel(["wavespeed"]);

    const result = auth.listAvailableModels([accessible, inaccessible]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(accessible);
  });

  it("keys with whitespace are trimmed", () => {
    process.env.FAL_KEY = "  fal-secret  \n";

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("fal-secret");
  });
});

describe("configureAuth", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    resetAuth();
    for (const key of ["FAL_KEY", "REPLICATE_API_TOKEN", "WAVESPEED_API_KEY"]) {
      savedEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    resetAuth();
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it("sets provider keys programmatically", () => {
    configureAuth({ "fal-ai": "my-fal-key", replicate: "my-rep-key" });

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("my-fal-key");
    expect(auth.getKey("replicate")).toBe("my-rep-key");
  });

  it("overrides take priority over env vars", () => {
    process.env.FAL_KEY = "env-key";
    configureAuth({ "fal-ai": "override-key" });

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("override-key");
  });

  it("env vars still work for non-overridden providers", () => {
    process.env.WAVESPEED_API_KEY = "ws-from-env";
    configureAuth({ "fal-ai": "fal-override" });

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("fal-override");
    expect(auth.getKey("wavespeed")).toBe("ws-from-env");
  });

  it("trims whitespace from override keys", () => {
    configureAuth({ "fal-ai": "  spaced-key  " });

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("spaced-key");
  });

  it("ignores empty or undefined values", () => {
    configureAuth({ "fal-ai": "", replicate: undefined as unknown as string });

    const auth = new AuthManager();
    expect(() => auth.getKey("fal-ai")).toThrow(AuthError);
    expect(() => auth.getKey("replicate")).toThrow(AuthError);
  });

  it("resetAuth() clears all overrides", () => {
    configureAuth({ "fal-ai": "my-key" });
    resetAuth();

    const auth = new AuthManager();
    expect(() => auth.getKey("fal-ai")).toThrow(AuthError);
  });
});
