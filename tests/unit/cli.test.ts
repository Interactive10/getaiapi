import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────
const mockGenerate = vi.fn();
const mockListModels = vi.fn();
const mockDeriveCategory = vi.fn();
const mockResolveModel = vi.fn();

vi.mock("../../src/gateway.js", () => ({
  generate: mockGenerate,
}));

vi.mock("../../src/discovery.js", () => ({
  listModels: mockListModels,
  deriveCategory: mockDeriveCategory,
}));

vi.mock("../../src/registry.js", () => ({
  resolveModel: mockResolveModel,
}));

// ── Helpers ──────────────────────────────────────────────────────────────────

let logSpy: Mock;
let errorSpy: Mock;
let exitCodes: number[];
const originalArgv = process.argv;

beforeEach(() => {
  vi.resetModules();
  mockGenerate.mockReset();
  mockListModels.mockReset();
  mockDeriveCategory.mockReset();
  mockResolveModel.mockReset();
  exitCodes = [];

  logSpy = vi.spyOn(console, "log").mockImplementation(() => {}) as unknown as Mock;
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {}) as unknown as Mock;

  // Mock process.exit to record the code but NOT throw.
  // The CLI code after process.exit() will continue but we verify exit was called.
  vi.spyOn(process, "exit").mockImplementation((code?: number | string | null | undefined) => {
    exitCodes.push(typeof code === "number" ? code : 1);
    return undefined as never;
  });
});

afterEach(() => {
  process.argv = originalArgv;
  vi.restoreAllMocks();
});

/** Import cli.ts with the given argv (dynamic import so main() runs fresh). */
async function runCli(...args: string[]): Promise<void> {
  process.argv = ["node", "getaiapi", ...args];
  await import("../../src/cli.js");
  // Allow the top-level main().catch() promise chain to settle
  await new Promise((r) => setTimeout(r, 50));
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("CLI - main routing", () => {
  it("shows HELP when no args are passed", async () => {
    await runCli();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("getaiapi - Unified AI API Gateway CLI"));
  });

  it("shows HELP with --help flag", async () => {
    await runCli("--help");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("getaiapi - Unified AI API Gateway CLI"));
  });

  it("shows HELP with -h flag", async () => {
    await runCli("-h");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("getaiapi - Unified AI API Gateway CLI"));
  });

  it("exits 1 for unknown command", async () => {
    await runCli("bogus");
    expect(errorSpy).toHaveBeenCalledWith("Unknown command: bogus\n");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("getaiapi - Unified AI API Gateway CLI"));
    expect(exitCodes).toContain(1);
  });
});

// ── generate ─────────────────────────────────────────────────────────────────

describe("CLI - generate command", () => {
  it("shows GENERATE_HELP with --help", async () => {
    await runCli("generate", "--help");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Usage: getaiapi generate"));
  });

  it("errors when --model is missing", async () => {
    await runCli("generate", "--prompt", "hello");
    expect(errorSpy).toHaveBeenCalledWith("Error: --model is required\n");
    expect(exitCodes).toContain(1);
  });

  it("errors when --prompt is missing", async () => {
    await runCli("generate", "--model", "flux-schnell");
    expect(errorSpy).toHaveBeenCalledWith("Error: --prompt is required\n");
    expect(exitCodes).toContain(1);
  });

  it("calls generate with all options and prints result", async () => {
    const fakeResult = { id: "123", status: "completed", outputs: [] };
    mockGenerate.mockResolvedValue(fakeResult);

    await runCli(
      "generate",
      "--model", "flux-schnell",
      "--prompt", "a cat",
      "--seed", "42",
      "--count", "2",
      "--size", "1024x1024",
      "--guidance", "7.5",
      "--steps", "20",
      "--format", "png",
    );

    expect(mockGenerate).toHaveBeenCalledWith({
      model: "flux-schnell",
      prompt: "a cat",
      provider: undefined,
      seed: 42,
      count: 2,
      size: "1024x1024",
      guidance: 7.5,
      steps: 20,
      format: "png",
    });

    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(fakeResult, null, 2));
  });

  it("passes undefined for optional numeric fields when not provided", async () => {
    const fakeResult = { id: "456" };
    mockGenerate.mockResolvedValue(fakeResult);

    await runCli("generate", "--model", "flux-schnell", "--prompt", "a dog");

    expect(mockGenerate).toHaveBeenCalledWith({
      model: "flux-schnell",
      prompt: "a dog",
      provider: undefined,
      seed: undefined,
      count: undefined,
      size: undefined,
      guidance: undefined,
      steps: undefined,
      format: undefined,
    });
  });
});

// ── list ─────────────────────────────────────────────────────────────────────

describe("CLI - list command", () => {
  it("shows LIST_HELP with --help", async () => {
    await runCli("list", "--help");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Usage: getaiapi list"));
  });

  it("prints 'No models found' when listModels returns empty", async () => {
    mockListModels.mockReturnValue([]);

    await runCli("list");

    expect(logSpy).toHaveBeenCalledWith("No models found matching the given filters.");
  });

  it("prints a table when models are returned", async () => {
    mockListModels.mockReturnValue([
      {
        canonical_name: "flux-schnell",
        modality: { inputs: ["text"], outputs: ["image"] },
        providers: [{ provider: "fal-ai" }, { provider: "replicate" }],
      },
    ]);
    mockDeriveCategory.mockReturnValue("text-to-image");

    await runCli("list");

    // Header row
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Name"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Modality"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Providers"));
    // Data row
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("flux-schnell"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("fal-ai, replicate"));
  });

  it("passes input, output, provider, and query filters", async () => {
    mockListModels.mockReturnValue([]);

    await runCli("list", "--input", "text", "--output", "image", "--provider", "fal-ai", "--query", "flux");

    expect(mockListModels).toHaveBeenCalledWith({
      input: "text",
      output: "image",
      provider: "fal-ai",
      query: "flux",
    });
  });

  it("passes undefined for filters when not provided", async () => {
    mockListModels.mockReturnValue([]);

    await runCli("list");

    expect(mockListModels).toHaveBeenCalledWith({
      input: undefined,
      output: undefined,
      provider: undefined,
      query: undefined,
    });
  });
});

