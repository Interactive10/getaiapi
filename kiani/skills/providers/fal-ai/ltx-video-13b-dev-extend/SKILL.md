---
name: fal-ai-ltx-video-13b-dev-extend
description: >
  Use this skill for the fal.ai LTX Video-0.9.7 13B model (fal-ai/ltx-video-13b-dev/extend). Extend videos using LTX Video-0.9.7 13B and custom LoRA
---

# LTX Video-0.9.7 13B

Extend videos using LTX Video-0.9.7 13B and custom LoRA

**Endpoint:** `fal-ai/ltx-video-13b-dev/extend`
**Source:** https://fal.ai/models/fal-ai/ltx-video-13b-dev/extend/api

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

const result = await fal.subscribe("fal-ai/ltx-video-13b-dev/extend", {
  input: {
        "prompt": "your value here",
        "video": "..."
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
| `prompt` | string | **Yes** |  | Text prompt to guide generation |
| `first_pass_num_inference_steps` | integer | No | `30` | Number of inference steps during the first pass. |
| `reverse_video` | boolean | No | `false` | Whether to reverse the video. |
| `frame_rate` | integer | No | `24` | The frame rate of the video. |
| `second_pass_skip_initial_steps` | integer | No | `17` | The number of inference steps to skip in the initial steps of the second pass. By skipping some steps at the beginnin... |
| `temporal_adain_factor` | float | No | `0.5` | The factor for adaptive instance normalization (AdaIN) applied to generated video chunks after the first. This can he... |
| `expand_prompt` | boolean | No | `false` | Whether to expand the prompt using a language model. |
| `loras` | list<LoRAWeight> | No | `[]` | LoRA weights to use for generation |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `num_frames` | integer | No | `121` | The number of frames in the video. |
| `second_pass_num_inference_steps` | integer | No | `30` | Number of inference steps during the second pass. |
| `negative_prompt` | string | No | `"worst quality, inconsistent motion, blurry, jittery, distorted"` | Negative prompt for generation |
| `video` | ExtendVideoConditioningInput | **Yes** |  |  |
| `enable_detail_pass` | boolean | No | `false` | Whether to use a detail pass. If True, the model will perform a second pass to refine the video and enhance details. ... |
| `aspect_ratio` | enum: `9:16`, `1:1`, `16:9`, `auto` | No | `"auto"` | The aspect ratio of the video. |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video. |
| `tone_map_compression_ratio` | float | No | `0` | The compression ratio for tone mapping. This is used to compress the dynamic range of the video to improve visual qua... |
| `constant_rate_factor` | integer | No | `29` | The constant rate factor (CRF) to compress input media with. Compressed input media more closely matches the model's ... |
| `seed` | integer | null | No |  | Random seed for generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation. |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-video-13b-dev/extend", {
  input: {
        "prompt": "your value here",
        "video": "..."
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-video-13b-dev/extend", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-video-13b-dev/extend", {
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

- API page: https://fal.ai/models/fal-ai/ltx-video-13b-dev/extend/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-video-13b-dev/extend
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
