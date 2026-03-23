---
name: fal-ai-wan-22-vace-fun-a14b-inpainting
description: >
  Use this skill for the fal.ai Wan 2.2 VACE Fun A14B model (fal-ai/wan-22-vace-fun-a14b/inpainting). VACE Fun for Wan 2.2 A14B from Alibaba-PAI
---

# Wan 2.2 VACE Fun A14B

VACE Fun for Wan 2.2 A14B from Alibaba-PAI

**Endpoint:** `fal-ai/wan-22-vace-fun-a14b/inpainting`
**Source:** https://fal.ai/models/fal-ai/wan-22-vace-fun-a14b/inpainting/api

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

const result = await fal.subscribe("fal-ai/wan-22-vace-fun-a14b/inpainting", {
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
| `video_url` | string | **Yes** |  | URL to the source video file. Required for inpainting. |
| `num_interpolated_frames` | integer | No | `0` | Number of frames to interpolate between the original frames. A value of 0 means no interpolation. |
| `temporal_downsample_factor` | integer | No | `0` | Temporal downsample factor for the video. This is an integer value that determines how many frames to skip in the vid... |
| `first_frame_url` | string | null | No |  | URL to the first frame of the video. If provided, the model will use this frame as a reference. |
| `ref_image_urls` | list<string> | No |  | Urls to source reference image. If provided, the model will use this image as reference. |
| `transparency_mode` | enum: `content_aware`, `white`, `black` | No | `"content_aware"` | The transparency mode to apply to the first and last frames. This controls how the transparent areas of the first and... |
| `num_frames` | integer | No | `81` | Number of frames to generate. Must be between 81 to 241 (inclusive). |
| `auto_downsample_min_fps` | float | No | `15` | The minimum frames per second to downsample the video to. This is used to help determine the auto downsample factor t... |
| `guidance_scale` | float | No | `5` | Guidance scale for classifier-free guidance. Higher values encourage the model to generate images closely related to ... |
| `sampler` | enum: `unipc`, `dpm++`, `euler` | No | `"unipc"` | Sampler to use for video generation. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `mask_video_url` | string | null | No |  | URL to the source mask file. Required for inpainting. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `interpolator_model` | enum: `rife`, `film` | No | `"film"` | The model to use for frame interpolation. Options are 'rife' or 'film'. |
| `preprocess` | boolean | No | `false` | Whether to preprocess the input video. |
| `enable_auto_downsample` | boolean | No | `false` | If true, the model will automatically temporally downsample the video to an appropriate frame length for the model, t... |
| `shift` | float | No | `5` | Shift parameter for video generation. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. |
| `acceleration` | enum: `none`, `low`, `regular` | null | No | `"regular"` | Acceleration to use for inference. Options are 'none' or 'regular'. Accelerated inference will very slightly affect o... |
| `mask_image_url` | string | null | No |  | URL to the guiding mask file. If provided, the model will use this mask as a reference to create masked video using s... |
| `frames_per_second` | integer | null | No | `16` | Frames per second of the generated video. Must be between 5 to 30. Ignored if match_input_frames_per_second is true. |
| `match_input_num_frames` | boolean | No | `false` | If true, the number of frames in the generated video will match the number of frames in the input video. If false, th... |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `"letterboxing, borders, black bars, bright colors, overexposed, static, blurred details, subtitles, style, artwork, painting, picture, still, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, malformed limbs, fused fingers, still picture, cluttered background, three legs, many people in the background, walking backwards"` | Negative prompt for video generation. |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `return_frames_zip` | boolean | No | `false` | If true, also return a ZIP file containing all generated frames. |
| `aspect_ratio` | enum: `auto`, `16:9`, `1:1`, `9:16` | No | `"auto"` | Aspect ratio of the generated video. |
| `resolution` | enum: `auto`, `240p`, `360p`, `480p`, `580p`, `720p` | No | `"auto"` | Resolution of the generated video. |
| `match_input_frames_per_second` | boolean | No | `false` | If true, the frames per second of the generated video will match the input video. If false, the frames per second wil... |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `last_frame_url` | string | null | No |  | URL to the last frame of the video. If provided, the model will use this frame as a reference. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation. |
| `frames_zip` | File | null | ZIP archive of all video frames if requested. |
| `seed` | integer | The seed used for generation. |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-22-vace-fun-a14b/inpainting", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-22-vace-fun-a14b/inpainting", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-22-vace-fun-a14b/inpainting", {
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

- API page: https://fal.ai/models/fal-ai/wan-22-vace-fun-a14b/inpainting/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-22-vace-fun-a14b/inpainting
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
