---
name: fal-ai-rife
description: >
  Use this skill for the fal.ai RIFE model (fal-ai/rife). Interpolate images with RIFE - Real-Time Intermediate Flow Estimation
---

# RIFE

Interpolate images with RIFE - Real-Time Intermediate Flow Estimation

**Endpoint:** `fal-ai/rife`
**Source:** https://fal.ai/models/fal-ai/rife/api

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

const result = await fal.subscribe("fal-ai/rife", {
  input: {
        "start_image_url": "https://example.com/input.png",
        "end_image_url": "https://example.com/input.png"
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
| `output_format` | enum: `png`, `jpeg` | No | `"jpeg"` | The format of the output images. Only applicable if output_type is 'images'. |
| `include_start` | boolean | No | `false` | Whether to include the start image in the output. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `include_end` | boolean | No | `false` | Whether to include the end image in the output. |
| `fps` | integer | No | `8` | Frames per second for the output video. Only applicable if output_type is 'video'. |
| `start_image_url` | string | **Yes** |  | The URL of the first image to use as the starting point for interpolation. |
| `end_image_url` | string | **Yes** |  | The URL of the second image to use as the ending point for interpolation. |
| `num_frames` | integer | No | `1` | The number of frames to generate between the input images. |
| `output_type` | enum: `images`, `video` | No | `"images"` | The type of output to generate; either individual images or a video. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated frames as individual images. |
| `video` | File | null | The generated video file, if output_type is 'video'. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/rife", {
  input: {
        "start_image_url": "https://example.com/input.png",
        "end_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/rife", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/rife", {
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

- API page: https://fal.ai/models/fal-ai/rife/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/rife
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
