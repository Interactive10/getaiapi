---
name: fal-ai-wan-vace
description: >
  Use this skill for the fal.ai Vace model (fal-ai/wan-vace). Vace a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources.
---

# Vace

Vace a video generation model that uses a source image, mask, and video to create prompted videos with controllable sources.

**Endpoint:** `fal-ai/wan-vace`
**Source:** https://fal.ai/models/fal-ai/wan-vace/api

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

const result = await fal.subscribe("fal-ai/wan-vace", {
  input: {
        "prompt": "your value here"
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
| `shift` | float | No | `5` | Shift parameter for video generation. |
| `video_url` | string | No |  | URL to the source video file. If provided, the model will use this video as a reference. |
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `ref_image_urls` | list<string> | No |  | Urls to source reference image. If provided, the model will use this image as reference. |
| `task` | enum: `depth`, `inpainting` | No | `"depth"` | Task type for the model. |
| `frames_per_second` | integer | No | `16` | Frames per second of the generated video. Must be between 5 to 24. |
| `mask_image_url` | string | No |  | URL to the guiding mask file. If provided, the model will use this mask as a reference to create masked video. If pro... |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `num_frames` | integer | No | `81` | Number of frames to generate. Must be between 81 to 100 (inclusive). Works only with only reference images as input i... |
| `negative_prompt` | string | No | `"bright colors, overexposed, static, blurred details, subtitles, style, artwork, painting, picture, still, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, malformed limbs, fused fingers, still picture, cluttered background, three legs, many people in the background, walking backwards"` | Negative prompt for video generation. |
| `aspect_ratio` | enum: `auto`, `9:16`, `16:9` | No | `"16:9"` | Aspect ratio of the generated video (16:9 or 9:16). |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"720p"` | Resolution of the generated video (480p,580p, or 720p). |
| `mask_video_url` | string | No |  | URL to the source mask file. If provided, the model will use this mask as a reference. |
| `seed` | integer | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `preprocess` | boolean | No | `false` | Whether to preprocess the input video. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-vace", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-vace", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-vace", {
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

- API page: https://fal.ai/models/fal-ai/wan-vace/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-vace
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
