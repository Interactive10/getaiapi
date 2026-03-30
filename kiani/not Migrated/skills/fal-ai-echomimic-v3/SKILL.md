---
name: fal-ai-echomimic-v3
description: >
  Use this skill for the fal.ai EchoMimic V3 model (fal-ai/echomimic-v3). EchoMimic V3 generates a talking avatar model from a picture, audio and text prompt.
---

# EchoMimic V3

EchoMimic V3 generates a talking avatar model from a picture, audio and text prompt.

**Endpoint:** `fal-ai/echomimic-v3`
**Source:** https://fal.ai/models/fal-ai/echomimic-v3/api

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

const result = await fal.subscribe("fal-ai/echomimic-v3", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to use for the video generation. |
| `guidance_scale` | float | No | `4.5` | The guidance scale to use for the video generation. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a reference for the video generation. |
| `num_frames_per_generation` | integer | No | `121` | The number of frames to generate at once. |
| `seed` | integer | null | No |  | The seed to use for the video generation. |
| `audio_guidance_scale` | float | No | `2.5` | The audio guidance scale to use for the video generation. |
| `negative_prompt` | string | No | `""` | The negative prompt to use for the video generation. |
| `audio_url` | string | **Yes** |  | The URL of the audio to use as a reference for the video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/echomimic-v3", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/echomimic-v3", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/echomimic-v3", {
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

- API page: https://fal.ai/models/fal-ai/echomimic-v3/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/echomimic-v3
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
