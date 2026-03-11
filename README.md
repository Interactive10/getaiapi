# getaiapi

**One function to call any AI model.**

[![npm version](https://img.shields.io/npm/v/getaiapi)](https://www.npmjs.com/package/getaiapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

A unified TypeScript library that wraps 1,876+ AI models across 4 providers into a single `generate()` function. One input shape. One output shape. Any model.

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

**Text generation (LLMs)**

```typescript
const answer = await generate({
  model: 'claude-sonnet-4-6',
  prompt: 'Explain quantum computing in one paragraph'
})

console.log(answer.outputs[0].content)
```

With system prompt and parameters:

```typescript
const reply = await generate({
  model: 'gpt-4o',
  prompt: 'Write a haiku about TypeScript',
  options: {
    system: 'You are a creative poet.',
    temperature: 0.9,
    max_tokens: 100,
  }
})
```

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

**Multi-image references** (e.g., character + location consistency)

```typescript
const scene = await generate({
  model: 'google-nano-banana-pro-edit',
  prompt: 'cinematic shot of the character in the location',
  image: 'https://example.com/character.jpg',
  images: [
    'https://example.com/character.jpg',
    'https://example.com/location.jpg',
  ],
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

### Option 1: Environment Variables

Set API keys as environment variables. You only need keys for the providers you plan to call.

```bash
# fal-ai (1,201 models)
export FAL_KEY="your-fal-key"

# Replicate (687 models)
export REPLICATE_API_TOKEN="your-replicate-token"

# WaveSpeed (66 models)
export WAVESPEED_API_KEY="your-wavespeed-key"

# OpenRouter (10+ LLM models — Claude, GPT, Gemini, Llama, etc.)
export OPENROUTER_API_KEY="your-openrouter-key"
```

### Option 2: Programmatic Configuration

Use `configure()` to set keys in code -- useful when your env vars have different names or keys come from a secrets manager.

```typescript
import { configure } from 'getaiapi'

configure({
  keys: {
    'fal-ai': process.env.MY_FAL_TOKEN,
    'replicate': process.env.MY_REPLICATE_TOKEN,
    'wavespeed': process.env.MY_WAVESPEED_TOKEN,
    'openrouter': process.env.MY_OPENROUTER_TOKEN,
  },
})
```

You can also set keys and storage together:

```typescript
configure({
  keys: {
    'fal-ai': 'your-fal-key',
  },
  storage: {
    accountId: 'your-r2-account',
    bucketName: 'your-bucket',
    accessKeyId: 'your-r2-key',
    secretAccessKey: 'your-r2-secret',
    publicUrlBase: 'https://cdn.example.com',
  },
})
```

Or set just provider keys with `configureAuth()`:

```typescript
import { configureAuth } from 'getaiapi'

configureAuth({
  'fal-ai': myKeyVault.get('fal'),
  'replicate': myKeyVault.get('replicate'),
})
```

Programmatic keys take priority over environment variables. Any provider not set programmatically falls back to its default env var.

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
| `text-to-image` | text | image | 674 |
| `text-to-video` | text | video | 310 |
| `image-edit` | image + text | image | 205 |
| `image-to-video` | image + text | video | 165 |
| `text-to-audio` | text | audio | 95 |
| `upscale-image` | image | image | 54 |
| `image-to-image` | image + text | image | 51 |
| `training` | images | model | 50 |
| `text-generation` | text | text | 49 |
| `segmentation` | image/video | segmentation | 34 |
| `image-to-3d` | image | 3d | 31 |
| `remove-background` | image/video | image/video | 24 |
| `audio-to-text` | audio | text | 24 |
| `text-to-3d` | text | 3d | 19 |
| `video-to-video` | video | video | 18 |
| `image-to-text` | image | text | 16 |
| `video-to-audio` | video | audio | 16 |
| `upscale-video` | video | video | 15 |
| `moderation` | text/image/video | text | 12 |
| `audio-to-video` | audio | video | 4 |
| `video-to-text` | video | text | 4 |
| `doc-to-text` | file | text | 3 |
| `audio-edit` | audio | audio | 2 |
| `voice-clone` | audio | text | 1 |

## Providers

| Provider | Models | Auth Env Var | Protocol |
|---|---|---|---|
| fal-ai | 1,201 | `FAL_KEY` | Native fetch |
| Replicate | 687 | `REPLICATE_API_TOKEN` | Native fetch |
| WaveSpeed | 66 | `WAVESPEED_API_KEY` | Native fetch |
| OpenRouter | 10 | `OPENROUTER_API_KEY` | Native fetch |

Zero external dependencies -- all provider communication uses native `fetch`.

See the full [Model Directory](docs/MODELS.md) for all 1,876 models with provider availability.

## API Reference

### `generate(request: GenerateRequest): Promise<GenerateResponse>`

The core function. Resolves the model, maps parameters, calls the provider, and returns a unified response.

**GenerateRequest**

```typescript
interface GenerateRequest {
  model: string                                    // required - model name
  prompt?: string                                  // text prompt
  image?: string | File                            // input image (URL or File)
  images?: (string | File)[]                       // multiple reference images
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
    tokens?: number           // total tokens (LLM only)
    prompt_tokens?: number    // input tokens (LLM only)
    completion_tokens?: number // output tokens (LLM only)
  }
}

interface OutputItem {
  type: 'image' | 'video' | 'audio' | 'text' | '3d' | 'segmentation'
  url?: string      // URL for media outputs
  content?: string  // text content for LLM outputs
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

## R2 Storage (Asset Uploads)

getaiapi includes built-in Cloudflare R2 storage support that automatically uploads binary assets before sending them to providers. Two modes are supported:

- **`public`** (default) — requires a publicly readable bucket; returns public URLs (via `publicUrlBase` or the R2 endpoint)
- **`presigned`** — works with private buckets; returns time-limited presigned GET URLs signed with S3 Signature V4 (no public access needed, `publicUrlBase` is not required)

### Setup

Set these environment variables:

```bash
# Required
export R2_ACCOUNT_ID="your-cloudflare-account-id"
export R2_BUCKET_NAME="your-bucket-name"
export R2_ACCESS_KEY_ID="your-r2-access-key"
export R2_SECRET_ACCESS_KEY="your-r2-secret-key"

# Optional - custom public URL (only needed for mode: 'public')
export R2_PUBLIC_URL="https://cdn.example.com"

# Optional - use presigned URLs for private buckets (default: 'public')
export R2_STORAGE_MODE="presigned"
export R2_PRESIGN_EXPIRES_IN="3600"  # seconds, default: 3600, max: 604800 (7 days)
```

#### How to get your R2 Public URL (public mode only)

If using `mode: 'presigned'`, you can skip this — no public bucket access is needed.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com)
2. Go to **R2 Object Storage** in the left sidebar
3. Click on your bucket
4. Go to the **Settings** tab
5. Under **Public access**, click **Allow Access**
6. Cloudflare will provide a public URL like `https://<bucket>.<account-id>.r2.dev` — use this as your `R2_PUBLIC_URL`
7. (Optional) You can also connect a **Custom Domain** under the same section for a cleaner URL like `https://cdn.yourdomain.com`

Then call `configureStorage()` once at startup:

```typescript
import { configureStorage } from 'getaiapi'

// Read from environment variables
configureStorage()

// Or pass config directly
configureStorage({
  accountId: 'your-account-id',
  bucketName: 'your-bucket',
  accessKeyId: 'your-key',
  secretAccessKey: 'your-secret',
  publicUrlBase: 'https://cdn.example.com', // optional
  autoUpload: false,                         // optional
  mode: 'public',                            // 'public' | 'presigned' (default: 'public')
  presignExpiresIn: 3600,                    // presigned URL TTL in seconds (default: 3600)
})
```

### Automatic Uploads in `generate()`

Once storage is configured, any `Buffer`, `Blob`, `File`, or `ArrayBuffer` values in provider params are automatically uploaded to R2 and replaced with public URLs before the request is sent to the provider. This works recursively -- nested objects and arrays are traversed, so params like Kling's `elements[].frontal_image_url` are handled automatically. No code changes needed -- it just works.

```typescript
import { generate, configureStorage } from 'getaiapi'
import { readFileSync } from 'fs'

configureStorage()

const result = await generate({
  model: 'gpt-image-1.5-edit',
  image: readFileSync('./photo.jpg'),  // Buffer uploaded to R2 automatically
  prompt: 'add a rainbow in the sky',
})
```

To also re-upload URL strings through R2 (useful when providers can't access the original URL), pass `reupload: true` per-call:

```typescript
const result = await generate({
  model: 'kling-video-pro',
  image: 'https://private-server.com/img.jpg',
  prompt: 'animate this image',
  options: { reupload: true },
})
```

Or enable it globally with `autoUpload: true` in the storage config.

### Cleanup / Lifecycle

Assets uploaded automatically via `generate()` use the `getaiapi-tmp/` key prefix. You can set a [Cloudflare R2 lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) to auto-expire objects under that prefix (e.g. delete after 24 hours) so ephemeral generation assets don't accumulate.

### Standalone Upload / Delete

You can also use R2 storage directly:

```typescript
import { uploadAsset, deleteAsset, configureStorage } from 'getaiapi'

configureStorage()

// Upload a buffer
const { url, key, size_bytes, content_type } = await uploadAsset(
  Buffer.from('hello world'),
  { contentType: 'text/plain', prefix: 'uploads' }
)
console.log(url) // https://cdn.example.com/uploads/a1b2c3d4-...

// Delete by key
await deleteAsset(key)
```

### Presigned URLs (Private Buckets)

If your R2 bucket doesn't have public read access, use presigned mode. Instead of returning a public URL, `uploadAsset` will return a time-limited presigned GET URL signed with S3 Signature V4.

```typescript
configureStorage({
  accountId: 'your-account-id',
  bucketName: 'private-bucket',
  accessKeyId: 'your-key',
  secretAccessKey: 'your-secret',
  mode: 'presigned',          // uploadAsset returns presigned URLs
  presignExpiresIn: 1800,     // URLs expire after 30 minutes
})

const { url } = await uploadAsset(Buffer.from('secret data'), {
  contentType: 'application/octet-stream',
})
// url is a presigned GET URL, valid for 30 minutes
```

You can also generate presigned URLs for existing objects:

```typescript
import { presignAsset } from 'getaiapi'

const url = presignAsset('uploads/my-file.png')
// => https://<account>.r2.cloudflarestorage.com/<bucket>/uploads/my-file.png?X-Amz-Algorithm=...

// Custom expiry per-call (overrides config default)
const shortUrl = presignAsset('uploads/my-file.png', { expiresIn: 300 }) // 5 minutes
```

**UploadOptions**

| Option | Type | Description |
|---|---|---|
| `key` | `string` | Custom object key (default: auto-generated UUID) |
| `contentType` | `string` | MIME type (default: detected from input or `application/octet-stream`) |
| `prefix` | `string` | Key prefix / folder (e.g. `"uploads"`) |
| `maxBytes` | `number` | Max upload size in bytes (default: 500 MB) |

### Storage Errors

```typescript
import { StorageError } from 'getaiapi'

try {
  await uploadAsset(buffer)
} catch (err) {
  if (err instanceof StorageError) {
    console.error(err.operation)  // 'upload' | 'delete' | 'config'
    console.error(err.statusCode) // HTTP status from R2, if applicable
  }
}
```

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
| `StorageError` | R2 upload, delete, or config failure |

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
