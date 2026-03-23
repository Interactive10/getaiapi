---
name: fal-ai-meshy-v5-remesh
description: >
  Use this skill for the fal.ai Meshy 5 Remesh model (fal-ai/meshy/v5/remesh). Meshy-5 remesh allows you to remesh and export existing 3D models into various formats
---

# Meshy 5 Remesh

Meshy-5 remesh allows you to remesh and export existing 3D models into various formats

**Endpoint:** `fal-ai/meshy/v5/remesh`
**Source:** https://fal.ai/models/fal-ai/meshy/v5/remesh/api

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

const result = await fal.subscribe("fal-ai/meshy/v5/remesh", {
  input: {
        "model_url": "https://example.com/input.png"
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
| `resize_height` | float | No | `0` | Resize the model to a certain height measured in meters. Set to 0 for no resizing. |
| `origin_at` | enum: `bottom`, `center` | null | No |  | Position of the origin. None means no effect. |
| `target_polycount` | integer | No | `30000` | Target number of polygons in the generated model. Actual count may vary based on geometry complexity. |
| `model_url` | string | **Yes** |  | URL or base64 data URI of a 3D model to remesh. Supports .glb, .gltf, .obj, .fbx, .stl formats. Can be a publicly acc... |
| `topology` | enum: `quad`, `triangle` | No | `"triangle"` | Specify the topology of the generated model. Quad for smooth surfaces, Triangle for detailed geometry. |
| `target_formats` | list<enum: `glb`, `fbx`, `obj`, `usdz`, `blend`, `stl`> | No | `['glb']` | List of target formats for the remeshed model. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_urls` | ModelUrls | 3D model files in various formats |
| `model_glb` | File | null | Remeshed 3D object in GLB format (if GLB was requested). |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/meshy/v5/remesh", {
  input: {
        "model_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/meshy/v5/remesh", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/meshy/v5/remesh", {
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

- API page: https://fal.ai/models/fal-ai/meshy/v5/remesh/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/meshy/v5/remesh
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
