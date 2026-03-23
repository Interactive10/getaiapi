---
name: fal-ai-veo3.1-fast-first-last-frame-to-video
description: >
  Use this skill for the fal.ai Veo 3.1 Fast model (fal-ai/veo3.1/fast/first-last-frame-to-video). Generate videos from a first/last frame using Google's Veo 3.1 Fast
---

# Veo 3.1 Fast

Generate videos from a first/last frame using Google's Veo 3.1 Fast

**Endpoint:** `fal-ai/veo3.1/fast/first-last-frame-to-video`
**Source:** https://fal.ai/models/fal-ai/veo3.1/fast/first-last-frame-to-video/api

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

const result = await fal.subscribe("fal-ai/veo3.1/fast/first-last-frame-to-video", {
  input: {
        "prompt": "your value here",
        "first_frame_url": "https://example.com/input.png",
        "last_frame_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The text prompt describing the video you want to generate |
| `duration` | enum: `4s`, `6s`, `8s` | No | `"8s"` | The duration of the generated video. |
| `auto_fix` | boolean | No | `false` | Whether to automatically attempt to fix prompts that fail content policy or other validation checks by rewriting them. |
| `generate_audio` | boolean | No | `true` | Whether to generate audio for the video. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16` | No | `"auto"` | The aspect ratio of the generated video. |
| `resolution` | enum: `720p`, `1080p`, `4k` | No | `"720p"` | The resolution of the generated video. |
| `first_frame_url` | string | **Yes** |  | URL of the first frame of the video |
| `safety_tolerance` | enum: `1`, `2`, `3`, `4`, `5`, `6` | No | `"4"` | The safety tolerance level for content moderation. 1 is the most strict (blocks most content), 6 is the least strict. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `last_frame_url` | string | **Yes** |  | URL of the last frame of the video |
| `negative_prompt` | string | null | No |  | A negative prompt to guide the video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/veo3.1/fast/first-last-frame-to-video", {
  input: {
        "prompt": "your value here",
        "first_frame_url": "https://example.com/input.png",
        "last_frame_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/veo3.1/fast/first-last-frame-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/veo3.1/fast/first-last-frame-to-video", {
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

- API page: https://fal.ai/models/fal-ai/veo3.1/fast/first-last-frame-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/fast/first-last-frame-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
