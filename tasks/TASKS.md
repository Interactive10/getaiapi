# Tasks

## Current
<!-- Active task goes here -->

## Upcoming

---

### PHASE 0: FOUNDATION

---

## task-1: Project Bootstrap

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** nothing

### Problem
No project infrastructure exists yet. Need package.json, TypeScript config, test framework, and directory structure before any code can be written.

### Acceptance Criteria
- [ ] `package.json` exists with name `getaiapi`, `type: "module"`, correct scripts
- [ ] `tsconfig.json` with strict mode, ESM, declaration output
- [ ] `vitest.config.ts` configured
- [ ] `tsup` configured for ESM+CJS dual build
- [ ] Directory structure from ARCHITECTURE.md Section 13 created
- [ ] `npm run build` succeeds (even with empty entry point)
- [ ] `npm test` runs (even with no tests yet)

### Subtasks
- [ ] Create `package.json` (name, type, scripts, dependencies, devDependencies, exports, files)
- [ ] Create `tsconfig.json` (target ES2022, module NodeNext, strict, declaration)
- [ ] Create `vitest.config.ts`
- [ ] Create directory structure: `src/`, `src/adapters/`, `src/categories/`, `registry/`, `scripts/`, `tests/unit/`, `tests/integration/`, `tests/fixtures/`, `tests/e2e/`, `tests/catalog/`
- [ ] Create placeholder `src/index.ts`
- [ ] Verify `npm run build` and `npm test` work

### Notes
- No runtime dependencies beyond what's needed. Use native fetch (no axios).
- Dev deps: `typescript`, `vitest`, `tsup`, `tsx` (for running scripts)
- Do NOT add provider SDKs (`@fal-ai/client`, `replicate`) - we use native fetch.

---

## task-2: Type Definitions

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-1

### Problem
All modules import shared types. These must exist before any implementation.

### Acceptance Criteria
- [ ] `src/types.ts` contains all interfaces from ARCHITECTURE.md Sections 3 + 4
- [ ] `src/errors.ts` contains unified error classes
- [ ] Types compile without errors
- [ ] Types are exported from `src/index.ts`

### Subtasks
- [ ] Define `GenerateRequest` interface (model, prompt, image, audio, video, count, size, guidance, steps, strength, format, quality, safety, options, negative_prompt, seed)
- [ ] Define `GenerateResponse` interface (id, model, provider, status, outputs, metadata)
- [ ] Define `OutputItem` interface (type, url, content_type, size_bytes)
- [ ] Define `ModelEntry` interface (canonical_name, aliases, category, modality, providers)
- [ ] Define `ProviderBinding` interface (provider, skill_id, endpoint, auth_env, param_map, output_map)
- [ ] Define `ProviderAdapter` interface (name, submit, poll, parseOutput)
- [ ] Define `ModelCategory` type union (all 16 categories)
- [ ] Define error classes: `AuthError`, `ModelNotFoundError`, `ValidationError`, `ProviderError`, `TimeoutError`, `RateLimitError`
- [ ] Export all types from `src/index.ts`

### Notes
- Follow ARCHITECTURE.md Sections 3.1, 3.2, 4.1 exactly for type shapes.
- Each error class should include: `provider`, `model`, `requestId`, `raw` fields where applicable.

---

## task-3: Skill Cataloger Script

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-1

### Problem
1,954 SKILL.md files need to be parsed into a structured catalog. This is the data foundation - without it, no registry, no resolver, no adapters. This is the riskiest task in the project because the 3 providers have different SKILL.md formats.

### Acceptance Criteria
- [ ] Script reads all `skills/*/SKILL.md` files
- [ ] Extracts: skill_id, provider, model_family, category, description, endpoint
- [ ] Correctly identifies provider from directory prefix (fal-ai-, replicate-, wavespeed-)
- [ ] Assigns one of 16 categories to each skill based on name + description analysis
- [ ] Outputs structured JSON catalog to `registry/catalog.json`
- [ ] All 1,954 skills parsed without errors
- [ ] Counts per provider match expected: fal-ai ~1,199, Replicate ~687, WaveSpeed ~66

