---
name: fal-ai-omnipart
description: >
  Use this skill for the fal.ai Omnipart model (fal-ai/omnipart). Image-to-3D endpoint for OmniPart, a part-aware 3D generator with semantic decoupling and structural cohesion.
---

# Omnipart

Image-to-3D endpoint for OmniPart, a part-aware 3D generator with semantic decoupling and structural cohesion.

**Endpoint:** `fal-ai/omnipart`
**Source:** https://fal.ai/models/fal-ai/omnipart/api

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

const result = await fal.subscribe("fal-ai/omnipart", {
  input: {
        "input_image_url": "https://example.com/input.png"
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
| `input_image_url` | string | **Yes** |  | URL of image to use while generating the 3D model. |
| `parts` | string | No | `""` | Specify which segments to merge (e.g., '0,1;3,4' merges segments 0&1 together and 3&4 together) |
| `seed` | integer | No | `765464` | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `minimum_segment_size` | integer | No | `2000` | Minimum segment size (pixels) for the model. |
| `guidance_scale` | float | No | `7.5` | Guidance scale for the model. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `full_model_mesh` | File |  |
| `output_zip` | File |  |
| `seed` | integer | Seed value used for generation. |
| `model_mesh` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/omnipart", {
  input: {
        "input_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/omnipart", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/omnipart", {
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

- API page: https://fal.ai/models/fal-ai/omnipart/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/omnipart
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
