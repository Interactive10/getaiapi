---
name: fal-ai-longcat-video-distilled-text-to-video-480p
description: >
  Use this skill for the fal.ai LongCat Video Distilled model (fal-ai/longcat-video/distilled/text-to-video/480p). Generate long videos from text using LongCat Video Distilled
---

# LongCat Video Distilled

Generate long videos from text using LongCat Video Distilled

**Endpoint:** `fal-ai/longcat-video/distilled/text-to-video/480p`
**Source:** https://fal.ai/models/fal-ai/longcat-video/distilled/text-to-video/480p/api

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

const result = await fal.subscribe("fal-ai/longcat-video/distilled/text-to-video/480p", {
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
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | The aspect ratio of the generated video. |
| `prompt` | string | **Yes** |  | The prompt to guide the video generation. |
| `video_output_type` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The output type of the generated video. |
| `fps` | integer | No | `15` | The frame rate of the generated video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable safety checker. |
| `num_frames` | integer | No | `162` | The number of frames to generate. |
| `num_inference_steps` | integer | No | `12` | The number of inference steps to use. |
| `seed` | integer | No |  | The seed for the random number generator. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation. |
| `seed` | integer | The seed used for generation. |
| `video` | File | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/longcat-video/distilled/text-to-video/480p", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/longcat-video/distilled/text-to-video/480p", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/longcat-video/distilled/text-to-video/480p", {
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

- API page: https://fal.ai/models/fal-ai/longcat-video/distilled/text-to-video/480p/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/longcat-video/distilled/text-to-video/480p
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
