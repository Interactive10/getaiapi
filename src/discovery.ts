import type { ModelEntry, ModelCategory, ProviderName } from "./types.js";
import { loadRegistry } from "./resolver.js";
import { resolveModel } from "./resolver.js";
import { AuthManager } from "./auth.js";

export interface ListModelsFilters {
  category?: ModelCategory;
  provider?: ProviderName;
  query?: string; // search canonical name and aliases
}

/**
 * Lists all models the caller can access (has API keys for).
 * Optionally filters by category, provider, or text query.
 */
export function listModels(filters?: ListModelsFilters): ModelEntry[] {
  const auth = new AuthManager();
  let models = auth.listAvailableModels(loadRegistry());

  if (filters?.category) {
    models = models.filter((m) => m.category === filters.category);
  }
  if (filters?.provider) {
    models = models.filter((m) =>
      m.providers.some((p) => p.provider === filters.provider),
    );
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    models = models.filter(
      (m) =>
        m.canonical_name.includes(q) ||
        m.aliases.some((a) => a.includes(q)),
    );
  }

  return models;
}

/**
 * Resolves a model by name (canonical name, alias, or fuzzy match).
 * Throws ModelNotFoundError if no match is found.
 */
export function getModel(name: string): ModelEntry {
  return resolveModel(name);
}
