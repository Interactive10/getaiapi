import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from "./base.js";
import { AuthError, RateLimitError, ProviderError } from "../errors.js";

const BASE_URL = "https://api.wavespeed.ai/api/v3";

async function handleHttpErrors(
  response: Response,
  endpoint: string,
): Promise<void> {
  if (response.ok) return;

  const status = response.status;

  if (status === 401) {
    throw new AuthError("wavespeed", "WAVESPEED_API_KEY");
  }

  if (status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
    throw new RateLimitError("wavespeed", retryMs);
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    raw = await response.text().catch(() => null);
  }

  throw new ProviderError("wavespeed", endpoint, status, raw);
}

function authHeaders(auth: string): Record<string, string> {
  return {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "application/json",
  };
}

function inferContentType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase()?.split("?")[0];
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "mp4":
      return "video/mp4";
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    default:
      return "application/octet-stream";
  }
}

export const wavespeedAdapter: ProviderAdapter = {
  name: "wavespeed",

  async submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(auth),
      body: JSON.stringify(params),
    });

    await handleHttpErrors(response, endpoint);

    const json = (await response.json()) as {
      data: { id: string; status: string };
    };

    return {
      id: json.data.id,
      status: "pending",
    };
  },

  async poll(
    taskId: string,
    auth: string,
  ): Promise<ProviderResponse> {
    const url = `${BASE_URL}/predictions/${taskId}/result`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${auth}` },
    });

    await handleHttpErrors(response, `predictions/${taskId}/result`);

    const json = (await response.json()) as {
      data: {
        id: string;
        status: string;
        outputs?: string[];
        error?: string;
      };
    };

    const { data } = json;

    if (data.status === "failed") {
      return {
        id: taskId,
        status: "failed",
        error: data.error ?? "Unknown error",
      };
    }

    if (data.status === "completed") {
      return {
        id: taskId,
        status: "completed",
        output: data,
      };
    }

    // created or processing
    return {
      id: taskId,
      status: "processing",
    };
  },

  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
    const data = raw as Record<string, unknown>;
    const outputs = data.outputs as string[] | undefined;

    if (!Array.isArray(outputs)) return [];

    return outputs.map((url) => ({
      type: outputMapping.type,
      url,
      content_type: outputMapping.content_type ?? inferContentType(url),
    }));
  },
};
