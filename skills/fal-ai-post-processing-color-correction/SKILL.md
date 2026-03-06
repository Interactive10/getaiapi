---
name: fal-ai-post-processing-color-correction
description: >
  Use this skill for the fal.ai Post Processing model (fal-ai/post-processing/color-correction). Adjust color temperature, brightness, contrast, saturation, and gamma values for color correction.
---

# Post Processing

Adjust color temperature, brightness, contrast, saturation, and gamma values for color correction.

**Endpoint:** `fal-ai/post-processing/color-correction`
**Source:** https://fal.ai/models/fal-ai/post-processing/color-correction/api

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

const result = await fal.subscribe("fal-ai/post-processing/color-correction", {
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
| `temperature` | float | No | `0` | Color temperature adjustment |
| `saturation` | float | No | `0` | Saturation adjustment |
| `brightness` | float | No | `0` | Brightness adjustment |
| `gamma` | float | No | `1` | Gamma adjustment |
| `contrast` | float | No | `0` | Contrast adjustment |
| `image_url` | string | **Yes** |  | URL of image to process |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The processed images with color correction |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/post-processing/color-correction", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/post-processing/color-correction", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/post-processing/color-correction", {
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

- API page: https://fal.ai/models/fal-ai/post-processing/color-correction/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/post-processing/color-correction
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