// ── info ─────────────────────────────────────────────────────────────────────

describe("CLI - info command", () => {
  it("shows INFO_HELP with --help", async () => {
    await runCli("info", "--help");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Usage: getaiapi info"));
  });

  it("errors when model name is missing", async () => {
    await runCli("info");
    expect(errorSpy).toHaveBeenCalledWith("Error: model name is required\n");
    expect(exitCodes).toContain(1);
  });

  it("prints model details with aliases", async () => {
    mockResolveModel.mockReturnValue({
      canonical_name: "flux-schnell",
      modality: { inputs: ["text"], outputs: ["image"] },
      aliases: ["flux-s", "schnell"],
      providers: [
        {
          provider: "fal-ai",
          skill_id: "fal-flux-schnell",
          endpoint: "fal-ai/flux/schnell",
          auth_env: "FAL_KEY",
        },
        {
          provider: "replicate",
          skill_id: "replicate-flux-schnell",
          endpoint: "black-forest-labs/flux-schnell",
          auth_env: "REPLICATE_API_TOKEN",
        },
      ],
    });
    mockDeriveCategory.mockReturnValue("text-to-image");

    await runCli("info", "flux-schnell");

    expect(mockResolveModel).toHaveBeenCalledWith("flux-schnell");
    expect(logSpy).toHaveBeenCalledWith("Name:       flux-schnell");
    expect(logSpy).toHaveBeenCalledWith("Modality:   text-to-image");
    expect(logSpy).toHaveBeenCalledWith("Inputs:     text");
    expect(logSpy).toHaveBeenCalledWith("Outputs:    image");
    expect(logSpy).toHaveBeenCalledWith("Aliases:    flux-s, schnell");
    expect(logSpy).toHaveBeenCalledWith("Providers:  fal-ai, replicate");
    expect(logSpy).toHaveBeenCalledWith("Provider details:");
    expect(logSpy).toHaveBeenCalledWith("  fal-ai");
    expect(logSpy).toHaveBeenCalledWith("    Skill:    fal-flux-schnell");
    expect(logSpy).toHaveBeenCalledWith("    Endpoint: fal-ai/flux/schnell");
    expect(logSpy).toHaveBeenCalledWith("    Auth env: FAL_KEY");
    expect(logSpy).toHaveBeenCalledWith("  replicate");
    expect(logSpy).toHaveBeenCalledWith("    Skill:    replicate-flux-schnell");
    expect(logSpy).toHaveBeenCalledWith("    Endpoint: black-forest-labs/flux-schnell");
    expect(logSpy).toHaveBeenCalledWith("    Auth env: REPLICATE_API_TOKEN");
  });

  it("prints '(none)' when aliases array is empty", async () => {
    mockResolveModel.mockReturnValue({
      canonical_name: "test-model",
      modality: { inputs: ["text"], outputs: ["image"] },
      aliases: [],
      providers: [
        {
          provider: "fal-ai",
          skill_id: "fal-test",
          endpoint: "fal-ai/test",
          auth_env: "FAL_KEY",
        },
      ],
    });
    mockDeriveCategory.mockReturnValue("text-to-image");

    await runCli("info", "test-model");

    expect(logSpy).toHaveBeenCalledWith("Aliases:    (none)");
  });
});

// ── main().catch() error handler ─────────────────────────────────────────────

describe("CLI - top-level error handler", () => {
  it("catches errors thrown during main and prints them", async () => {
    mockGenerate.mockRejectedValue(new Error("network failure"));

    await runCli("generate", "--model", "x", "--prompt", "y");

    expect(errorSpy).toHaveBeenCalledWith("Error: network failure");
    expect(exitCodes).toContain(1);
  });
});

// ── printTable / padRight edge cases ─────────────────────────────────────────

describe("CLI - printTable edge cases", () => {
  it("handles cell values longer than header (padRight returns str as-is)", async () => {
    mockListModels.mockReturnValue([
      {
        canonical_name: "a-very-long-model-name-that-exceeds-header",
        modality: { inputs: ["text"], outputs: ["image"] },
        providers: [{ provider: "fal-ai" }],
      },
    ]);
    mockDeriveCategory.mockReturnValue("text-to-image");

    await runCli("list");

    // The separator line width should accommodate the longest cell
    const calls = logSpy.mock.calls.map((c: unknown[]) => c[0] as string);
    // Find the separator line (all dashes and spaces)
    const sepLine = calls.find((line: string) => /^[-\s]+$/.test(line));
    expect(sepLine).toBeDefined();
    expect(sepLine!.length).toBeGreaterThanOrEqual("a-very-long-model-name-that-exceeds-header".length);
  });

  it("handles empty providers list (join produces empty string)", async () => {
    mockListModels.mockReturnValue([
      {
        canonical_name: "solo",
        modality: { inputs: ["text"], outputs: ["image"] },
        providers: [],
      },
    ]);
    mockDeriveCategory.mockReturnValue("text-to-image");

    await runCli("list");

    // Should not throw - the ?? "" handles undefined cells
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("solo"));
  });
});
