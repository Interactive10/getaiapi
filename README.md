# getaiapi

**One function to call any AI model.**

[![npm version](https://img.shields.io/npm/v/getaiapi)](https://www.npmjs.com/package/getaiapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

A unified TypeScript library that wraps 1,929 AI models across 3 providers into a single `generate()` function. One input shape. One output shape. Any model.

## Install

```bash
npm install getaiapi
```

## Quick Start

```typescript
import { generate } from 'getaiapi'

const result = await generate({
  model: 'flux-schnell',
  prompt: 'a cat wearing sunglasses'
})

console.log(result.outputs[0].url)
```

## More Examples

**Text-to-video**

```typescript
const video = await generate({
  model: 'veo3.1',
  prompt: 'a timelapse of a flower blooming in a garden'
})
```

**Image editing**

```typescript
const edited = await generate({
  model: 'gpt-image-1.5-edit',
  image: 'https://example.com/photo.jpg',
  prompt: 'add a rainbow in the sky'
})
```

**Text-to-speech**

```typescript
const speech = await generate({
  model: 'elevenlabs-v3',
  prompt: 'Hello, welcome to getaiapi.',
  options: { voice_id: 'rachel' }
})
```

**Upscale an image**

```typescript
const upscaled = await generate({
  model: 'topaz-upscale-image',
  image: 'https://example.com/low-res.jpg'
})
```

**Remove background**

```typescript
const cutout = await generate({
  model: 'birefnet-v2',
  image: 'https://example.com/portrait.jpg'
})
```

## Configuration

Set API keys as environment variables for the providers you want to use. You only need keys for the providers you plan to call.

```bash
# fal-ai (1,199 models)
export FAL_KEY="your-fal-key"

# Replicate (687 models)
export REPLICATE_API_TOKEN="your-replicate-token"

# WaveSpeed (43 models)
export WAVESPEED_API_KEY="your-wavespeed-key"
```

Models are automatically filtered to only show providers where you have a valid key configured.

## Model Discovery

```typescript
import { listModels, getModel } from 'getaiapi'

// List all available models (filtered by your API keys)
const all = listModels()

// Filter by category
const imageModels = listModels({ category: 'text-to-image' })

// Filter by provider
const falModels = listModels({ provider: 'fal-ai' })

// Search by name
const fluxModels = listModels({ query: 'flux' })

// Get details for a specific model
const model = getModel('flux-schnell')
// => { canonical_name, aliases, category, modality, providers }
```

## Supported Categories

| Category | Input | Output | Models |
|---|---|---|---|
| `text-to-image` | text | image | 828 |
| `text-to-video` | text | video | 308 |
| `image-edit` | image + text | image | 213 |
| `image-to-video` | image + text | video | 178 |
| `text-to-audio` | text | audio | 76 |
| `upscale-image` | image | image | 59 |
| `training` | images | model | 50 |
| `image-to-image` | image + text | image | 43 |
| `segmentation` | image/video | segmentation | 34 |
| `image-to-3d` | image | 3d | 31 |
| `audio-to-text` | audio | text | 25 |
| `remove-background` | image/video | image/video | 24 |
| `text-to-3d` | text | 3d | 19 |
| `video-to-audio` | video | audio | 18 |
| `upscale-video` | video | video | 15 |
| `moderation` | text/image/video | text | 8 |

## Providers

| Provider | Models | Auth Env Var | Protocol |
|---|---|---|---|
| fal-ai | 1,199 | `FAL_KEY` | Native fetch |
| Replicate | 687 | `REPLICATE_API_TOKEN` | Native fetch |
| WaveSpeed | 43 | `WAVESPEED_API_KEY` | Native fetch |

Zero external dependencies -- all provider communication uses native `fetch`.

## API Reference

### `generate(request: GenerateRequest): Promise<GenerateResponse>`

The core function. Resolves the model, maps parameters, calls the provider, and returns a unified response.

**GenerateRequest**

```typescript
interface GenerateRequest {
  model: string                                    // required - model name
  prompt?: string                                  // text prompt
  image?: string | File                            // input image (URL or File)
  audio?: string | File                            // input audio
  video?: string | File                            // input video
  negative_prompt?: string                         // what to avoid
  count?: number                                   // number of outputs
  size?: string | { width: number; height: number } // output dimensions
  seed?: number                                    // reproducibility seed
  guidance?: number                                // guidance scale
  steps?: number                                   // inference steps
  strength?: number                                // denoising strength
  format?: 'png' | 'jpeg' | 'webp' | 'mp4' | 'mp3' | 'wav' | 'obj' | 'glb'
  quality?: number                                 // output quality
  safety?: boolean                                 // enable safety checker
  options?: Record<string, unknown>                // provider-specific overrides
}
```

**GenerateResponse**

```typescript
interface GenerateResponse {
  id: string
  model: string
  provider: string
  status: 'completed' | 'failed'
  outputs: OutputItem[]
  metadata: {
    seed?: number
    inference_time_ms?: number
    cost?: number
    safety_flagged?: boolean
  }
}

interface OutputItem {
  type: 'image' | 'video' | 'audio' | 'text' | '3d' | 'segmentation'
  url: string
  content_type: string
  size_bytes?: number
}
```

### `listModels(filters?: ListModelsFilters): ModelEntry[]`

Returns all models the caller has API keys for. Accepts optional filters:

- `category` -- filter by model category (e.g. `'text-to-image'`)
- `provider` -- filter by provider (e.g. `'fal-ai'`)
- `query` -- search canonical names and aliases

### `getModel(name: string): ModelEntry`

Resolves a model by name. Accepts canonical names, aliases, and normalized variants. Throws `ModelNotFoundError` if no match is found.

## Error Handling

All errors extend `GetAIApiError` and can be caught uniformly or by type:

| Error | When |
|---|---|
| `AuthError` | Missing or invalid API key for a provider |
| `ModelNotFoundError` | Model name could not be resolved |
| `ValidationError` | Invalid input parameters |
| `ProviderError` | Provider returned an error response |
| `TimeoutError` | Generation exceeded the timeout |
| `RateLimitError` | Provider returned HTTP 429 |

```typescript
import { generate, AuthError, ModelNotFoundError } from 'getaiapi'

try {
  const result = await generate({ model: 'flux-schnell', prompt: 'a cat' })
} catch (err) {
  if (err instanceof AuthError) {
    console.error(`Set ${err.envVar} to use ${err.provider}`)
  }
  if (err instanceof ModelNotFoundError) {
    console.error(err.message) // includes "did you mean" suggestions
  }
}
```

## Documentation

Full documentation available at [interactive10.com/getaiapi.html](https://www.interactive10.com/getaiapi.html)

## License

MIT
