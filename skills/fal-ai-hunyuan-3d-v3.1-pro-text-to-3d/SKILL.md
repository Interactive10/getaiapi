---
name: fal-ai-hunyuan-3d-v3.1-pro-text-to-3d
description: >
  Use this skill for the fal.ai Hunyuan 3D Pro Text to 3D model (fal-ai/hunyuan-3d/v3.1/pro/text-to-3d). Generate 3D models from text prompts with Hunyuan 3D Pro
---

# Hunyuan 3D Pro Text to 3D

Generate 3D models from text prompts with Hunyuan 3D Pro

**Endpoint:** `fal-ai/hunyuan-3d/v3.1/pro/text-to-3d`
**Source:** https://fal.ai/models/fal-ai/hunyuan-3d/v3.1/pro/text-to-3d/api

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

const result = await fal.subscribe("fal-ai/hunyuan-3d/v3.1/pro/text-to-3d", {
  input: {
        "prompt": "your value here"
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
| `enable_pbr` | boolean | No | `false` | Enable PBR material generation (metallic, roughness, normal textures). Ignored when generate_type is Geometry. |
| `prompt` | string | **Yes** |  | Text description of the 3D content to generate. Max 1024 UTF-8 characters. |
| `face_count` | integer | No | `500000` | Target polygon face count. Range: 40,000-1,500,000. Default: 500,000. |
| `generate_type` | enum: `Normal`, `Geometry` | No | `"Normal"` | Generation task type. Normal: textured model. Geometry: geometry-only white model (no textures). LowPoly/Sketch are n... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_urls` | ModelUrls |  |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `seed` | integer | null | The seed used for generation |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-3d/v3.1/pro/text-to-3d", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-3d/v3.1/pro/text-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-3d/v3.1/pro/text-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-3d/v3.1/pro/text-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-3d/v3.1/pro/text-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
