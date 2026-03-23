---
name: fal-ai-hyper3d-rodin-v2
description: >
  Use this skill for the fal.ai Hyper3d model (fal-ai/hyper3d/rodin/v2). Rodin by Hyper3D generates realistic and production ready 3D models from text or images.
---

# Hyper3d

Rodin by Hyper3D generates realistic and production ready 3D models from text or images.

**Endpoint:** `fal-ai/hyper3d/rodin/v2`
**Source:** https://fal.ai/models/fal-ai/hyper3d/rodin/v2/api

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

const result = await fal.subscribe("fal-ai/hyper3d/rodin/v2", {
  input: {
        "prompt": "your prompt here"
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
| `bbox_condition` | list<integer> | null | No |  | An array that specifies the bounding box dimensions [width, height, length]. |
| `quality_mesh_option` | enum (8 values) | No | `"500K Triangle"` | Combined quality and mesh type selection. Quad = smooth surfaces, Triangle = detailed geometry. These corresponds to ... |
| `preview_render` | boolean | No | `false` | Generate a preview render image of the 3D model along with the model files. |
| `prompt` | string | No | `""` | A textual prompt to guide model generation. Optional for Image-to-3D mode - if empty, AI will generate a prompt based... |
| `input_image_urls` | list<string> | No |  | URL of images to use while generating the 3D model. Required for Image-to-3D mode. Up to 5 images allowed. |
| `TAPose` | boolean | No | `false` | Generate characters in T-pose or A-pose format, making them easier to rig and animate in 3D software. |
| `use_original_alpha` | boolean | No | `false` | When enabled, preserves the transparency channel from input images during 3D generation. |
| `geometry_file_format` | enum: `glb`, `usdz`, `fbx`, `obj`, `stl` | No | `"glb"` | Format of the geometry file. Possible values: glb, usdz, fbx, obj, stl. Default is glb. |
| `addons` | string | null | No |  | The HighPack option will provide 4K resolution textures instead of the default 1K, as well as models with high-poly. ... |
| `seed` | integer | null | No |  | Seed value for randomization, ranging from 0 to 65535. Optional. |
| `material` | enum: `PBR`, `Shaded`, `All` | No | `"All"` | Material type. PBR: Physically-based materials with realistic lighting. Shaded: Simple materials with baked lighting.... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_mesh` | File |  |
| `textures` | list<Image> | Generated textures for the 3D object. |
| `seed` | integer | Seed value used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hyper3d/rodin/v2", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hyper3d/rodin/v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hyper3d/rodin/v2", {
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

- API page: https://fal.ai/models/fal-ai/hyper3d/rodin/v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hyper3d/rodin/v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
