import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  configureStorage,
  uploadAsset,
  deleteAsset,
  resetStorage,
  processParamsForUpload,
  getStorageConfig,
  presignAsset,
} from "../../src/storage.js";
import { StorageError } from "../../src/errors.js";

const TEST_CONFIG = {
  accountId: "test-account",
  bucketName: "test-bucket",
  accessKeyId: "AKTEST",
  secretAccessKey: "SKTEST",
  publicUrlBase: "https://cdn.example.com",
};

describe("configureStorage", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    resetStorage();
    for (const key of [
      "R2_ACCOUNT_ID",
      "R2_BUCKET_NAME",
      "R2_ACCESS_KEY_ID",
      "R2_SECRET_ACCESS_KEY",
      "R2_PUBLIC_URL",
      "R2_STORAGE_MODE",
      "R2_PRESIGN_EXPIRES_IN",
    ]) {
      savedEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    resetStorage();
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    vi.restoreAllMocks();
  });

  it("stores config when provided directly", () => {
    configureStorage(TEST_CONFIG);
    const config = getStorageConfig();
    expect(config).toEqual(TEST_CONFIG);
  });

  it("reads from env vars when no config provided", () => {
    process.env.R2_ACCOUNT_ID = "env-account";
    process.env.R2_BUCKET_NAME = "env-bucket";
    process.env.R2_ACCESS_KEY_ID = "env-ak";
    process.env.R2_SECRET_ACCESS_KEY = "env-sk";
    process.env.R2_PUBLIC_URL = "https://env-cdn.example.com";

    configureStorage();
    const config = getStorageConfig();
    expect(config?.accountId).toBe("env-account");
    expect(config?.publicUrlBase).toBe("https://env-cdn.example.com");
  });

  it("throws StorageError when env vars are missing", () => {
    expect(() => configureStorage()).toThrow(StorageError);
    try {
      configureStorage();
    } catch (err) {
      expect((err as StorageError).operation).toBe("config");
    }
  });
});

describe("uploadAsset", () => {
  beforeEach(() => {
    resetStorage();
    configureStorage(TEST_CONFIG);
  });

  afterEach(() => {
    resetStorage();
    vi.restoreAllMocks();
  });

  it("uploads a Buffer and returns UploadResult with public URL", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(""),
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await uploadAsset(Buffer.from("test data"), {
      contentType: "text/plain",
    });

    expect(result.url).toMatch(/^https:\/\/cdn\.example\.com\//);
    expect(result.size_bytes).toBe(9);
    expect(result.content_type).toBe("text/plain");
    expect(result.key).toBeTruthy();

    // Verify fetch was called with PUT
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toContain("r2.cloudflarestorage.com");
    expect(opts.method).toBe("PUT");
  });

  it("uses custom key when provided", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("data"), { key: "my/custom/key.png" });
    expect(result.key).toBe("my/custom/key.png");
    expect(result.url).toBe("https://cdn.example.com/my/custom/key.png");
  });

  it("uses prefix when provided", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("data"), { prefix: "uploads/" });
    expect(result.key).toMatch(/^uploads\//);
  });

  it("throws StorageError on R2 failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: () => Promise.resolve("Forbidden"),
    }));

    await expect(uploadAsset(Buffer.from("data"))).rejects.toThrow(StorageError);
    try {
      await uploadAsset(Buffer.from("data"));
    } catch (err) {
      expect((err as StorageError).operation).toBe("upload");
      expect((err as StorageError).statusCode).toBe(403);
    }
  });

  it("throws StorageError when storage not configured", async () => {
    resetStorage();
    await expect(uploadAsset(Buffer.from("data"))).rejects.toThrow(StorageError);
  });

  it("uploads an ArrayBuffer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const ab = new ArrayBuffer(4);
    new Uint8Array(ab).set([1, 2, 3, 4]);
    const result = await uploadAsset(ab);
    expect(result.size_bytes).toBe(4);
  });

  it("rejects upload when buffer exceeds maxBytes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    await expect(
      uploadAsset(Buffer.from("a".repeat(100)), { maxBytes: 50 }),
    ).rejects.toThrow(StorageError);
  });

  it("falls back to R2 URL when no publicUrlBase", async () => {
    resetStorage();
    configureStorage({
      ...TEST_CONFIG,
      publicUrlBase: undefined,
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("data"), { key: "test.bin" });
    expect(result.url).toBe(
      "https://test-account.r2.cloudflarestorage.com/test-bucket/test.bin",
    );
  });
});