### Subtasks
- [ ] Create `scripts/catalog.ts`
- [ ] Parse YAML frontmatter from each SKILL.md (name, description)
- [ ] Extract endpoint/model path from markdown body
- [ ] Extract input parameters from input schema table (where available)
- [ ] Build category assignment logic (keyword matching on name + description)
- [ ] Handle fal-ai format (structured tables, `fal.subscribe` pattern)
- [ ] Handle Replicate format (version hash, `replicate.run` pattern)
- [ ] Handle WaveSpeed format (REST URLs, minimal structure)
- [ ] Detect cross-provider duplicates (same model on multiple providers)
- [ ] Output `registry/catalog.json` with full `SkillCatalog` structure
- [ ] Add validation: log warnings for unparseable fields, never crash
- [ ] Write unit tests for the parser with sample SKILL.md fixtures

### Notes
- Start with fal-ai (cleanest format), validate, then extend to Replicate, then WaveSpeed.
- Accept imperfect parsing. Use warnings, not errors, for edge cases.
- Category assignment will be heuristic - look for keywords like "text-to-image", "upscale", "edit", "video", "audio", "3d", "background", "segmentation" in name and description.
- Exclude `agent-roles` and `cloudflare-r2` directories (not AI models).

---

## task-4: Registry Generator Script

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-3

### Problem
The catalog needs to be transformed into a model registry with canonical names, aliases, and provider bindings that the resolver and mapper can consume.

### Acceptance Criteria
- [ ] Script reads `registry/catalog.json` and produces `registry/registry.json`
- [ ] Each unique model has one `ModelEntry` with canonical name
- [ ] Aliases generated from skill names (strip provider prefix, strip category suffix, version variants)
- [ ] Cross-provider models grouped under one canonical name with multiple `ProviderBinding` entries
- [ ] No duplicate canonical names or aliases
- [ ] First run scoped to `text-to-image` category only (expand later)

### Subtasks
- [ ] Create `scripts/generate-registry.ts`
- [ ] Group skills by model family (strip provider prefix, normalize name)
- [ ] Generate canonical names (shortest unambiguous form)
- [ ] Generate aliases (version variants, with/without provider prefix, with/without category suffix)
- [ ] Create `ProviderBinding` for each provider offering the model
- [ ] Include param_map skeleton from category template
- [ ] Output `registry/registry.json`
- [ ] Output `registry/categories.json` (category taxonomy with model counts)
- [ ] Add `npm run catalog` and `npm run generate-registry` scripts

### Notes
- Alias examples: "fal-ai-bytedance-seedream-v4.5-text-to-image" generates aliases: "seedream-4.5", "seedream-v4.5", "bytedance-seedream-4.5"
- For Phase 0, only generate text-to-image entries. Other categories added in Phase 2.

---

## task-5: Auth Manager

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-2

### Problem
The gateway needs to know which providers the user has keys for, gate access accordingly, and provide clear error messages.

### Acceptance Criteria
- [ ] `src/auth.ts` reads keys from env vars
- [ ] `availableProviders()` returns list of providers with configured keys
- [ ] `getKey(provider)` returns key or throws `AuthError` with env var name
- [ ] `canAccess(model)` checks if any provider binding has a key
- [ ] `listAvailableModels(registry)` filters by accessible providers
- [ ] Unit tests cover all scenarios including missing keys

### Subtasks
- [ ] Implement `AuthManager` class per ARCHITECTURE.md Section 10
- [ ] Map providers to env vars: fal-ai -> FAL_KEY, replicate -> REPLICATE_API_TOKEN, wavespeed -> WAVESPEED_API_KEY
- [ ] Trim whitespace from keys
- [ ] Write unit tests (`tests/unit/auth.test.ts`)

### Notes
- Keep it simple. Just env vars for now, no config files.

---

## task-6: fal-ai Provider Adapter

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-2

### Problem
First provider adapter. Implements the submit/poll/parseOutput interface for fal-ai's REST API using native fetch.

