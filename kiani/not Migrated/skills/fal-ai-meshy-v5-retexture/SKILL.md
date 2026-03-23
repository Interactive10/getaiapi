---
name: fal-ai-meshy-v5-retexture
description: >
  Use this skill for the fal.ai Meshy 5 Retexture model (fal-ai/meshy/v5/retexture). Meshy-5 retexture applies new, high-quality textures to existing 3D models using either text prompts or reference images. It supports PBR material generation for realistic, production-ready results.
---

# Meshy 5 Retexture

Meshy-5 retexture applies new, high-quality textures to existing 3D models using either text prompts or reference images. It supports PBR material generation for realistic, production-ready results.

**Endpoint:** `fal-ai/meshy/v5/retexture`
**Source:** https://fal.ai/models/fal-ai/meshy/v5/retexture/api

---

## Quick Start

### 1. Install the Client

```bash
npm install --save @fal-ai/client
```

### 2. Set Your API Key

```bash
export FAL_KEY="YOUR_API_KEY"
```

### 3. Submit a Request

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/meshy/v5/retexture", {
  input: {
        "model_url": "https://example.com/input.png"
    },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((l) => l.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

---

## Authentication

Set the `FAL_KEY` environment variable, or configure in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

> **Important:** When running client-side, use a server-side proxy to protect your API key.

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `enable_pbr` | boolean | No | `false` | Generate PBR Maps (metallic, roughness, normal) in addition to base color. |
| `text_style_prompt` | string | null | No |  | Describe your desired texture style using text. Maximum 600 characters. Required if image_style_url is not provided. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, input data will be checked for safety before processing. |
| `enable_original_uv` | boolean | No | `true` | Use the original UV mapping of the model instead of generating new UVs. If the model has no original UV, output quali... |
| `model_url` | string | **Yes** |  | URL or base64 data URI of a 3D model to texture. Supports .glb, .gltf, .obj, .fbx, .stl formats. Can be a publicly ac... |
| `image_style_url` | string | null | No |  | 2D image to guide the texturing process. Supports .jpg, .jpeg, and .png formats. Required if text_style_prompt is not... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |
| `text_style_prompt` | string | null | The text prompt used for texturing (if provided) |
| `model_urls` | ModelUrls | 3D model files in various formats |
| `thumbnail` | File | null | Preview thumbnail of the retextured model |
| `image_style_url` | string | null | The image URL used for texturing (if provided) |
| `texture_urls` | list<TextureFiles> | Array of texture file objects |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/meshy/v5/retexture", {
  input: {
        "model_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/meshy/v5/retexture", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/meshy/v5/retexture", {
  requestId: "<request_id>",
});
console.log(result.data);
```

---

## Tips

- Use `fal.subscribe` for quick scripts; use queue API for production workloads.
- Set `webhookUrl` on queue submit to get notified when processing completes.
- File inputs accept URLs, Base64 data URIs, or uploaded files via `fal.storage.upload(file)`.

## References

- API page: https://fal.ai/models/fal-ai/meshy/v5/retexture/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/meshy/v5/retexture
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
