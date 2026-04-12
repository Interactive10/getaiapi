---
name: fal-ai-hunyuan-3d-v3.1-rapid-image-to-3d
description: >
  Use this skill for the fal.ai Hunyuan 3D Rapid Image to 3D model (fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d). Rapidly generate 3D models from images using Hunyuan 3D.
---

# Hunyuan 3D Rapid Image to 3D

Rapidly generate 3D models from images using Hunyuan 3D.

**Endpoint:** `fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d`
**Source:** https://fal.ai/models/fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d/api

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

const result = await fal.subscribe("fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d", {
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
| `input_image_url` | string | **Yes** |  | Front view image URL. Resolution: 128-5000px, max 8MB (recommended ≤6MB for base64 encoding), formats: JPG/PNG/WEBP. ... |
| `enable_pbr` | boolean | No | `false` | Enable PBR material generation (metallic, roughness, normal textures). Does not take effect when enable_geometry is T... |
| `enable_geometry` | boolean | No | `false` | Generate geometry-only white model without textures. When enabled, enable_pbr is ignored and OBJ is not supported (de... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File | null | Generated 3D model file. Contains GLB if available, otherwise OBJ. |
| `texture` | File | null | Texture image for the 3D model. |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `material_mtl` | File | null | MTL material file for the OBJ model. |
| `model_urls` | ModelUrls |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d", {
  input: {
        "input_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-3d/v3.1/rapid/image-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
