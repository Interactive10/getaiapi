---
name: fal-ai-ltx-video-lora-image-to-video
description: >
  Use this skill for the fal.ai LTX Video-0.9.7 LoRA model (fal-ai/ltx-video-lora/image-to-video). Generate videos from prompts and images using LTX Video-0.9.7 and custom LoRA
---

# LTX Video-0.9.7 LoRA

Generate videos from prompts and images using LTX Video-0.9.7 and custom LoRA

**Endpoint:** `fal-ai/ltx-video-lora/image-to-video`
**Source:** https://fal.ai/models/fal-ai/ltx-video-lora/image-to-video/api

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

const result = await fal.subscribe("fal-ai/ltx-video-lora/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16`, `auto` | No | `"auto"` | The aspect ratio of the video. |
| `frame_rate` | integer | No | `25` | The frame rate of the video. |
| `number_of_steps` | integer | No | `30` | The number of inference steps to use. |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | The resolution of the video. |
| `expand_prompt` | boolean | No | `false` | Whether to expand the prompt using the LLM. |
| `number_of_frames` | integer | No | `89` | The number of frames in the video. |
| `image_url` | string | **Yes** |  | The URL of the image to use as input. |
| `loras` | list<LoRAWeight> | No | `[]` | The LoRA weights to use for generation. |
| `reverse_video` | boolean | No | `false` | Whether to reverse the video. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `seed` | integer | null | No |  | The seed to use for generation. |
| `negative_prompt` | string | No | `"blurry, low quality, low resolution, inconsistent motion, jittery, distorted"` | The negative prompt to use. |

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
const { request_id } = await fal.queue.submit("fal-ai/ltx-video-lora/image-to-video", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-video-lora/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-video-lora/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/ltx-video-lora/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-video-lora/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
