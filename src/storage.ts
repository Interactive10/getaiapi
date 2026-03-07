import { randomUUID } from "node:crypto";
import { signS3Request } from "./s3-signer.js";
import { StorageError } from "./errors.js";
import type { StorageConfig, UploadResult, UploadOptions } from "./types.js";

let storageConfig: StorageConfig | null = null;

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

  return {
    url: buildPublicUrl(config, key),
    key,
    size_bytes: buffer.length,
    content_type: contentType,
  };
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

function isBinaryValue(value: unknown): value is Buffer | Blob | File | ArrayBuffer {
  return (
    Buffer.isBuffer(value) ||
    value instanceof Blob ||
    value instanceof ArrayBuffer
  );
}

export async function processParamsForUpload(
  params: Record<string, unknown>,
  options?: { reupload?: boolean },
): Promise<Record<string, unknown>> {
  const config = getStorageConfig();
  if (!config) return params;

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(params)) {
    if (isBinaryValue(value)) {
      const uploaded = await uploadAsset(value);
      result[key] = uploaded.url;
    } else if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://")) &&
      (options?.reupload || config.autoUpload)
    ) {
      // Re-upload URL content to R2
      const response = await fetch(value);
      if (!response.ok) {
        throw new StorageError("upload", `Failed to fetch URL for re-upload: ${value}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get("content-type") ?? "application/octet-stream";
      const uploaded = await uploadAsset(buffer, { contentType });
      result[key] = uploaded.url;
    } else {
      result[key] = value;
    }
  }

  return result;
}
