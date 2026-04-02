---
name: kling-provider-adapter
description: >
  Complete implementation guide for src/adapters/kling.ts — the Kling AI provider adapter.
  Covers JWT token generation, submit/poll/parseOutput implementation, HTTP error handling,
  status mapping, and response parsing. Use when writing or modifying the Kling adapter.
---

# Kling Provider — Adapter Implementation

## File: `src/adapters/kling.ts`

## Architecture

Kling follows the same async submit/poll pattern as fal-ai and wavespeed:
1. **Submit** — `POST /v1/{resource}/{action}` → returns `task_id`
2. **Poll** — `GET /v1/{resource}/{action}/{task_id}` → returns status + result
3. **Parse** — Extract URLs from `data.task_result.videos[]` / `images[]` / `audios[]`

## JWT Authentication

Unlike other providers (single Bearer token), Kling requires **on-the-fly JWT generation**:

```typescript
import { createHmac } from 'crypto'

const API_BASE = 'https://api-singapore.klingai.com'

function generateJwt(accessKey: string, secretKey: string): string {
  // Header
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')

  // Payload
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(JSON.stringify({
    iss: accessKey,
    exp: now + 1800,  // 30 min validity
    nbf: now - 5,     // allow 5s clock skew
  })).toString('base64url')

  // Signature
  const signature = createHmac('sha256', secretKey)
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${signature}`
}
```

**Important:** The `auth` string passed to the adapter from `AuthManager.getKey('kling')` is the
**Access Key only**. The Secret Key must be read from `process.env.KLING_SECRET_KEY` inside the adapter,
or the auth system should pass both (see SETUP.md for options).

**Recommended approach:** Store `accessKey:secretKey` as the combined auth value, split in the adapter:

```typescript
function getAuthHeaders(auth: string): Record<string, string> {
  const [ak, sk] = auth.includes(':') ? auth.split(':', 2) : [auth, process.env.KLING_SECRET_KEY ?? '']
  const token = generateJwt(ak, sk)
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}
```

## Submit Implementation

```typescript
async submit(
  endpoint: string,
  params: Record<string, unknown>,
  auth: string,
): Promise<ProviderResponse> {
  // endpoint format from registry: "v1/videos/text2video" or "v1/images/generations"
  const url = `${API_BASE}/${endpoint}`
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(auth),
    body: JSON.stringify(params),
  })

  await handleHttpErrors(response, endpoint)

  const json = await response.json() as {
    code: number
    message: string
    request_id: string
    data: {
      task_id: string
      task_status: string
      task_info: { external_task_id?: string }
      created_at: number
      updated_at: number
    }
  }

  if (json.code !== 0) {
    throw new ProviderError('kling', endpoint, json.code, json)
  }

  return {
    id: json.data.task_id,
    status: 'pending',
  }
}
```

## Poll Implementation

```typescript
async poll(
  taskId: string,
  auth: string,
  endpoint?: string,
): Promise<ProviderResponse> {
  if (!endpoint) {
    throw new ProviderError('kling', 'unknown', 400, 'endpoint is required for polling')
  }

  // endpoint = "v1/videos/text2video" → poll at "v1/videos/text2video/{taskId}"
  const url = `${API_BASE}/${endpoint}/${taskId}`
  const response = await fetch(url, {
    headers: getAuthHeaders(auth),
  })

  await handleHttpErrors(response, endpoint)

  const json = await response.json() as {
    code: number
    message: string
    request_id: string
    data: {
      task_id: string
      task_status: 'submitted' | 'processing' | 'succeed' | 'failed'
      task_status_msg?: string
      task_result?: {
        videos?: Array<{ id: string; url: string; duration: string; watermark_url?: string }>
        images?: Array<{ index: number; url: string }>
        audios?: Array<{ id: string; url: string; duration?: string }>
      }
      created_at: number
      updated_at: number
    }
  }

  if (json.code !== 0) {
    throw new ProviderError('kling', endpoint, json.code, json)
  }

  const { data } = json

  if (data.task_status === 'failed') {
    return {
      id: taskId,
      status: 'failed',
      error: data.task_status_msg ?? 'Unknown error',
    }
  }

  if (data.task_status === 'succeed') {
    return {
      id: taskId,
      status: 'completed',
      output: data,   // Pass full data — parseOutput extracts from task_result
    }
  }

  // submitted or processing
  return {
    id: taskId,
    status: 'processing',
  }
}
```

## Status Mapping

| Kling Status | ProviderResponse Status |
|---|---|
| `submitted` | `processing` (mapped up — no separate pending in Kling) |
| `processing` | `processing` |
| `succeed` | `completed` |
| `failed` | `failed` |

## parseOutput Implementation

Kling wraps results in `data.task_result.{videos,images,audios}[]`:

```typescript
parseOutput(raw: unknown, outputMapping: OutputMapping): OutputItem[] {
  const data = raw as Record<string, unknown>
  const taskResult = data.task_result as Record<string, unknown> | undefined
  if (!taskResult) return []

  const path = outputMapping.extract_path

  // Videos: task_result.videos[].url
  if (path === 'task_result.videos[].url') {
    const videos = taskResult.videos as Array<{ url: string; duration?: string }> | undefined
    if (!Array.isArray(videos)) return []
    return videos
      .filter(v => v.url)
      .map(v => ({
        type: outputMapping.type,
        url: v.url,
        content_type: outputMapping.content_type ?? 'video/mp4',
      }))
  }

  // Images: task_result.images[].url
  if (path === 'task_result.images[].url') {
    const images = taskResult.images as Array<{ url: string; index?: number }> | undefined
    if (!Array.isArray(images)) return []
    return images
      .filter(img => img.url)
      .map(img => ({
        type: outputMapping.type,
        url: img.url,
        content_type: outputMapping.content_type ?? 'image/png',
      }))
  }

  // Audios: task_result.audios[].url
  if (path === 'task_result.audios[].url') {
    const audios = taskResult.audios as Array<{ url: string }> | undefined
    if (!Array.isArray(audios)) return []
    return audios
      .filter(a => a.url)
      .map(a => ({
        type: outputMapping.type,
        url: a.url,
        content_type: outputMapping.content_type ?? 'audio/mpeg',
      }))
  }

  return []
}
```

## HTTP Error Handling

Kling returns structured errors with `code` field:

```typescript
async function handleHttpErrors(response: Response, endpoint: string): Promise<void> {
  if (response.ok) return

  const status = response.status

  if (status === 401) {
    throw new AuthError('kling', 'KLING_ACCESS_KEY')
  }

  if (status === 429) {
    const retryAfter = response.headers.get('retry-after')
    const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000
    throw new RateLimitError('kling', retryMs)
  }

  let raw: unknown
  try {
    raw = await response.json()
  } catch {
    raw = await response.text().catch(() => null)
  }

  throw new ProviderError('kling', endpoint, status, raw)
}
```

### Kling-Specific Error Codes (from response body `code` field)

| HTTP | Code | Meaning | Map to |
|------|------|---------|--------|
| 200 | 0 | Success | — |
| 401 | 1000-1004 | JWT auth failure | `AuthError` |
| 429 | 1100-1102 | Account/balance issue | `RateLimitError` (with message) |
| 400 | 1200-1201 | Invalid params | `ProviderError` |
| 400 | 1300-1301 | Content policy violation | `ProviderError` |
| 429 | 1302-1304 | Rate/concurrency limit | `RateLimitError` |
| 500 | 5000-5002 | Server error | `ProviderError` |

Handle the body-level codes in submit/poll after JSON parse:

```typescript
// After parsing response JSON
if (json.code >= 1000 && json.code <= 1004) {
  throw new AuthError('kling', 'KLING_ACCESS_KEY')
}
if (json.code >= 1100 && json.code <= 1304) {
  throw new RateLimitError('kling', 5000)
}
if (json.code >= 1200 && json.code <= 1301) {
  throw new ProviderError('kling', endpoint, json.code, json)
}
if (json.code >= 5000) {
  throw new ProviderError('kling', endpoint, json.code, json)
}
```

## Full Adapter Skeleton

```typescript
// src/adapters/kling.ts
import { createHmac } from 'crypto'
import type { ProviderAdapter, ProviderResponse, OutputItem, OutputMapping } from './base.js'
import { AuthError, RateLimitError, ProviderError } from '../errors.js'

