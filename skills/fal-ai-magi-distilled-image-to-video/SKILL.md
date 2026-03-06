---
name: fal-ai-magi-distilled-image-to-video
description: >
  Use this skill for the fal.ai MAGI-1 (Distilled) model (fal-ai/magi-distilled/image-to-video). MAGI-1 distilled generates videos faster from images with exceptional understanding of physical interactions and prompting
---

# MAGI-1 (Distilled)

MAGI-1 distilled generates videos faster from images with exceptional understanding of physical interactions and prompting

**Endpoint:** `fal-ai/magi-distilled/image-to-video`
**Source:** https://fal.ai/models/fal-ai/magi-distilled/image-to-video/api

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

const result = await fal.subscribe("fal-ai/magi-distilled/image-to-video", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', the aspect ratio will be determined automatically based on the input ... |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video (480p or 720p). 480p is 0.5 billing units, and 720p is 1 billing unit. |
| `image_url` | string | **Yes** |  | URL of the input image to represent the first frame of the video. If the input image does not match the chosen aspect... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_inference_steps` | enum: `4`, `8`, `16`, `32` | No | `16` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `num_frames` | integer | null | No | `96` | Number of frames to generate. Must be between 96 and 192 (inclusive). Each additional 24 frames beyond 96 incurs an a... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/magi-distilled/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/magi-distilled/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/magi-distilled/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/magi-distilled/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/magi-distilled/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
