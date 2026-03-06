# getaiapi - Unified AI API Gateway

## Architecture Document

**Author:** Architect Agent
**Date:** 2026-03-06
**Status:** Draft / RFC

---

## 1. Problem Statement

We have 200+ AI model skills spread across 3 providers (fal-ai, Replicate, WaveSpeed), each with:
- Different authentication mechanisms
- Different async/polling patterns
- Different input parameter naming conventions
- Different output structures
- Overlapping models (same model available on multiple providers)

**Goal:** Build an open-source unified API gateway that lets users call any supported model through a single, consistent interface — just specify the model name and inputs.

---

## 2. Core Design Principles

1. **One function to rule them all** — `generate(model, inputs)` is the entire public API
2. **Model-as-config** — Each model is a config file (adapter), not code
3. **Provider-agnostic** — Users think in models, not providers
4. **Progressive disclosure** — Simple things simple, complex things possible
5. **Token-gated** — Users can only access models for which they have provider API keys

---

## 3. Unified I/O Contract

### 3.1 Universal Input Schema

Every request goes through a single shape. Fields that don't apply to a model are ignored.

```typescript
interface GenerateRequest {
  // REQUIRED
  model: string           // e.g. "flux-schnell", "veo3.1", "seedream-4.5"

  // CONTENT INPUTS (at least one required, depends on model capability)
  prompt?: string         // Text prompt
  image?: string | File   // URL, base64 data URI, or File object
  audio?: string | File   // URL, base64 data URI, or File object
  video?: string | File   // URL, base64 data URI, or File object

  // GENERATION OPTIONS (all optional, sensible defaults per model)
  negative_prompt?: string
  count?: number          // How many outputs (maps to num_images / num_outputs / etc.)
  size?: string | { width: number; height: number }  // "1024x1024" or object
  seed?: number
  guidance?: number       // CFG scale / guidance_scale
  steps?: number          // Inference steps where applicable
  strength?: number       // For img2img / edit operations

  // OUTPUT FORMAT
  format?: "png" | "jpeg" | "webp" | "mp4" | "mp3" | "wav" | "obj" | "glb"
  quality?: number        // 1-100

  // SAFETY
  safety?: boolean        // Enable/disable safety checker (default: true)

  // PASSTHROUGH
  options?: Record<string, unknown>  // Model-specific params passed directly
}
```

### 3.2 Universal Output Schema

Every response returns the same shape regardless of provider or modality.

```typescript
interface GenerateResponse {
  id: string                    // Unique request ID
  model: string                 // Resolved model identifier
  provider: string              // Which provider fulfilled this
  status: "completed" | "failed"
  outputs: OutputItem[]         // The generated content
  metadata: {
    seed?: number
    inference_time_ms?: number
    cost?: number               // If available from provider
    safety_flagged?: boolean
  }
}

interface OutputItem {
  type: "image" | "video" | "audio" | "text" | "3d" | "segmentation"
  url: string                   // URL to the generated asset
  content_type: string          // MIME type
  size_bytes?: number
}
```

**Key decisions:**
- `outputs` is always an array (even for single outputs) — consistent iteration
- `type` is a high-level enum, `content_type` has the MIME detail
- URLs are always returned (base64 is converted to a hosted URL or temp file)

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client SDK                        │
│              generate(model, inputs)                 │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│                  API Gateway                         │
│                                                      │
│  ┌────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │   Model     │  │   Input    │  │    Auth        │  │
│  │  Resolver   │  │  Mapper    │  │   Manager      │  │
│  └─────┬──────┘  └─────┬──────┘  └──────┬────────┘  │
│        │               │                │            │
│        ▼               ▼                ▼            │
│  ┌──────────────────────────────────────────────┐    │
│  │              Provider Router                  │    │
│  └──────┬──────────────┬───────────────┬────────┘    │
│         │              │               │             │
│         ▼              ▼               ▼             │
│  ┌──────────┐   ┌──────────┐   ┌──────────────┐     │
│  │  fal-ai  │   │Replicate │   │  WaveSpeed   │     │
│  │ Adapter  │   │ Adapter  │   │   Adapter    │     │
│  └──────────┘   └──────────┘   └──────────────┘     │
└─────────────────────────────────────────────────────┘
```

### 4.1 Component Breakdown

#### Model Resolver
- Takes user input like `"flux-schnell"` and resolves to a specific provider + endpoint
- Handles **fuzzy matching**: `"flux schnell"`, `"flux_schnell"`, `"FLUX-Schnell"` all resolve to the same model
- Uses a **model registry** (generated from skill files) with aliases
- Picks the best available provider based on: user's API keys → preference → cost → speed

```typescript
// Model registry entry (generated from SKILL.md files)
interface ModelEntry {
  canonical_name: string        // "flux-schnell"
  aliases: string[]             // ["flux_schnell", "fal-ai-flux-schnell", ...]
  category: ModelCategory       // "text-to-image"
  modality: {
    inputs: InputType[]         // ["text"]
    outputs: OutputType[]       // ["image"]
  }
  providers: ProviderBinding[]  // Which providers offer this model
}

