---
name: fal-ai-video-as-prompt
description: >
  Use this skill for the fal.ai Video As Prompt model (fal-ai/video-as-prompt). A model for unified semantic control in video generation. It animates a static reference image using the motion and semantics from a reference video as a prompt.
---

# Video As Prompt

A model for unified semantic control in video generation. It animates a static reference image using the motion and semantics from a reference video as a prompt.

**Endpoint:** `fal-ai/video-as-prompt`
**Source:** https://fal.ai/models/fal-ai/video-as-prompt/api

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

const result = await fal.subscribe("fal-ai/video-as-prompt", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "video_description": "your value here"
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"9:16"` | Aspect ratio of the generated video. |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"480p"` | Resolution of the generated video. |
| `video_url` | string | **Yes** |  | reference video to generate effect video from. |
| `image_url` | string | **Yes** |  | Input image to generate the effect video for. |
| `fps` | integer | No | `16` | Frames per second for the output video. Only applicable if output_type is 'video'. |
| `video_description` | string | **Yes** |  | A brief description of the input video content. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. If set none, a random seed will be used. |
| `guidance_scale` | float | No | `5` | Guidance scale for generation. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `num_frames` | integer | No | `49` | The number of frames to generate. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/video-as-prompt", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png",
        "video_description": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/video-as-prompt", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/video-as-prompt", {
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

- API page: https://fal.ai/models/fal-ai/video-as-prompt/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/video-as-prompt
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
