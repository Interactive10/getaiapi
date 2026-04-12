---
name: fal-ai-imageutils-marigold-depth
description: >
  Use this skill for the fal.ai Marigold Depth Estimation model (fal-ai/imageutils/marigold-depth). Create depth maps using Marigold depth estimation.
---

# Marigold Depth Estimation

Create depth maps using Marigold depth estimation.

**Endpoint:** `fal-ai/imageutils/marigold-depth`
**Source:** https://fal.ai/models/fal-ai/imageutils/marigold-depth/api

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

const result = await fal.subscribe("fal-ai/imageutils/marigold-depth", {
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
| `ensemble_size` | integer | No | `10` | Number of predictions to average over. Defaults to `10`. The higher the number, the more accurate the result, but the... |
| `num_inference_steps` | integer | No | `10` | Number of denoising steps. Defaults to `10`. The higher the number, the more accurate the result, but the slower the ... |
| `processing_res` | integer | No | `0` | Maximum processing resolution. Defaults `0` which means it uses the size of the input image. |
| `image_url` | string | **Yes** |  | Input image url. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The depth map. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/imageutils/marigold-depth", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/imageutils/marigold-depth", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/imageutils/marigold-depth", {
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

- API page: https://fal.ai/models/fal-ai/imageutils/marigold-depth/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/imageutils/marigold-depth
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
