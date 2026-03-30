---
name: fal-ai-wan-v2.2-14b-speech-to-video
description: >
  Use this skill for the fal.ai Wan-2.2 Speech-to-Video 14B model (fal-ai/wan/v2.2-14b/speech-to-video). Wan-S2V is a video model that generates high-quality videos from static images and audio, with realistic facial expressions, body movements, and professional camera work for film and television applic
---

# Wan-2.2 Speech-to-Video 14B

Wan-S2V is a video model that generates high-quality videos from static images and audio, with realistic facial expressions, body movements, and professional camera work for film and television applications

**Endpoint:** `fal-ai/wan/v2.2-14b/speech-to-video`
**Source:** https://fal.ai/models/fal-ai/wan/v2.2-14b/speech-to-video/api

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

const result = await fal.subscribe("fal-ai/wan/v2.2-14b/speech-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The text prompt used for video generation. |
| `shift` | float | No | `5` | Shift value for the video. Must be between 1.0 and 10.0. |
| `frames_per_second` | integer | null | No | `16` | Frames per second of the generated video. Must be between 4 to 60. When using interpolation and `adjust_fps_for_inter... |
| `guidance_scale` | float | No | `3.5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `num_frames` | integer | No | `80` | Number of frames to generate. Must be between 40 to 120, (must be multiple of 4). |
| `enable_safety_checker` | boolean | No | `false` | If set to true, input data will be checked for safety before processing. |
| `negative_prompt` | string | No | `""` | Negative prompt for video generation. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. Faster write mode means faster results but larger file size, balanced write mode ... |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"480p"` | Resolution of the generated video (480p, 580p, or 720p). |
| `enable_output_safety_checker` | boolean | No | `false` | If set to true, output video will be checked for safety after generation. |
| `image_url` | string | **Yes** |  | URL of the input image. If the input image does not match the chosen aspect ratio, it is resized and center cropped. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. Higher quality means better visual quality but larger file size. |
| `audio_url` | string | **Yes** |  | The URL of the audio file. |
| `num_inference_steps` | integer | No | `27` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan/v2.2-14b/speech-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan/v2.2-14b/speech-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan/v2.2-14b/speech-to-video", {
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

- API page: https://fal.ai/models/fal-ai/wan/v2.2-14b/speech-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan/v2.2-14b/speech-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
