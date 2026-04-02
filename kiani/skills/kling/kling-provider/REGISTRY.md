---
name: kling-provider-registry
description: >
  Guide for adding Kling provider bindings to registry/registry.json. Covers param_map definitions,
  output_map patterns, endpoint paths, and example entries for every Kling API endpoint.
  Use when adding or updating Kling entries in the model registry.
---

# Kling Provider — Registry & Param Map

## Kling Provider Binding Pattern

Every Kling registry entry follows this structure:

```json
{
  "provider": "kling",
  "skill_id": "kling-{endpoint-slug}",
  "endpoint": "v1/{resource}/{action}",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": { ... },
  "output_map": {
    "type": "video|image|audio",
    "extract_path": "task_result.videos[].url|task_result.images[].url|task_result.audios[].url",
    "content_type": "video/mp4|image/png|audio/mpeg"
  }
}
```

## Key Design Decisions

### Endpoint format
Registry `endpoint` field stores the path **without** the domain:
- `v1/videos/text2video` (not `https://api-singapore.klingai.com/v1/videos/text2video`)
- The adapter prepends `API_BASE` at runtime

### Kling-specific extract paths
Kling nests results differently from other providers:
- **fal-ai:** `images[].url`, `video.url`
- **Kling:** `task_result.videos[].url`, `task_result.images[].url`, `task_result.audios[].url`

The adapter's `parseOutput` (or `mapOutput` in mapper.ts) handles these paths.

### Auth env
Always `"auth_env": "KLING_ACCESS_KEY"` — the adapter knows to also read `KLING_SECRET_KEY`.

---

## Universal → Kling Param Mapping

### Common Params (most endpoints)

| Universal Key | Kling Param | Notes |
|---------------|-------------|-------|
| `prompt` | `prompt` | Direct pass-through, max 2500 chars |
| `negative_prompt` | `negative_prompt` | Max 2500 chars |
| `image` | `image` | URL or base64 (no `data:` prefix!) |
| `count` | `n` | Number of outputs (images: 1-9) |
| `size` | `aspect_ratio` | **Transform needed:** `"1024x768"` → `"4:3"` |
| `format` | — | Kling doesn't support output format selection |
| `seed` | — | Kling doesn't expose seed parameter |
| `guidance` | `cfg_scale` | Range [0, 1], only v1.x models |
| `safety` | — | Kling has built-in content policy, no toggle |

### Video-Specific Params

| Universal Key | Kling Param | Notes |
|---------------|-------------|-------|
| `prompt` | `prompt` | Text prompt |
| `image` | `image` | Start frame (image2video) |
| — | `model_name` | Always set via `options` or hardcoded per binding |
| — | `mode` | `"std"` or `"pro"` — set per binding or via options |
| — | `duration` | `"5"` string, not number |
| — | `sound` | `"on"` or `"off"` |
| — | `aspect_ratio` | `"16:9"`, `"9:16"`, `"1:1"` |
| — | `camera_control` | Complex object, pass via `options` |
| — | `multi_shot` | Boolean, pass via `options` |
| — | `multi_prompt` | Array, pass via `options` |

### Image-Specific Params

| Universal Key | Kling Param | Notes |
|---------------|-------------|-------|
| `prompt` | `prompt` | Required for text-to-image |
| `negative_prompt` | `negative_prompt` | Not supported in image-to-image |
| `image` | `image` | Reference image URL or base64 |
| `count` | `n` | 1-9 images |
| — | `model_name` | Per binding |
| — | `resolution` | `"1k"` or `"2k"` |
| — | `aspect_ratio` | Multiple options |
| — | `image_reference` | `"subject"` or `"face"` (v1-5 only) |
| — | `image_fidelity` | [0, 1] (v1, v1-5) |
| — | `human_fidelity` | [0, 1] (v1-5, subject mode) |

---

## Complete Registry Entries

### Text to Video

