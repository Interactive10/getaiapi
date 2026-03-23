---
name: fal-ai-wan-alpha
description: >
  Use this skill for the fal.ai Wan Alpha model (fal-ai/wan-alpha). Generate videos with transparent backgrounds
---

# Wan Alpha

Generate videos with transparent backgrounds

**Endpoint:** `fal-ai/wan-alpha`
**Source:** https://fal.ai/models/fal-ai/wan-alpha/api

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

const result = await fal.subscribe("fal-ai/wan-alpha", {
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
| `shift` | float | No | `10.5` | The shift of the generated video. |
| `prompt` | string | **Yes** |  | The prompt to guide the video generation. |
| `mask_clamp_upper` | float | No | `0.75` | The upper bound of the mask clamping. |
| `fps` | integer | No | `16` | The frame rate of the generated video. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable safety checker. |
| `num_frames` | integer | No | `81` | The number of frames to generate. |
| `mask_clamp_lower` | float | No | `0.1` | The lower bound of the mask clamping. |
| `mask_binarization_threshold` | float | No | `0.8` | The threshold for mask binarization. When binarize_mask is True, this threshold will be used to binarize the mask. Th... |
| `binarize_mask` | boolean | No | `false` | Whether to binarize the mask. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `resolution` | enum: `240p`, `360p`, `480p`, `580p`, `720p` | No | `"480p"` | The resolution of the generated video. |
| `video_output_type` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"VP9 (.webm)"` | The output type of the generated video. |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"16:9"` | The aspect ratio of the generated video. |
| `sampler` | enum: `unipc`, `dpm++`, `euler` | No | `"euler"` | The sampler to use. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `num_inference_steps` | integer | No | `8` | The number of inference steps to use. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation. |
| `image` | VideoFile | null | The generated image file. |
| `seed` | integer | The seed used for generation. |
| `mask` | VideoFile | null | The generated mask file. |
| `video` | VideoFile | null | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-alpha", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-alpha", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-alpha", {
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

- API page: https://fal.ai/models/fal-ai/wan-alpha/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-alpha
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
