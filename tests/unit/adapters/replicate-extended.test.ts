import { describe, it, expect, vi, afterEach } from "vitest";
import { replicateAdapter } from "../../../src/adapters/replicate.js";
import { ProviderError } from "../../../src/errors.js";

const ENDPOINT = "test/model";
const AUTH = "test-key";

describe("replicateAdapter - extended coverage", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("handleHttpErrors - json parse failure fallback", () => {
    it("falls back to text() when json() throws", async () => {
      globalThis.fetch = vi.fn(async () => ({
        ok: false,
        status: 502,
        headers: new Headers(),
        json: async () => { throw new Error("not json"); },
        text: async () => "Bad Gateway",
      })) as unknown as typeof fetch;

      const err = await replicateAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err).toBeInstanceOf(ProviderError);
      expect(err.raw).toBe("Bad Gateway");
    });

    it("falls back to null when both json() and text() throw", async () => {
      globalThis.fetch = vi.fn(async () => ({
        ok: false,
        status: 502,
        headers: new Headers(),
        json: async () => { throw new Error("not json"); },
        text: async () => { throw new Error("no text"); },
      })) as unknown as typeof fetch;

      const err = await replicateAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err).toBeInstanceOf(ProviderError);
      expect(err.raw).toBeNull();
    });
  });

  describe("inferContentType - .wav and .webp", () => {
    it("infers audio/wav for .wav URLs", () => {
      const items = replicateAdapter.parseOutput(
        ["https://example.com/file.wav"],
        { type: "audio", extract_path: "output" },
      );
      expect(items[0].content_type).toBe("audio/wav");
    });

    it("infers image/webp for .webp URLs", () => {
      const items = replicateAdapter.parseOutput(
        ["https://example.com/file.webp"],
        { type: "image", extract_path: "output" },
      );
      expect(items[0].content_type).toBe("image/webp");
    });
  });

  describe("429 without retry-after header", () => {
    it("defaults to 60000ms retryAfterMs", async () => {
      globalThis.fetch = vi.fn(async () => ({
        ok: false,
        status: 429,
        headers: new Headers(), // no retry-after
        json: async () => ({}),
        text: async () => "",
      })) as unknown as typeof fetch;

      const err = await replicateAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err.retryAfterMs).toBe(60000);
    });
  });
});