const API_BASE = 'https://api-singapore.klingai.com'

function generateJwt(accessKey: string, secretKey: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(JSON.stringify({
    iss: accessKey,
    exp: now + 1800,
    nbf: now - 5,
  })).toString('base64url')
  const signature = createHmac('sha256', secretKey)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${signature}`
}

function getAuthHeaders(auth: string): Record<string, string> {
  const [ak, sk] = auth.split(':', 2)
  return {
    Authorization: `Bearer ${generateJwt(ak, sk)}`,
    'Content-Type': 'application/json',
  }
}

async function handleHttpErrors(response: Response, endpoint: string): Promise<void> { /* see above */ }

export const klingAdapter: ProviderAdapter = {
  name: 'kling',
  async submit(endpoint, params, auth) { /* see above */ },
  async poll(taskId, auth, endpoint?) { /* see above */ },
  parseOutput(raw, outputMapping) { /* see above */ },
}
```

## Testing Notes

- JWT generation can be unit tested independently (known AK/SK → expected token structure)
- Submit/poll tests need mock HTTP (no real API calls without explicit user approval)
- The `endpoint` parameter carries through from registry → submit → poll (required for poll URL construction)
- Kling poll URL = `{API_BASE}/{endpoint}/{task_id}` (simpler than fal-ai's queue pattern)
