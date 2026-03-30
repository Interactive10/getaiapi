---
name: fal-ai-chain-of-zoom
description: >
  Use this skill for the fal.ai Chain Of Zoom model (fal-ai/chain-of-zoom). Extreme Super-Resolution via Scale Autoregression and Preference Alignment
---

# Chain Of Zoom

Extreme Super-Resolution via Scale Autoregression and Preference Alignment

**Endpoint:** `fal-ai/chain-of-zoom`
**Source:** https://fal.ai/models/fal-ai/chain-of-zoom/api

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

const result = await fal.subscribe("fal-ai/chain-of-zoom", {
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
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `center_y` | float | No | `0.5` | Y coordinate of zoom center (0-1) |
| `scale` | float | No | `5` | Zoom scale in powers of 2 |
| `center_x` | float | No | `0.5` | X coordinate of zoom center (0-1) |
| `user_prompt` | string | No | `""` | Additional prompt text to guide the zoom enhancement |
| `image_url` | string | **Yes** |  | Input image to zoom into |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | List of intermediate images |
| `zoom_center` | list<float> | Center coordinates used for zoom |
| `scale` | float | Actual linear zoom scale applied |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/chain-of-zoom", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/chain-of-zoom", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/chain-of-zoom", {
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

- API page: https://fal.ai/models/fal-ai/chain-of-zoom/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/chain-of-zoom
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
