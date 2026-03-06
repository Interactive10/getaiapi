---
name: fal-ai-fast-svd-lcm
description: >
  Use this skill for the fal.ai Stable Video Diffusion Turbo model (fal-ai/fast-svd-lcm). Generate short video clips from your images using SVD v1.1 at Lightning Speed
---

# Stable Video Diffusion Turbo

Generate short video clips from your images using SVD v1.1 at Lightning Speed

**Endpoint:** `fal-ai/fast-svd-lcm`
**Source:** https://fal.ai/models/fal-ai/fast-svd-lcm/api

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

const result = await fal.subscribe("fal-ai/fast-svd-lcm", {
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
| `fps` | integer | No | `10` | The FPS of the generated video. The higher the number, the faster the video will             play. Total video length... |
| `steps` | integer | No | `4` | The number of steps to run the model for. The higher the number the better             the quality and longer it will... |
| `cond_aug` | float | No | `0.02` | The conditoning augmentation determines the amount of noise that will be             added to the conditioning frame.... |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `image_url` | string | **Yes** |  | The URL of the image to use as a starting point for the generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `video` | File | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/fast-svd-lcm", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fast-svd-lcm", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fast-svd-lcm", {
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

- API page: https://fal.ai/models/fal-ai/fast-svd-lcm/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fast-svd-lcm
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