interface ProviderBinding {
  provider: "fal-ai" | "replicate" | "wavespeed"
  skill_id: string              // "fal-ai-flux-schnell"
  endpoint: string              // API endpoint
  auth_env: string              // "FAL_KEY"
  param_map: Record<string, string>  // Maps universal → provider params
  output_map: OutputMapping     // Maps provider response → universal output
}
```

#### Input Mapper
- Translates universal input params to provider-specific params
- `count` → `num_images` (fal-ai) / `num_outputs` (Replicate)
- `size: "1024x1024"` → `image_size: { width: 1024, height: 1024 }` (fal-ai) / `width: 1024, height: 1024` (Replicate)
- `guidance` → `guidance_scale` / `guidance` depending on provider
- Drops params the model doesn't support (no errors for unused fields)

#### Auth Manager
- Reads API keys from environment variables or config
- Determines which providers the user has access to
- **Token-gating**: if user has no `FAL_KEY`, fal-ai models are unavailable
- Reports available models based on configured keys

#### Provider Adapters
Each adapter handles one provider's HTTP protocol:

| Concern | fal-ai | Replicate | WaveSpeed |
|---------|--------|-----------|-----------|
| **Auth** | `Authorization: Key $FAL_KEY` | `Authorization: Bearer $REPLICATE_API_TOKEN` | `Authorization: Bearer $WAVESPEED_API_KEY` |
| **Submit** | `fal.subscribe()` | `POST /predictions` | `POST /api/v2/wavespeed/...` |
| **Poll** | `fal.queue.status()` | `GET /predictions/{id}` | `GET /predictions/{id}/result` |
| **Webhook** | Supported | Supported | Supported |
| **Async pattern** | Subscribe (built-in polling) | Create + poll loop | Create + poll loop |

Each adapter implements:
```typescript
interface ProviderAdapter {
  name: string
  submit(endpoint: string, params: Record<string, unknown>, auth: string): Promise<ProviderResponse>
  poll(taskId: string, auth: string): Promise<ProviderResponse>
  parseOutput(raw: unknown): OutputItem[]
}
```

---

## 5. Intelligent Model Name Resolution

Users shouldn't need to know exact provider naming. The resolver uses a multi-step strategy:

```
User input: "seedream 4.5"
     │
     ▼
1. Exact match in registry?  → No
2. Normalize (lowercase, strip spaces/hyphens/underscores)
   "seedream45" → check aliases → match!
3. Fuzzy match (Levenshtein distance < 3)
   → "bytedance-seedream-v4.5" ✓
4. Prefix match
   "seedream" → multiple matches → pick best version
5. No match → throw with suggestions
   "Did you mean: seedream-4.5, seedream-5-lite?"
```

**Alias generation from skill names:**
```
Skill: "fal-ai-bytedance-seedream-v4.5-text-to-image"
Generated aliases:
  - "seedream-4.5"
  - "seedream-v4.5"
  - "bytedance-seedream-4.5"
  - "seedream-4.5-text-to-image"
