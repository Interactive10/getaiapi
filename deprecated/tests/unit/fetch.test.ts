import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { configureFetch, resetFetch, fetchWithTimeout } from "../../src/fetch.js";
import type { FetchLogEntry } from "../../src/types.js";

describe("fetchWithTimeout", () => {
  beforeEach(() => {
    resetFetch();
  });

  afterEach(() => {
    resetFetch();
    vi.restoreAllMocks();
  });

  it("adds AbortSignal.timeout when no signal provided", async () => {
    const mockResponse = new Response("ok", { status: 200 });
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(mockResponse);

    await fetchWithTimeout("https://example.com/test", {
      method: "POST",
      body: "hello",
    });

    expect(spy).toHaveBeenCalledOnce();
    const init = spy.mock.calls[0][1]!;
    expect(init.signal).toBeDefined();
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("respects caller-provided signal", async () => {
    const mockResponse = new Response("ok", { status: 200 });
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(mockResponse);
    const customSignal = AbortSignal.timeout(99999);

    await fetchWithTimeout("https://example.com/test", {
      signal: customSignal,
    });

    const init = spy.mock.calls[0][1]!;
    expect(init.signal).toBe(customSignal);
  });

  it("uses configured timeout", async () => {
    configureFetch({ timeoutMs: 5000 });

    const mockResponse = new Response("ok", { status: 200 });
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(mockResponse);

    await fetchWithTimeout("https://example.com/test");

    const init = spy.mock.calls[0][1]!;
    expect(init.signal).toBeDefined();
  });

  it("throws on fetch timeout", async () => {
    configureFetch({ timeoutMs: 1 });

    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "TimeoutError"));
          });
        }),
    );

    await expect(fetchWithTimeout("https://example.com/slow")).rejects.toThrow(
      "The operation was aborted.",
    );
  });

  it("logs request and response when logging enabled", async () => {
    const entries: FetchLogEntry[] = [];
    configureFetch({
      logging: true,
      logger: (entry) => entries.push(entry),
    });

    const mockResponse = new Response("ok", {
      status: 200,
      headers: { "content-length": "2" },
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(mockResponse);

    await fetchWithTimeout("https://example.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer secret" },
      body: '{"a":1}',
    });

    expect(entries).toHaveLength(2);

    const req = entries[0];
    expect(req.kind).toBe("request");
    expect(req.method).toBe("POST");
    expect(req.url).toBe("https://example.com/api");
    expect(req.bodyBytes).toBe(7);
    expect(req.headers?.Authorization).toBe("[REDACTED]");
    expect(req.headers?.["Content-Type"]).toBe("application/json");

    const res = entries[1];
    expect(res.kind).toBe("response");
    expect(res.status).toBe(200);
    expect(res.durationMs).toBeGreaterThanOrEqual(0);
    expect(res.responseBytes).toBe(2);
  });

  it("logs error when fetch fails and logging enabled", async () => {
    const entries: FetchLogEntry[] = [];
    configureFetch({
      logging: true,
      logger: (entry) => entries.push(entry),
    });

    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("fetch failed"));

    await expect(fetchWithTimeout("https://example.com/fail")).rejects.toThrow("fetch failed");

    const errorEntry = entries.find((e) => e.kind === "error");
    expect(errorEntry).toBeDefined();
    expect(errorEntry!.error).toBe("fetch failed");
    expect(errorEntry!.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("does not log when logging disabled", async () => {
    const entries: FetchLogEntry[] = [];
    configureFetch({
      logging: false,
      logger: (entry) => entries.push(entry),
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));

    await fetchWithTimeout("https://example.com/quiet");

    expect(entries).toHaveLength(0);
  });

  it("resetFetch restores defaults", () => {
    configureFetch({ timeoutMs: 999, logging: true });
    resetFetch();

    const entries: FetchLogEntry[] = [];
    configureFetch({ logger: (entry) => entries.push(entry) });

    // logging should be off after reset
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    fetchWithTimeout("https://example.com/reset");

    expect(entries).toHaveLength(0);
  });
});
