---
name: fal-ai-wan-v2.2-a14b-video-to-video
description: >
  Use this skill for the fal.ai Wan model (fal-ai/wan/v2.2-a14b/video-to-video). Wan-2.2 video-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts and source videos.
---

# Wan

Wan-2.2 video-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts and source videos.

**Endpoint:** `fal-ai/wan/v2.2-a14b/video-to-video`
**Source:** https://fal.ai/models/fal-ai/wan/v2.2-a14b/video-to-video/api

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

const result = await fal.subscribe("fal-ai/wan/v2.2-a14b/video-to-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
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
| `video_url` | string | **Yes** |  | URL of the input video. |
| `num_interpolated_frames` | integer | No | `1` | Number of frames to interpolate between each pair of generated frames. Must be between 0 and 4. |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level to use. The more acceleration, the faster the generation, but with lower quality. The recommended ... |
| `shift` | float | No | `5` | Shift value for the video. Must be between 1.0 and 10.0. |
| `resample_fps` | boolean | No | `false` | If true, the video will be resampled to the passed frames per second. If false, the video will not be resampled. |
| `frames_per_second` | integer | null | No | `16` | Frames per second of the generated video. Must be between 4 to 60. When using interpolation and `adjust_fps_for_inter... |
| `guidance_scale` | float | No | `3.5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `num_frames` | integer | No | `81` | Number of frames to generate. Must be between 17 to 161 (inclusive). |
| `enable_safety_checker` | boolean | No | `false` | If set to true, input data will be checked for safety before processing. |
| `negative_prompt` | string | No | `""` | Negative prompt for video generation. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. Faster write mode means faster results but larger file size, balanced write mode ... |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', the aspect ratio will be determined automatically based on the input ... |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"720p"` | Resolution of the generated video (480p, 580p, or 720p). |
| `enable_output_safety_checker` | boolean | No | `false` | If set to true, output video will be checked for safety after generation. |
| `guidance_scale_2` | float | No | `4` | Guidance scale for the second stage of the model. This is used to control the adherence to the prompt in the second s... |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. Higher quality means better visual quality but larger file size. |
| `strength` | float | No | `0.9` | Strength of the video transformation. A value of 1.0 means the output will be completely based on the prompt, while a... |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `interpolator_model` | enum: `none`, `film`, `rife` | No | `"film"` | The model to use for frame interpolation. If None, no interpolation is applied. |
| `adjust_fps_for_interpolation` | boolean | No | `true` | If true, the number of frames per second will be multiplied by the number of interpolated frames plus one. For exampl... |
| `num_inference_steps` | integer | No | `27` | Number of inference steps for sampling. Higher values give better quality but take longer. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The text prompt used for video generation. |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan/v2.2-a14b/video-to-video", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan/v2.2-a14b/video-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan/v2.2-a14b/video-to-video", {
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

- API page: https://fal.ai/models/fal-ai/wan/v2.2-a14b/video-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan/v2.2-a14b/video-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
