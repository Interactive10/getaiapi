---
name: fal-ai-pshuman
description: >
  Use this skill for the fal.ai Pshuman model (fal-ai/pshuman). Use the 6D pose estimation capabilities of PSHuman to generate 3D files from single image.
---

# Pshuman

Use the 6D pose estimation capabilities of PSHuman to generate 3D files from single image.

**Endpoint:** `fal-ai/pshuman`
**Source:** https://fal.ai/models/fal-ai/pshuman/api

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

const result = await fal.subscribe("fal-ai/pshuman", {
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
| `guidance_scale` | float | No | `4` | Guidance scale for the diffusion process. Controls how much the output adheres to the generated views. |
| `seed` | integer | No |  | Seed for reproducibility. If None, a random seed will be used. |
| `image_url` | string | **Yes** |  | A direct URL to the input image of a person. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_obj` | File | The generated 3D model in OBJ format. |
| `preview_image` | File | A preview image showing the input and the generated multi-view outputs. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pshuman", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pshuman", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pshuman", {
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

- API page: https://fal.ai/models/fal-ai/pshuman/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pshuman
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
