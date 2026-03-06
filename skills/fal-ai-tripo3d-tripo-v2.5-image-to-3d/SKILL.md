---
name: fal-ai-tripo3d-tripo-v2.5-image-to-3d
description: >
  Use this skill for the fal.ai Tripo3D model (tripo3d/tripo/v2.5/image-to-3d). State of the art Image to 3D Object generation. Generate 3D model from a single image!
---

# Tripo3D

State of the art Image to 3D Object generation. Generate 3D model from a single image!

**Endpoint:** `tripo3d/tripo/v2.5/image-to-3d`
**Source:** https://fal.ai/models/tripo3d/tripo/v2.5/image-to-3d/api

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

const result = await fal.subscribe("tripo3d/tripo/v2.5/image-to-3d", {
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
| `face_limit` | integer | No |  | Limits the number of faces on the output model. If this option is not set, the face limit will be adaptively determined. |
| `style` | enum (8 values) | No |  | [DEPRECATED] Defines the artistic style or transformation to be applied to the 3D model, altering its appearance acco... |
| `pbr` | boolean | No | `false` | A boolean option to enable pbr. The default value is True, set False to get a model without pbr. If this option is se... |
| `texture_alignment` | enum: `original_image`, `geometry` | No | `"original_image"` | Determines the prioritization of texture alignment in the 3D model. The default value is original_image. |
| `image_url` | string | **Yes** |  | URL of the image to use for model generation. |
| `texture` | enum: `no`, `standard`, `HD` | No | `"standard"` | An option to enable texturing. Default is 'standard', set 'no' to get a model without any textures, and set 'HD' to g... |
| `auto_size` | boolean | No | `false` | Automatically scale the model to real-world dimensions, with the unit in meters. The default value is False. |
| `seed` | integer | No |  | This is the random seed for model generation. The seed controls the geometry generation process, ensuring identical m... |
| `quad` | boolean | No | `false` | Set True to enable quad mesh output (extra $0.05 per generation). If quad=True and face_limit is not set, the default... |
| `orientation` | enum: `default`, `align_image` | No | `"default"` | Set orientation=align_image to automatically rotate the model to align the original image. The default value is default. |
| `texture_seed` | integer | No |  | This is the random seed for texture generation. Using the same seed will produce identical textures. This parameter i... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `base_model` | File | Base model |
| `task_id` | string | The task id of the 3D model generation. |
| `rendered_image` | File | A preview image of the model |
| `model_mesh` | File | Model |
| `pbr_model` | File | Pbr model |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("tripo3d/tripo/v2.5/image-to-3d", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("tripo3d/tripo/v2.5/image-to-3d", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("tripo3d/tripo/v2.5/image-to-3d", {
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

- API page: https://fal.ai/models/tripo3d/tripo/v2.5/image-to-3d/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=tripo3d/tripo/v2.5/image-to-3d
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
