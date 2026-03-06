import { describe, it, expect, vi, afterEach } from "vitest";
import { wavespeedAdapter } from "../../../src/adapters/wavespeed.js";
import { AuthError, RateLimitError, ProviderError } from "../../../src/errors.js";
import type { OutputMapping } from "../../../src/types.js";
import zImageTurboFixture from "../../fixtures/wavespeed/text-to-image/z-image-turbo.json";

const ENDPOINT = "wavespeed-ai/z-image/turbo";
const AUTH = "test-api-key";

function mockFetch(
  responses: Array<{
    status: number;
    body: unknown;
    headers?: Record<string, string>;
  }>,
) {
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

describe("wavespeedAdapter", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("submit", () => {
    it("should POST params directly (not wrapped in input)", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { data: { id: "task-123", status: "created" } } },
      ]);
      globalThis.fetch = fetchMock;

      await wavespeedAdapter.submit(ENDPOINT, { prompt: "a cat" }, AUTH);

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`https://api.wavespeed.ai/api/v3/${ENDPOINT}`);
      expect(init.method).toBe("POST");
      expect(init.headers).toMatchObject({
        Authorization: `Bearer ${AUTH}`,
        "Content-Type": "application/json",
      });

      const body = JSON.parse(init.body as string);
      expect(body).toEqual({ prompt: "a cat" });
      expect(body.input).toBeUndefined();
    });

    it("should extract id from data.id", async () => {
      globalThis.fetch = mockFetch([
        { status: 200, body: { data: { id: "task-456", status: "created" } } },
      ]);

      const result = await wavespeedAdapter.submit(
        ENDPOINT,
        { prompt: "a dog" },
        AUTH,
      );

      expect(result).toEqual({ id: "task-456", status: "pending" });
    });
  });

  describe("poll", () => {
    it("should return completed with output on completed status", async () => {
      globalThis.fetch = mockFetch([
        { status: 200, body: zImageTurboFixture },
      ]);

      const result = await wavespeedAdapter.poll("task-xyz", AUTH);

      expect(result.id).toBe("task-xyz");
      expect(result.status).toBe("completed");
      expect(result.output).toEqual(zImageTurboFixture.data);
    });

    it("should return processing on created/processing status", async () => {
      globalThis.fetch = mockFetch([
        {
          status: 200,
          body: { data: { id: "task-abc", status: "processing" } },
        },
      ]);

      const result = await wavespeedAdapter.poll("task-abc", AUTH);

      expect(result).toEqual({ id: "task-abc", status: "processing" });
    });

    it("should return processing on created status", async () => {
      globalThis.fetch = mockFetch([
        {
          status: 200,
          body: { data: { id: "task-new", status: "created" } },
        },
      ]);

      const result = await wavespeedAdapter.poll("task-new", AUTH);

      expect(result).toEqual({ id: "task-new", status: "processing" });
    });

    it("should return failed on failed status", async () => {
      globalThis.fetch = mockFetch([
        {
          status: 200,
          body: {
            data: {
              id: "task-fail",
              status: "failed",
              error: "NSFW content detected",
            },
          },
        },
      ]);

      const result = await wavespeedAdapter.poll("task-fail", AUTH);

      expect(result).toEqual({
        id: "task-fail",
        status: "failed",
        error: "NSFW content detected",
      });
    });
  });

  describe("parseOutput", () => {
    it("should extract URLs from outputs array", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "outputs[]",
      };

      const items = wavespeedAdapter.parseOutput(zImageTurboFixture.data, mapping);

      expect(items).toHaveLength(1);
      expect(items[0].url).toBe(
        "https://cdn.wavespeed.ai/outputs/example/z-image-output.png",
      );
      expect(items[0].type).toBe("image");
    });

    it("should infer content_type from URL extension", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "outputs[]",
      };

      const raw = {
        outputs: [
          "https://cdn.wavespeed.ai/outputs/example/image.png",
          "https://cdn.wavespeed.ai/outputs/example/photo.jpg",
          "https://cdn.wavespeed.ai/outputs/example/video.mp4",
        ],
      };

      const items = wavespeedAdapter.parseOutput(raw, mapping);

      expect(items[0].content_type).toBe("image/png");
      expect(items[1].content_type).toBe("image/jpeg");
      expect(items[2].content_type).toBe("video/mp4");
    });

    it("should use outputMapping content_type when provided", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "outputs[]",
        content_type: "image/webp",
      };

      const raw = {
        outputs: ["https://cdn.wavespeed.ai/outputs/example/image.png"],
      };

      const items = wavespeedAdapter.parseOutput(raw, mapping);

      expect(items[0].content_type).toBe("image/webp");
    });

    it("should return empty array when outputs is missing", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "outputs[]",
      };

      const items = wavespeedAdapter.parseOutput({}, mapping);

      expect(items).toEqual([]);
    });
  });

  describe("HTTP error handling", () => {
    it("should throw AuthError on 401", async () => {
      globalThis.fetch = mockFetch([
        { status: 401, body: { detail: "Invalid API key" } },
      ]);

      await expect(
        wavespeedAdapter.submit(ENDPOINT, { prompt: "test" }, "bad-key"),
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

      await expect(
        wavespeedAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(RateLimitError);
    });

    it("should throw ProviderError on other 4xx/5xx", async () => {
      globalThis.fetch = mockFetch([
        { status: 500, body: { detail: "Internal server error" } },
      ]);

      await expect(
        wavespeedAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(ProviderError);
    });
  });
});
