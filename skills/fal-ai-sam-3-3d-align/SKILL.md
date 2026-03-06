---
name: fal-ai-sam-3-3d-align
description: >
  Use this skill for the fal.ai Sam 3 model (fal-ai/sam-3/3d-align). SAM 3D enables full scene reconstructions, placing objects and humans in a shared context together.
---

# Sam 3

SAM 3D enables full scene reconstructions, placing objects and humans in a shared context together.

**Endpoint:** `fal-ai/sam-3/3d-align`
**Source:** https://fal.ai/models/fal-ai/sam-3/3d-align/api

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

const result = await fal.subscribe("fal-ai/sam-3/3d-align", {
  input: {
        "body_mesh_url": "https://example.com/input.png",
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
| `body_mask_url` | string | null | No |  | URL of the human mask image. If not provided, uses full image. |
| `body_mesh_url` | string | **Yes** |  | URL of the SAM-3D Body mesh file (.ply or .glb) to align |
| `object_mesh_url` | string | null | No |  | Optional URL of SAM-3D Object mesh (.glb) to create combined scene |
| `focal_length` | float | null | No |  | Focal length from SAM-3D Body metadata. If not provided, estimated from MoGe. |
| `image_url` | string | **Yes** |  | URL of the original image used for MoGe depth estimation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `scene_glb` | File | null | Combined scene with body + object meshes in GLB format (only when object_mesh_url provided) |
| `body_mesh_ply` | File |  |
| `metadata` | SAM3DBodyAlignmentInfo | Per-person alignment metadata. |
| `visualization` | File |  |
| `model_glb` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam-3/3d-align", {
  input: {
        "body_mesh_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam-3/3d-align", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam-3/3d-align", {
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

- API page: https://fal.ai/models/fal-ai/sam-3/3d-align/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam-3/3d-align
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
