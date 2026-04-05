import type { ProviderName } from '../deprecated/src/types.js'

/** Maps each provider to its required environment variable(s). */
const ENV_MAP: Record<ProviderName, string[]> = {
  'fal-ai': ['FAL_KEY'],
  replicate: ['REPLICATE_API_TOKEN'],
  wavespeed: ['WAVESPEED_API_KEY'],
  openrouter: ['OPENROUTER_API_KEY'],
  kling: ['KLING_ACCESS_KEY', 'KLING_SECRET_KEY'],
}

/** Reads a single env var, trimmed. Returns undefined if missing or empty. */
function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value || undefined
}

/** Returns the API key for a provider from environment variables. */
export function getProviderKey(provider: ProviderName): string | undefined {
  const vars = ENV_MAP[provider]
  if (!vars) return undefined

  if (provider === 'kling') {
    const ak = readEnv('KLING_ACCESS_KEY')
    const sk = readEnv('KLING_SECRET_KEY')
    if (ak && sk) return `${ak}:${sk}`
    return undefined
  }

  return readEnv(vars[0])
}

/** Returns all providers that have valid keys in the environment. */
export function availableProviders(): ProviderName[] {
  return (Object.keys(ENV_MAP) as ProviderName[]).filter(
    (p) => getProviderKey(p) !== undefined
  )
}

/** Returns the env var name(s) expected for a provider (for error messages). */
export function envVarNames(provider: ProviderName): string[] {
  return ENV_MAP[provider] ?? []
}
