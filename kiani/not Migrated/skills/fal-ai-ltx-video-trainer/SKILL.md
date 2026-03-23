---
name: fal-ai-ltx-video-trainer
description: >
  Use this skill for the fal.ai LTX Video Trainer model (fal-ai/ltx-video-trainer). Train LTX Video 0.9.7 for custom styles and effects.
---

# LTX Video Trainer

Train LTX Video 0.9.7 for custom styles and effects.

**Endpoint:** `fal-ai/ltx-video-trainer`
**Source:** https://fal.ai/models/fal-ai/ltx-video-trainer/api

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

const result = await fal.subscribe("fal-ai/ltx-video-trainer", {
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
| `number_of_steps` | integer | No | `1000` | The number of steps to train for. |
| `frame_rate` | integer | No | `25` | The target frames per second for the video. |
| `learning_rate` | float | No | `0.0002` | The rate at which the model learns. Higher values can lead to faster training, but over-fitting. |
| `validation` | list<Validation> | No | `[]` | A list of validation prompts to use during training. When providing an image, _all_ validation inputs must have an im... |
| `validation_reverse` | boolean | No | `false` | If true, the validation videos will be reversed. This is useful for effects that are learned in reverse and then appl... |
| `number_of_frames` | integer | No | `81` | The number of frames to use for training. This is the number of frames per second multiplied by the number of seconds. |
| `training_data_url` | string | **Yes** |  | URL to zip archive with videos or images. Try to use at least 10 files, although more is better.          **Supported... |
| `split_input_duration_threshold` | float | No | `30` | The duration threshold in seconds. If a video is longer than this, it will be split into scenes. If you provide capti... |
| `rank` | enum: `8`, `16`, `32`, `64`, `128` | No | `128` | The rank of the LoRA. |
| `resolution` | enum: `low`, `medium`, `high` | No | `"medium"` | The resolution to use for training. This is the resolution of the video. |
| `trigger_phrase` | string | No | `""` | The phrase that will trigger the model to generate an image. |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"1:1"` | The aspect ratio to use for training. This is the aspect ratio of the video. |
| `split_input_into_scenes` | boolean | No | `true` | If true, videos above a certain duration threshold will be split into scenes. If you provide captions for a split vid... |
| `validation_resolution` | enum: `low`, `medium`, `high` | No | `"high"` | The resolution to use for validation. |
| `validation_number_of_frames` | integer | No | `81` | The number of frames to use for validation. |
| `validation_aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"1:1"` | The aspect ratio to use for validation. |
| `validation_negative_prompt` | string | No | `"blurry, low quality, bad quality, out of focus"` | A negative prompt to use for validation. |
| `auto_scale_input` | boolean | No | `false` | If true, videos will be automatically scaled to the target frame count and fps. This option has no effect on image da... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `lora_file` | File |  |
| `config_file` | File |  |
| `video` | File | null | The URL to the validations video. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-video-trainer", {
  input: {
        "training_data_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-video-trainer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-video-trainer", {
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

- API page: https://fal.ai/models/fal-ai/ltx-video-trainer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-video-trainer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
