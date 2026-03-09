import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from "./base.js";
import { AuthError, RateLimitError, ProviderError } from "../errors.js";

const BASE_URL = "https://openrouter.ai/api/v1";

async function handleHttpErrors(
  response: Response,
  endpoint: string,
): Promise<void> {
  if (response.ok) return;

  const status = response.status;

  if (status === 401) {
    throw new AuthError("openrouter", "OPENROUTER_API_KEY");
  }

  if (status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
    throw new RateLimitError("openrouter", retryMs);
  }

  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    raw = await response.text().catch(() => null);
  }

  throw new ProviderError("openrouter", endpoint, status, raw);
}

function authHeaders(auth: string): Record<string, string> {
  return {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "application/json",
    "X-Title": "getaiapi",
  };
}

export const openRouterAdapter: ProviderAdapter = {
  name: "openrouter",

  async submit(
    endpoint: string,
    params: Record<string, unknown>,
    auth: string,
  ): Promise<ProviderResponse> {
    const { prompt, system, temperature, max_tokens, top_p, ...rest } = params;

    const messages: Array<{ role: string; content: string }> = [];

    if (system && typeof system === "string") {
      messages.push({ role: "system", content: system });
    }

    messages.push({ role: "user", content: (prompt as string) ?? "" });

    const body: Record<string, unknown> = {
      model: endpoint,
      messages,
      ...rest,
    };

    if (temperature !== undefined) body.temperature = temperature;
    if (max_tokens !== undefined) body.max_tokens = max_tokens;
    if (top_p !== undefined) body.top_p = top_p;

    const url = `${BASE_URL}/chat/completions`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(auth),
      body: JSON.stringify(body),
    });

    await handleHttpErrors(response, endpoint);

    const data = await response.json() as {
      id: string;
      choices: Array<{ message: { content: string } }>;
      usage?: {
        total_tokens?: number;
        prompt_tokens?: number;
        completion_tokens?: number;
      };
    };

    return {
      id: data.id,
      status: "completed",
      output: data,
    };
  },

  async poll(
    taskId: string,
  ): Promise<ProviderResponse> {
    // OpenRouter is synchronous — submit() returns the completed result.
    // poll() should never be called, but return completed as a no-op.
    return {
      id: taskId,
      status: "completed",
    };
  },

  parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
    const data = raw as Record<string, unknown>;
    const choices = data.choices as Array<{ message: { content: string } }> | undefined;

    if (!Array.isArray(choices) || choices.length === 0) return [];

    const content = choices[0].message?.content;
    if (typeof content !== "string") return [];

    return [
      {
        type: outputMapping.type,
        content,
        content_type: outputMapping.content_type ?? "text/plain",
      },
    ];
  },
};
