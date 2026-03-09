# Proposal: Model Identity Graph

## Problem

The same real-world model (e.g., Claude Opus 4.6) exists as separate registry entries because each provider uses a different naming convention:

| Provider   | Canonical Name              | Endpoint                    |
| ---------- | --------------------------- | --------------------------- |
| Replicate  | `anthropic-claude-opus-4.6` | `anthropic/claude-opus-4.6` |
| OpenRouter | `claude-opus-4-6`           | `anthropic/claude-opus-4-6` |

This causes two concrete problems:

1. **Duplicate rows in MODELS.md** — the model appears twice instead of one row with `Y` in both provider columns.
2. **No provider portability** — a user who writes `model: "anthropic-claude-opus-4.6"` gets Replicate only. If they lose their Replicate key and only have OpenRouter configured, the call fails even though the same model is available there.

The current resolver already does fuzzy matching (normalized names strip punctuation), but fuzzy matching is probabilistic. The user is asking for **deterministic, hardcoded relationships** — an explicit declaration that these names all refer to the same model.

## Proposed Solution: Merged Entries

Merge entries that represent the same model into one:

```jsonc
{
  "canonical_name": "claude-opus-4.6",
  "aliases": [
    "claude-opus-4.6",
    "claude-opus-4-6",
    "anthropic-claude-opus-4.6",
    "claude-opus",
    "opus-4-6"
  ],
  "category": "text-generation",
  "providers": [
    { "provider": "replicate", "endpoint": "anthropic/claude-opus-4.6", ... },
    { "provider": "openrouter", "endpoint": "anthropic/claude-opus-4-6", ... }
  ]
}
```

One entry, all aliases, all providers. The `aliases` array becomes the single source of truth for "what names does a user know this model by."

## Resolver Changes

No resolver changes needed — it already works. The aliases array already handles multi-name lookup, and the providers array already supports multiple providers per entry.

## Impact on MODELS.md

No changes needed — one entry = one row.

## What Needs To Happen

### For the 10 OpenRouter LLM models already added

Cross-reference with existing Replicate entries and merge where the same underlying model exists:

| Model             | Replicate Entry               | OpenRouter Entry    | Action          |
| ----------------- | ----------------------------- | ------------------- | --------------- |
| Claude Opus 4.6   | `anthropic-claude-opus-4.6`   | `claude-opus-4-6`   | Merge           |
| Claude Sonnet 4.6 | `anthropic-claude-sonnet-4-6` | `claude-sonnet-4-6` | Merge           |
| Claude Haiku 4.5  | `anthropic-claude-haiku-4-5`  | `claude-haiku-4-5`  | Merge           |
| GPT-4o            | `openai-gpt-4o`               | `gpt-4o`            | Merge           |
| GPT-4o Mini       | `openai-gpt-4o-mini`          | `gpt-4o-mini`       | Merge           |
| Gemini 2.0 Flash  | (check)                       | `gemini-2.0-flash`  | Merge if exists |
| Llama 3.1 70B     | `meta-llama-3.1-70b-instruct` | `llama-3.1-70b`     | Merge           |
| Mistral Large     | (check)                       | `mistral-large`     | Merge if exists |
| DeepSeek V3       | (check)                       | `deepseek-v3`       | Merge if exists |
| Qwen 2.5 72B      | (check)                       | `qwen-2.5-72b`      | Merge if exists |

### For all future models

Establish a convention: when adding a model that already exists under a different provider, add it as a new provider binding on the existing entry and add the provider-specific name to `aliases`.

## Backward Compatibility

### What doesn't break

- **All existing model names still resolve.** Every old `canonical_name` and alias becomes an entry in the merged `aliases` array. A user calling `model: "anthropic-claude-opus-4.6"` or `model: "claude-opus-4-6"` will get the same result as before.
- **No schema changes.** `GenerateRequest`, `GenerateResponse`, `ModelEntry` shapes stay identical. No fields added, removed, or renamed.
- **Provider behavior unchanged.** Each provider binding keeps its own `endpoint`, `param_map`, `output_map`, and `auth_env`. The merge is purely at the identity/lookup layer.
- **Fuzzy matching still works.** The normalized matching in `resolveModel()` is unaffected — it just has fewer entries to search through (fewer duplicates).

### The one breaking surface: `response.model`

The `response.model` field returns the `canonical_name` of the matched entry. After merging, the canonical name changes for one side:

| Before                                                         | After                                |
| -------------------------------------------------------------- | ------------------------------------ |
| `response.model = "anthropic-claude-opus-4.6"` (via Replicate) | `response.model = "claude-opus-4.6"` |
| `response.model = "claude-opus-4-6"` (via OpenRouter)          | `response.model = "claude-opus-4.6"` |

**Impact**: Anyone doing exact string comparison on `response.model` (e.g., `if (res.model === "anthropic-claude-opus-4.6")`) would break.

### Mitigation options

1. **Do nothing** — this is a pre-1.0 library; canonical names are not a stability guarantee. Document the change in CHANGELOG under `Changed`.
2. **Add `response.model_alias`** — return the name the user originally requested alongside the canonical name, so consumers can match against their own input instead of our internal name.
3. **Deprecation period** — keep old canonical names as top-level aliases and log a warning when they're used, removing them in a future minor version.

**Recommendation**: Option 1 for now (document in CHANGELOG), with Option 2 as a future nice-to-have. We're pre-1.0 and the `response.model` field is informational, not a stable API contract.

## Migration Steps

1. For each duplicated model, pick one canonical name (prefer the shorter/cleaner one)
2. Merge aliases from both entries
3. Merge providers from both entries into one `providers` array
4. Delete the duplicate entry
5. Regenerate MODELS.md
6. Add a validation script that flags duplicate identities in CI
