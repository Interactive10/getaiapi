---
name: fal-ai-hunyuan3d-v3-image-to-3d
description: >
  Use this skill for the fal.ai Hunyuan3d V3 model (fal-ai/hunyuan3d-v3/image-to-3d). Transform your photos into ultra-high-resolution 3D models in seconds. Film-quality geometry with PBR textures, ready for games, e-commerce, and 3D printing.
---

# Hunyuan3d V3

Transform your photos into ultra-high-resolution 3D models in seconds. Film-quality geometry with PBR textures, ready for games, e-commerce, and 3D printing.

**Endpoint:** `fal-ai/hunyuan3d-v3/image-to-3d`
**Source:** https://fal.ai/models/fal-ai/hunyuan3d-v3/image-to-3d/api

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

const result = await fal.subscribe("fal-ai/hunyuan3d-v3/image-to-3d", {
  input: {
        "input_image_url": "https://example.com/input.png"
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
| `input_image_url` | string | **Yes** |  | URL of image to use while generating the 3D model. |
| `polygon_type` | enum: `triangle`, `quadrilateral` | No | `"triangle"` | Polygon type. Only takes effect when GenerateType is LowPoly. |
| `face_count` | integer | No | `500000` | Target face count. Range: 40000-1500000 |
| `right_image_url` | string | null | No |  | Optional right view image URL for better 3D reconstruction. |
| `back_image_url` | string | null | No |  | Optional back view image URL for better 3D reconstruction. |
| `enable_pbr` | boolean | No | `false` | Whether to enable PBR material generation. Does not take effect when generate_type is Geometry. |
| `generate_type` | enum: `Normal`, `LowPoly`, `Geometry` | No | `"Normal"` | Generation type. Normal: textured model. LowPoly: polygon reduction. Geometry: white model without texture. |
| `left_image_url` | string | null | No |  | Optional left view image URL for better 3D reconstruction. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `seed` | integer | null | The seed used for generation |
| `model_urls` | ModelUrls |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan3d-v3/image-to-3d", {
  input: {
        "input_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan3d-v3/image-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan3d-v3/image-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan3d-v3/image-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan3d-v3/image-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
