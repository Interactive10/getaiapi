---
name: v2-guide
description: >
  How to use the getaiapi V2 modality-first architecture. Covers generate, discovery, provider switching, param mapping, and migration from V1.
---

# getaiapi V2 — Modality-First Architecture

V2 eliminates category templates. Each model is self-contained with its own `param_map` and `output_map`. Discovery filters by modality (input/output type) instead of category strings.

---

## Quick Start

### 1. Install

```bash
npm install getaiapi
```

### 2. Set API Keys

```bash
# Set one or more provider keys
export FAL_KEY="your-fal-key"
export REPLICATE_API_TOKEN="your-replicate-token"
export WAVESPEED_API_KEY="your-wavespeed-key"
export OPENROUTER_API_KEY="your-openrouter-key"
```

### 3. Generate

```typescript
import { generate } from 'getaiapi/v2'

const result = await generate({
  model: 'flux-schnell',
  prompt: 'a cat astronaut floating in space',
  size: '1024x1024',
  count: 2,
})

console.log(result.outputs) // [{ type: 'image', url: '...', content_type: 'image/png' }, ...]
```

---

## Core Concepts

### No More Categories

V1 routed requests through shared category templates (`text-to-image`, `image-to-video`, etc.). This caused constant bugs — wrong categories, mismatches, and rigid coupling.

V2 removes the `category` field entirely. Each model declares:
- **`modality.inputs`** — what it accepts (`text`, `image`, `audio`, `video`)
- **`modality.outputs`** — what it produces (`image`, `video`, `audio`, `text`, `3d`, `segmentation`)
- **`param_map`** — per-provider parameter mapping, embedded directly on the model

### Self-Contained Models

Every provider binding carries its own `param_map`:

```json
{
  "canonical_name": "flux-schnell",
  "modality": { "inputs": ["text"], "outputs": ["image"] },
  "providers": [
    {
      "provider": "fal-ai",
      "endpoint": "fal-ai/flux/schnell",
      "param_map": {
        "prompt": "prompt",
        "count": "num_images",
        "size": "image_size",
        "guidance": "guidance_scale",
        "safety": "enable_safety_checker"
      },
      "output_map": { "type": "image", "extract_path": "images[].url" }
    },
    {
      "provider": "replicate",
      "endpoint": "black-forest-labs/flux-schnell",
      "param_map": {
        "prompt": "prompt",
        "count": "num_outputs",
        "size": ["width", "height"],
        "guidance": "guidance",
        "safety": "disable_safety_checker"
      },
      "output_map": { "type": "image", "extract_path": "output[]" }
    }
  ]
}
```

No template lookup. The model IS the mapping.

---

## API Reference

### `generate(request)`

Generates content using a model.

```typescript
import { generate } from 'getaiapi/v2'

const result = await generate({
  model: 'flux-schnell',       // required — canonical name or alias
  provider: 'replicate',       // optional — force a specific provider
  prompt: 'a sunset over mars',
  negative_prompt: 'blurry',
  count: 4,
  size: '1024x768',            // or { width: 1024, height: 768 }
  seed: 42,
  guidance: 7.5,
  steps: 20,
  strength: 0.8,
  format: 'png',
  quality: 90,
  safety: true,
  options: {                   // passthrough params sent directly to provider
    custom_param: 'value',
  },
})
```

**Response:**

```typescript
{
  id: 'uuid',
  model: 'flux-schnell',
  provider: 'replicate',
  status: 'completed',
  outputs: [
    { type: 'image', url: 'https://...', content_type: 'image/png' }
  ],
  metadata: {
    seed: 42,
    inference_time_ms: 3200,
    safety_flagged: false,
  }
}
```

### Universal Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `model` | `string` | Model name, alias, or fuzzy match |
| `provider` | `string` | Force a provider: `fal-ai`, `replicate`, `wavespeed`, `openrouter` |
| `prompt` | `string` | Text prompt |
| `image` | `string \| File` | Input image (URL or file) |
| `images` | `(string \| File)[]` | Multiple input images |
| `audio` | `string \| File` | Input audio |
| `video` | `string \| File` | Input video |
| `negative_prompt` | `string` | What to avoid |
| `count` | `number` | Number of outputs |
| `size` | `string \| object` | Output dimensions (`"1024x768"` or `{ width, height }`) |
| `seed` | `number` | Reproducibility seed |
| `guidance` | `number` | Classifier-free guidance scale |
| `steps` | `number` | Inference steps |
| `strength` | `number` | Transformation strength (0-1) |
| `format` | `string` | Output format (`png`, `jpeg`, `mp4`, etc.) |
| `quality` | `number` | Output quality (0-100) |
| `safety` | `boolean` | Enable safety checker |
| `options` | `object` | Passthrough params — sent directly to the provider |

