import type { ProviderName, ModelEntry } from "./types.js";
import { AuthError } from "./errors.js";

const ENV_MAP: Record<ProviderName, string> = {
  "fal-ai": "FAL_KEY",
  replicate: "REPLICATE_API_TOKEN",
  wavespeed: "WAVESPEED_API_KEY",
};

export class AuthManager {
  private keys: Map<string, string>;

  constructor() {
    this.keys = new Map();
    for (const [provider, envVar] of Object.entries(ENV_MAP)) {
      const key = process.env[envVar]?.trim();
      if (key) this.keys.set(provider, key);
    }
  }

  availableProviders(): ProviderName[] {
    return [...this.keys.keys()] as ProviderName[];
  }

  getKey(provider: ProviderName): string {
    const key = this.keys.get(provider);
    if (!key) {
      throw new AuthError(provider, ENV_MAP[provider]);
    }
    return key;
  }

  canAccess(model: ModelEntry): boolean {
    return model.providers.some((p) => this.keys.has(p.provider));
  }

  listAvailableModels(registry: ModelEntry[]): ModelEntry[] {
    return registry.filter((m) => this.canAccess(m));
  }
}
