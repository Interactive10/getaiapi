import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { falAiAdapter } from "../../../src/adapters/fal-ai.js";
import { AuthError, RateLimitError } from "../../../src/errors.js";
import type { OutputMapping } from "../../../src/types.js";
import fluxSchnellFixture from "../../fixtures/fal-ai/text-to-image/flux-schnell.json";

const ENDPOINT = "fal-ai/flux/schnell";
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

describe("falAiAdapter", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("submit", () => {
    it("should POST to queue endpoint and return request_id", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { request_id: "req-123" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await falAiAdapter.submit(ENDPOINT, { prompt: "a cat" }, AUTH);

      expect(result).toEqual({ id: "req-123", status: "pending" });
      expect(fetchMock).toHaveBeenCalledOnce();

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`https://queue.fal.run/${ENDPOINT}`);
      expect(init.method).toBe("POST");
      expect(init.headers).toMatchObject({
        Authorization: `Key ${AUTH}`,
        "Content-Type": "application/json",
      });
      expect(JSON.parse(init.body as string)).toEqual({ prompt: "a cat" });
    });
  });

  describe("poll", () => {
    it("should return completed with output when status is COMPLETED", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { status: "COMPLETED" } },
        { status: 200, body: fluxSchnellFixture },
      ]);
      globalThis.fetch = fetchMock;

      const result = await falAiAdapter.poll("req-123", AUTH, ENDPOINT);

      expect(result.id).toBe("req-123");
      expect(result.status).toBe("completed");
      expect(result.output).toEqual(fluxSchnellFixture);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("should return failed with error when status is FAILED", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { status: "FAILED", error: "NSFW content detected" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await falAiAdapter.poll("req-456", AUTH, ENDPOINT);

      expect(result).toEqual({
        id: "req-456",
        status: "failed",
        error: "NSFW content detected",
      });
    });

    it("should return processing when status is IN_QUEUE or IN_PROGRESS", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { status: "IN_PROGRESS" } },
      ]);
      globalThis.fetch = fetchMock;

      const result = await falAiAdapter.poll("req-789", AUTH, ENDPOINT);

      expect(result).toEqual({ id: "req-789", status: "processing" });
      expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("should strip sub-path from polling URLs for endpoints with sub-paths", async () => {
      const subPathEndpoint = "fal-ai/nano-banana-pro/edit";
      const fetchMock = mockFetch([
        { status: 200, body: { status: "COMPLETED" } },
        { status: 200, body: { images: [] } },
      ]);
      globalThis.fetch = fetchMock;

      await falAiAdapter.poll("req-sub", AUTH, subPathEndpoint);

      const [statusUrl] = fetchMock.mock.calls[0] as [string, RequestInit];
      const [resultUrl] = fetchMock.mock.calls[1] as [string, RequestInit];
      // Polling uses base endpoint (owner/alias), not the full path
      expect(statusUrl).toBe("https://queue.fal.run/fal-ai/nano-banana-pro/requests/req-sub/status");
      expect(resultUrl).toBe("https://queue.fal.run/fal-ai/nano-banana-pro/requests/req-sub");
    });

    it("should use base endpoint for polling even with 3-part endpoints like flux/schnell", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: { status: "COMPLETED" } },
        { status: 200, body: fluxSchnellFixture },
      ]);
      globalThis.fetch = fetchMock;

      await falAiAdapter.poll("req-flux", AUTH, ENDPOINT);

      const [statusUrl] = fetchMock.mock.calls[0] as [string, RequestInit];
      // fal-ai/flux/schnell → polls at fal-ai/flux
      expect(statusUrl).toBe("https://queue.fal.run/fal-ai/flux/requests/req-flux/status");
    });
  });

  describe("parseOutput", () => {
    it("should extract image URLs from images[].url path", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "images[].url",
      };

      const items = falAiAdapter.parseOutput(fluxSchnellFixture, mapping);

      expect(items).toEqual([
        {
          type: "image",
          url: "https://fal.media/files/example/flux-schnell-output.png",
          content_type: "image/png",
        },
      ]);
    });

    it("should extract video URL from video.url path", () => {
      const mapping: OutputMapping = {
        type: "video",
        extract_path: "video.url",
      };

      const raw = {
        video: {
          url: "https://fal.media/files/example/output.mp4",
          content_type: "video/mp4",
        },
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "video",
          url: "https://fal.media/files/example/output.mp4",
          content_type: "video/mp4",
        },
      ]);
    });

    it("should extract audio URL from audio.url path", () => {
      const mapping: OutputMapping = {
        type: "audio",
        extract_path: "audio.url",
      };

      const raw = {
        audio: {
          url: "https://fal.media/files/example/output.mp3",
        },
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "audio",
          url: "https://fal.media/files/example/output.mp3",
          content_type: "audio/mpeg",
        },
      ]);
    });

    it("should use default content_type when not present in response", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "images[].url",
      };

      const raw = {
        images: [{ url: "https://example.com/img.jpg" }],
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items[0].content_type).toBe("image/jpeg");
    });

    it("should extract singular image from image.url path", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "image.url",
      };

      const raw = {
        image: {
          url: "https://fal.media/files/example/output.png",
          content_type: "image/png",
        },
        seed: 42,
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "image",
          url: "https://fal.media/files/example/output.png",
          content_type: "image/png",
        },
      ]);
    });

    it("should extract audio from audio_file.url path", () => {
      const mapping: OutputMapping = {
        type: "audio",
        extract_path: "audio_file.url",
      };

      const raw = {
        audio_file: {
          url: "https://fal.media/files/example/output.wav",
          content_type: "audio/wav",
        },
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "audio",
          url: "https://fal.media/files/example/output.wav",
          content_type: "audio/wav",
        },
      ]);
    });

    it("should extract audio from audio_url path (string URL)", () => {
      const mapping: OutputMapping = {
        type: "audio",
        extract_path: "audio_url",
      };

      const raw = {
        audio_url: "https://fal.media/files/example/output.mp3",
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "audio",
          url: "https://fal.media/files/example/output.mp3",
          content_type: "audio/mpeg",
        },
      ]);
    });

    it("should extract audio from audio_url path (object)", () => {
      const mapping: OutputMapping = {
        type: "audio",
        extract_path: "audio_url",
      };

      const raw = {
        audio_url: {
          url: "https://fal.media/files/example/output.wav",
          content_type: "audio/wav",
        },
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "audio",
          url: "https://fal.media/files/example/output.wav",
          content_type: "audio/wav",
        },
      ]);
    });

    it("should extract video from video_url path (string URL)", () => {
      const mapping: OutputMapping = {
        type: "video",
        extract_path: "video_url",
      };

      const raw = {
        video_url: "https://fal.media/files/example/output.mp4",
      };

      const items = falAiAdapter.parseOutput(raw, mapping);

      expect(items).toEqual([
        {
          type: "video",
          url: "https://fal.media/files/example/output.mp4",
          content_type: "video/mp4",
        },
      ]);
    });

    it("should return empty array for image.url when image is missing", () => {
      const mapping: OutputMapping = {
        type: "image",
        extract_path: "image.url",
      };

      const items = falAiAdapter.parseOutput({}, mapping);
      expect(items).toEqual([]);
    });
  });

  describe("HTTP error handling", () => {
    it("should throw AuthError on 401", async () => {
      globalThis.fetch = mockFetch([
        { status: 401, body: { detail: "Invalid API key" } },
      ]);

      await expect(
        falAiAdapter.submit(ENDPOINT, { prompt: "test" }, "bad-key"),
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
        falAiAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(RateLimitError);
    });
  });
});