describe("deleteAsset", () => {
  beforeEach(() => {
    resetStorage();
    configureStorage(TEST_CONFIG);
  });

  afterEach(() => {
    resetStorage();
    vi.restoreAllMocks();
  });

  it("sends DELETE request to R2", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 204 });
    vi.stubGlobal("fetch", mockFetch);

    await deleteAsset("my-key");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toContain("my-key");
    expect(opts.method).toBe("DELETE");
  });

  it("does not throw on 404", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(deleteAsset("missing-key")).resolves.toBeUndefined();
  });

  it("throws StorageError on non-404 failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve("Internal Server Error"),
    }));

    await expect(deleteAsset("key")).rejects.toThrow(StorageError);
  });
});

describe("processParamsForUpload", () => {
  beforeEach(() => {
    resetStorage();
  });

  afterEach(() => {
    resetStorage();
    vi.restoreAllMocks();
  });

  it("returns params unchanged when storage not configured", async () => {
    const params = { prompt: "hello", image_url: "https://example.com/img.png" };
    const result = await processParamsForUpload(params);
    expect(result).toBe(params);
  });

  it("uploads Buffer values and replaces with URLs", async () => {
    configureStorage(TEST_CONFIG);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const params = {
      prompt: "hello",
      image: Buffer.from("fake image data"),
    };

    const result = await processParamsForUpload(params);
    expect(result.prompt).toBe("hello");
    expect(typeof result.image).toBe("string");
    expect(result.image).toMatch(/^https:\/\/cdn\.example\.com\//);
  });

  it("does not re-upload URL strings by default", async () => {
    configureStorage(TEST_CONFIG);
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const params = { image_url: "https://example.com/img.png" };
    const result = await processParamsForUpload(params);
    expect(result.image_url).toBe("https://example.com/img.png");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("re-uploads URL strings when reupload option is true", async () => {
    configureStorage(TEST_CONFIG);

    const mockFetch = vi.fn()
      // First call: fetch the remote URL
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(4)),
        headers: new Headers({ "content-type": "image/png" }),
      })
      // Second call: PUT to R2
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("") });
    vi.stubGlobal("fetch", mockFetch);

    const params = { image_url: "https://example.com/img.png" };
    const result = await processParamsForUpload(params, { reupload: true });
    expect(result.image_url).toMatch(/^https:\/\/cdn\.example\.com\//);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("re-uploads URL strings when autoUpload is enabled globally", async () => {
    configureStorage({ ...TEST_CONFIG, autoUpload: true });

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(4)),
        headers: new Headers({ "content-type": "image/jpeg" }),
      })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("") });
    vi.stubGlobal("fetch", mockFetch);

    const params = { image_url: "https://example.com/photo.jpg" };
    const result = await processParamsForUpload(params);
    expect(result.image_url).toMatch(/^https:\/\/cdn\.example\.com\//);
  });

  it("leaves non-URL string values alone", async () => {
    configureStorage(TEST_CONFIG);
    const params = { prompt: "a cat", seed: 42 };
    const result = await processParamsForUpload(params);
    expect(result).toEqual(params);
  });

  it("recursively uploads Buffer values in nested objects", async () => {
    configureStorage(TEST_CONFIG);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const params = {
      prompt: "hello",
      elements: [
        {
          frontal_image: Buffer.from("face data"),
          reference_images: [Buffer.from("ref1"), Buffer.from("ref2")],
        },
      ],
    };

    const result = await processParamsForUpload(params);
    expect(result.prompt).toBe("hello");
    const elements = result.elements as Record<string, unknown>[];
    expect(typeof elements[0].frontal_image).toBe("string");
    expect((elements[0].frontal_image as string)).toMatch(/^https:\/\/cdn\.example\.com\//);
    const refs = elements[0].reference_images as string[];
    expect(refs).toHaveLength(2);
    expect(refs[0]).toMatch(/^https:\/\/cdn\.example\.com\//);
    expect(refs[1]).toMatch(/^https:\/\/cdn\.example\.com\//);
  });

  it("recursively re-uploads nested URLs when reupload is true", async () => {
    configureStorage(TEST_CONFIG);

    const mockFetch = vi.fn()
      // fetch URL 1 + PUT to R2
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(4)),
        headers: new Headers({ "content-type": "image/png" }),
      })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("") })
      // fetch URL 2 + PUT to R2
      .mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(4)),
        headers: new Headers({ "content-type": "image/png" }),
      })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("") });
    vi.stubGlobal("fetch", mockFetch);

    const params = {
      elements: [
        {
          frontal_image_url: "https://example.com/face.png",
          reference_image_urls: ["https://example.com/ref1.png"],
        },
      ],
    };

    const result = await processParamsForUpload(params, { reupload: true });
    const elements = result.elements as Record<string, unknown>[];
    expect((elements[0].frontal_image_url as string)).toMatch(/^https:\/\/cdn\.example\.com\//);
    const refs = elements[0].reference_image_urls as string[];
    expect(refs[0]).toMatch(/^https:\/\/cdn\.example\.com\//);
    expect(mockFetch).toHaveBeenCalledTimes(4);
  });

  it("uses getaiapi-tmp/ prefix for auto-uploaded assets", async () => {
    configureStorage(TEST_CONFIG);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const params = { image: Buffer.from("data") };
    const result = await processParamsForUpload(params);
    expect((result.image as string)).toMatch(/^https:\/\/cdn\.example\.com\/getaiapi-tmp\//);
  });

  it("rejects re-upload when Content-Length exceeds maxBytes", async () => {
    configureStorage(TEST_CONFIG);

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)),
      headers: new Headers({ "content-length": "100", "content-type": "image/png" }),
    }));

    await expect(
      processParamsForUpload(
        { image_url: "https://example.com/huge.bin" },
        { reupload: true, maxBytes: 50 },
      ),
    ).rejects.toThrow(StorageError);
  });
});

