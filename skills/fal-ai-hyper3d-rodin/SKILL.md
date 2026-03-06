---
name: fal-ai-hyper3d-rodin
description: >
  Use this skill for the fal.ai Hyper3D Rodin model (fal-ai/hyper3d/rodin). Rodin by Hyper3D generates realistic and production ready 3D models from text or images.
---

# Hyper3D Rodin

Rodin by Hyper3D generates realistic and production ready 3D models from text or images.

**Endpoint:** `fal-ai/hyper3d/rodin`
**Source:** https://fal.ai/models/fal-ai/hyper3d/rodin/api

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

const result = await fal.subscribe("fal-ai/hyper3d/rodin", {
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
| `tier` | enum: `Regular`, `Sketch` | No | `"Regular"` | Tier of generation. For Rodin Sketch, set to Sketch. For Rodin Regular, set to Regular. |
| `condition_mode` | enum: `fuse`, `concat` | No | `"concat"` | For fuse mode, One or more images are required.It will generate a model by extracting and fusing features of objects ... |
| `prompt` | string | No | `""` | A textual prompt to guide model generation. Required for Text-to-3D mode. Optional for Image-to-3D mode. |
| `bbox_condition` | list<integer> | null | No |  | An array that specifies the dimensions and scaling factor of the bounding box. Typically, this array contains 3 eleme... |
| `quality` | enum: `high`, `medium`, `low`, `extra-low` | No | `"medium"` | Generation quality. Possible values: high, medium, low, extra-low. Default is medium. |
| `TAPose` | boolean | No | `false` | When generating the human-like model, this parameter control the generation result to T/A Pose. |
| `input_image_urls` | list<string> | No |  | URL of images to use while generating the 3D model. Required for Image-to-3D mode. Optional for Text-to-3D mode. |
| `geometry_file_format` | enum: `glb`, `usdz`, `fbx`, `obj`, `stl` | No | `"glb"` | Format of the geometry file. Possible values: glb, usdz, fbx, obj, stl. Default is glb. |
| `addons` | string | null | No |  | Generation add-on features. Default is []. Possible values are HighPack. The HighPack option will provide 4K resoluti... |
| `use_hyper` | boolean | No | `false` | Whether to export the model using hyper mode. Default is false. |
| `seed` | integer | null | No |  | Seed value for randomization, ranging from 0 to 65535. Optional. |
| `material` | enum: `PBR`, `Shaded` | No | `"PBR"` | Material type. Possible values: PBR, Shaded. Default is PBR. |

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
const { request_id } = await fal.queue.submit("fal-ai/hyper3d/rodin", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hyper3d/rodin", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hyper3d/rodin", {
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

- API page: https://fal.ai/models/fal-ai/hyper3d/rodin/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hyper3d/rodin
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