### Acceptance Criteria
- [ ] `src/adapters/fal-ai.ts` implements `ProviderAdapter` interface
- [ ] `submit()` POSTs to fal-ai queue endpoint with correct auth header
- [ ] `poll()` checks queue status and retrieves result
- [ ] `parseOutput()` extracts `OutputItem[]` from fal-ai response shapes
- [ ] Handles `images[].url` (image models) and `video.url` (video models)
- [ ] Auth header: `Authorization: Key $FAL_KEY`
- [ ] Unit tests with fixture responses

### Subtasks
- [ ] Create `src/adapters/base.ts` with `ProviderAdapter` interface
- [ ] Implement fal-ai adapter: submit via `POST https://queue.fal.run/{endpoint}`
- [ ] Implement poll via `GET https://queue.fal.run/{endpoint}/requests/{request_id}/status`
- [ ] Implement result retrieval via `GET https://queue.fal.run/{endpoint}/requests/{request_id}`
- [ ] Implement `parseOutput()` for text-to-image (extract `images[].url`)
- [ ] Handle errors (4xx, 5xx) and map to unified error types
- [ ] Create fixture file `tests/fixtures/fal-ai/text-to-image/flux-schnell.json`
- [ ] Write unit tests (`tests/unit/adapters/fal-ai.test.ts`)

### Notes
- Do NOT use `@fal-ai/client` SDK. Use native fetch.
- fal-ai output shape varies by category: `images[]` for images, `video` for video, `audio` for audio. Start with images only.
- `sync_mode: true` returns data URIs instead of URLs - handle this edge case.

---

## task-7: Text-to-Image Category Template

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-2

### Problem
Category templates define how universal input params map to provider-specific params for a given modality. Text-to-image is the first category.

### Acceptance Criteria
- [ ] `src/categories/text-to-image.ts` defines input/output mappings
- [ ] Maps `count` -> `num_images` (fal-ai) / `num_outputs` (Replicate) / `num_outputs` (WaveSpeed)
- [ ] Maps `size` -> `image_size` (fal-ai) / `width`+`height` or `aspect_ratio` (Replicate) / `resolution` (WaveSpeed)
- [ ] Maps `guidance` -> `guidance_scale` (fal-ai) / `guidance` (Replicate) / `guidance_scale` (WaveSpeed)
- [ ] Maps `safety` -> `enable_safety_checker` (fal-ai) / `disable_safety_checker` with boolean flip (Replicate)
- [ ] Maps `format` -> `output_format` (all providers)
- [ ] Validates that `prompt` is required
- [ ] Silently drops unsupported params

### Subtasks
- [ ] Create category template data structure
- [ ] Define input param mappings for all 3 providers
- [ ] Define output extraction paths: `images[].url` (fal-ai), `output[]` (Replicate), `outputs[]` (WaveSpeed)
- [ ] Handle `size` parsing: string `"1024x1024"` -> `{width, height}` object AND enum strings
- [ ] Handle safety boolean inversion for Replicate
- [ ] Write unit tests for each mapping (`tests/unit/mapper.test.ts`)

### Notes
- The `options` passthrough field should merge with mapped params, with passthrough winning on conflicts.
- Boundary values to consider: `count: 0`, `guidance: 0`, `steps: 0`.

---

## task-8: Input/Output Mapper

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-7

### Problem
The mapper engine applies category templates (+ per-model overrides from the registry) to translate universal requests into provider-specific params, and provider responses into universal outputs.

### Acceptance Criteria
- [ ] `src/mapper.ts` applies category template to translate `GenerateRequest` -> provider params
- [ ] Applies per-model overrides from `ProviderBinding.param_map`
- [ ] Drops params the model doesn't support (no errors)
- [ ] Merges `options` passthrough (passthrough wins on conflict)
- [ ] Reverse mapping: provider response -> `OutputItem[]`
- [ ] Unit tests for fal-ai, Replicate, WaveSpeed text-to-image mappings

