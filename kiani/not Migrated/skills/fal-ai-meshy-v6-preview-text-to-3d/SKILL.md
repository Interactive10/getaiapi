---
name: fal-ai-meshy-v6-preview-text-to-3d
description: >
  Use this skill for the fal.ai Meshy 6 Preview model (fal-ai/meshy/v6-preview/text-to-3d). Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models.
---

# Meshy 6 Preview

Meshy-6-Preview is the latest model from Meshy. It generates realistic and production ready 3D models.

**Endpoint:** `fal-ai/meshy/v6-preview/text-to-3d`
**Source:** https://fal.ai/models/fal-ai/meshy/v6-preview/text-to-3d/api

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

const result = await fal.subscribe("fal-ai/meshy/v6-preview/text-to-3d", {
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
| `enable_pbr` | boolean | No | `false` | Generate PBR Maps (metallic, roughness, normal) in addition to base color. Should be false for sculpture style. |
| `prompt` | string | **Yes** |  | Describe what kind of object the 3D model is. Maximum 600 characters. |
| `art_style` | enum: `realistic`, `sculpture` | No | `"realistic"` | Desired art style of the object. Note: enable_pbr should be false for sculpture style. |
| `target_polycount` | integer | No | `30000` | Target number of polygons in the generated model |
| `symmetry_mode` | enum: `off`, `auto`, `on` | No | `"auto"` | Controls symmetry behavior during model generation. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, input data will be checked for safety before processing. |
| `mode` | enum: `preview`, `full` | No | `"full"` | Generation mode. 'preview' returns untextured geometry only, 'full' returns textured model (preview + refine). |
| `should_remesh` | boolean | No | `true` | Whether to enable the remesh phase. When false, returns unprocessed triangular mesh. |
| `topology` | enum: `quad`, `triangle` | No | `"triangle"` | Specify the topology of the generated model. Quad for smooth surfaces, Triangle for detailed geometry. |
| `texture_image_url` | string | null | No |  | 2D image to guide the texturing process (only used in 'full' mode) |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `seed` | integer | null | No |  | Seed for reproducible results. Same prompt and seed usually generate the same result. |
| `is_a_t_pose` | boolean | No | `false` | Whether to generate the model in an A/T pose |
| `texture_prompt` | string | null | No |  | Additional text prompt to guide the texturing process (only used in 'full' mode) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The text prompt used for generation |
| `thumbnail` | File | null | Preview thumbnail of the generated model |
| `actual_prompt` | string | null | The actual prompt used if prompt expansion was enabled |
| `model_glb` | File |  |
| `texture_urls` | list<TextureFiles> | Array of texture file objects |
| `seed` | integer | null | The seed used for generation |
| `model_urls` | ModelUrls | 3D model files in various formats |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/meshy/v6-preview/text-to-3d", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/meshy/v6-preview/text-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/meshy/v6-preview/text-to-3d", {
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

- API page: https://fal.ai/models/fal-ai/meshy/v6-preview/text-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/meshy/v6-preview/text-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
