# Migration Guide

## Migrating to v1.0.0-alpha.0 (Modality-First Architecture)

### Breaking Changes

#### 1. Category system removed

Models no longer have a `category` field. Modality (`inputs`/`outputs`) is the source of truth.

**Before:**
```typescript
const model = getModel('flux-schnell')
console.log(model.category) // 'text-to-image'

const models = listModels({ category: 'text-to-image' })
```

**After:**
```typescript
import { resolveModel, listModels, deriveCategory } from 'getaiapi'

const model = resolveModel('flux-schnell')
console.log(model.modality) // { inputs: ['text'], outputs: ['image'] }
console.log(deriveCategory(model)) // 'text-to-image'

const models = listModels({ input: 'text', output: 'image' })
```

#### 2. `getModel()` renamed to `resolveModel()`

**Before:**
```typescript
import { getModel } from 'getaiapi'
const model = getModel('flux-schnell')
```

**After:**
```typescript
import { resolveModel } from 'getaiapi'
const model = resolveModel('flux-schnell')
```

#### 3. Category templates removed

Each provider binding now carries its own `param_map` and `output_map`. If you were referencing category templates in custom tooling, those no longer exist.

#### 4. Registry structure changed

**Before:**
```json
{
  "canonical_name": "flux-schnell",
  "category": "text-to-image",
  "providers": [{ "provider": "fal-ai", "endpoint": "..." }]
}
```

**After:**
```json
{
  "canonical_name": "flux-schnell",
  "modality": { "inputs": ["text"], "outputs": ["image"] },
  "providers": [{
    "provider": "fal-ai",
    "endpoint": "...",
    "param_map": { "prompt": "prompt", "size": "image_size" },
    "output_map": { "type": "image", "extract_path": "images[].url" }
  }]
}
```

### What stayed the same

- `generate()` works exactly as before -- same input shape, same output shape
- `configure()`, `configureAuth()`, `configureStorage()` are unchanged
- All error classes are unchanged
- Provider adapters (fal-ai, replicate, wavespeed, openrouter) are unchanged
- R2 storage API is unchanged

---

## Edge Runtime & Serverless Compatibility

As of v1.0.0-alpha.0, getaiapi **works in all JavaScript runtimes** without any special configuration:

- Vercel Edge Functions
- Vercel Serverless Functions
- Cloudflare Workers
- Deno Deploy
- AWS Lambda
- Bun
- Node.js

### No more `readFileSync` configuration needed

Previous versions used `readFileSync` to load the model registry at runtime, which required:

- Adding `registry/` to your serverless bundle
- Configuring Vercel/Next.js to allow `fs` access (e.g., `serverComponentsExternalPackages` or custom webpack config)
- Edge runtimes (Vercel Edge, Cloudflare Workers) were **completely incompatible** since `fs` doesn't exist

**This is no longer needed.** The registry is now bundled directly into the library at build time as a JSON import. There is:

- No filesystem access at runtime
- No `fs`, `path`, or `url` Node.js APIs used
- No special bundler configuration required
- No need to include `registry/` in your deployment

It just works -- `npm install getaiapi` and import it anywhere.

### Vercel: before and after

**Before (required in `next.config.js`):**
```javascript
// NO LONGER NEEDED -- delete this if you have it
module.exports = {
  serverComponentsExternalPackages: ['getaiapi'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}
```

**After:**
```javascript
// Nothing needed. getaiapi works out of the box.
module.exports = {}
```

### Cloudflare Workers: before and after

**Before:** Not supported (no `fs` module available).

**After:** Works out of the box.

```typescript
import { generate } from 'getaiapi'

export default {
  async fetch(request: Request): Promise<Response> {
    const result = await generate({
      model: 'flux-schnell',
      prompt: 'a cat',
    })
    return Response.json(result)
  },
}
```
