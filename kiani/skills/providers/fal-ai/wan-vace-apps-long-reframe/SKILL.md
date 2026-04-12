---
name: fal-ai-wan-vace-apps-long-reframe
description: >
  Use this skill for the fal.ai Wan 2.1 VACE Long Reframe model (fal-ai/wan-vace-apps/long-reframe). Reframe entire videos scene-by-scene using Wan VACE 2.1
---

# Wan 2.1 VACE Long Reframe

Reframe entire videos scene-by-scene using Wan VACE 2.1

**Endpoint:** `fal-ai/wan-vace-apps/long-reframe`
**Source:** https://fal.ai/models/fal-ai/wan-vace-apps/long-reframe/api

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

const result = await fal.subscribe("fal-ai/wan-vace-apps/long-reframe", {
  input: {
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
| `shift` | float | No | `5` | Shift parameter for video generation. |
| `video_url` | string | **Yes** |  | URL to the source video file. This video will be used as a reference for the reframe task. |
| `zoom_factor` | float | No | `0` | Zoom factor for the video. When this value is greater than 0, the video will be zoomed in by this factor (in relation... |
| `paste_back` | boolean | No | `true` | Whether to paste back the reframed scene to the original video. |
| `prompt` | string | No | `""` | The text prompt to guide video generation. Optional for reframing. |
| `acceleration` | enum: `none`, `low`, `regular` | null | No | `"regular"` | Acceleration to use for inference. Options are 'none' or 'regular'. Accelerated inference will very slightly affect o... |
| `scene_threshold` | float | No | `30` | Threshold for scene detection sensitivity (0-100). Lower values detect more scenes. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `guidance_scale` | float | No | `5` | Guidance scale for classifier-free guidance. Higher values encourage the model to generate images closely related to ... |
| `auto_downsample_min_fps` | float | No | `6` | Minimum FPS for auto downsample. |
| `negative_prompt` | string | No | `"letterboxing, borders, black bars, bright colors, overexposed, static, blurred details, subtitles, style, artwork, painting, picture, still, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, malformed limbs, fused fingers, still picture, cluttered background, three legs, many people in the background, walking backwards"` | Negative prompt for video generation. |
| `sampler` | enum: `unipc`, `dpm++`, `euler` | No | `"unipc"` | Sampler to use for video generation. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `aspect_ratio` | enum: `auto`, `16:9`, `1:1`, `9:16` | No | `"auto"` | Aspect ratio of the generated video. |
| `return_frames_zip` | boolean | No | `false` | If true, also return a ZIP file containing all generated frames. |
| `trim_borders` | boolean | No | `true` | Whether to trim borders from the video. |
| `transparency_mode` | enum: `content_aware`, `white`, `black` | No | `"content_aware"` | The transparency mode to apply to the first and last frames. This controls how the transparent areas of the first and... |
| `resolution` | enum: `auto`, `240p`, `360p`, `480p`, `580p`, `720p` | No | `"auto"` | Resolution of the generated video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `interpolator_model` | enum: `rife`, `film` | No | `"film"` | The model to use for frame interpolation. Options are 'rife' or 'film'. |
| `enable_auto_downsample` | boolean | No | `true` | Whether to enable auto downsample. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-vace-apps/long-reframe", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-vace-apps/long-reframe", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-vace-apps/long-reframe", {
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

- API page: https://fal.ai/models/fal-ai/wan-vace-apps/long-reframe/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-vace-apps/long-reframe
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
