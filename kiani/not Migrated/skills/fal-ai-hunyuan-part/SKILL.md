---
name: fal-ai-hunyuan-part
description: >
  Use this skill for the fal.ai Hunyuan Part model (fal-ai/hunyuan-part). Use the capabilities of hunyuan part to generate point clouds from your 3D files.
---

# Hunyuan Part

Use the capabilities of hunyuan part to generate point clouds from your 3D files.

**Endpoint:** `fal-ai/hunyuan-part`
**Source:** https://fal.ai/models/fal-ai/hunyuan-part/api

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

const result = await fal.subscribe("fal-ai/hunyuan-part", {
  input: {
        "model_file_url": "https://example.com/input.png"
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
| `point_prompt_x` | float | No | `0` | X coordinate of the point prompt for segmentation (normalized space -1 to 1). |
| `point_prompt_z` | float | No | `0` | Z coordinate of the point prompt for segmentation (normalized space -1 to 1). |
| `use_normal` | boolean | No | `true` | Whether to use normal information for segmentation. |
| `noise_std` | float | No | `0` | Standard deviation of noise to add to sampled points. |
| `point_num` | integer | No | `100000` | Number of points to sample from the mesh. |
| `model_file_url` | string | **Yes** |  | URL of the 3D model file (.glb or .obj) to process for segmentation. |
| `point_prompt_y` | float | No | `0` | Y coordinate of the point prompt for segmentation (normalized space -1 to 1). |
| `seed` | integer | No |  | The same seed and input will produce the same segmentation results. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `iou_scores` | list<float> | IoU scores for each of the three masks. |
| `best_mask_index` | integer | Index of the best mask (1, 2, or 3) based on IoU score. |
| `mask_2_mesh` | File | Mesh showing segmentation mask 2. |
| `mask_1_mesh` | File | Mesh showing segmentation mask 1. |
| `segmented_mesh` | File | Segmented 3D mesh with mask applied. |
| `seed` | integer | Seed value used for generation. |
| `mask_3_mesh` | File | Mesh showing segmentation mask 3. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-part", {
  input: {
        "model_file_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-part", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-part", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-part/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-part
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
