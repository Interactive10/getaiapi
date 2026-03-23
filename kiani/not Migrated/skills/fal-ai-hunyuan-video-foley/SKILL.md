---
name: fal-ai-hunyuan-video-foley
description: >
  Use this skill for the fal.ai Hunyuan Video Foley model (fal-ai/hunyuan-video-foley). Use the capabilities of the hunyuan foley model to bring life to your videos by adding sound effect to them.
---

# Hunyuan Video Foley

Use the capabilities of the hunyuan foley model to bring life to your videos by adding sound effect to them.

**Endpoint:** `fal-ai/hunyuan-video-foley`
**Source:** https://fal.ai/models/fal-ai/hunyuan-video-foley/api

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

const result = await fal.subscribe("fal-ai/hunyuan-video-foley", {
  input: {
        "video_url": "https://example.com/input.png",
        "text_prompt": "your value here"
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
| `video_url` | string | **Yes** |  | The URL of the video to generate audio for. |
| `guidance_scale` | float | No | `4.5` | Guidance scale for audio generation. |
| `num_inference_steps` | integer | No | `50` | Number of inference steps for generation. |
| `seed` | integer | No |  | Random seed for reproducible generation. |
| `negative_prompt` | string | No | `"noisy, harsh"` | Negative prompt to avoid certain audio characteristics. |
| `text_prompt` | string | **Yes** |  | Text description of the desired audio (optional). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | List of generated video files with audio. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video-foley", {
  input: {
        "video_url": "https://example.com/input.png",
        "text_prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-video-foley", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-video-foley", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-video-foley/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-video-foley
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
