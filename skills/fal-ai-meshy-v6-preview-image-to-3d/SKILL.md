---
name: fal-ai-meshy-v6-preview-image-to-3d
description: >
  Use this skill for the fal.ai Meshy 6 Preview model (fal-ai/meshy/v6-preview/image-to-3d). Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models.
---

# Meshy 6 Preview

Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models.

**Endpoint:** `fal-ai/meshy/v6-preview/image-to-3d`
**Source:** https://fal.ai/models/fal-ai/meshy/v6-preview/image-to-3d/api

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

const result = await fal.subscribe("fal-ai/meshy/v6-preview/image-to-3d", {
  input: {
        "image_url": "https://example.com/input.png"
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
| `should_texture` | boolean | No | `true` | Whether to generate textures |
| `enable_pbr` | boolean | No | `false` | Generate PBR Maps (metallic, roughness, normal) in addition to base color |
| `target_polycount` | integer | No | `30000` | Target number of polygons in the generated model |
| `texture_prompt` | string | null | No |  | Text prompt to guide the texturing process |
| `topology` | enum: `quad`, `triangle` | No | `"triangle"` | Specify the topology of the generated model. Quad for smooth surfaces, Triangle for detailed geometry. |
| `texture_image_url` | string | null | No |  | 2D image to guide the texturing process |
| `image_url` | string | **Yes** |  | Image URL or base64 data URI for 3D model creation. Supports .jpg, .jpeg, and .png formats. Also supports AVIF and HE... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, input data will be checked for safety before processing. |
| `symmetry_mode` | enum: `off`, `auto`, `on` | No | `"auto"` | Controls symmetry behavior during model generation. Off disables symmetry, Auto determines it automatically, On enfor... |
| `is_a_t_pose` | boolean | No | `false` | Whether to generate the model in an A/T pose |
| `should_remesh` | boolean | No | `true` | Whether to enable the remesh phase |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |
| `model_urls` | ModelUrls | 3D model files in various formats |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `seed` | integer | null | The seed used for generation (if available) |
| `texture_urls` | list<TextureFiles> | Array of texture file objects, matching Meshy API structure |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/meshy/v6-preview/image-to-3d", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/meshy/v6-preview/image-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/meshy/v6-preview/image-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/meshy/v6-preview/image-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/meshy/v6-preview/image-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
