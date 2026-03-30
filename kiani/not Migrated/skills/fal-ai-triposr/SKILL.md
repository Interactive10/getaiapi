---
name: fal-ai-triposr
description: >
  Use this skill for the fal.ai TripoSR model (fal-ai/triposr). State of the art Image to 3D Object generation
---

# TripoSR

State of the art Image to 3D Object generation

**Endpoint:** `fal-ai/triposr`
**Source:** https://fal.ai/models/fal-ai/triposr/api

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

const result = await fal.subscribe("fal-ai/triposr", {
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
| `mc_resolution` | integer | No | `256` | Resolution of the marching cubes. Above 512 is not recommended. |
| `do_remove_background` | boolean | No | `true` | Whether to remove the background from the input image. |
| `foreground_ratio` | float | No | `0.9` | Ratio of the foreground image to the original image. |
| `output_format` | enum: `glb`, `obj` | No | `"glb"` | Output format for the 3D model. |
| `image_url` | string | **Yes** |  | Path for the image file to be processed. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `remeshing_dir` | File | Directory containing textures for the remeshed model. |
| `model_mesh` | File | Generated 3D object file. |
| `timings` | Timings | Inference timings. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/triposr", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/triposr", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/triposr", {
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

- API page: https://fal.ai/models/fal-ai/triposr/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/triposr
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