```

---

## 6. Model Categories (Modality Taxonomy)

Before implementing adapters for all 200+ skills, we categorize them:

| Category | Input | Output | Examples |
|----------|-------|--------|----------|
| `text-to-image` | text | image | flux-schnell, imagen-4, seedream |
| `image-to-image` | image + text | image | flux-kontext, image-edit models |
| `text-to-video` | text | video | veo3.1, sora-2, kling |
| `image-to-video` | image (+ text) | video | kling-i2v, wan-2.5-i2v |
| `text-to-audio` | text | audio | elevenlabs-tts, minimax-music |
| `audio-to-text` | audio | text | whisper |
| `image-to-3d` | image | 3d | meshy6-image-to-3d |
| `text-to-3d` | text | 3d | hunyuan-3d |
| `upscale-image` | image | image | topaz-upscale, esrgan, seedvr |
| `upscale-video` | video | video | topaz-upscale-video, flashvsr |
| `remove-background` | image/video | image/video | birefnet, bria-bg-remove |
| `segmentation` | image/video | segmentation | sam3-image, sam3-video |
| `image-edit` | image + text | image | gpt-image-edit, qwen-image-edit |
| `video-to-audio` | video | audio | kling-video-to-audio, hunyuan-foley |
| `moderation` | text/image/video | text | molmo2-content-moderator |
| `training` | images | model | flux-lora-training, z-image-trainer |

---

## 7. Phased Implementation Strategy

This is a multi-week effort. We don't need the whole plan on day one.

### Phase 0: Foundation (Week 1)
**Goal:** Core framework + 1 working category

1. **Skill Cataloger** — Script that reads all `skills/*/SKILL.md` files and auto-categorizes them by modality (parse the name + description, assign category from Section 6 taxonomy)
2. **Model Registry Generator** — Produces a `registry.json` from the catalog with canonical names, aliases, provider bindings
3. **Core Gateway** — `generate()` function, model resolver, auth manager
4. **fal-ai adapter** — First provider (cleanest SDK)
5. **text-to-image integration** — First category (simplest I/O: text in, image URL out)
6. **End-to-end test:** `generate({ model: "flux-schnell", prompt: "a cat" })` → image URL

### Phase 1: Multi-Provider (Week 2)
**Goal:** Same model, multiple providers

1. **Replicate adapter**
2. **WaveSpeed adapter**
3. **Provider routing** — If user has both FAL_KEY and REPLICATE_API_TOKEN, pick the better provider for `flux-schnell`
4. **text-to-image across all 3 providers** — Generate task files per model from registry
5. **Input/output mapping tests** for each provider's quirks

### Phase 2: Expand Modalities (Week 3-4)
**Goal:** Cover all major categories

Priority order (by user demand):
1. `image-edit` (high demand, similar to text-to-image)
2. `text-to-video` (high value)
3. `image-to-video`
4. `upscale-image`
5. `text-to-audio` / TTS
6. `audio-to-text` / STT
7. `remove-background`
8. Everything else

Each modality expansion is a self-contained task:
- Add category-specific input validation
- Add output type handling
- Generate + verify adapter mappings for all models in category
- Write integration tests

### Phase 3: Polish (Week 5+)
- Streaming support for video/audio generation progress
- Cost estimation before generation
- Rate limiting and retry logic
- CLI tool
- Web playground
- Documentation site

---

## 8. Task Generation Strategy

> "There are too many skills to generate a task for each one right now"

Correct. Here's the approach:

### 8.1 Automated Skill Cataloger (Do This First)

A script that parses every `skills/*/SKILL.md` and produces a structured catalog:

```typescript
// cataloger output
interface SkillCatalog {
  categories: Record<ModelCategory, SkillEntry[]>
  providers: Record<string, SkillEntry[]>
  duplicates: DuplicateGroup[]  // Same model on multiple providers
}

interface SkillEntry {
  skill_id: string           // "fal-ai-flux-schnell"
  provider: string           // "fal-ai"
  model_family: string       // "flux-schnell"
  category: ModelCategory    // "text-to-image"
  description: string
  release_date?: string      // ISO date: "2024-06" (year-month minimum)
  deprecated: boolean        // Flagged if model is too old or superseded
}
```

This gives us:
- Total count per category (so we know the scope)
- Duplicate detection (same model on 2-3 providers — high-value targets)
- Priority ranking by category
- **Age-based filtering** — skip models that are too old to be worth supporting

### 8.1.1 Release Date Discovery

The cataloger should determine when each model was released, so we can deprioritize or exclude outdated models. Sources for release date (in priority order):

1. **Version number heuristics** — Model names contain version info that maps to known release windows (e.g. `stable-diffusion-3.5` → Oct 2024, `flux-schnell` → Aug 2024, `veo3.1` → 2025)
2. **SKILL.md content** — Some skill files reference docs or changelogs with dates
3. **Provider API metadata** — Replicate exposes model creation dates; fal-ai and WaveSpeed may have similar
4. **Git history** — `git log` on when the skill file was first committed gives a lower bound
5. **Manual override** — A `release_dates.json` file for corrections

**Deprecation policy:**
- Models older than 24 months are flagged `deprecated: true` by default
- Deprecated models are excluded from registry generation unless explicitly included
- Models with a newer version in the same family auto-deprecate the older one (e.g. `seedream-4.5` deprecates `seedream-3`)
- The cutoff is configurable: `--max-age-months=24`

### 8.2 Category-First Task Generation

Instead of one task per model, generate tasks per category:

```
Task: "Implement text-to-image category"
  Subtask: "Create param mapping for fal-ai text-to-image models (N models)"
  Subtask: "Create param mapping for replicate text-to-image models (M models)"
  Subtask: "Create param mapping for wavespeed text-to-image models (K models)"
  Subtask: "Integration tests for category"