describe("presignAsset", () => {
  beforeEach(() => {
    resetStorage();
  });

  afterEach(() => {
    resetStorage();
  });

  it("returns a presigned URL with SigV4 query params", () => {
    configureStorage(TEST_CONFIG);
    const url = presignAsset("my/file.png");
    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
    expect(parsed.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
    expect(parsed.pathname).toBe("/test-bucket/my/file.png");
  });

  it("uses custom expiresIn", () => {
    configureStorage(TEST_CONFIG);
    const url = presignAsset("key.png", { expiresIn: 600 });
    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("600");
  });

  it("uses presignExpiresIn from config when no override", () => {
    configureStorage({ ...TEST_CONFIG, presignExpiresIn: 1800 });
    const url = presignAsset("key.png");
    const parsed = new URL(url);
    expect(parsed.searchParams.get("X-Amz-Expires")).toBe("1800");
  });

  it("throws StorageError when storage not configured", () => {
    expect(() => presignAsset("key.png")).toThrow(StorageError);
  });
});

describe("uploadAsset with presigned mode", () => {
  beforeEach(() => {
    resetStorage();
  });

  afterEach(() => {
    resetStorage();
    vi.restoreAllMocks();
  });

  it("returns presigned URL when mode is presigned", async () => {
    configureStorage({ ...TEST_CONFIG, mode: "presigned" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("test data"), {
      key: "my/file.png",
      contentType: "image/png",
    });

    const parsed = new URL(result.url);
    expect(parsed.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
    expect(parsed.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
    expect(parsed.pathname).toBe("/test-bucket/my/file.png");
  });

  it("returns public URL when mode is public", async () => {
    configureStorage({ ...TEST_CONFIG, mode: "public" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("test data"), { key: "file.png" });
    expect(result.url).toBe("https://cdn.example.com/file.png");
  });

  it("returns public URL when mode is undefined (default)", async () => {
    configureStorage(TEST_CONFIG);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("") }));

    const result = await uploadAsset(Buffer.from("test data"), { key: "file.png" });
    expect(result.url).toBe("https://cdn.example.com/file.png");
  });
});
