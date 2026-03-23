---
name: fal-ai-hunyuan3d-v21
description: >
  Use this skill for the fal.ai Hunyuan 3D 2.1 model (fal-ai/hunyuan3d-v21). Hunyuan3D-2.1 is a scalable 3D asset creation system that advances state-of-the-art 3D generation through Physically-Based Rendering (PBR).
---

# Hunyuan 3D 2.1

Hunyuan3D-2.1 is a scalable 3D asset creation system that advances state-of-the-art 3D generation through Physically-Based Rendering (PBR).

**Endpoint:** `fal-ai/hunyuan3d-v21`
**Source:** https://fal.ai/models/fal-ai/hunyuan3d-v21/api

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

const result = await fal.subscribe("fal-ai/hunyuan3d-v21", {
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
| `octree_resolution` | integer | No | `256` | Octree resolution for the model. |
| `guidance_scale` | float | No | `7.5` | Guidance scale for the model. |
| `num_inference_steps` | integer | No | `50` | Number of inference steps to perform. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `textured_mesh` | boolean | No | `false` | If set true, textured mesh will be generated and the price charged would be 3 times that of white mesh. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb_pbr` | File | null | Generated 3D object with PBR materials. |
| `model_mesh` | File |  |
| `seed` | integer | Seed value used for generation. |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan3d-v21", {
  input: {
        "input_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan3d-v21", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan3d-v21", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan3d-v21/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan3d-v21
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
