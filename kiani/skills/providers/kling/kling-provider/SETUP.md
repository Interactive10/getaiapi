---
name: kling-provider-setup
description: >
  Step-by-step guide for adding Kling AI as a direct provider to getaiapi.
  Covers ProviderName type extension, auth ENV_MAP, adapter registration,
  error hints, exports, and env var configuration.
---

# Kling Provider — Setup & Integration

## Overview

Adding Kling as the 5th provider in getaiapi. Unlike fal-ai/replicate/wavespeed (single API key),
Kling uses a **key pair** (Access Key + Secret Key) to generate short-lived JWT tokens.

## Files to Modify

### 1. `src/types.ts` — Extend ProviderName

```typescript
// Line 7: add 'kling' to the union
export type ProviderName = 'fal-ai' | 'replicate' | 'wavespeed' | 'openrouter' | 'kling'
```

### 2. `src/auth.ts` — Add to ENV_MAP + JWT Token Generation

Kling is unique: it needs **two** env vars (`KLING_ACCESS_KEY` + `KLING_SECRET_KEY`) instead of one.
The auth system needs to handle this since `ENV_MAP` currently maps provider → single env var.

**Option A (recommended): Compound key with JWT generation inside auth**

```typescript
const ENV_MAP: Record<ProviderName, string> = {
  'fal-ai': 'FAL_KEY',
  replicate: 'REPLICATE_API_TOKEN',
  wavespeed: 'WAVESPEED_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  kling: 'KLING_ACCESS_KEY',  // presence check — actual JWT built in adapter
}
```

In `AuthManager.constructor()`, check both `KLING_ACCESS_KEY` and `KLING_SECRET_KEY`:

```typescript
// After the existing env var loop, add Kling special case:
if (!this.keys.has('kling')) {
  const ak = process.env.KLING_ACCESS_KEY?.trim()
  const sk = process.env.KLING_SECRET_KEY?.trim()
  if (ak && sk) {
    // Store access key — the adapter will read KLING_SECRET_KEY itself for JWT signing
    this.keys.set('kling', ak)
  }
}
```

The adapter generates JWTs on-the-fly using the secret key (see [ADAPTER.md](ADAPTER.md)).

### 3. `src/gateway.ts` — Register Adapter

```typescript
import { klingAdapter } from './adapters/kling.js'

const adapters: Record<string, ProviderAdapter> = {
  'fal-ai': falAiAdapter,
  'replicate': replicateAdapter,
  'wavespeed': wavespeedAdapter,
  'openrouter': openRouterAdapter,
  'kling': klingAdapter,
}
```

### 4. `src/errors.ts` — Add Kling to env hints

In `NoProviderError` constructor, add to `envHints`:

```typescript
const envHints: Record<string, string> = {
  "fal-ai": "FAL_KEY",
  replicate: "REPLICATE_API_TOKEN",
  wavespeed: "WAVESPEED_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  kling: "KLING_ACCESS_KEY + KLING_SECRET_KEY",
}
```

### 5. `src/index.ts` — Export adapter

```typescript
export { klingAdapter } from './adapters/kling.js'
```

### 6. `src/mapper.ts` — Add Kling-specific transforms (if needed)

Kling uses `aspect_ratio` as a string like `"16:9"` (same as our universal `size` but different format).
The `applyTransform` function may need a Kling case for `size` → `aspect_ratio` conversion:

```typescript
if (universal === 'size' && provider === 'kling') {
  // Kling uses "16:9" format, not "1024x768"
  if (typeof value === 'string' && value.includes('x')) {
    // Convert "1920x1080" → "16:9" (or pass through if already ratio format)
    return value
  }
  return value
}
```

### 7. `src/mapper.ts` — Add Kling output extract paths

In `mapOutput`, add handlers for Kling's response format:

```typescript
// Kling videos: task_result.videos[].url
if (extract_path === 'task_result.videos[].url') {
  const videos: unknown[] = data?.task_result?.videos ?? []
  return videos
    .filter((v: any) => v?.url)
    .map((v: any) => ({
      type,
      url: v.url as string,
      content_type: 'video/mp4',
    }))
}

// Kling images: task_result.images[].url
if (extract_path === 'task_result.images[].url') {
  const images: unknown[] = data?.task_result?.images ?? []
  return images
    .filter((img: any) => img?.url)
    .map((img: any) => ({
      type,
      url: img.url as string,
      content_type: 'image/png',
    }))
}
```

## Environment Variables

Users need to set:

```bash
export KLING_ACCESS_KEY="your-access-key"
export KLING_SECRET_KEY="your-secret-key"
```

Get these from: https://kling.ai/dev/api-key

## Priority / Provider Selection

To make Kling the **default** provider for kling-related models (when keys are available),
add the Kling provider binding as the **first** entry in each model's `providers` array in
`registry/registry.json`. The gateway uses `availableBindings[0]` — first match wins.

```json
{
  "canonical_name": "kling-text-to-video",
  "providers": [
    { "provider": "kling", ... },    // <-- first = default when KLING keys available
    { "provider": "fal-ai", ... }    // fallback via fal.ai proxy
  ]
}
```

## Validation Checklist

- [ ] `ProviderName` union includes `'kling'`
- [ ] `ENV_MAP` has `kling: 'KLING_ACCESS_KEY'`
- [ ] `AuthManager` checks both `KLING_ACCESS_KEY` and `KLING_SECRET_KEY`
- [ ] `klingAdapter` registered in `gateway.ts` adapters map
- [ ] `NoProviderError` env hints includes kling
- [ ] `klingAdapter` exported from `src/index.ts`
- [ ] Kling output extract paths added to `mapOutput` or `parseOutput`
- [ ] `check:types` passes
- [ ] `test` passes
