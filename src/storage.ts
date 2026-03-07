import { randomUUID } from "node:crypto";
import { signS3Request, presignS3Url } from "./s3-signer.js";
import { StorageError } from "./errors.js";
import type { StorageConfig, UploadResult, UploadOptions } from "./types.js";

const MAX_PRESIGN_EXPIRES = 604800; // 7 days in seconds (S3/R2 limit)

let storageConfig: StorageConfig | null = null;

function parseExpiresIn(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new StorageError("config", `Invalid R2_PRESIGN_EXPIRES_IN: "${value}". Must be a positive integer.`);
  }
  return parsed;
}

export function configureStorage(config?: StorageConfig): void {
  if (config) {
    storageConfig = config;
    return;
  }

  // Fall back to environment variables
  const accountId = process.env.R2_ACCOUNT_ID;
  const bucketName = process.env.R2_BUCKET_NAME;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !bucketName || !accessKeyId || !secretAccessKey) {
    throw new StorageError(
      "config",
      "Missing R2 credentials. Provide a config object or set R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY environment variables.",
    );
  }

  storageConfig = {
    accountId,
    bucketName,
    accessKeyId,
    secretAccessKey,
    publicUrlBase: process.env.R2_PUBLIC_URL,
    autoUpload: false,
    mode: process.env.R2_STORAGE_MODE === 'presigned' ? 'presigned' : undefined,
    presignExpiresIn: parseExpiresIn(process.env.R2_PRESIGN_EXPIRES_IN),
  };
}

export function getStorageConfig(): StorageConfig | null {
  return storageConfig;
}

export function resetStorage(): void {
  storageConfig = null;
}

function getConfig(): StorageConfig {
  if (!storageConfig) {
    throw new StorageError("config", "Storage not configured. Call configureStorage() first.");
  }
  return storageConfig;
}

function buildR2Url(config: StorageConfig, key: string): string {
  return `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}/${key}`;
}

function buildPublicUrl(config: StorageConfig, key: string): string {
  if (config.publicUrlBase) {
    const base = config.publicUrlBase.replace(/\/$/, "");
    return `${base}/${key}`;
  }
  return buildR2Url(config, key);
}

function detectContentType(input: Buffer | Blob | File | ArrayBuffer): string {
  if (input instanceof File) return input.type || "application/octet-stream";
  if (input instanceof Blob) return input.type || "application/octet-stream";
  return "application/octet-stream";
}

async function toBuffer(input: Buffer | Blob | File | ArrayBuffer): Promise<Buffer> {
  if (Buffer.isBuffer(input)) return input;
  if (input instanceof ArrayBuffer) return Buffer.from(input);
  if (input instanceof Blob) return Buffer.from(await input.arrayBuffer());
  return Buffer.from(input as ArrayBuffer);
}

