import { createHmac, createHash } from "node:crypto";

export interface S3Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}

export interface SignedRequest {
  url: string;
  headers: Record<string, string>;
}

function sha256(data: string | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function hmacSha256(key: string | Buffer, data: string): Buffer {
  return createHmac("sha256", key).update(data).digest();
}

function getSigningKey(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string,
): Buffer {
  const kDate = hmacSha256(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmacSha256(kDate, region);
  const kService = hmacSha256(kRegion, service);
  return hmacSha256(kService, "aws4_request");
}

function toAmzDate(date: Date): { amzDate: string; dateStamp: string } {
  const iso = date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

export function signS3Request(
  method: "PUT" | "DELETE",
  url: string,
  headers: Record<string, string>,
  body: Buffer | null,
  credentials: S3Credentials,
): SignedRequest {
  const region = credentials.region ?? "auto";
  const service = "s3";
  const parsedUrl = new URL(url);
  const now = new Date();
  const { amzDate, dateStamp } = toAmzDate(now);

  const payloadHash = body ? sha256(body) : sha256("");

  const allHeaders: Record<string, string> = {
    ...headers,
    host: parsedUrl.host,
    "x-amz-date": amzDate,
    "x-amz-content-sha256": payloadHash,
  };

  // Build lowercased header map once
  const lcHeaders: Record<string, string> = Object.fromEntries(
    Object.entries(allHeaders).map(([k, v]) => [k.toLowerCase(), v.trim()]),
  );
  const sortedKeys = Object.keys(lcHeaders).sort();
  const canonicalHeaders = sortedKeys
    .map((k) => `${k}:${lcHeaders[k]}`)
    .join("\n") + "\n";
  const signedHeaders = sortedKeys.join(";");

  // Canonical request
  const canonicalRequest = [
    method,
    parsedUrl.pathname,
    parsedUrl.searchParams.toString(),
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  // String to sign
  const scope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256(canonicalRequest),
  ].join("\n");

  // Signing key and signature
  const signingKey = getSigningKey(credentials.secretAccessKey, dateStamp, region, service);
  const signature = createHmac("sha256", signingKey)
    .update(stringToSign)
    .digest("hex");

  const authorization = `AWS4-HMAC-SHA256 Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    url,
    headers: {
      ...allHeaders,
      Authorization: authorization,
    },
  };
}
