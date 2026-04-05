import { describe, it, expect, vi, afterEach } from "vitest";
import { replicateAdapter } from "../../../src/adapters/replicate.js";
import { AuthError, RateLimitError, ProviderError } from "../../../src/errors.js";
import type { OutputMapping } from "../../../src/types.js";
import fluxSchnellFixture from "../../fixtures/replicate/text-to-image/flux-schnell.json";

const ENDPOINT = "black-forest-labs/flux-schnell";
const AUTH = "test-api-key";

function mockFetch(responses: Array<{ status: number; body: unknown; headers?: Record<string, string> }>) {
  let callIndex = 0;
  return vi.fn(async () => {
    const resp = responses[callIndex++] ?? responses[responses.length - 1];
    return {
      ok: resp.status >= 200 && resp.status < 300,
      status: resp.status,
      headers: new Headers(resp.headers ?? {}),
      json: async () => resp.body,
      text: async () => JSON.stringify(resp.body),
    } as unknown as Response;
  });
}

describe("replicateAdapter", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("submit", () => {
    it("should POST to predictions endpoint with input wrapper", async () => {
      const fetchMock = mockFetch([
        { status: 201, body: { id: "pred-123" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.submit(ENDPOINT, { prompt: "a cat" }, AUTH);

      expect(result).toEqual({ id: "pred-123", status: "pending" });
      expect(fetchMock).toHaveBeenCalledOnce();

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`https://api.replicate.com/v1/models/${ENDPOINT}/predictions`);
      expect(init.method).toBe("POST");
      expect(init.headers).toMatchObject({
        Authorization: `Bearer ${AUTH}`,
        "Content-Type": "application/json",
      });
      expect(JSON.parse(init.body as string)).toEqual({ input: { prompt: "a cat" } });
    });
  });

  describe("poll", () => {
    it("should return completed with output on succeeded status", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: fluxSchnellFixture },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.poll("abc123", AUTH);

      expect(result.id).toBe("abc123");
      expect(result.status).toBe("completed");
      expect(result.output).toEqual(fluxSchnellFixture.output);
      expect(fetchMock).toHaveBeenCalledOnce();

      const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe("https://api.replicate.com/v1/predictions/abc123");
    });

    it("should return failed on failed status", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { id: "pred-456", status: "failed", error: "NSFW content" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.poll("pred-456", AUTH);

      expect(result).toEqual({
        id: "pred-456",
        status: "failed",
        error: "NSFW content",
      });
    });

    it("should return failed on canceled status", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { id: "pred-789", status: "canceled" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.poll("pred-789", AUTH);

      expect(result).toEqual({
        id: "pred-789",
        status: "failed",
        error: "Prediction canceled",
      });
    });

    it("should return processing on starting status", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { id: "pred-101", status: "starting" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.poll("pred-101", AUTH);

      expect(result).toEqual({ id: "pred-101", status: "processing" });
    });

    it("should return processing on processing status", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { id: "pred-102", status: "processing" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await replicateAdapter.poll("pred-102", AUTH);

      expect(result).toEqual({ id: "pred-102", status: "processing" });
    });
  });

  describe("parseOutput", () => {
    it("should map URLs to OutputItems", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "output",
      };

      const items = replicateAdapter.parseOutput(
        ["https://replicate.delivery/example/output1.png", "https://replicate.delivery/example/output2.png"],
        mapping,
      );

      expect(items).toHaveLength(2);
      expect(items[0]).toEqual({
        type: "image",
        url: "https://replicate.delivery/example/output1.png",
        content_type: "image/png",
      });
      expect(items[1]).toEqual({
        type: "image",
        url: "https://replicate.delivery/example/output2.png",
        content_type: "image/png",
      });
    });

    it("should infer content_type from URL extension", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "output",
      };

      const pngItems = replicateAdapter.parseOutput(
        ["https://example.com/file.png"],
        mapping,
      );
      expect(pngItems[0].content_type).toBe("image/png");

      const jpgItems = replicateAdapter.parseOutput(
        ["https://example.com/file.jpg"],
        mapping,
      );
      expect(jpgItems[0].content_type).toBe("image/jpeg");

      const mp4Items = replicateAdapter.parseOutput(
        ["https://example.com/file.mp4"],
        { type: "video", extract_path: "output" },
      );
      expect(mp4Items[0].content_type).toBe("video/mp4");

      const mp3Items = replicateAdapter.parseOutput(
        ["https://example.com/file.mp3"],
        { type: "audio", extract_path: "output" },
      );
      expect(mp3Items[0].content_type).toBe("audio/mpeg");

      // Default fallback
      const defaultItems = replicateAdapter.parseOutput(
        ["https://example.com/file"],
        mapping,
      );
      expect(defaultItems[0].content_type).toBe("image/jpeg");
    });

    it("should use outputMapping content_type when provided", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "output",
        content_type: "image/webp",
      };

      const items = replicateAdapter.parseOutput(
        ["https://example.com/file.png"],
        mapping,
      );
      expect(items[0].content_type).toBe("image/webp");
    });

    it("should return empty array for non-array input", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "output",
      };

      expect(replicateAdapter.parseOutput(null, mapping)).toEqual([]);
      expect(replicateAdapter.parseOutput("string", mapping)).toEqual([]);
      expect(replicateAdapter.parseOutput({}, mapping)).toEqual([]);
    });
  });

  describe("HTTP error handling", () => {
    it("should throw AuthError on 401", async () => {
      globalThis.fetch = mockFetch([
        { status: 401, body: { detail: "Invalid API key" } },
      ]);

      await expect(
        replicateAdapter.submit(ENDPOINT, { prompt: "test" }, "bad-key"),
      ).rejects.toThrow(AuthError);
    });

    it("should throw RateLimitError on 429", async () => {
      globalThis.fetch = mockFetch([
        {
          status: 429,
          body: { detail: "Rate limited" },
          headers: { "retry-after": "30" },
        },
      ]);

      const err = await replicateAdapter
        .submit(ENDPOINT, { prompt: "test" }, AUTH)
        .catch((e) => e);

      expect(err).toBeInstanceOf(RateLimitError);
      expect(err.retryAfterMs).toBe(30000);
    });

    it("should throw ProviderError on other HTTP errors", async () => {
      globalThis.fetch = mockFetch([
        { status: 500, body: { detail: "Internal server error" } },
      ]);

      await expect(
        replicateAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(ProviderError);
    });
  });
});
