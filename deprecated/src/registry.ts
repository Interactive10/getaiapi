import registryData from '../registry/registry.json' with { type: 'json' }
import type { ModelEntry, ProviderName } from './types.js'

let registryCache: ModelEntry[] | null = null

/**
 * Returns the registry data.
 * JSON is bundled at build time — no filesystem access needed.
 * Works in Node.js, edge runtimes, serverless, and browsers.
 */
export function loadRegistry(): ModelEntry[] {
  if (registryCache) return registryCache
  registryCache = registryData as ModelEntry[]
  return registryCache
}

/**
 * Normalizes a model name for fuzzy matching.
 */
export function normalizeModelName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/(?<=\d)v(?=\d)/g, '')
    .replace(/v(?=\d)/g, '')
}

/**
 * Resolves a user's model name query to a matching ModelEntry.
 *
 * Resolution order:
 * 1. Exact canonical match
 * 2. Exact alias match
 * 3. Normalized canonical match
 * 4. Normalized alias match
 * 5. No match -> throw with suggestions
 */
export function resolveModel(
  query: string,
  availableProviders?: ProviderName[],
): ModelEntry {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    throw new Error('Model name is required')
  }

  const trimmedQuery = query.trim()
  const registry = loadRegistry()

  let matched: ModelEntry | undefined

  matched = registry.find(e => e.canonical_name === trimmedQuery)

  if (!matched) {
    matched = registry.find(e => e.aliases.some(a => a === trimmedQuery))
  }

  if (!matched) {
    const normalizedQuery = normalizeModelName(trimmedQuery)
    matched = registry.find(
      e => normalizeModelName(e.canonical_name) === normalizedQuery,
    )

    if (!matched) {
      matched = registry.find(e =>
        e.aliases.some(a => normalizeModelName(a) === normalizedQuery),
      )
    }
  }

  if (!matched) {
    const suggestions = findSuggestions(trimmedQuery, registry)
    throw new Error(
      `Model "${trimmedQuery}" not found.${suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : ''}`,
    )
  }

  if (availableProviders && availableProviders.length > 0) {
    const filteredProviders = matched.providers.filter(p =>
      availableProviders.includes(p.provider),
    )

    if (filteredProviders.length === 0) {
      throw new Error(
        `No available provider for "${matched.canonical_name}". Model supports: ${matched.providers.map(p => p.provider).join(', ')}`,
      )
    }

    return { ...matched, providers: filteredProviders }
  }

  return matched
}

function findSuggestions(query: string, registry: ModelEntry[]): string[] {
  const normalizedQuery = normalizeModelName(query)
  if (normalizedQuery === '') return []

  const matches = registry.filter(e => {
    const normalizedCanonical = normalizeModelName(e.canonical_name)
    if (
      normalizedCanonical.startsWith(normalizedQuery) ||
      normalizedCanonical.includes(normalizedQuery) ||
      normalizedQuery.startsWith(normalizedCanonical)
    ) {
      return true
    }
    const minLen = Math.min(normalizedQuery.length, normalizedCanonical.length)
    let shared = 0
    for (let i = 0; i < minLen; i++) {
      if (normalizedQuery[i] === normalizedCanonical[i]) shared++
      else break
    }
    return shared >= 3 && shared >= normalizedQuery.length * 0.3
  })

  return matches
    .sort((a, b) => a.canonical_name.length - b.canonical_name.length)
    .slice(0, 5)
    .map(e => e.canonical_name)
}

/**
 * Clears the registry cache. Useful for testing.
 */
export function clearRegistryCache(): void {
  registryCache = null
}
