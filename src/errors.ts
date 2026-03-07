import type { ProviderName } from "./types.js";

export class GetAIApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GetAIApiError";
  }
}

export class AuthError extends GetAIApiError {
  readonly provider: ProviderName;
  readonly envVar: string;

  constructor(provider: ProviderName, envVar: string) {
    super(`Missing or invalid API key for ${provider}. Set the ${envVar} environment variable.`);
    this.name = "AuthError";
    this.provider = provider;
    this.envVar = envVar;
  }
}

export class ModelNotFoundError extends GetAIApiError {
  readonly query: string;
  readonly suggestions: string[];

  constructor(query: string, suggestions: string[] = []) {
    const hint =
      suggestions.length > 0
        ? ` Did you mean: ${suggestions.join(", ")}?`
        : "";
    super(`Model "${query}" not found.${hint}`);
    this.name = "ModelNotFoundError";
    this.query = query;
    this.suggestions = suggestions;
  }
}

export class ValidationError extends GetAIApiError {
  readonly field: string;

  constructor(field: string, message: string) {
    super(`Validation error on "${field}": ${message}`);
    this.name = "ValidationError";
    this.field = field;
  }
}

export class ProviderError extends GetAIApiError {
  readonly provider: ProviderName;
  readonly model: string;
  readonly statusCode: number;
  readonly raw: unknown;

  constructor(
    provider: ProviderName,
    model: string,
    statusCode: number,
    raw: unknown,
  ) {
    super(
      `Provider ${provider} returned status ${statusCode} for model "${model}".`,
    );
    this.name = "ProviderError";
    this.provider = provider;
    this.model = model;
    this.statusCode = statusCode;
    this.raw = raw;
  }
}

export class TimeoutError extends GetAIApiError {
  readonly provider: ProviderName;
  readonly model: string;
  readonly timeoutMs: number;

  constructor(provider: ProviderName, model: string, timeoutMs: number) {
    super(
      `Generation timed out after ${timeoutMs}ms for model "${model}" on ${provider}.`,
    );
    this.name = "TimeoutError";
    this.provider = provider;
    this.model = model;
    this.timeoutMs = timeoutMs;
  }
}

export class RateLimitError extends GetAIApiError {
  readonly provider: ProviderName;
  readonly retryAfterMs: number;

  constructor(provider: ProviderName, retryAfterMs: number) {
    super(
      `Rate limited by ${provider}. Retry after ${retryAfterMs}ms.`,
    );
    this.name = "RateLimitError";
    this.provider = provider;
    this.retryAfterMs = retryAfterMs;
  }
}

export type StorageOperation = "upload" | "delete" | "config";

export class StorageError extends GetAIApiError {
  readonly operation: StorageOperation;
  readonly statusCode?: number;

  constructor(operation: StorageOperation, message: string, statusCode?: number) {
    super(`Storage ${operation} failed: ${message}`);
    this.name = "StorageError";
    this.operation = operation;
    this.statusCode = statusCode;
  }
}
