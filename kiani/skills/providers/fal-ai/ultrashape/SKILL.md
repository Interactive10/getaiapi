---
name: fal-ai-ultrashape
description: >
  Use this skill for the fal.ai Ultrashape model (fal-ai/ultrashape). UltraShape-1.0 is a 3D diffusion framework that generates high-fidelity 3D geometry through coarse-to-fine geometric refinement.
---

# Ultrashape

UltraShape-1.0 is a 3D diffusion framework that generates high-fidelity 3D geometry through coarse-to-fine geometric refinement.

**Endpoint:** `fal-ai/ultrashape`
**Source:** https://fal.ai/models/fal-ai/ultrashape/api

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

const result = await fal.subscribe("fal-ai/ultrashape", {
  input: {
        "model_url": "https://example.com/input.png",
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
| `octree_resolution` | integer | No | `1024` | Marching cubes resolution. |
| `remove_background` | boolean | No | `true` | Remove image background. |
| `seed` | integer | No | `42` | Random seed. |
| `model_url` | string | **Yes** |  | URL of the coarse mesh (.glb or .obj) to refine. |
| `num_inference_steps` | integer | No | `50` | Diffusion steps. |
| `image_url` | string | **Yes** |  | URL of the reference image for mesh refinement. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ultrashape", {
  input: {
        "model_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ultrashape", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ultrashape", {
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

- API page: https://fal.ai/models/fal-ai/ultrashape/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ultrashape
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
