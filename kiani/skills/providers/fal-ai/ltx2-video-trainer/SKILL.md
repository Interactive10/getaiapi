---
name: fal-ai-ltx2-video-trainer
description: >
  Use this skill for the fal.ai LTX-2 Video Trainer model (fal-ai/ltx2-video-trainer). Train LTX-2 for custom styles and effects.
---

# LTX-2 Video Trainer

Train LTX-2 for custom styles and effects.

**Endpoint:** `fal-ai/ltx2-video-trainer`
**Source:** https://fal.ai/models/fal-ai/ltx2-video-trainer/api

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

const result = await fal.subscribe("fal-ai/ltx2-video-trainer", {
  input: {
        "training_data_url": "https://example.com/input.png"
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
| `audio_normalize` | boolean | No | `true` | Normalize audio peak amplitude to a consistent level. Recommended for consistent audio levels across the dataset. |
| `audio_preserve_pitch` | boolean | No | `true` | When audio duration doesn't match video duration, stretch/compress audio without changing pitch. If disabled, audio i... |
| `frame_rate` | integer | No | `25` | Target frames per second for the video. |
| `number_of_steps` | integer | No | `2000` | The number of training steps. |
| `learning_rate` | float | No | `0.0002` | Learning rate for optimization. Higher values can lead to faster training but may cause overfitting. |
| `validation` | list<Validation> | No | `[]` | A list of validation prompts to use during training. When providing an image, _all_ validation inputs must have an im... |
| `number_of_frames` | integer | No | `89` | Number of frames per training sample. Must satisfy frames % 8 == 1 (e.g., 1, 9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 8... |
| `training_data_url` | string | **Yes** |  | URL to zip archive with videos or images. Try to use at least 10 files, although more is better.          **Supported... |
| `split_input_duration_threshold` | float | No | `30` | The duration threshold in seconds. If a video is longer than this, it will be split into scenes. |
| `rank` | enum: `8`, `16`, `32`, `64`, `128` | No | `32` | The rank of the LoRA adaptation. Higher values increase capacity but use more memory. |
| `stg_scale` | float | No | `1` | STG (Spatio-Temporal Guidance) scale. 0.0 disables STG. Recommended value is 1.0. |
| `first_frame_conditioning_p` | float | No | `0.5` | Probability of conditioning on the first frame during training. Higher values improve image-to-video performance. |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"1:1"` | Aspect ratio to use for training. |
| `trigger_phrase` | string | No | `""` | A phrase that will trigger the LoRA style. Will be prepended to captions during training. |
| `split_input_into_scenes` | boolean | No | `true` | If true, videos above a certain duration threshold will be split into scenes. |
| `validation_frame_rate` | integer | No | `25` | Target frames per second for validation videos. |
| `with_audio` | boolean | null | No |  | Enable joint audio-video training. If None (default), automatically detects whether input videos have audio. Set to T... |
| `resolution` | enum: `low`, `medium`, `high` | No | `"medium"` | Resolution to use for training. Higher resolutions require more memory. |
| `generate_audio_in_validation` | boolean | No | `true` | Whether to generate audio in validation samples. |
| `validation_resolution` | enum: `low`, `medium`, `high` | No | `"high"` | The resolution to use for validation. |
| `validation_number_of_frames` | integer | No | `89` | The number of frames in validation videos. |
| `validation_aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"1:1"` | The aspect ratio to use for validation. |
| `validation_negative_prompt` | string | No | `"worst quality, inconsistent motion, blurry, jittery, distorted"` | A negative prompt to use for validation. |
| `auto_scale_input` | boolean | No | `false` | If true, videos will be automatically scaled to the target frame count and fps. This option has no effect on image da... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `lora_file` | File |  |
| `config_file` | File |  |
| `debug_dataset` | File | null | URL to the debug dataset archive containing decoded videos and audio. |
| `video` | File | null | The URL to the validation videos, if any. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx2-video-trainer", {
  input: {
        "training_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx2-video-trainer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx2-video-trainer", {
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

- API page: https://fal.ai/models/fal-ai/ltx2-video-trainer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx2-video-trainer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
