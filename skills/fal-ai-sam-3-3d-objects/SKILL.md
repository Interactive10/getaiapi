---
name: fal-ai-sam-3-3d-objects
description: >
  Use this skill for the fal.ai Sam 3 model (fal-ai/sam-3/3d-objects). SAM 3D enables precise 3D reconstruction of objects from real images, while accurately reconstructing their geometry and texture.
---

# Sam 3

SAM 3D enables precise 3D reconstruction of objects from real images, while accurately reconstructing their geometry and texture.

**Endpoint:** `fal-ai/sam-3/3d-objects`
**Source:** https://fal.ai/models/fal-ai/sam-3/3d-objects/api

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

const result = await fal.subscribe("fal-ai/sam-3/3d-objects", {
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
| `pointmap_url` | string | null | No |  | Optional URL to external pointmap/depth data (NPY or NPZ format) for improved 3D reconstruction depth estimation |
| `export_textured_glb` | boolean | No | `false` | If True, exports GLB with baked texture and UVs instead of vertex colors. |
| `detection_threshold` | float | null | No |  | Detection confidence threshold (0.1-1.0). Lower = more detections but less precise. If not set, uses the model's defa... |
| `prompt` | string | null | No | `"car"` | Text prompt for auto-segmentation when no masks provided (e.g., 'chair', 'lamp') |
| `box_prompts` | list<BoxPromptBase> | No | `[]` | Box prompts for auto-segmentation when no masks provided. Multiple boxes supported - each produces a separate object ... |
| `image_url` | string | **Yes** |  | URL of the image to reconstruct in 3D |
| `mask_urls` | list<string> | No |  | Optional list of mask URLs (one per object). If not provided, use prompt/point_prompts/box_prompts to auto-segment, o... |
| `point_prompts` | list<PointPromptBase> | No | `[]` | Point prompts for auto-segmentation when no masks provided |
| `seed` | integer | null | No |  | Random seed for reproducibility |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `individual_splats` | list<File> | null | Individual Gaussian splat files per object (only for multi-object scenes) |
| `metadata` | list<SAM3DObjectMetadata> | Per-object metadata (rotation/translation/scale) |
| `gaussian_splat` | File |  |
| `artifacts_zip` | File | null | Zip bundle containing all artifacts and metadata |
| `individual_glbs` | list<File | null> | null | Individual GLB mesh files per object (only for multi-object scenes) |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam-3/3d-objects", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-3/3d-objects", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-3/3d-objects", {
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

- API page: https://fal.ai/models/fal-ai/sam-3/3d-objects/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-3/3d-objects
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
