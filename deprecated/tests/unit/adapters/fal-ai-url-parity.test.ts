/**
 * Verifies our fal-ai adapter builds the exact same URLs as the official
 * @fal-ai/client SDK for every endpoint in the registry.
 *
 * This is a mock test — no API calls are made. It imports the SDK's
 * parseEndpointId and buildUrl functions and compares their output
 * against what our adapter would call.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { falAiAdapter } from "../../../src/adapters/fal-ai.js";

/**
 * Inlined from @fal-ai/client SDK (node_modules/@fal-ai/client/src/utils.js
 * and request.js) since the package doesn't export these internals.
 * This is the ground truth for how fal.ai constructs URLs.
 */
const ENDPOINT_NAMESPACES = ["workflows", "comfy"];

function ensureEndpointIdFormat(id: string): string {
  const parts = id.split("/");
  if (parts.length > 1) return id;
  const match = /^([0-9]+)-([a-zA-Z0-9-]+)$/.exec(id);
  if (match) return `${match[1]}/${match[2]}`;
  throw new Error(`Invalid app id: ${id}`);
}

function parseEndpointId(id: string) {
  const normalizedId = ensureEndpointIdFormat(id);
  const parts = normalizedId.split("/");
  if (ENDPOINT_NAMESPACES.includes(parts[0])) {
    return {
      owner: parts[1],
      alias: parts[2],
      path: parts.slice(3).join("/") || undefined,
      namespace: parts[0],
    };
  }
  return {
    owner: parts[0],
    alias: parts[1],
    path: parts.slice(2).join("/") || undefined,
    namespace: undefined,
  };
}

function buildUrl(id: string, options: { subdomain?: string; path?: string } = {}): string {
  const appId = ensureEndpointIdFormat(id);
  const subdomain = options.subdomain ? `${options.subdomain}.` : "";
  const path = (options.path ?? "").replace(/^\//, "").replace(/\/{2,}/, "/");
  const url = `https://${subdomain}fal.run/${appId}/${path}`;
  return url.replace(/\/$/, "");
}

// ---- helpers ----

interface ProviderEntry {
  provider: string;
  skill_id: string;
  endpoint: string;
  auth_env: string;
  output_map: { type: string; extract_path: string; content_type?: string };
}

interface RegistryEntry {
  canonical_name: string;
  category: string;
  providers: ProviderEntry[];
}

function loadFalEndpoints(): Array<{
  endpoint: string;
  skill_id: string;
  canonical_name: string;
  category: string;
  extract_path: string;
}> {
  const registryPath = resolve(__dirname, "../../../registry/registry.json");
  const registry: RegistryEntry[] = JSON.parse(readFileSync(registryPath, "utf-8"));
  const endpoints: ReturnType<typeof loadFalEndpoints> = [];
  for (const entry of registry) {
    for (const prov of entry.providers) {
      if (prov.provider === "fal-ai") {
        endpoints.push({
          endpoint: prov.endpoint,
          skill_id: prov.skill_id,
          canonical_name: entry.canonical_name,
          category: entry.category,
          extract_path: prov.output_map.extract_path,
        });
      }
    }
  }
  return endpoints;
}

/**
 * Replicate what our adapter does: getBaseEndpoint strips to owner/alias.
 */
function getBaseEndpoint(endpoint: string): string {
  const parts = endpoint.split("/");
  if (parts.length <= 2) return endpoint;
  return `${parts[0]}/${parts[1]}`;
}

/**
 * Build the URLs our adapter would generate.
 */
function adapterUrls(endpoint: string, requestId: string) {
  const base = "https://queue.fal.run";
  const baseEndpoint = getBaseEndpoint(endpoint);
  return {
    submit: `${base}/${endpoint}`,
    status: `${base}/${baseEndpoint}/requests/${requestId}/status`,
    result: `${base}/${baseEndpoint}/requests/${requestId}`,
  };
}

/**
 * Build the URLs the official SDK would generate.
 */
function sdkUrls(endpoint: string, requestId: string) {
  const appId = parseEndpointId(endpoint);
  const prefix = appId.namespace ? `${appId.namespace}/` : "";
  const ownerAlias = `${prefix}${appId.owner}/${appId.alias}`;

  return {
    submit: buildUrl(endpoint, { subdomain: "queue" }),
    status: buildUrl(ownerAlias, {
      subdomain: "queue",
      path: `/requests/${requestId}/status`,
    }),
    result: buildUrl(ownerAlias, {
      subdomain: "queue",
      path: `/requests/${requestId}`,
    }),
  };
}

// ---- tests ----

const falEndpoints = loadFalEndpoints();

describe("fal-ai adapter URL parity with official SDK", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe("URL construction matches SDK for all registry endpoints", () => {
    for (const ep of falEndpoints) {
      it(`${ep.skill_id} (${ep.endpoint})`, () => {
        const requestId = "test-req-123";
        const ours = adapterUrls(ep.endpoint, requestId);
        const sdk = sdkUrls(ep.endpoint, requestId);

        expect(ours.submit).toBe(sdk.submit);
        expect(ours.status).toBe(sdk.status);
        expect(ours.result).toBe(sdk.result);
      });
    }
  });

  describe("submit sends POST to correct URL for sub-path endpoints", () => {
    const subPathEndpoints = falEndpoints.filter((e) => e.endpoint.split("/").length > 2);

    // Test a sample of sub-path endpoints via mock fetch
    const sample = subPathEndpoints.slice(0, 20);
    for (const ep of sample) {
      it(`submit ${ep.endpoint}`, async () => {
        const fetchMock = vi.fn(async () => ({
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({ request_id: "req-mock" }),
          text: async () => '{"request_id":"req-mock"}',
        })) as unknown as typeof fetch;
        globalThis.fetch = fetchMock;

        await falAiAdapter.submit(ep.endpoint, { prompt: "test" }, "fake-key");

        const [calledUrl, init] = (fetchMock as any).mock.calls[0] as [string, RequestInit];
        const expectedUrl = sdkUrls(ep.endpoint, "").submit;
        expect(calledUrl).toBe(expectedUrl);
        expect(init.method).toBe("POST");
      });
    }
  });

  describe("poll uses stripped base endpoint for status/result", () => {
    const subPathEndpoints = falEndpoints.filter((e) => e.endpoint.split("/").length > 2);

    const sample = subPathEndpoints.slice(0, 20);
    for (const ep of sample) {
      it(`poll ${ep.endpoint}`, async () => {
        const fetchMock = vi.fn(async () => ({
          ok: true,
          status: 200,
          headers: new Headers(),
          json: async () => ({ status: "COMPLETED" }),
          text: async () => '{"status":"COMPLETED"}',
        })) as unknown as typeof fetch;
        globalThis.fetch = fetchMock;

        await falAiAdapter.poll("req-test", "fake-key", ep.endpoint);

        const [statusUrl] = (fetchMock as any).mock.calls[0] as [string];
        const [resultUrl] = (fetchMock as any).mock.calls[1] as [string];

        const expected = sdkUrls(ep.endpoint, "req-test");
        expect(statusUrl).toBe(expected.status);
        expect(resultUrl).toBe(expected.result);
      });
    }
  });
});
