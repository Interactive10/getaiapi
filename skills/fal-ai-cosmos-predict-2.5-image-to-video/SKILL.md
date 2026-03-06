---
name: fal-ai-cosmos-predict-2.5-image-to-video
description: >
  Use this skill for the fal.ai Cosmos Predict 2.5 2B model (fal-ai/cosmos-predict-2.5/image-to-video). Generate video from text and images using NVIDIA's 2B Cosmos Post-Trained Model
---

# Cosmos Predict 2.5 2B

Generate video from text and images using NVIDIA's 2B Cosmos Post-Trained Model

**Endpoint:** `fal-ai/cosmos-predict-2.5/image-to-video`
**Source:** https://fal.ai/models/fal-ai/cosmos-predict-2.5/image-to-video/api

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

const result = await fal.subscribe("fal-ai/cosmos-predict-2.5/image-to-video", {
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
| `prompt` | string | **Yes** |  | The text prompt describing the video to generate. |
| `video_output_type` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The format of the output video. |
| `image_url` | string | **Yes** |  | URL of the input image to use as first frame. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `7` | Classifier-free guidance scale. Higher values increase prompt adherence. |
| `num_inference_steps` | integer | No | `35` | Number of denoising steps. More steps yield higher quality but take longer. |
| `num_frames` | integer | No | `93` | Number of frames to generate. Must be between 9 and 93. |
| `negative_prompt` | string | No | `"The video captures a series of frames showing ugly scenes, static with no motion, motion blur, over-saturation, shaky footage, low resolution, grainy texture, pixelated images, poorly lit areas, underexposed and overexposed scenes, poor color balance, washed out colors, choppy sequences, jerky movements, low frame rate, artifacting, color banding, unnatural transitions, outdated special effects, fake elements, unconvincing visuals, poorly edited content, jump cuts, visual noise, and flickering. Overall, the video is of poor quality."` | A negative prompt to guide generation away from undesired content. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The random seed used for generation. |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/cosmos-predict-2.5/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/cosmos-predict-2.5/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/cosmos-predict-2.5/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/cosmos-predict-2.5/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/cosmos-predict-2.5/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
