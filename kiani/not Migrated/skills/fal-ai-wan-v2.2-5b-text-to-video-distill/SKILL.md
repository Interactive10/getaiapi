---
name: fal-ai-wan-v2.2-5b-text-to-video-distill
description: >
  Use this skill for the fal.ai Wan model (fal-ai/wan/v2.2-5b/text-to-video/distill). Wan 2.2's 5B distill model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding
---

# Wan

Wan 2.2's 5B distill model produces up to 5 seconds of video 720p at 24FPS with fluid motion and powerful prompt understanding

**Endpoint:** `fal-ai/wan/v2.2-5b/text-to-video/distill`
**Source:** https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-video/distill/api

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

const result = await fal.subscribe("fal-ai/wan/v2.2-5b/text-to-video/distill", {
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `shift` | float | No | `5` | Shift value for the video. Must be between 1.0 and 10.0. |
| `num_interpolated_frames` | integer | No | `0` | Number of frames to interpolate between each pair of generated frames. Must be between 0 and 4. |
| `frames_per_second` | integer | null | No | `24` | Frames per second of the generated video. Must be between 4 to 60. When using interpolation and `adjust_fps_for_inter... |
| `guidance_scale` | float | No | `1` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `num_frames` | integer | No | `81` | Number of frames to generate. Must be between 17 to 161 (inclusive). |
| `enable_safety_checker` | boolean | No | `false` | If set to true, input data will be checked for safety before processing. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. Faster write mode means faster results but larger file size, balanced write mode ... |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the generated video (16:9 or 9:16). |
| `resolution` | enum: `580p`, `720p` | No | `"720p"` | Resolution of the generated video (580p or 720p). |
| `enable_output_safety_checker` | boolean | No | `false` | If set to true, output video will be checked for safety after generation. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. Higher quality means better visual quality but larger file size. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `num_inference_steps` | integer | No | `40` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `interpolator_model` | enum: `none`, `film`, `rife` | No | `"film"` | The model to use for frame interpolation. If None, no interpolation is applied. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `adjust_fps_for_interpolation` | boolean | No | `true` | If true, the number of frames per second will be multiplied by the number of interpolated frames plus one. For exampl... |

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
const { request_id } = await fal.queue.submit("fal-ai/wan/v2.2-5b/text-to-video/distill", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan/v2.2-5b/text-to-video/distill", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan/v2.2-5b/text-to-video/distill", {
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

- API page: https://fal.ai/models/fal-ai/wan/v2.2-5b/text-to-video/distill/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan/v2.2-5b/text-to-video/distill
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
