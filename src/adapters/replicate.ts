import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from "./base.js";
import { AuthError, RateLimitError, ProviderError } from "../errors.js";

const BASE_URL = "https://api.replicate.com/v1";

async function handleHttpErrors(
  response: Response,
  endpoint: string,
): Promise<void> {
  if (response.ok) return;

  const status = response.status;

  if (status === 401) {
    throw new AuthError("replicate", "REPLICATE_API_TOKEN");
  }

  if (status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
    throw new RateLimitError("replicate", retryMs);
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    raw = await response.text().catch(() => null);
  }

  throw new ProviderError("replicate", endpoint, status, raw);
}

function authHeaders(auth: string): Record<string, string> {
  return {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "application/json",
  };
}

function inferContentType(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".png")) return "image/png";
  if (lower.includes(".jpg") || lower.includes(".jpeg")) return "image/jpeg";
  if (lower.includes(".webp")) return "image/webp";
  if (lower.includes(".mp4")) return "video/mp4";
  if (lower.includes(".mp3")) return "audio/mpeg";
  if (lower.includes(".wav")) return "audio/wav";
  return "image/jpeg";
}

export const replicateAdapter: ProviderAdapter = {
  name: "replicate",

  async submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${BASE_URL}/models/${endpoint}/predictions`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(auth),
      body: JSON.stringify({ input: params }),
    });

    await handleHttpErrors(response, endpoint);

    const data = (await response.json()) as { id: string };

    return {
      id: data.id,
      status: "pending",
    };
  },

  async poll(
    taskId: string,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${BASE_URL}/predictions/${taskId}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${auth}` },
    });

    await handleHttpErrors(response, taskId);

    const data = (await response.json()) as {
      id: string;
      status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
      output?: unknown;
      error?: string;
    };

    if (data.status === "succeeded") {
      return {
        id: data.id,
        status: "completed",
        output: data.output,
      };
    }

    if (data.status === "failed" || data.status === "canceled") {
      return {
        id: data.id,
        status: "failed",
        error: data.error ?? `Prediction ${data.status}`,
      };
    }

    // starting or processing
    return {
      id: data.id,
      status: "processing",
    };
  },

  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
    // Replicate output is typically string[] (URLs)
    if (!Array.isArray(raw)) return [];

    return (raw as string[]).map((url) => ({
      type: outputMapping.type,
      url,
      content_type: outputMapping.content_type ?? inferContentType(url),
    }));
  },
};