```json
{
  "provider": "kling",
  "skill_id": "kling-text-to-video",
  "endpoint": "v1/videos/text2video",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt",
    "negative_prompt": "negative_prompt"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

Default `model_name`, `mode`, `duration`, `aspect_ratio`, `sound` are set via `options` passthrough.

### Image to Video

```json
{
  "provider": "kling",
  "skill_id": "kling-image-to-video",
  "endpoint": "v1/videos/image2video",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt",
    "negative_prompt": "negative_prompt",
    "image": "image"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Extend Video

```json
{
  "provider": "kling",
  "skill_id": "kling-extend-video",
  "endpoint": "v1/videos/video-extend",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt",
    "video": "video_id"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Lip Sync

```json
{
  "provider": "kling",
  "skill_id": "kling-lip-sync",
  "endpoint": "v1/videos/lip-sync",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "video": "video_url",
    "prompt": "text",
    "audio": "audio_url"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Avatar

```json
{
  "provider": "kling",
  "skill_id": "kling-avatar",
  "endpoint": "v1/videos/avatar",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "image": "image",
    "prompt": "text",
    "audio": "audio_url"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Video Effects

```json
{
  "provider": "kling",
  "skill_id": "kling-video-effects",
  "endpoint": "v1/videos/effects",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "image": "image"
  },
  "output_map": {
    "type": "video",
    "extract_path": "task_result.videos[].url",
    "content_type": "video/mp4"
  }
}
```

### Image Generation

```json
{
  "provider": "kling",
  "skill_id": "kling-image-generation",
  "endpoint": "v1/images/generations",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt",
    "negative_prompt": "negative_prompt",
    "image": "image",
    "count": "n"
  },
  "output_map": {
    "type": "image",
    "extract_path": "task_result.images[].url",
    "content_type": "image/png"
  }
}
```

### Image Expansion (Outpainting)

```json
{
  "provider": "kling",
  "skill_id": "kling-extend-image",
  "endpoint": "v1/images/image-expansion",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "image": "image",
    "prompt": "prompt"
  },
  "output_map": {
    "type": "image",
    "extract_path": "task_result.images[].url",
    "content_type": "image/png"
  }
}
```

### Virtual Try-On

```json
{
  "provider": "kling",
  "skill_id": "kling-virtual-try-on",
  "endpoint": "v1/images/kolors-virtual-try-on",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "image": "human_image"
  },
  "output_map": {
    "type": "image",
    "extract_path": "task_result.images[].url",
    "content_type": "image/png"
  }
}
```

### Text to Audio

```json
{
  "provider": "kling",
  "skill_id": "kling-text-to-audio",
  "endpoint": "v1/audios/generation",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "prompt"
  },
  "output_map": {
    "type": "audio",
    "extract_path": "task_result.audios[].url",
    "content_type": "audio/mpeg"
  }
}
```

### Video to Audio

```json
{
  "provider": "kling",
  "skill_id": "kling-video-to-audio",
  "endpoint": "v1/audios/video2audio",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "video": "video_url",
    "prompt": "prompt"
  },
  "output_map": {
    "type": "audio",
    "extract_path": "task_result.audios[].url",
    "content_type": "audio/mpeg"
  }
}
```

### TTS

```json
{
  "provider": "kling",
  "skill_id": "kling-tts",
  "endpoint": "v1/audios/tts",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "prompt": "text"
  },
  "output_map": {
    "type": "audio",
    "extract_path": "task_result.audios[].url",
    "content_type": "audio/mpeg"
  }
}
```

### Voice Clone

```json
{
  "provider": "kling",
  "skill_id": "kling-voice-clone",
  "endpoint": "v1/audios/voice-clone",
  "auth_env": "KLING_ACCESS_KEY",
  "param_map": {
    "audio": "voice_clone_audio"
  },
  "output_map": {
    "type": "audio",
    "extract_path": "task_result.audios[].url",
    "content_type": "audio/mpeg"
  }
}
```

---

## Adding to Existing Models

For models that already have fal-ai bindings (e.g., `kling-video-v3-pro-image-to-video`),
add the Kling binding as the **first** provider entry:

```json
{
  "canonical_name": "kling-video-v3-pro-image-to-video",
  "aliases": [...],
  "modality": { "inputs": ["image", "text"], "outputs": ["video"] },
  "providers": [
    {
      "provider": "kling",
      "skill_id": "kling-image-to-video",
      "endpoint": "v1/videos/image2video",
      "auth_env": "KLING_ACCESS_KEY",
      "param_map": {
        "prompt": "prompt",
        "negative_prompt": "negative_prompt",
        "image": "image"
      },
      "output_map": {
        "type": "video",
        "extract_path": "task_result.videos[].url",
        "content_type": "video/mp4"
      }
    },
    {
      "provider": "fal-ai",
      "skill_id": "fal-ai-kling-video-v3-pro-image-to-video",
      "endpoint": "fal-ai/kling-video/v3/pro/image-to-video",
      "auth_env": "FAL_KEY",
      "param_map": { ... },
      "output_map": { ... }
    }
  ]
}
```

The gateway picks `availableBindings[0]` — so Kling is preferred when keys exist, fal-ai is fallback.

---

## Kling-Specific Options Passthrough

Since many Kling params don't map to universal keys, users pass them via `options`:

```typescript
await generate({
  model: 'kling-text-to-video',
  prompt: 'A rabbit reading a newspaper',
  provider: 'kling',
  options: {
    model_name: 'kling-v3',
    mode: 'pro',
    duration: '10',
    aspect_ratio: '16:9',
    sound: 'on',
    camera_control: {
      type: 'simple',
      config: { zoom: 5 },
    },
  },
})
```

The `options` object passes through directly to the provider (see `mapInput` in mapper.ts).

---

## Important: Base64 Image Format

Kling requires raw base64 **without** the `data:image/png;base64,` prefix:

```
Correct:   iVBORw0KGgoAAAANSUhEUgAAAAUA...
Incorrect: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...
```

The adapter should strip the prefix if present:

```typescript
function cleanBase64(value: string): string {
  if (value.startsWith('data:')) {
    return value.split(',')[1] ?? value
  }
  return value
}
```
