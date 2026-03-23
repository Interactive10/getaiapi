---
name: fal-ai-kling-video-v2.6-pro-image-to-video
description: >
  Use this skill for the fal.ai Kling Video v2.6 Image to Video model (fal-ai/kling-video/v2.6/pro/image-to-video). Kling 2.6 Pro: Top-tier image-to-video with cinematic visuals, fluid motion, and native audio generation.
---

# Kling Video v2.6 Image to Video

Kling 2.6 Pro: Top-tier image-to-video with cinematic visuals, fluid motion, and native audio generation.

**Endpoint:** `fal-ai/kling-video/v2.6/pro/image-to-video`
**Source:** https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video/api

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

const result = await fal.subscribe("fal-ai/kling-video/v2.6/pro/image-to-video", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  |  |
| `duration` | enum: `5`, `10` | No | `"5"` | The duration of the generated video in seconds |
| `voice_ids` | list<string> | null | No |  | Optional Voice IDs for video generation. Reference voices in your prompt with <<<voice_1>>> and <<<voice_2>>> (maximu... |
| `generate_audio` | boolean | No | `true` | Whether to generate native audio for the video. Supports Chinese and English voice output. Other languages are automa... |
| `start_image_url` | string | **Yes** |  | URL of the image to be used for the video |
| `end_image_url` | string | null | No |  | URL of the image to be used for the end of the video |
| `negative_prompt` | string | No | `"blur, distort, and low quality"` |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/v2.6/pro/image-to-video", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/v2.6/pro/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/v2.6/pro/image-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/v2.6/pro/image-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
