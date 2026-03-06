# getaiapi - Product Specification

**Author:** Product Manager Agent (with Architect, Backend, QA, Product Owner input)
**Date:** 2026-03-06
**Status:** Draft

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

### F2: Model Name Resolution
- Smart model name matching: `"flux-schnell"`, `"flux schnell"`, `"FLUX_Schnell"` all work
- Phase 0: Exact + normalized matching (strip separators, lowercase)
- Phase 1+: Fuzzy matching, prefix matching, "did you mean" suggestions

### F3: Auth Management
- Reads API keys from environment variables (`FAL_KEY`, `REPLICATE_API_TOKEN`, `WAVESPEED_API_KEY`)
- Token-gating: only shows/allows models for providers where user has keys
- Clear error messages when keys are missing (tells user which env var to set)

### F4: Model Discovery
- `listModels()` - all available models (filtered by user's API keys)
- `listModels({ category: 'text-to-image' })` - filter by category
- `listModels({ provider: 'fal-ai' })` - filter by provider
- `getModel('flux-schnell')` - model details (params, providers, category)

### F5: Skill Cataloger & Registry
- Automated script that parses 1,954 SKILL.md files into a structured catalog
- Generates `registry.json` with canonical names, aliases, provider bindings, param mappings
- Category-based templates so models in the same category share 90% of mapping logic

---

## 5. Provider Support

| Provider | Skills | Auth Env Var | SDK/Protocol | Polling Pattern |
|----------|--------|-------------|-------------|-----------------|
| fal-ai | 1,199 | `FAL_KEY` | Native fetch | subscribe (built-in) |
| Replicate | 687 | `REPLICATE_API_TOKEN` | Native fetch | create + poll |
| WaveSpeed | 66 | `WAVESPEED_API_KEY` | Native fetch (REST) | create + poll |

**Decision:** Use native `fetch` for all providers (no provider SDKs). This keeps the dependency footprint minimal and gives full control over HTTP behavior.

---

## 6. Model Categories (16 total)

| # | Category | Input | Output | Priority | Phase |
|---|----------|-------|--------|----------|-------|
| 1 | `text-to-image` | text | image | P0 | 0 |
| 2 | `image-edit` | image + text | image | P1 | 2 |
| 3 | `text-to-video` | text | video | P1 | 2 |
| 4 | `image-to-video` | image + text | video | P1 | 2 |
| 5 | `upscale-image` | image | image | P2 | 2 |
| 6 | `text-to-audio` | text | audio | P2 | 2 |
| 7 | `audio-to-text` | audio | text | P2 | 2 |
| 8 | `remove-background` | image/video | image/video | P2 | 2 |
| 9 | `image-to-image` | image + text | image | P2 | 2 |
| 10 | `text-to-3d` | text | 3d | P3 | 2 |
| 11 | `image-to-3d` | image | 3d | P3 | 2 |
| 12 | `upscale-video` | video | video | P3 | 2 |
| 13 | `video-to-audio` | video | audio | P3 | 2 |
| 14 | `segmentation` | image/video | segmentation | P3 | 2 |
| 15 | `moderation` | text/image/video | text | P3 | 2 |
| 16 | `training` | images | model | P3 | 3 |

---

## 7. Inventory Summary

| Metric | Count |
|--------|-------|
| Total skill files | 1,954 |
| fal-ai skills | 1,199 |
| Replicate skills | 687 |
| WaveSpeed skills | 66 |
| Model categories | 16 |
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
- **Parameter divergence:** Same concept named differently across providers (`num_images` vs `num_outputs` vs undocumented). Category templates will handle ~90%, but ~10% need model-specific overrides.
- **Safety boolean inversion:** fal-ai uses `enable_safety_checker: true`, Replicate uses `disable_safety_checker: false`. Mapper must flip correctly.

### Medium Risk
- **Output shape varies by category per provider:** fal-ai returns `{ images: [...] }` for images but `{ video: { url } }` for video. Each category needs its own `parseOutput`.
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
- Registry covers all text-to-image models
- Unit test coverage >= 80% for src/
- Zero TypeScript errors

### Phase 1 (Multi-Provider)
- Same model works through all 3 providers
- Provider auto-selection based on available keys
- All text-to-image models mapped and tested

### Phase 2 (Expand Modalities)
- At least 8 of 16 categories working
- Each category has integration tests
- No regressions in existing categories

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
Project bootstrap            Replicate adapter           image-edit category        Streaming support
Type definitions             WaveSpeed adapter           text-to-video category     CLI tool
Skill cataloger              Provider routing            image-to-video category    Web playground
Registry generator           Cross-provider tests        upscale-image category     Documentation site
Auth manager                 Full text-to-image          text-to-audio category     npm publish
fal-ai adapter               coverage across all         audio-to-text category     Cost estimation
Input/output mapper          3 providers                 remove-background cat.     Provider preference
Model resolver                                          + remaining categories
Gateway orchestration
text-to-image category
End-to-end test
```

---

## 14. File Structure

```
getaiapi/
  src/
    index.ts              # Public API: generate, listModels, getModel
    gateway.ts            # Core orchestration
    resolver.ts           # Model name resolution
    auth.ts               # Token management
    mapper.ts             # Input/output mapping engine
    types.ts              # All shared types
    errors.ts             # Unified error types
    adapters/
      base.ts             # ProviderAdapter interface
      fal-ai.ts           # fal-ai adapter
      replicate.ts        # Replicate adapter
      wavespeed.ts        # WaveSpeed adapter
    categories/
      text-to-image.ts    # First category template
      ...                 # One per category
  registry/
    registry.json         # Generated model registry
    categories.json       # Category taxonomy
  scripts/
    catalog.ts            # SKILL.md parser -> catalog
    generate-registry.ts  # Catalog -> registry.json
  skills/                 # 1,954 existing skill definitions
  tests/
    unit/
      resolver.test.ts
      mapper.test.ts
      auth.test.ts
      adapters/
        fal-ai.test.ts
        replicate.test.ts
        wavespeed.test.ts
    integration/
      generate.test.ts
    catalog/
      schema-validation.test.ts
    e2e/
      smoke.test.ts       # Gated by env var
    fixtures/
      fal-ai/text-to-image/flux-schnell.json
      replicate/text-to-image/flux-schnell.json
      wavespeed/text-to-image/z-image-turbo.json
  docs/
    ARCHITECTURE.md
    PRODUCT-SPEC.md
  package.json
  tsconfig.json
  vitest.config.ts
  README.md
```
