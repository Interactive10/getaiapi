---
name: fal-ai-luma-photon-flash-reframe
description: >
  Use this skill for the fal.ai Luma Photon Flash Reframe model (fal-ai/luma-photon/flash/reframe). This advanced tool intelligently expands your visuals, seamlessly blending new content to enhance creativity and adaptability, offering unmatched speed and quality for creators at a fraction of the co
---

# Luma Photon Flash Reframe

This advanced tool intelligently expands your visuals, seamlessly blending new content to enhance creativity and adaptability, offering unmatched speed and quality for creators at a fraction of the cost.

**Endpoint:** `fal-ai/luma-photon/flash/reframe`
**Source:** https://fal.ai/models/fal-ai/luma-photon/flash/reframe/api

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

const result = await fal.subscribe("fal-ai/luma-photon/flash/reframe", {
  input: {
        "aspect_ratio": "1:1",
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
| `prompt` | string | null | No |  | Optional prompt for reframing |
| `x_end` | integer | null | No |  | End X coordinate for reframing |
| `y_start` | integer | null | No |  | Start Y coordinate for reframing |
| `aspect_ratio` | enum (7 values) | **Yes** |  | The aspect ratio of the reframed image |
| `y_end` | integer | null | No |  | End Y coordinate for reframing |
| `image_url` | string | **Yes** |  | URL of the input image to reframe |
| `grid_position_y` | integer | null | No |  | Y position of the grid for reframing |
| `grid_position_x` | integer | null | No |  | X position of the grid for reframing |
| `x_start` | integer | null | No |  | Start X coordinate for reframing |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | The generated image |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/luma-photon/flash/reframe", {
  input: {
        "aspect_ratio": "1:1",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/luma-photon/flash/reframe", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/luma-photon/flash/reframe", {
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

- API page: https://fal.ai/models/fal-ai/luma-photon/flash/reframe/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/luma-photon/flash/reframe
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
