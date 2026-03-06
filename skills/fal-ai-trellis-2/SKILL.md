---
name: fal-ai-trellis-2
description: >
  Use this skill for the fal.ai Trellis 2 model (fal-ai/trellis-2). Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation.
---

# Trellis 2

Generate 3D models from your images using Trellis 2. A native 3D generative model enabling versatile and high-quality 3D asset creation.

**Endpoint:** `fal-ai/trellis-2`
**Source:** https://fal.ai/models/fal-ai/trellis-2/api

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

const result = await fal.subscribe("fal-ai/trellis-2", {
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
| `tex_slat_guidance_strength` | float | No | `1` | How closely the texture follows the input image colors. Higher values produce more vivid but potentially oversaturate... |
| `ss_guidance_rescale` | float | No | `0.7` | Dampens artifacts from high guidance in stage 1. Lower values allow stronger guidance effects, higher values stabiliz... |
| `ss_rescale_t` | float | No | `5` | Controls noise schedule sharpness for structure generation. Higher values produce sharper transitions. |
| `shape_slat_sampling_steps` | integer | No | `12` | Number of denoising steps for shape refinement. More steps = slower but potentially smoother geometry. |
| `tex_slat_rescale_t` | float | No | `3` | Controls noise schedule sharpness for texture generation. Higher values produce sharper texture details. |
| `ss_guidance_strength` | float | No | `7.5` | How closely the initial 3D structure follows the input image. Higher values produce more faithful but potentially noi... |
| `ss_sampling_steps` | integer | No | `12` | Number of denoising steps for the initial structure. More steps = slower but potentially higher quality. |
| `tex_slat_sampling_steps` | integer | No | `12` | Number of denoising steps for texture generation. More steps = slower but potentially cleaner textures. |
| `remesh_project` | float | No | `0` | How much to project remeshed vertices back onto the original surface. 0 = no projection (smoother), 1 = full projecti... |
| `remesh_band` | float | No | `1` | Controls how far remeshing can move vertices from the original surface. Higher values allow more smoothing but may lo... |
| `shape_slat_rescale_t` | float | No | `3` | Controls noise schedule sharpness for shape refinement. Higher values produce sharper geometric details. |
| `resolution` | enum: `512`, `1024`, `1536` | No | `1024` | Output resolution; higher is slower but more detailed |
| `remesh` | boolean | No | `true` | Rebuild the mesh topology for cleaner triangles. Slower but usually produces better results for downstream use (anima... |
| `tex_slat_guidance_rescale` | float | No | `0` | Dampens artifacts from high guidance in the texture stage. Increase if textures look noisy or have color banding. |
| `shape_slat_guidance_rescale` | float | No | `0.5` | Dampens artifacts from high guidance in the shape stage. Increase if you see noisy geometry. |
| `image_url` | string | **Yes** |  | URL of the input image to convert to 3D |
| `seed` | integer | null | No |  | Random seed for reproducibility |
| `texture_size` | enum: `1024`, `2048`, `4096` | No | `2048` | Resolution of the texture image baked onto the mesh. Higher values capture finer surface details but produce larger f... |
| `shape_slat_guidance_strength` | float | No | `7.5` | How closely the detailed geometry follows the input image. Higher values add more detail but may introduce noise. |
| `decimation_target` | integer | No | `500000` | Target number of vertices in the final mesh. Lower values produce smaller files but less detail. 500k is good for mos... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/trellis-2", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/trellis-2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/trellis-2", {
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

- API page: https://fal.ai/models/fal-ai/trellis-2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/trellis-2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
