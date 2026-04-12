import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { configure } from "../../src/configure.js";
import { AuthManager, resetAuth } from "../../src/auth.js";
import { getStorageConfig, resetStorage } from "../../src/storage.js";

describe("configure", () => {
  beforeEach(() => {
    resetAuth();
    resetStorage();
  });

  afterEach(() => {
    resetAuth();
    resetStorage();
    vi.restoreAllMocks();
  });

  it("sets provider keys and storage in one call", () => {
    configure({
      keys: { "fal-ai": "my-fal-key" },
      storage: {
        accountId: "acct",
        bucketName: "bucket",
        accessKeyId: "ak",
        secretAccessKey: "sk",
      },
    });

    const auth = new AuthManager();
    expect(auth.getKey("fal-ai")).toBe("my-fal-key");
    expect(getStorageConfig()?.accountId).toBe("acct");
  });

  it("sets only keys when storage is omitted", () => {
    configure({ keys: { replicate: "rep-key" } });

    const auth = new AuthManager();
    expect(auth.getKey("replicate")).toBe("rep-key");
    expect(getStorageConfig()).toBeNull();
  });

  it("sets only storage when keys is omitted", () => {
    configure({
      storage: {
        accountId: "acct",
        bucketName: "bucket",
        accessKeyId: "ak",
        secretAccessKey: "sk",
      },
    });

    expect(getStorageConfig()?.bucketName).toBe("bucket");
  });
});
