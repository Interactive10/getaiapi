# getaiapi - Product Specification

**Author:** Product Manager Agent (with Architect, Backend, QA, Product Owner input)
**Date:** 2026-03-06
**Status:** Draft
**Website:** [interactive10.com/getaiapi.html](https://www.interactive10.com/getaiapi.html)

---

## 1. Problem Statement

**Who:** Developers building AI-powered applications that use image/video/audio generation models.

**What:** There are 200+ AI models across 3 providers (fal-ai, Replicate, WaveSpeed), each with different APIs, auth mechanisms, parameter naming, polling patterns, and output formats. A developer who wants to use `flux-schnell` must learn the specific provider's SDK, parameter names, auth setup, and output parsing. Switching providers or trying the same model on a different provider requires rewriting integration code.

**Why it matters:** Developer time is wasted on integration plumbing instead of building products. Provider lock-in prevents cost optimization and redundancy. The cognitive load of 3 different APIs for the same underlying models is unnecessary.

---

## 2. Solution

**getaiapi** is an open-source TypeScript library (npm package) that provides a single function to call any supported AI model:

```typescript
import { generate } from 'getaiapi'

const result = await generate({
  model: 'flux-schnell',
  prompt: 'a cat wearing sunglasses'
})

console.log(result.outputs[0].url) // image URL
```

One function. One input shape. One output shape. Any model. Any provider.

---

## 3. Target Users

| User | Need | How getaiapi helps |
|------|------|--------------------|
| Indie developer | Quick AI generation in side projects | Zero learning curve, one npm install |
| Startup engineer | Multi-model support without provider lock-in | Swap providers by changing an env var |
| Agency developer | Client projects needing various AI capabilities | One SDK covers image, video, audio, 3D |
| AI wrapper builder | Building products on top of AI models | Consistent interface, easy to add models |

---

## 4. Core Features (MVP - Phase 0)

### F1: Unified Generate Function
- Single `generate(request)` function that works with any supported model
- Universal input schema: `model`, `prompt`, `image`, `count`, `size`, `guidance`, `seed`, `format`, `safety`, `options`
- Universal output schema: `id`, `model`, `provider`, `status`, `outputs[]`, `metadata`
- `outputs` is always an array, each item has `type`, `url`, `content_type`

### F2: Model Name Resolution (`resolveModel`)
- Smart model name matching: `"flux-schnell"`, `"flux schnell"`, `"FLUX_Schnell"` all work
- Phase 0: Exact + normalized matching (strip separators, lowercase)
- Phase 1+: Fuzzy matching, prefix matching, "did you mean" suggestions

### F3: Auth Management
- Reads API keys from environment variables (`FAL_KEY`, `REPLICATE_API_TOKEN`, `WAVESPEED_API_KEY`)
- Token-gating: only shows/allows models for providers where user has keys
- Clear error messages when keys are missing (tells user which env var to set)

### F4: Model Discovery
- `listModels()` - all available models (filtered by user's API keys)
- `listModels({ input: 'text', output: 'image' })` - filter by input/output modality
- `listModels({ provider: 'fal-ai' })` - filter by provider
- `resolveModel('flux-schnell')` - model details (params, providers, modality)

### F5: Skill Cataloger & Registry
- Automated script that parses 1,954 SKILL.md files into a structured catalog
- Generates `registry.json` with canonical names, aliases, provider bindings, param mappings
- Each provider binding carries its own `param_map` and `output_map` — no shared category templates

---

## 5. Provider Support

| Provider | Skills | Auth Env Var | SDK/Protocol | Polling Pattern |
|----------|--------|-------------|-------------|-----------------|
| fal-ai | 1,199 | `FAL_KEY` | Native fetch | subscribe (built-in) |
| Replicate | 687 | `REPLICATE_API_TOKEN` | Native fetch | create + poll |
| WaveSpeed | 66 | `WAVESPEED_API_KEY` | Native fetch (REST) | create + poll |
| OpenRouter | — | `OPENROUTER_API_KEY` | Native fetch | synchronous |

**Decision:** Use native `fetch` for all providers (no provider SDKs). This keeps the dependency footprint minimal and gives full control over HTTP behavior.

---

## 6. Modality System

Categories are no longer stored on models. Instead, each model declares its `modality: { inputs: InputType[], outputs: OutputType[] }`. A display category (e.g., `text-to-image`) is derived at query time via `deriveCategory(model)`.

**Input types:** `text`, `image`, `audio`, `video`
**Output types:** `image`, `video`, `audio`, `text`, `3d`, `segmentation`

| Derived Category | Inputs | Outputs | Priority | Phase |
|---|---|---|---|---|
| `text-to-image` | text | image | P0 | 0 |
| `image-to-image` | image, text | image | P1 | 2 |
| `text-to-video` | text | video | P1 | 2 |
| `image-to-video` | image, text | video | P1 | 2 |
| `upscale-image` | image | image | P2 | 2 |
| `text-to-audio` | text | audio | P2 | 2 |
| `audio-to-text` | audio | text | P2 | 2 |
| `remove-background` | image | image | P2 | 2 |
| `text-to-3d` | text | 3d | P3 | 2 |
| `image-to-3d` | image | 3d | P3 | 2 |
| `upscale-video` | video | video | P3 | 2 |
| `video-to-audio` | video | audio | P3 | 2 |
| `segmentation` | image | segmentation | P3 | 2 |
| `text-generation` | text | text | P1 | 1 |

---

## 7. Inventory Summary

| Metric | Count |
|--------|-------|
| Total skill files | 1,954 |
| fal-ai skills | 1,199 |
| Replicate skills | 687 |
| WaveSpeed skills | 66 |
| Derived categories | 14+ |
| Cross-provider models (estimated) | ~20-30 |

---

## 8. Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | TypeScript (strict) | Type safety, npm ecosystem |
| Runtime | Node.js (ESM) | Widest adoption |
| HTTP client | Native fetch | Zero deps, works everywhere |
| Provider SDKs | Not used | Fewer deps, full control, smaller bundle |
| Testing | Vitest | Fast, TypeScript-native |
| Build | tsup | ESM+CJS dual output, dts generation |
| Registry format | Generated JSON | Git-versioned, no DB needed |
| Package name | `getaiapi` | `npm install getaiapi` |

---

## 9. Error Handling Contract

All errors follow a unified structure:

| Error Type | When | User-Facing Message |
|------------|------|---------------------|
| `AuthError` | Missing/invalid API key | "No API key for fal-ai. Set FAL_KEY environment variable." |
| `ModelNotFoundError` | Model name didn't resolve | "Model 'flx-schnell' not found. Did you mean: flux-schnell?" |
| `ValidationError` | Invalid input params | "prompt is required for text-to-image models" |
| `ProviderError` | Provider returned error | "fal-ai error: [details]" |
| `TimeoutError` | Generation exceeded timeout | "Generation timed out after 30s" |
| `RateLimitError` | 429 from provider | "fal-ai rate limit exceeded, retry in 5s" |

---

## 10. Known Gotchas & Risks

### High Risk
- **Skill file parsing:** 1,954 SKILL.md files from 3 different scrapers with inconsistent formats. The cataloger is the hardest part of the project.
- **Parameter divergence:** Same concept named differently across providers (`num_images` vs `num_outputs` vs undocumented). Each provider binding's `param_map` handles this per-model.
- **Safety boolean inversion:** fal-ai uses `enable_safety_checker: true`, Replicate uses `disable_safety_checker: false`. Mapper must flip correctly.

### Medium Risk
- **Output shape varies by provider:** fal-ai returns `{ images: [...] }` for images but `{ video: { url } }` for video. Each provider binding's `output_map.extract_path` handles extraction.
- **WaveSpeed API version:** Architecture doc says v2, actual skill files use v3. Must use v3.
- **WaveSpeed CDN expiry:** Output URLs expire. Users must download promptly.

### Low Risk (Defer)
- Provider preference routing (just use first available key for now)
- Streaming/progress for long-running tasks
- Cost tracking
- Release date filtering / deprecation

---

## 11. Out of Scope (Explicitly Deferred)

| Feature | Why Deferred |
|---------|-------------|
| CLI tool | Phase 3 - core library must work first |
| Web playground | Phase 3 - nice-to-have |
| Streaming/progress events | Adds different contract; Promise is sufficient for MVP |
| Cost estimation | Incomplete data from providers |
| Rate limiting (internal) | Fail fast, let caller handle |
| File hosting for base64 | Return data URIs; don't build infrastructure |
| Fuzzy name matching (Levenshtein) | Start with normalized exact match; add when users report issues |
| Provider preference ranking | Just pick first available; optimize later |
| Release date filtering | Include all models first, filter later |

---

## 12. Success Criteria

### Phase 0 (Foundation)
- `generate({ model: "flux-schnell", prompt: "a cat" })` returns an image URL via fal-ai
- Cataloger parses all 1,954 skills without errors
- Registry covers all text-to-image models (input: text, output: image)
- Unit test coverage >= 80% for src/
- Zero TypeScript errors

### Phase 1 (Multi-Provider)
- Same model works through all 3 providers
- Provider auto-selection based on available keys
- All text-to-image models (input: text, output: image) mapped and tested

### Phase 2 (Expand Modalities)
- At least 8 input/output modality combinations working
- Each modality combination has integration tests
- No regressions in existing modalities

### Phase 3 (Polish)
- Package published to npm
- README with clear docs
- CLI tool for quick testing
- Model lookup < 10ms for full registry

---

## 13. Phased Delivery Plan

```
Phase 0: Foundation          Phase 1: Multi-Provider     Phase 2: Modalities        Phase 3: Polish
-----------------------      -----------------------     ---------------------      ------------------
Project bootstrap            Replicate adapter           image-edit modality        Streaming support
Type definitions             WaveSpeed adapter           text-to-video modality     CLI tool
Skill cataloger              OpenRouter adapter          image-to-video modality    Web playground
Registry generator           Provider routing            upscale-image modality     Documentation site
Auth manager                 Cross-provider tests        text-to-audio modality     npm publish
fal-ai adapter               Full text-to-image          audio-to-text modality     Cost estimation
Input/output mapper          coverage across all         remove-background          Provider preference
Model resolver (resolveModel) providers                  + remaining modalities
Gateway orchestration
Discovery (listModels, deriveCategory)
End-to-end test
```

---

## 14. File Structure

```
getaiapi/
  src/
    index.ts              # Public API: generate, listModels, resolveModel, etc.
    gateway.ts            # Core orchestration
    registry.ts           # Model name resolution (resolveModel, loadRegistry)
    discovery.ts          # listModels, deriveCategory
    auth.ts               # Token management
    configure.ts          # configure() for keys & storage
    mapper.ts             # Input/output mapping engine
    types.ts              # All shared types
    errors.ts             # Unified error types
    storage.ts            # R2 storage integration
    s3-signer.ts          # S3-compatible request signing
    retry.ts              # Retry logic
    cli.ts                # CLI entry point
    adapters/
      base.ts             # ProviderAdapter interface
      fal-ai.ts           # fal-ai adapter
      replicate.ts        # Replicate adapter
      wavespeed.ts        # WaveSpeed adapter
      openrouter.ts       # OpenRouter adapter (text generation)
  registry/
    registry.json         # Generated model registry
  scripts/
    catalog.ts            # SKILL.md parser -> catalog
    generate-registry.ts  # Catalog -> registry.json
  skills/                 # 1,954 existing skill definitions
  tests/
  docs/
    ARCHITECTURE.md
    PRODUCT-SPEC.md
  package.json
  tsconfig.json
  vitest.config.ts
  README.md
```
