---
name: fal-ai-one-to-all-animation-1.3b
description: >
  Use this skill for the fal.ai One To All Animation model (fal-ai/one-to-all-animation/1.3b). One-to-All Animation is a pose driven video model that animates characters from a single reference image, enabling flexible, alignment-free motion transfer across diverse styles and scenes
---

# One To All Animation

One-to-All Animation is a pose driven video model that animates characters from a single reference image, enabling flexible, alignment-free motion transfer across diverse styles and scenes

**Endpoint:** `fal-ai/one-to-all-animation/1.3b`
**Source:** https://fal.ai/models/fal-ai/one-to-all-animation/1.3b/api

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

const result = await fal.subscribe("fal-ai/one-to-all-animation/1.3b", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "negative_prompt": "your value here"
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"480p"` | The resolution of the video to generate. |
| `image_guidance_scale` | float | No | `2` | The image guidance scale to use for the video generation. |
| `pose_guidance_scale` | float | No | `1.5` | The pose guidance scale to use for the video generation. |
| `video_url` | string | **Yes** |  | The URL of the video to use as a reference for the video generation. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a reference for the video generation. |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to use for the video generation. |
| `negative_prompt` | string | **Yes** |  | The negative prompt to generate the video from. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/one-to-all-animation/1.3b", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "negative_prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/one-to-all-animation/1.3b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/one-to-all-animation/1.3b", {
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

- API page: https://fal.ai/models/fal-ai/one-to-all-animation/1.3b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/one-to-all-animation/1.3b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
