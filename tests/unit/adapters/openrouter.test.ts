import { describe, it, expect, vi, afterEach } from "vitest";
import { openRouterAdapter } from "../../../src/adapters/openrouter.js";
import { AuthError, RateLimitError, ProviderError } from "../../../src/errors.js";
import type { OutputMapping } from "../../../src/types.js";
import chatCompletionFixture from "../../fixtures/openrouter/text-generation/chat-completion.json";

const ENDPOINT = "anthropic/claude-sonnet-4-6";
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

describe("openRouterAdapter", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("submit", () => {
    it("should POST to /chat/completions with correct headers", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: chatCompletionFixture },
      ]);
      globalThis.fetch = fetchMock;

      await openRouterAdapter.submit(ENDPOINT, { prompt: "Hello" }, AUTH);

      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe("https://openrouter.ai/api/v1/chat/completions");
      expect(init.method).toBe("POST");
      expect(init.headers).toMatchObject({
        Authorization: `Bearer ${AUTH}`,
        "Content-Type": "application/json",
        "X-Title": "getaiapi",
      });
    });

    it("should format prompt as messages array", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: chatCompletionFixture },
      ]);
      globalThis.fetch = fetchMock;

      await openRouterAdapter.submit(ENDPOINT, { prompt: "What is 2+2?" }, AUTH);

      const body = JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);
      expect(body.model).toBe(ENDPOINT);
      expect(body.messages).toEqual([
        { role: "user", content: "What is 2+2?" },
      ]);
    });

    it("should include system message when provided", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: chatCompletionFixture },
      ]);
      globalThis.fetch = fetchMock;

      await openRouterAdapter.submit(
        ENDPOINT,
        { prompt: "Hello", system: "You are helpful." },
        AUTH,
      );

      const body = JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);
      expect(body.messages).toEqual([
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Hello" },
      ]);
    });

    it("should pass temperature, max_tokens, and top_p", async () => {
      const fetchMock = mockFetch([
        { status: 200, body: chatCompletionFixture },
      ]);
      globalThis.fetch = fetchMock;

      await openRouterAdapter.submit(
        ENDPOINT,
        { prompt: "Hi", temperature: 0.7, max_tokens: 100, top_p: 0.9 },
        AUTH,
      );

      const body = JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);
      expect(body.temperature).toBe(0.7);
      expect(body.max_tokens).toBe(100);
      expect(body.top_p).toBe(0.9);
    });

    it("should return completed status with output", async () => {
      globalThis.fetch = mockFetch([
        { status: 200, body: chatCompletionFixture },
      ]);

      const result = await openRouterAdapter.submit(
        ENDPOINT,
        { prompt: "Hello" },
        AUTH,
      );

      expect(result.id).toBe("gen-abc123");
      expect(result.status).toBe("completed");
      expect(result.output).toEqual(chatCompletionFixture);
    });
  });

  describe("poll", () => {
    it("should return completed (no-op)", async () => {
      const result = await openRouterAdapter.poll("gen-abc123", AUTH);
      expect(result).toEqual({ id: "gen-abc123", status: "completed" });
    });
  });

  describe("parseOutput", () => {
    it("should extract text content from choices", () => {
      const mapping: OutputMapping = {
        type: "text",
        extract_path: "choices[0].message.content",
        content_type: "text/plain",
      };

      const items = openRouterAdapter.parseOutput(chatCompletionFixture, mapping);

      expect(items).toHaveLength(1);
      expect(items[0].type).toBe("text");
      expect(items[0].content).toBe("The capital of France is Paris.");
      expect(items[0].content_type).toBe("text/plain");
      expect(items[0].url).toBeUndefined();
    });

    it("should return empty array when choices is missing", () => {
      const mapping: OutputMapping = {
        type: "text",
        extract_path: "choices[0].message.content",
        content_type: "text/plain",
      };

      const items = openRouterAdapter.parseOutput({}, mapping);
      expect(items).toEqual([]);
    });

    it("should return empty array when choices is empty", () => {
      const mapping: OutputMapping = {
        type: "text",
        extract_path: "choices[0].message.content",
        content_type: "text/plain",
      };

      const items = openRouterAdapter.parseOutput({ choices: [] }, mapping);
      expect(items).toEqual([]);
    });

    it("should default content_type to text/plain", () => {
      const mapping: OutputMapping = {
        type: "text",
        extract_path: "choices[0].message.content",
      };

      const items = openRouterAdapter.parseOutput(chatCompletionFixture, mapping);
      expect(items[0].content_type).toBe("text/plain");
    });
  });

  describe("HTTP error handling", () => {
    it("should throw AuthError on 401", async () => {
      globalThis.fetch = mockFetch([
        { status: 401, body: { error: { message: "Invalid API key" } } },
      ]);

      await expect(
        openRouterAdapter.submit(ENDPOINT, { prompt: "test" }, "bad-key"),
      ).rejects.toThrow(AuthError);
    });

    it("should throw RateLimitError on 429", async () => {
      globalThis.fetch = mockFetch([
        {
          status: 429,
          body: { error: { message: "Rate limited" } },
          headers: { "retry-after": "30" },
        },
      ]);

      await expect(
        openRouterAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(RateLimitError);
    });

    it("should throw ProviderError on other 4xx/5xx", async () => {
      globalThis.fetch = mockFetch([
        { status: 500, body: { error: { message: "Internal server error" } } },
      ]);

      await expect(
        openRouterAdapter.submit(ENDPOINT, { prompt: "test" }, AUTH),
      ).rejects.toThrow(ProviderError);
    });
  });
});
