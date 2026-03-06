import { describe, it, expect, vi, afterEach } from "vitest";
import { wavespeedAdapter } from "../../../src/adapters/wavespeed.js";
import { ProviderError } from "../../../src/errors.js";

const ENDPOINT = "test/model";
const AUTH = "test-key";

describe("wavespeedAdapter - extended coverage", () => {
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

      const err = await wavespeedAdapter
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

      const err = await wavespeedAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err).toBeInstanceOf(ProviderError);
      expect(err.raw).toBeNull();
    });
  });

  describe("inferContentType - all branches", () => {
    it("infers image/webp for .webp URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.webp"] },
        { type: "image", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("image/webp");
    });

    it("infers image/gif for .gif URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.gif"] },
        { type: "image", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("image/gif");
    });

    it("infers audio/mpeg for .mp3 URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.mp3"] },
        { type: "audio", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("audio/mpeg");
    });

    it("infers audio/wav for .wav URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.wav"] },
        { type: "audio", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("audio/wav");
    });

    it("returns application/octet-stream for unknown extensions", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.xyz"] },
        { type: "image", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("application/octet-stream");
    });

    it("handles URLs with query params after extension", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.png?token=abc"] },
        { type: "image", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("image/png");
    });

    it("infers image/jpeg for .jpeg URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.jpeg"] },
        { type: "image", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("image/jpeg");
    });

    it("infers video/mp4 for .mp4 URLs", () => {
      const items = wavespeedAdapter.parseOutput(
        { outputs: ["https://example.com/file.mp4"] },
        { type: "video", extract_path: "outputs[]" },
      );
      expect(items[0].content_type).toBe("video/mp4");
    });
  });

  describe("poll - failed without error", () => {
    it("returns 'Unknown error' when error field is missing", async () => {
      globalThis.fetch = vi.fn(async () => ({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: async () => ({ data: { id: "t1", status: "failed" } }),
        text: async () => "",
      })) as unknown as typeof fetch;

      const result = await wavespeedAdapter.poll("t1", AUTH);
      expect(result.error).toBe("Unknown error");
    });
  });

  describe("429 without retry-after header", () => {
    it("defaults to 60000ms retryAfterMs", async () => {
      globalThis.fetch = vi.fn(async () => ({
        ok: false,
        status: 429,
        headers: new Headers(),
        json: async () => ({}),
        text: async () => "",
      })) as unknown as typeof fetch;

      const err = await wavespeedAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err.retryAfterMs).toBe(60000);
    });
  });
});
