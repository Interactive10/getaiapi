---
name: fal-ai-stable-video
description: >
  Use this skill for the fal.ai High Quality Stable Video Diffusion model (fal-ai/stable-video). Generate short video clips from your images using SVD v1.1
---

# High Quality Stable Video Diffusion

Generate short video clips from your images using SVD v1.1

**Endpoint:** `fal-ai/stable-video`
**Source:** https://fal.ai/models/fal-ai/stable-video/api

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

const result = await fal.subscribe("fal-ai/stable-video", {
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
| `motion_bucket_id` | integer | No | `127` | The motion bucket id determines the motion of the generated video. The             higher the number, the more motion... |
| `fps` | integer | No | `25` | The frames per second of the generated video. |
| `cond_aug` | float | No | `0.02` | The conditoning augmentation determines the amount of noise that will be             added to the conditioning frame.... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `image_url` | string | **Yes** |  | The URL of the image to use as a starting point for the generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | Seed for random number generator |
| `video` | File | Generated video |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/stable-video", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/stable-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/stable-video", {
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

- API page: https://fal.ai/models/fal-ai/stable-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/stable-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
