---
name: fal-ai-meshy-v5-multi-image-to-3d
description: >
  Use this skill for the fal.ai Meshy 5 Multi model (fal-ai/meshy/v5/multi-image-to-3d). Meshy-5 multi image generates realistic and production ready 3D models from multiple images.
---

# Meshy 5 Multi

Meshy-5 multi image generates realistic and production ready 3D models from multiple images.

**Endpoint:** `fal-ai/meshy/v5/multi-image-to-3d`
**Source:** https://fal.ai/models/fal-ai/meshy/v5/multi-image-to-3d/api

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

const result = await fal.subscribe("fal-ai/meshy/v5/multi-image-to-3d", {
  input: {
        "image_urls": []
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
| `should_texture` | boolean | No | `true` | Whether to generate textures. False provides mesh without textures for 5 credits, True adds texture generation for ad... |
| `enable_pbr` | boolean | No | `false` | Generate PBR Maps (metallic, roughness, normal) in addition to base color. Requires should_texture to be true. |
| `target_polycount` | integer | No | `30000` | Target number of polygons in the generated model |
| `is_a_t_pose` | boolean | No | `false` | Whether to generate the model in an A/T pose |
| `topology` | enum: `quad`, `triangle` | No | `"triangle"` | Specify the topology of the generated model. Quad for smooth surfaces, Triangle for detailed geometry. |
| `texture_image_url` | string | null | No |  | 2D image to guide the texturing process. Requires should_texture to be true. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, input data will be checked for safety before processing. |
| `symmetry_mode` | enum: `off`, `auto`, `on` | No | `"auto"` | Controls symmetry behavior during model generation. |
| `image_urls` | list<string> | **Yes** |  | 1 to 4 images for 3D model creation. All images should depict the same object from different angles. Supports .jpg, .... |
| `texture_prompt` | string | null | No |  | Text prompt to guide the texturing process. Requires should_texture to be true. |
| `should_remesh` | boolean | No | `true` | Whether to enable the remesh phase. When false, returns triangular mesh ignoring topology and target_polycount. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |
| `model_urls` | ModelUrls | 3D model files in various formats |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `seed` | integer | null | The seed used for generation (if available) |
| `texture_urls` | list<TextureFiles> | Array of texture file objects |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/meshy/v5/multi-image-to-3d", {
  input: {
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/meshy/v5/multi-image-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/meshy/v5/multi-image-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/meshy/v5/multi-image-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/meshy/v5/multi-image-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