### Subtasks
- [ ] Create `src/mapper.ts` with `mapInput(request, binding, category)` function
- [ ] Create `mapOutput(providerResponse, binding, category)` function
- [ ] Load category template based on model's category
- [ ] Apply param mapping rules from template
- [ ] Apply per-model overrides from binding
- [ ] Merge `options` passthrough
- [ ] Write comprehensive unit tests

### Notes
- Two-layer system: category defaults + per-model overrides. Expect ~10% of models to need overrides (realistically 30-40% according to Architect assessment).

---

## task-9: Model Resolver

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-4

### Problem
Takes a user's model name input and resolves it to a specific `ModelEntry` from the registry, handling case differences and separator variations.

### Acceptance Criteria
- [ ] `src/resolver.ts` loads `registry.json` and resolves model names
- [ ] Exact canonical name match works
- [ ] Case-insensitive match works (`"FLUX-Schnell"` -> `flux-schnell`)
- [ ] Normalized match works (strip separators: `"flux schnell"` -> `flux-schnell`)
- [ ] Throws `ModelNotFoundError` with suggestions on no match
- [ ] Filters by available providers (user's API keys)
- [ ] Unit tests cover all match scenarios

### Subtasks
- [ ] Create `src/resolver.ts` with `resolveModel(query, availableProviders)` function
- [ ] Implement `normalizeModelName()`: lowercase, strip non-alphanumeric, strip leading 'v'
- [ ] Exact match against canonical names
- [ ] Exact match against aliases
- [ ] Normalized match against canonical + aliases
- [ ] Error with suggestions (list closest names) on no match
- [ ] Write unit tests (`tests/unit/resolver.test.ts`)

### Notes
- Phase 0: exact + normalized match only. No fuzzy/Levenshtein matching yet.
- Empty/null/undefined input should throw clear error.

---

## task-10: Gateway Orchestration

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-5, task-6, task-8, task-9

### Problem
The gateway is the core orchestrator that wires resolver, auth, mapper, and adapter together into the `generate()` function.

### Acceptance Criteria
- [ ] `src/gateway.ts` implements the full pipeline: resolve -> auth check -> map input -> submit -> poll -> map output -> return
- [ ] Returns `GenerateResponse` matching the contract exactly
- [ ] `outputs` is always an array
- [ ] `metadata.inference_time_ms` is populated
- [ ] Errors at each stage produce correct error types
- [ ] No API keys = error before any network call

### Subtasks
- [ ] Create `src/gateway.ts` with `generate(request)` function
- [ ] Wire up: resolver -> auth -> mapper -> adapter -> mapper (output) -> response
- [ ] Measure and include `inference_time_ms` in metadata
- [ ] Generate unique `id` for each request
- [ ] Handle errors at each stage with appropriate error types
- [ ] Write integration tests with mocked adapter (`tests/integration/generate.test.ts`)

---

## task-11: Public API & Exports

**Status:** pending
**Agent:** Backend Engineer
**Priority:** critical
**Depends on:** task-10

### Problem
The public-facing API module that users import from the package.

### Acceptance Criteria
- [ ] `src/index.ts` exports `generate`, `listModels`, `getModel`
- [ ] `src/index.ts` exports all public types
- [ ] `listModels()` supports filtering by category, provider, query
- [ ] `getModel()` returns model details or throws `ModelNotFoundError`
- [ ] Package builds successfully with `npm run build`
- [ ] Exported types are correct in `.d.ts` output

### Subtasks
- [ ] Implement `listModels(filters?)` function
- [ ] Implement `getModel(name)` function
- [ ] Re-export `generate` from gateway
- [ ] Re-export all public types
- [ ] Verify build output has correct exports

---

## task-12: End-to-End Integration Test

**Status:** pending
**Agent:** QA Engineer
**Priority:** critical
**Depends on:** task-11

### Problem
Prove the entire system works end-to-end. This is the Phase 0 "done" gate.

### Acceptance Criteria
- [ ] Integration test: `generate({ model: "flux-schnell", prompt: "a cat" })` returns valid `GenerateResponse` (with mocked HTTP)
- [ ] Response has: id, model, provider, status: "completed", outputs array with at least 1 item
- [ ] Each output has: type: "image", url (string), content_type
- [ ] Live smoke test (gated by `FAL_KEY` env var) hits real API and returns real image URL
- [ ] `listModels({ category: 'text-to-image' })` returns models
- [ ] `getModel('flux-schnell')` returns model details
- [ ] All unit tests pass
- [ ] `tsc --noEmit` passes with zero errors
- [ ] Code coverage >= 80%

### Subtasks
- [ ] Create `tests/integration/generate.test.ts` with mocked HTTP responses
- [ ] Create `tests/e2e/smoke.test.ts` gated by env var
- [ ] Run full test suite
- [ ] Fix any failures
- [ ] Verify TypeScript compilation

### Notes
- This task is the Phase 0 acceptance gate. If this passes, Phase 0 is done.

---

### PHASE 1: MULTI-PROVIDER

---

## task-13: Replicate Provider Adapter

**Status:** pending
**Agent:** Backend Engineer
**Priority:** high
**Depends on:** task-12 (Phase 0 complete)

### Problem
Second provider adapter for Replicate's REST API.

### Acceptance Criteria
- [ ] `src/adapters/replicate.ts` implements `ProviderAdapter` interface
- [ ] Submit: `POST https://api.replicate.com/v1/models/{owner}/{model}/predictions`
- [ ] Poll: `GET https://api.replicate.com/v1/predictions/{id}`
- [ ] Auth: `Authorization: Bearer $REPLICATE_API_TOKEN`
- [ ] Handles statuses: `starting`, `processing`, `succeeded`, `failed`, `canceled`
- [ ] `parseOutput()` handles `output` as `list<string>` (URLs)
- [ ] Unit tests with fixtures

### Subtasks
- [ ] Implement Replicate adapter
- [ ] Handle version pinning vs latest model routing
- [ ] Handle Replicate's `output` format (flat URL list, no metadata)
- [ ] Infer content_type from URL extension or `output_format` param
- [ ] Map `failed` and `canceled` to `ProviderError`
- [ ] Create fixture files
- [ ] Write unit tests

### Notes
- Replicate output is just `list<string>` - no content_type or size_bytes. Must infer.
- `disable_safety_checker` is inverted boolean vs fal-ai.

---

## task-14: WaveSpeed Provider Adapter

**Status:** pending
**Agent:** Backend Engineer
**Priority:** high
**Depends on:** task-12 (Phase 0 complete)

### Problem
Third provider adapter for WaveSpeed's REST API (v3).

### Acceptance Criteria
- [ ] `src/adapters/wavespeed.ts` implements `ProviderAdapter` interface
- [ ] Submit: `POST https://api.wavespeed.ai/api/v3/{model_path}`
- [ ] Poll: `GET https://api.wavespeed.ai/api/v3/predictions/{task_id}`
- [ ] Auth: `Authorization: Bearer $WAVESPEED_API_KEY`
- [ ] Handles statuses: `created`, `processing`, `completed`, `failed`
- [ ] Manual polling loop with exponential backoff
- [ ] `parseOutput()` handles `data.outputs` array
- [ ] Unit tests with fixtures

### Subtasks
- [ ] Implement WaveSpeed adapter
- [ ] Implement polling loop (WaveSpeed has no SDK, fully manual)
- [ ] Handle `enable_sync_mode` (avoids polling)
- [ ] Handle response nesting (`{ data: { ... } }`)
- [ ] Handle CDN URL expiry (document in output)
- [ ] Create fixture files
- [ ] Write unit tests

### Notes
- API is v3 (not v2 as stated in ARCHITECTURE.md).
- Response is nested under `data` key.
- Output URLs expire. Not our problem to solve, but document it.
- `enable_sync_mode` skips polling - useful for fast models.

---

## task-15: Provider Routing

**Status:** pending
**Agent:** Backend Engineer
**Priority:** high
**Depends on:** task-13, task-14

### Problem
When a model is available on multiple providers and the user has keys for multiple, the gateway needs to pick one.

### Acceptance Criteria
- [ ] Gateway picks first available provider when multiple have keys
- [ ] Correct provider selected based on `availableProviders()` intersection with model's `ProviderBinding[]`
- [ ] If preferred provider fails, does NOT auto-fallback (fail explicitly)
- [ ] Integration tests for multi-key scenarios

### Subtasks
- [ ] Update gateway to select provider from model's bindings
- [ ] Filter by user's available providers
- [ ] Pick first match (simple, no ranking yet)
- [ ] Write tests for: one key, two keys, no keys scenarios

### Notes
- Phase 1 is intentionally simple: first available, no ranking.
- Provider preference/ranking is Phase 3.

---

## task-16: Expand Text-to-Image Registry to All Providers

**Status:** pending
**Agent:** Backend Engineer
**Priority:** high
**Depends on:** task-13, task-14

### Problem
Registry currently only has fal-ai text-to-image. Expand to include Replicate and WaveSpeed text-to-image models.

### Acceptance Criteria
- [ ] Registry includes text-to-image models from all 3 providers
- [ ] Cross-provider models (e.g., flux-schnell) are grouped under one canonical name
- [ ] Input/output mapping verified for each provider's param names
- [ ] Integration tests for cross-provider model generation

### Subtasks
- [ ] Run cataloger with Replicate text-to-image models
- [ ] Run cataloger with WaveSpeed text-to-image models
- [ ] Verify cross-provider grouping (same model, multiple providers)
- [ ] Test param mapping for each provider's text-to-image quirks
- [ ] Update fixtures for Replicate and WaveSpeed

---

## task-17: Phase 1 Acceptance Tests

**Status:** pending
**Agent:** QA Engineer
**Priority:** high
**Depends on:** task-15, task-16

### Problem
Prove multi-provider support works. Phase 1 done gate.

### Acceptance Criteria
- [ ] Same model (flux-schnell) generates correctly through all 3 providers (mocked)
- [ ] Provider auto-selection works with various key combinations
- [ ] Live smoke tests pass for each provider (gated by env vars)
- [ ] All Phase 0 tests still pass (no regressions)

---

### PHASE 2: EXPAND MODALITIES

---

## task-18: image-edit Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17 (Phase 1 complete)

### Problem
Add image-edit modality (image + text -> image).

### Acceptance Criteria
- [ ] `src/categories/image-edit.ts` template with input/output mappings
- [ ] Registry expanded with image-edit models from all providers
- [ ] `generate({ model: "gpt-image-1.5-edit", image: "url", prompt: "remove the hat" })` works
- [ ] Handles file/URL/base64 image input
- [ ] Integration tests

### Subtasks
- [ ] Create image-edit category template
- [ ] Define param mappings (image input, strength, mask)
- [ ] Update registry generator to include image-edit models
- [ ] Handle image input formats (URL, base64 data URI)
- [ ] Write tests

---

## task-19: text-to-video Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Add text-to-video modality (text -> video). High-value category.

### Acceptance Criteria
- [ ] `src/categories/text-to-video.ts` template
- [ ] Registry expanded with text-to-video models
- [ ] `generate({ model: "veo3.1", prompt: "a cat walking" })` returns video URL
- [ ] Output parsing handles video response shapes per provider
- [ ] Longer default timeout (300s vs 30s for images)
- [ ] Integration tests

### Subtasks
- [ ] Create text-to-video category template
- [ ] Update adapters' `parseOutput()` for video responses (fal-ai: `video.url`, Replicate: `output` string, WaveSpeed: `outputs[]`)
- [ ] Set category-level default timeout
- [ ] Update registry
- [ ] Write tests

---

## task-20: image-to-video Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-19

### Problem
Add image-to-video modality (image + text -> video).

### Acceptance Criteria
- [ ] `src/categories/image-to-video.ts` template
- [ ] Registry expanded with image-to-video models
- [ ] Handles image input + optional prompt
- [ ] Integration tests

---

## task-21: upscale-image Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Add upscale-image modality (image -> higher-resolution image).

### Acceptance Criteria
- [ ] `src/categories/upscale-image.ts` template
- [ ] Registry expanded with upscale models
- [ ] Handles `strength`/`scale` parameters
- [ ] Integration tests

---

## task-22: text-to-audio Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Add text-to-audio modality (text -> audio). Covers TTS and music generation.

### Acceptance Criteria
- [ ] `src/categories/text-to-audio.ts` template
- [ ] Registry expanded with TTS and music models
- [ ] Output parsing handles audio response shapes
- [ ] Integration tests

---

## task-23: audio-to-text Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Add audio-to-text modality (audio -> text). Covers transcription/STT.

### Acceptance Criteria
- [ ] `src/categories/audio-to-text.ts` template
- [ ] Registry expanded with whisper and STT models
- [ ] Handles audio file input (URL, base64)
- [ ] Output is text type
- [ ] Integration tests

---

## task-24: remove-background Category

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Add remove-background modality (image/video -> image/video without background).

### Acceptance Criteria
- [ ] `src/categories/remove-background.ts` template
- [ ] Registry expanded with background removal models
- [ ] Integration tests

---

## task-25: Remaining Categories

**Status:** pending
**Agent:** Backend Engineer
**Priority:** low
**Depends on:** task-18 through task-24

### Problem
Add all remaining categories: image-to-image, text-to-3d, image-to-3d, upscale-video, video-to-audio, segmentation, moderation.

### Acceptance Criteria
- [ ] Each category has a template, registry entries, and tests
- [ ] At least 10 of 16 categories fully working
- [ ] No regressions in existing categories

### Notes
- Each category is a self-contained unit of work.
- Can be parallelized across multiple sessions.

---

## task-26: Phase 2 Acceptance Tests

**Status:** pending
**Agent:** QA Engineer
**Priority:** medium
**Depends on:** task-18 through task-25

### Problem
Prove multi-modality support works. Phase 2 done gate.

### Acceptance Criteria
- [ ] At least 8 categories working end-to-end
- [ ] Integration tests for each category
- [ ] No regressions in Phase 0/1 functionality
- [ ] Full test suite green

---

### PHASE 3: POLISH

---

## task-27: README & Documentation

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-26

### Problem
Users need clear documentation to adopt the package.

### Acceptance Criteria
- [ ] README.md with: overview, install, quick start, API reference, model list, configuration
- [ ] Examples for each major category
- [ ] API key setup instructions per provider
- [ ] Contributing guide

---

## task-28: Error Handling & Retry Logic

**Status:** pending
**Agent:** Backend Engineer
**Priority:** medium
**Depends on:** task-17

### Problem
Production-ready error handling with retries for transient failures.

### Acceptance Criteria
- [ ] Exponential backoff with jitter for 5xx and network errors
- [ ] Max 3 retries (configurable)
- [ ] Never retry 4xx (except 429)
- [ ] Honor `Retry-After` header on 429
- [ ] Category-level default timeouts (image: 30s, video: 300s, 3D: 600s)
- [ ] User-overridable timeout via `options.timeout`

---

## task-29: CLI Tool

**Status:** pending
**Agent:** Backend Engineer
**Priority:** low
**Depends on:** task-26

### Problem
Quick command-line access for testing and exploration.

### Acceptance Criteria
- [ ] `npx getaiapi generate --model flux-schnell --prompt "a cat"` works
- [ ] `npx getaiapi list --category text-to-image` lists models
- [ ] `npx getaiapi info flux-schnell` shows model details
- [ ] Output formatted nicely for terminal

---

## task-30: npm Publish

**Status:** pending
**Agent:** Backend Engineer
**Priority:** low
**Depends on:** task-27, task-28

### Problem
Package needs to be published to npm for public use.

### Acceptance Criteria
- [ ] `npm publish` succeeds
- [ ] Package installs correctly: `npm install getaiapi`
- [ ] `import { generate } from 'getaiapi'` works in a fresh project
- [ ] Types are correct in consuming project
- [ ] `registry.json` is included in package

---

## Done
<!-- Completed tasks go here -->

## Bugs
<!-- Bug reports go here -->