You write the same request regardless of provider. V2 maps each parameter to the provider's expected name using `param_map`.

---

### `listModels(filters?)`

Discover models by what they do, not what category they're in.

```typescript
import { listModels } from 'getaiapi/v2'

// All text-to-image models
listModels({ input: 'text', output: 'image' })

// All models that accept images (edit, upscale, i2v, etc.)
listModels({ input: 'image' })

// Video models on fal-ai
listModels({ output: 'video', provider: 'fal-ai' })

// Search by name
listModels({ query: 'flux' })

// Combine filters
listModels({ input: 'text', output: 'video', provider: 'replicate', query: 'wan' })
```

**Filters:**

| Filter | Type | Description |
| --- | --- | --- |
| `input` | `'text' \| 'image' \| 'audio' \| 'video'` | Models that accept this input type |
| `output` | `'image' \| 'video' \| 'audio' \| 'text' \| '3d' \| 'segmentation'` | Models that produce this output type |
| `provider` | `string` | Models available on this provider |
| `query` | `string` | Substring match on name and aliases |

### `deriveCategory(model)`

Get a display label from modality (for UI rendering, not routing).

```typescript
import { listModels, deriveCategory } from 'getaiapi/v2'

const models = listModels({ output: 'video' })
models.forEach(m => console.log(`${m.canonical_name}: ${deriveCategory(m)}`))
// kling-video-v2: image-to-video
// wan-t2v:        text-to-video
// topaz-v2v:      video-to-video
```

### `resolveModel(name)`

Look up a model by name, alias, or fuzzy match.

```typescript
import { resolveModel } from 'getaiapi/v2'

const model = resolveModel('flux-schnell')
console.log(model.canonical_name)  // 'flux-schnell'
console.log(model.providers)       // [{ provider: 'fal-ai', ... }, { provider: 'replicate', ... }]
```

---

## Provider Switching

Same model, different provider — zero code changes:

```typescript
import { generate } from 'getaiapi/v2'

// Default: picks first provider you have a key for
const a = await generate({ model: 'flux-schnell', prompt: 'hello' })
// a.provider → 'fal-ai'

// Force replicate
const b = await generate({ model: 'flux-schnell', prompt: 'hello', provider: 'replicate' })
// b.provider → 'replicate'
```

What happens under the hood:
- **fal-ai**: `count` → `num_images`, `size` → `image_size` (as `{ width, height }`)
- **replicate**: `count` → `num_outputs`, `size` → `width` + `height` (spread into two params)
- **safety flip**: fal-ai gets `enable_safety_checker: true`, replicate gets `disable_safety_checker: false`

You don't think about any of this. The `param_map` handles it.

---

## Passthrough with `options`

For provider-specific params not in the universal schema, use `options`:

```typescript
await generate({
  model: 'flux-schnell',
  prompt: 'hello',
  options: {
    acceleration: 'high',      // fal-ai specific
    sync_mode: true,           // fal-ai specific
  },
})
```

`options` values are merged into the final provider params and win on conflict.

---

## Advanced: Direct Mapper

Use `mapInput` directly to see what gets sent to a provider:

```typescript
import { resolveModel, mapInput } from 'getaiapi/v2'

const model = resolveModel('flux-schnell')

// See what fal-ai receives
const falParams = mapInput(
  { model: 'flux-schnell', prompt: 'hello', count: 3, size: '1024x768', safety: true },
  model.providers[0], // fal-ai
)
// { prompt: 'hello', num_images: 3, image_size: { width: 1024, height: 768 }, enable_safety_checker: true }

// See what replicate receives
const repParams = mapInput(
  { model: 'flux-schnell', prompt: 'hello', count: 3, size: '1024x768', safety: true },
  model.providers[1], // replicate
)
// { prompt: 'hello', num_outputs: 3, width: 1024, height: 768, disable_safety_checker: false }
```

---

## Migration from V1

| V1 | V2 |
| --- | --- |
| `import { generate } from 'getaiapi'` | `import { generate } from 'getaiapi/v2'` |
| `listModels({ category: 'text-to-image' })` | `listModels({ input: 'text', output: 'image' })` |
| No `provider` option on generate | `generate({ ..., provider: 'replicate' })` |
| Category templates define mappings | Each model carries its own `param_map` |
| `registry/registry.json` | `registry/v2/registry.json` |

Request and response shapes are identical. Your `prompt`, `size`, `count`, etc. all work the same way.

---

## Tips

- Set multiple API keys to get automatic failover — if fal-ai is down, it tries replicate.
- Use `provider` to pin a specific backend when you need deterministic routing.
- Use `options` for any provider-specific param not in the universal schema.
- Use `deriveCategory()` for display labels — don't hardcode category strings.
- The V2 registry lives at `registry/v2/registry.json` — V1 is untouched.
