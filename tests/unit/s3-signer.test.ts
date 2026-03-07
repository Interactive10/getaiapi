import { describe, it, expect } from "vitest";
import { signS3Request, presignS3Url } from "../../src/s3-signer.js";

const TEST_CREDS = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "auto",
};

describe("signS3Request", () => {
  it("returns signed headers with Authorization for PUT", () => {
    const body = Buffer.from("hello world");
    const result = signS3Request(
      "PUT",
      "https://test-account.r2.cloudflarestorage.com/test-bucket/test-key",
      { "Content-Type": "text/plain", "Content-Length": "11" },
      body,
      TEST_CREDS,
    );

    expect(result.headers.authorization).toMatch(/^AWS4-HMAC-SHA256 Credential=/);
    expect(result.headers.authorization).toContain(TEST_CREDS.accessKeyId);
    expect(result.headers.authorization).toContain("auto/s3/aws4_request");
    expect(result.headers["x-amz-date"]).toMatch(/^\d{8}T\d{6}Z$/);
    expect(result.headers["x-amz-content-sha256"]).toBeTruthy();
    expect(result.headers.host).toBe("test-account.r2.cloudflarestorage.com");
  });

  it("returns signed headers for DELETE with null body", () => {
    const result = signS3Request(
      "DELETE",
      "https://test-account.r2.cloudflarestorage.com/test-bucket/test-key",
      {},
      null,
      TEST_CREDS,
    );

    expect(result.headers.authorization).toMatch(/^AWS4-HMAC-SHA256/);
    expect(result.headers["x-amz-content-sha256"]).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // sha256 of ""
    );
  });

  it("uses region 'auto' by default when not specified", () => {
    const result = signS3Request(
      "PUT",
      "https://test.r2.cloudflarestorage.com/bucket/key",
      { "Content-Type": "application/octet-stream" },
      Buffer.from("data"),
      { accessKeyId: "AK", secretAccessKey: "SK" },
    );

    expect(result.headers.authorization).toContain("auto/s3/aws4_request");
  });

  it("signed headers are sorted and lowercased", () => {
    const result = signS3Request(
      "PUT",
      "https://test.r2.cloudflarestorage.com/bucket/key",
      { "Content-Type": "text/plain", "X-Custom": "value" },
      Buffer.from("test"),
      TEST_CREDS,
    );

    // Extract SignedHeaders from Authorization
    const match = result.headers.authorization.match(/SignedHeaders=([^,]+)/);
    expect(match).toBeTruthy();
    const signedHeaders = match![1].split(";");
    const sorted = [...signedHeaders].sort();
    expect(signedHeaders).toEqual(sorted);
  });

  it("produces consistent signatures for the same input", () => {
    const body = Buffer.from("test data");
    const url = "https://acct.r2.cloudflarestorage.com/bucket/key";
    const headers = { "Content-Type": "application/octet-stream" };

    const result1 = signS3Request("PUT", url, headers, body, TEST_CREDS);
    const result2 = signS3Request("PUT", url, headers, body, TEST_CREDS);

    // Both calls within the same second should produce identical signatures
    expect(result1.headers.Authorization).toBe(result2.headers.Authorization);
  });

  it("preserves the original URL in the result", () => {
    const url = "https://test.r2.cloudflarestorage.com/bucket/my-file.png";
    const result = signS3Request("PUT", url, {}, Buffer.from(""), TEST_CREDS);
    expect(result.url).toBe(url);
  });

  it("returns all header keys lowercased", () => {
    const result = signS3Request(
      "PUT",
      "https://test.r2.cloudflarestorage.com/bucket/key",
      { "Content-Type": "text/plain", "X-Custom-Header": "value" },
      Buffer.from("test"),
      TEST_CREDS,
    );

    for (const key of Object.keys(result.headers)) {
      expect(key).toBe(key.toLowerCase());
    }
  });
});

describe("presignS3Url", () => {
  it("returns a URL with all required SigV4 query params", () => {
    const url = presignS3Url(
      "https://test-account.r2.cloudflarestorage.com/test-bucket/test-key.png",
      TEST_CREDS,
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
    expect(parsed.searchParams.get("X-Amz-Credential")).toContain(TEST_CREDS.accessKeyId);
    expect(parsed.searchParams.get("X-Amz-Credential")).toContain("auto/s3/aws4_request");
    expect(parsed.searchParams.get("X-Amz-Date")).toMatch(/^\d{8}T\d{6}Z$/);
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("3600");
    expect(parsed.searchParams.get("X-Amz-SignedHeaders")).toBe("host");
    expect(parsed.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
  });

  it("uses default expiry of 3600 seconds", () => {
    const url = presignS3Url(
      "https://test.r2.cloudflarestorage.com/bucket/key",
      TEST_CREDS,
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("3600");
  });

  it("uses custom expiry when provided", () => {
    const url = presignS3Url(
      "https://test.r2.cloudflarestorage.com/bucket/key",
      TEST_CREDS,
      { expiresIn: 900 },
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("900");
  });

  it("preserves the correct origin and pathname", () => {
    const url = presignS3Url(
      "https://test-account.r2.cloudflarestorage.com/my-bucket/path/to/file.jpg",
      TEST_CREDS,
    );

    const parsed = new URL(url);
    expect(parsed.origin).toBe("https://test-account.r2.cloudflarestorage.com");
    expect(parsed.pathname).toBe("/my-bucket/path/to/file.jpg");
  });

  it("produces consistent signatures for the same input", () => {
    const testUrl = "https://acct.r2.cloudflarestorage.com/bucket/key";
    const url1 = presignS3Url(testUrl, TEST_CREDS);
    const url2 = presignS3Url(testUrl, TEST_CREDS);

    const sig1 = new URL(url1).searchParams.get("X-Amz-Signature");
    const sig2 = new URL(url2).searchParams.get("X-Amz-Signature");
    expect(sig1).toBe(sig2);
  });

  it("does not include authorization headers in the URL", () => {
    const url = presignS3Url(
      "https://test.r2.cloudflarestorage.com/bucket/key",
      TEST_CREDS,
    );

    expect(url).not.toContain("authorization");
    expect(url).not.toContain("Authorization");
  });
});
