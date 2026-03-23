---
name: fal-ai-hunyuan-avatar
description: >
  Use this skill for the fal.ai Hunyuan Avatar model (fal-ai/hunyuan-avatar). HunyuanAvatar is a High-Fidelity Audio-Driven Human Animation model for Multiple Characters .
---

# Hunyuan Avatar

HunyuanAvatar is a High-Fidelity Audio-Driven Human Animation model for Multiple Characters .

**Endpoint:** `fal-ai/hunyuan-avatar`
**Source:** https://fal.ai/models/fal-ai/hunyuan-avatar/api

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

const result = await fal.subscribe("fal-ai/hunyuan-avatar", {
  input: {
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
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
| `text` | string | No | `"A cat is singing."` | Text prompt describing the scene. |
| `image_url` | string | **Yes** |  | The URL of the reference image. |
| `turbo_mode` | boolean | No | `true` | If true, the video will be generated faster with no noticeable degradation in the visual quality. |
| `audio_url` | string | **Yes** |  | The URL of the audio file. |
| `num_frames` | integer | No | `129` | Number of video frames to generate at 25 FPS. If greater than the input audio length, it will capped to the length of... |
| `seed` | integer | null | No |  | Random seed for generation. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-avatar", {
  input: {
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-avatar", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-avatar", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-avatar/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-avatar
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
