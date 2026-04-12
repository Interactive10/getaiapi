---
name: fal-ai-post-processing-chromatic-aberration
description: >
  Use this skill for the fal.ai Post Processing model (fal-ai/post-processing/chromatic-aberration). Create chromatic aberration by shifting red, green, and blue channels horizontally or vertically with customizable shift amounts.
---

# Post Processing

Create chromatic aberration by shifting red, green, and blue channels horizontally or vertically with customizable shift amounts.

**Endpoint:** `fal-ai/post-processing/chromatic-aberration`
**Source:** https://fal.ai/models/fal-ai/post-processing/chromatic-aberration/api

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

const result = await fal.subscribe("fal-ai/post-processing/chromatic-aberration", {
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
| `blue_shift` | integer | No | `0` | Blue channel shift amount |
| `red_shift` | integer | No | `0` | Red channel shift amount |
| `green_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Green channel shift direction |
| `blue_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Blue channel shift direction |
| `red_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Red channel shift direction |
| `image_url` | string | **Yes** |  | URL of image to process |
| `green_shift` | integer | No | `0` | Green channel shift amount |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The processed images with chromatic aberration effect |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/post-processing/chromatic-aberration", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/post-processing/chromatic-aberration", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/post-processing/chromatic-aberration", {
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

- API page: https://fal.ai/models/fal-ai/post-processing/chromatic-aberration/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/post-processing/chromatic-aberration
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
