---
name: fal-ai-trellis-2-retexture
description: >
  Use this skill for the fal.ai Trellis 2 model (fal-ai/trellis-2/retexture). Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation.
---

# Trellis 2

Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation.

**Endpoint:** `fal-ai/trellis-2/retexture`
**Source:** https://fal.ai/models/fal-ai/trellis-2/retexture/api

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

const result = await fal.subscribe("fal-ai/trellis-2/retexture", {
  input: {
        "image_url": "https://example.com/input.png",
        "mesh_url": "https://example.com/input.png"
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
| `resolution` | enum: `512`, `1024` | No | `1024` | Internal resolution for texture generation. Higher produces finer texture details but is slower. |
| `tex_slat_sampling_steps` | integer | No | `12` | Number of denoising steps for texture generation. More steps = slower but potentially cleaner textures. |
| `tex_slat_rescale_t` | float | No | `3` | Controls noise schedule sharpness for texture generation. Higher values produce sharper texture details. |
| `tex_slat_guidance_rescale` | float | No | `0` | Dampens artifacts from high guidance in the texture stage. Increase if textures look noisy or have color banding. |
| `image_url` | string | **Yes** |  | URL of the reference image for texturing |
| `mesh_url` | string | **Yes** |  | URL of the untextured 3D mesh to retexture. Supports GLB, OBJ, PLY, and STL formats. |
| `seed` | integer | null | No |  | Random seed for reproducibility |
| `texture_size` | enum: `1024`, `2048`, `4096` | No | `2048` | Resolution of the texture image baked onto the mesh. Higher values capture finer surface details but produce larger f... |
| `tex_slat_guidance_strength` | float | No | `1` | How closely the texture follows the input image colors. Higher values produce more vivid but potentially oversaturate... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/trellis-2/retexture", {
  input: {
        "image_url": "https://example.com/input.png",
        "mesh_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/trellis-2/retexture", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/trellis-2/retexture", {
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

- API page: https://fal.ai/models/fal-ai/trellis-2/retexture/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/trellis-2/retexture
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
