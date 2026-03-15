import type { ProviderName, ModelEntry } from './types.js'
import { AuthError } from './errors.js'

const ENV_MAP: Record<ProviderName, string> = {
  'fal-ai': 'FAL_KEY',
  replicate: 'REPLICATE_API_TOKEN',
  wavespeed: 'WAVESPEED_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
}

// Module-level overrides set via configureAuth()
const keyOverrides = new Map<string, string>()

export function configureAuth(keys: Partial<Record<ProviderName, string>>): void {
  for (const [provider, key] of Object.entries(keys)) {
    if (key?.trim()) {
      keyOverrides.set(provider, key.trim())
    }
  }
}

export function resetAuth(): void {
  keyOverrides.clear()
}

export class AuthManager {
  private keys: Map<string, string>

  constructor() {
    this.keys = new Map()
    // Overrides take priority over env vars
    for (const [provider, key] of keyOverrides) {
      this.keys.set(provider, key)
    }
    for (const [provider, envVar] of Object.entries(ENV_MAP)) {
      if (!this.keys.has(provider)) {
        const key = process.env[envVar]?.trim()
        if (key) this.keys.set(provider, key)
      }
    }
  }

  availableProviders(): ProviderName[] {
    return [...this.keys.keys()] as ProviderName[]
  }

  getKey(provider: ProviderName): string {
    const key = this.keys.get(provider)
    if (!key) {
      throw new AuthError(provider, ENV_MAP[provider])
    }
    return key
  }

  canAccess(model: ModelEntry): boolean {
    return model.providers.some((p) => this.keys.has(p.provider))
  }

  listAvailableModels(registry: ModelEntry[]): ModelEntry[] {
    return registry.filter((m) => this.canAccess(m))
  }
}
