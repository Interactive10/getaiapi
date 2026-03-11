import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ModelEntry, ProviderName } from "./types.js";
import { ModelNotFoundError, NoProviderError } from "./errors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let registryCache: ModelEntry[] | null = null;

/**
 * Reads and parses registry/registry.json.
 * Caches the result so the file is only loaded once.
 */
export function loadRegistry(): ModelEntry[] {
  if (registryCache) {
    return registryCache;
  }

  // Try resolving from project root (works both from src/ and dist/)
  // Walk up from current file to find the registry directory
  let dir = __dirname;
  for (let i = 0; i < 5; i++) {
    const candidate = resolve(dir, "registry", "registry.json");
    try {
      const raw = readFileSync(candidate, "utf-8");
      registryCache = JSON.parse(raw) as ModelEntry[];
      return registryCache;
    } catch {
      dir = dirname(dir);
    }
  }

  throw new Error(
    "Could not find registry/registry.json. Searched upward from: " + __dirname,
  );
}

/**
 * Normalizes a model name for fuzzy matching.
 * - Lowercase
 * - Strip all non-alphanumeric characters
 * - Strip leading 'v' from version numbers (e.g., "v4.5" -> "45")
 */
export function normalizeModelName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/(?<=\d)v(?=\d)/g, "")  // v between digits (unlikely but safe)
    .replace(/v(?=\d)/g, "");         // v before digits
}

/**
 * Resolves a user's model name query to a matching ModelEntry.
 *
 * Resolution order:
 * 1. Exact canonical match
 * 2. Exact alias match
 * 3. Normalized canonical match
 * 4. Normalized alias match
 * 5. No match -> throw ModelNotFoundError with suggestions
 */
export function resolveModel(
  query: string,
  availableProviders?: ProviderName[],
): ModelEntry {
  if (!query || typeof query !== "string" || query.trim() === "") {
    throw new ModelNotFoundError("Model name is required");
  }

  const trimmedQuery = query.trim();
  const registry = loadRegistry();

  let matched: ModelEntry | undefined;

  // 1. Exact canonical match
  matched = registry.find((e) => e.canonical_name === trimmedQuery);

  // 2. Exact alias match
  if (!matched) {
    matched = registry.find((e) =>
      e.aliases.some((a) => a === trimmedQuery),
    );
  }

  // 3. Normalized canonical match
  if (!matched) {
    const normalizedQuery = normalizeModelName(trimmedQuery);
    matched = registry.find(
      (e) => normalizeModelName(e.canonical_name) === normalizedQuery,
    );

    // 4. Normalized alias match
    if (!matched) {
      matched = registry.find((e) =>
        e.aliases.some((a) => normalizeModelName(a) === normalizedQuery),
      );
    }
  }

  if (!matched) {
    const suggestions = findSuggestions(trimmedQuery, registry);
    throw new ModelNotFoundError(trimmedQuery, suggestions);
  }

  // Apply provider filtering after matching
  if (availableProviders && availableProviders.length > 0) {
    const filteredProviders = matched.providers.filter((p) =>
      availableProviders.includes(p.provider),
    );

    if (filteredProviders.length === 0) {
      throw new NoProviderError(
        trimmedQuery,
        matched.canonical_name,
        matched.providers.map((p) => p.provider),
        availableProviders,
      );
    }

    return { ...matched, providers: filteredProviders };
  }

  return matched;
}

/**
 * Find up to 5 suggestions for a failed query.
 * Uses prefix and substring matching on normalized names.
 * Sorted by canonical_name length (shorter = more likely intended).
 */
function findSuggestions(
  query: string,
  registry: ModelEntry[],
): string[] {
  const normalizedQuery = normalizeModelName(query);

  if (normalizedQuery === "") {
    return [];
  }

  const matches = registry.filter((e) => {
    const normalizedCanonical = normalizeModelName(e.canonical_name);
    // Check if either is a prefix/substring of the other
    if (
      normalizedCanonical.startsWith(normalizedQuery) ||
      normalizedCanonical.includes(normalizedQuery) ||
      normalizedQuery.startsWith(normalizedCanonical)
    ) {
      return true;
    }
    // Check for a meaningful shared prefix (at least 3 chars)
    const minLen = Math.min(normalizedQuery.length, normalizedCanonical.length);
    let shared = 0;
    for (let i = 0; i < minLen; i++) {
      if (normalizedQuery[i] === normalizedCanonical[i]) {
        shared++;
      } else {
        break;
      }
    }
    return shared >= 3 && shared >= normalizedQuery.length * 0.3;
  });

  return matches
    .sort((a, b) => a.canonical_name.length - b.canonical_name.length)
    .slice(0, 5)
    .map((e) => e.canonical_name);
}

/**
 * Clears the registry cache. Useful for testing.
 */
export function clearRegistryCache(): void {
  registryCache = null;
}