```

### 8.3 Adapter Generation via Templates

Within a category, most models share 90% of the same params. Generate adapters from a category template:

```yaml
# Template: text-to-image
common_inputs:
  prompt: { required: true }
  negative_prompt: { required: false }
  count: { maps_to: { fal-ai: "num_images", replicate: "num_outputs", wavespeed: "num_outputs" } }
  size: { maps_to: { fal-ai: "image_size", replicate: ["width", "height"], wavespeed: "resolution" } }
  guidance: { maps_to: { fal-ai: "guidance_scale", replicate: "guidance", wavespeed: "guidance_scale" } }
  seed: { universal: true }
  format: { maps_to: { fal-ai: "output_format", replicate: "output_format", wavespeed: "output_format" } }

common_outputs:
  type: "image"
  extract: { fal-ai: "images[].url", replicate: "output[]", wavespeed: "outputs[]" }
```

Model-specific overrides only for models that diverge from the category template.

### 8.4 Filtering Prompt for Claude

When ready to expand a category, use a prompt like:

> "Read all skills in the `text-to-image` category from the catalog. For each, read its SKILL.md and generate a provider binding entry in the registry. Flag any model that has params not covered by the category template."

This makes each category a bounded, parallelizable unit of work.

---

## 9. Fuzzy Model Name Matching

To handle provider naming differences intelligently:

```typescript
function normalizeModelName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')   // strip all non-alphanumeric
    .replace(/^v(\d)/, '$1')     // strip leading 'v' from versions
}

function findModel(query: string, registry: ModelEntry[]): ModelEntry | null {
  const normalized = normalizeModelName(query)

  // 1. Exact canonical match
  // 2. Alias match
  // 3. Normalized substring match
  // 4. Levenshtein fuzzy match (threshold: 3)
  // 5. Return null with suggestions
}
```

Examples of intelligent resolution:
- `"flux schnell"` → strip spaces → `"fluxschnell"` → match `flux-schnell`
- `"GPT Image 1.5"` → `"gptimage15"` → match `gpt-image-1.5`
- `"kling v2.6 pro"` → match `kling-video-v2.6-pro-*` → ask user to pick sub-variant (text-to-video vs image-to-video) or infer from provided inputs

---

## 10. Token Gating

```typescript
class AuthManager {
  private keys: Map<string, string>

  constructor() {
    this.keys = new Map()
    if (process.env.FAL_KEY) this.keys.set('fal-ai', process.env.FAL_KEY)
    if (process.env.REPLICATE_API_TOKEN) this.keys.set('replicate', process.env.REPLICATE_API_TOKEN)
    if (process.env.WAVESPEED_API_KEY) this.keys.set('wavespeed', process.env.WAVESPEED_API_KEY)
  }

  availableProviders(): string[] {
    return [...this.keys.keys()]
  }

  getKey(provider: string): string {
    const key = this.keys.get(provider)
    if (!key) throw new Error(
      `No API key for ${provider}. Set ${ENV_MAP[provider]} environment variable.`
    )
    return key
  }

  canAccess(model: ModelEntry): boolean {
    return model.providers.some(p => this.keys.has(p.provider))
  }

