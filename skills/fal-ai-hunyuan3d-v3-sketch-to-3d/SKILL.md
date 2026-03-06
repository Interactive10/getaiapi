---
name: fal-ai-hunyuan3d-v3-sketch-to-3d
description: >
  Use this skill for the fal.ai Hunyuan3d V3 model (fal-ai/hunyuan3d-v3/sketch-to-3d). Create your imagined 3D models with just text. Production-ready, export-ready professional assets with realistic lighting and materials in minutes.
---

# Hunyuan3d V3

Create your imagined 3D models with just text. Production-ready, export-ready professional assets with realistic lighting and materials in minutes.

**Endpoint:** `fal-ai/hunyuan3d-v3/sketch-to-3d`
**Source:** https://fal.ai/models/fal-ai/hunyuan3d-v3/sketch-to-3d/api

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

const result = await fal.subscribe("fal-ai/hunyuan3d-v3/sketch-to-3d", {
  input: {
        "input_image_url": "https://example.com/input.png",
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
| `input_image_url` | string | **Yes** |  | URL of sketch or line art image to transform into a 3D model. Image resolution must be between 128x128 and 5000x5000 ... |
| `prompt` | string | **Yes** |  | Text prompt describing the 3D content attributes such as color, category, and material. |
| `face_count` | integer | No | `500000` | Target face count. Range: 40000-1500000 |
| `enable_pbr` | boolean | No | `false` | Whether to enable PBR material generation. |

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
const { request_id } = await fal.queue.submit("fal-ai/hunyuan3d-v3/sketch-to-3d", {
  input: {
        "input_image_url": "https://example.com/input.png",
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan3d-v3/sketch-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan3d-v3/sketch-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan3d-v3/sketch-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan3d-v3/sketch-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
