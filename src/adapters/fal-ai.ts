import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from "./base.js";
import { AuthError, RateLimitError, ProviderError, TimeoutError } from "../errors.js";

const BASE_URL = "https://queue.fal.run";

/**
 * Extract base endpoint (owner/alias) for polling URLs.
 * The fal.ai queue API uses the full path for submit but only
 * owner/alias for status and result requests.
 * e.g. "fal-ai/nano-banana-pro/edit" → "fal-ai/nano-banana-pro"
 */
function getBaseEndpoint(endpoint: string): string {
  const parts = endpoint.split("/");
  if (parts.length <= 2) return endpoint;
  return `${parts[0]}/${parts[1]}`;
}

async function handleHttpErrors(
  response: Response,
  endpoint: string,
): Promise<void> {
  if (response.ok) return;

  const status = response.status;

  if (status === 401) {
    throw new AuthError("fal-ai", "FAL_KEY");
  }

  if (status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
    throw new RateLimitError("fal-ai", retryMs);
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    raw = await response.text().catch(() => null);
  }

  throw new ProviderError("fal-ai", endpoint, status, raw);
}

function authHeaders(auth: string): Record<string, string> {
  return {
    Authorization: `Key ${auth}`,
    "Content-Type": "application/json",
  };
}

export const falAiAdapter: ProviderAdapter = {
  name: "fal-ai",

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

    const data = (await response.json()) as { request_id: string };

    return {
      id: data.request_id,
      status: "pending",
    };
  },

  async poll(
    taskId: string,
    auth: string,
    endpoint?: string,
  ): Promise<ProviderResponse> {
    if (!endpoint) {
      throw new ProviderError("fal-ai", "unknown", 400, "endpoint is required for polling");
    }

    // Check status — use base endpoint (owner/alias) for polling
    const baseEndpoint = getBaseEndpoint(endpoint);
    const statusUrl = `${BASE_URL}/${baseEndpoint}/requests/${taskId}/status`;
    const statusResponse = await fetch(statusUrl, {
      headers: { Authorization: `Key ${auth}` },
    });

    await handleHttpErrors(statusResponse, endpoint);

    const statusData = (await statusResponse.json()) as {
      status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
      error?: string;
    };

    if (statusData.status === "FAILED") {
      return {
        id: taskId,
        status: "failed",
        error: statusData.error ?? "Unknown error",
      };
    }

    if (statusData.status !== "COMPLETED") {
      return {
        id: taskId,
        status: "processing",
      };
    }

    // Fetch result
    const resultUrl = `${BASE_URL}/${baseEndpoint}/requests/${taskId}`;
    const resultResponse = await fetch(resultUrl, {
      headers: { Authorization: `Key ${auth}` },
    });

    await handleHttpErrors(resultResponse, endpoint);

    const output = await resultResponse.json();

    return {
      id: taskId,
      status: "completed",
      output,
    };
  },

  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
    const data = raw as Record<string, unknown>;
    const path = outputMapping.extract_path;

    if (path === "images[].url") {
      const images = data.images as Array<{
        url: string;
        content_type?: string;
      }>;
      if (!Array.isArray(images)) return [];
      return images.map((img) => ({
        type: outputMapping.type,
        url: img.url,
        content_type: img.content_type ?? outputMapping.content_type ?? "image/jpeg",
      }));
    }

    if (path === "image.url") {
      const image = data.image as { url: string; content_type?: string } | undefined;
      if (!image?.url) return [];
      return [
        {
          type: outputMapping.type,
          url: image.url,
          content_type: image.content_type ?? outputMapping.content_type ?? "image/png",
        },
      ];
    }

    if (path === "video.url") {
      const video = data.video as { url: string; content_type?: string } | undefined;
      if (!video?.url) return [];
      return [
        {
          type: outputMapping.type,
          url: video.url,
          content_type: video.content_type ?? outputMapping.content_type ?? "video/mp4",
        },
      ];
    }

    if (path === "audio.url") {
      const audio = data.audio as { url: string; content_type?: string } | undefined;
      if (!audio?.url) return [];
      return [
        {
          type: outputMapping.type,
          url: audio.url,
          content_type: audio.content_type ?? outputMapping.content_type ?? "audio/mpeg",
        },
      ];
    }

    if (path === "audio_file.url") {
      const audioFile = data.audio_file as { url: string; content_type?: string } | undefined;
      if (!audioFile?.url) return [];
      return [
        {
          type: outputMapping.type,
          url: audioFile.url,
          content_type: audioFile.content_type ?? outputMapping.content_type ?? "audio/mpeg",
        },
      ];
    }

    if (path === "audio_url") {
      const audioUrl = data.audio_url as { url: string; content_type?: string } | string | undefined;
      if (!audioUrl) return [];
      const url = typeof audioUrl === "string" ? audioUrl : audioUrl.url;
      if (!url) return [];
      return [
        {
          type: outputMapping.type,
          url,
          content_type: (typeof audioUrl === "object" ? audioUrl.content_type : undefined) ?? outputMapping.content_type ?? "audio/mpeg",
        },
      ];
    }

    if (path === "video_url") {
      const videoUrl = data.video_url as string | undefined;
      if (!videoUrl) return [];
      return [
        {
          type: outputMapping.type,
          url: videoUrl,
          content_type: outputMapping.content_type ?? "video/mp4",
        },
      ];
    }

    return [];
  },
};

/**
 * Submit a request and poll until completion or timeout.
 */
export async function submitAndPoll(
  endpoint: string,
  params: Record<string, unknown>,
  auth: string,
  options?: {
    timeoutMs?: number;
    intervalMs?: number;
    maxIntervalMs?: number;
  },
): Promise<ProviderResponse> {
  const timeoutMs = options?.timeoutMs ?? 300_000;
  const startInterval = options?.intervalMs ?? 1000;
  const maxInterval = options?.maxIntervalMs ?? 5000;

  const submitted = await falAiAdapter.submit(endpoint, params, auth);
  const taskId = submitted.id;

  const start = Date.now();
  let interval = startInterval;

  while (Date.now() - start < timeoutMs) {
    await sleep(interval);

    const result = await falAiAdapter.poll(taskId, auth, endpoint);

    if (result.status === "completed" || result.status === "failed") {
      return result;
    }

    interval = Math.min(interval + 500, maxInterval);
  }

  throw new TimeoutError("fal-ai", endpoint, timeoutMs);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