  listAvailableModels(registry: ModelEntry[]): ModelEntry[] {
    return registry.filter(m => this.canAccess(m))
  }
}
```

---

## 11. Tech Stack Recommendation

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Language** | TypeScript | Type safety for complex mappings, good AI SDK ecosystem |
| **Runtime** | Node.js (Bun optional) | Widest adoption for open-source |
| **Package** | Published to npm | `npm install getaiapi` |
| **HTTP Client** | Native fetch | No dependencies, works everywhere |
| **Registry** | JSON file (generated) | Simple, versionable, no DB needed |
| **Cataloger** | Node script | Parses SKILL.md → registry.json |
| **Testing** | Vitest | Fast, TypeScript-native |
| **Docs** | README + TypeDoc | Low maintenance |

---

## 12. User Experience

### Simplest possible usage:

```typescript
import { generate } from 'getaiapi'

// Text to image
const result = await generate({
  model: 'flux-schnell',
  prompt: 'a cat wearing sunglasses'
})
console.log(result.outputs[0].url)

// Image to video
const video = await generate({
  model: 'kling-v2.6-pro',
  image: 'https://example.com/cat.png',
  prompt: 'the cat turns its head'
})

// Text to speech
const speech = await generate({
  model: 'elevenlabs-v3',
  prompt: 'Hello world',
  options: { voice_id: 'rachel' }
})

// List available models (based on your API keys)
import { listModels } from 'getaiapi'
const models = listModels({ category: 'text-to-image' })
```

### Discovery:

```typescript
import { listModels, getModel } from 'getaiapi'

// What can I use?
listModels()                                    // All models you have keys for
listModels({ category: 'text-to-image' })       // Filter by category
listModels({ provider: 'replicate' })            // Filter by provider
listModels({ query: 'flux' })                    // Search

// Model details
const info = getModel('flux-schnell')
// { canonical_name, category, providers, supported_params, ... }
```

---

## 13. File Structure

```
getaiapi/
├── src/
│   ├── index.ts                 # Public API: generate, listModels, getModel
│   ├── gateway.ts               # Core orchestration
│   ├── resolver.ts              # Model name resolution + fuzzy matching
│   ├── auth.ts                  # Token management
│   ├── mapper.ts                # Input/output mapping engine
│   ├── adapters/
│   │   ├── base.ts              # ProviderAdapter interface
│   │   ├── fal-ai.ts
│   │   ├── replicate.ts
│   │   └── wavespeed.ts
│   ├── categories/              # Category-specific mapping templates
│   │   ├── text-to-image.ts
│   │   ├── image-to-video.ts
│   │   └── ...
│   └── types.ts                 # Shared types
├── registry/
│   ├── registry.json            # Generated model registry
│   └── categories.json          # Category taxonomy
├── scripts/
│   ├── catalog.ts               # Parse SKILL.md files → catalog
│   └── generate-registry.ts     # Catalog → registry.json
├── skills/                      # Existing skill definitions (source of truth)
├── tests/
├── package.json
└── README.md
```

---

## 14. Decision Log

| Decision | Choice | Alternative | Why |
|----------|--------|-------------|-----|
| Single `generate()` function | Yes | Separate `generateImage()`, `generateVideo()` | Simpler API, modality inferred from model |
| JSON registry over DB | JSON file | SQLite, Postgres | No infra needed, git-versioned, fast enough |
| Category-first implementation | Yes | Model-by-model | 10x less work, shared mappings |
| Fuzzy name matching | Yes | Strict exact match | Better UX, providers name things inconsistently |
| `options` passthrough | Yes | Strict schema only | Escape hatch for model-specific params |
| Arrays for outputs | Always array | Single item for single outputs | Consistent, no special cases |

---

## 15. Open Questions

1. **Streaming/progress** — Should `generate()` return a stream for long-running video tasks, or always await completion?
2. **File hosting** — When providers return base64, where do we host the file? Temp URL? Local file? Let user decide?
3. **Cost tracking** — Some providers expose cost per request. Should we normalize this?
4. **Provider preference** — When a model exists on multiple providers, how to rank? Speed? Cost? User preference?
5. **Rate limiting** — Handle per-provider rate limits internally or surface to user?

---

## Next Steps

1. **Approve this architecture** — Review and flag any concerns
2. **Run the Skill Cataloger** — Categorize all 200+ skills automatically
3. **Generate registry for `text-to-image`** — First category
4. **Build core gateway + fal-ai adapter** — First working end-to-end
5. **Expand from there** — One category at a time