export async function uploadAsset(
  input: Buffer | Blob | File | ArrayBuffer,
  options?: UploadOptions,
): Promise<UploadResult> {
  const config = getConfig();
  const buffer = await toBuffer(input);

  const maxBytes = options?.maxBytes ?? DEFAULT_MAX_BYTES;
  if (buffer.length > maxBytes) {
    throw new StorageError(
      "upload",
      `Asset too large (${buffer.length} bytes, max ${maxBytes})`,
    );
  }

  const contentType = options?.contentType ?? detectContentType(input);
  const prefix = options?.prefix ? `${options.prefix.replace(/\/$/, "")}/` : "";
  const key = options?.key ?? `${prefix}${randomUUID()}`;

  const r2Url = buildR2Url(config, key);

  const signed = signS3Request(
    "PUT",
    r2Url,
    { "Content-Type": contentType, "Content-Length": String(buffer.length) },
    buffer,
    {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  );

  const response = await fetch(signed.url, {
    method: "PUT",
    headers: signed.headers,
    body: new Uint8Array(buffer),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new StorageError("upload", `R2 returned ${response.status}: ${body}`, response.status);
  }

  const url = config.mode === 'presigned'
    ? validatedPresign(config, key)
    : buildPublicUrl(config, key);

  return {
    url,
    key,
    size_bytes: buffer.length,
    content_type: contentType,
  };
}

function validatedPresign(config: StorageConfig, key: string, expiresIn?: number): string {
  const ttl = expiresIn ?? config.presignExpiresIn ?? 3600;
  if (ttl > MAX_PRESIGN_EXPIRES) {
    throw new StorageError(
      "config",
      `Presign expiry ${ttl}s exceeds maximum of ${MAX_PRESIGN_EXPIRES}s (7 days).`,
    );
  }
  return presignS3Url(buildR2Url(config, key), {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }, { expiresIn: ttl });
}

export function presignAsset(
  key: string,
  options?: { expiresIn?: number },
): string {
  const config = getConfig();
  return validatedPresign(config, key, options?.expiresIn);
}

export async function deleteAsset(key: string): Promise<void> {
  const config = getConfig();
  const r2Url = buildR2Url(config, key);

  const signed = signS3Request(
    "DELETE",
    r2Url,
    {},
    null,
    {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  );

  const response = await fetch(signed.url, {
    method: "DELETE",
    headers: signed.headers,
  });

  if (!response.ok && response.status !== 404) {
    const body = await response.text().catch(() => "");
    throw new StorageError("delete", `R2 returned ${response.status}: ${body}`, response.status);
  }
}

const DEFAULT_PREFIX = "getaiapi-tmp";
const DEFAULT_MAX_BYTES = 500 * 1024 * 1024; // 500 MB

function isBinaryValue(value: unknown): value is Buffer | Blob | File | ArrayBuffer {
  return (
    Buffer.isBuffer(value) ||
    value instanceof File ||
    value instanceof Blob ||
    value instanceof ArrayBuffer
  );
}

function isUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  );
}

async function fetchAndReupload(url: string, maxBytes: number): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new StorageError("upload", `Failed to fetch URL for re-upload: ${url}`);
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    throw new StorageError(
      "upload",
      `URL content too large (${contentLength} bytes, max ${maxBytes}): ${url}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > maxBytes) {
    throw new StorageError(
      "upload",
      `URL content too large (${buffer.length} bytes, max ${maxBytes}): ${url}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "application/octet-stream";
  const uploaded = await uploadAsset(buffer, { contentType, prefix: DEFAULT_PREFIX });
  return uploaded.url;
}

async function processValue(
  value: unknown,
  shouldReupload: boolean,
  maxBytes: number,
): Promise<unknown> {
  if (isBinaryValue(value)) {
    const uploaded = await uploadAsset(value, { prefix: DEFAULT_PREFIX });
    return uploaded.url;
  }

  if (isUrl(value) && shouldReupload) {
    return fetchAndReupload(value, maxBytes);
  }

  if (Array.isArray(value)) {
    const results = await Promise.all(
      value.map((item) => processValue(item, shouldReupload, maxBytes)),
    );
    return results;
  }

  if (value !== null && typeof value === "object" && !(value instanceof Date)) {
    return processRecord(
      value as Record<string, unknown>,
      shouldReupload,
      maxBytes,
    );
  }

  return value;
}

async function processRecord(
  obj: Record<string, unknown>,
  shouldReupload: boolean,
  maxBytes: number,
): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = await processValue(value, shouldReupload, maxBytes);
  }
  return result;
}

export async function processParamsForUpload(
  params: Record<string, unknown>,
  options?: { reupload?: boolean; maxBytes?: number },
): Promise<Record<string, unknown>> {
  const config = getStorageConfig();
  if (!config) return params;

  const shouldReupload = options?.reupload || config.autoUpload || false;
  const maxBytes = options?.maxBytes ?? DEFAULT_MAX_BYTES;

  return processRecord(params, shouldReupload, maxBytes);
}
