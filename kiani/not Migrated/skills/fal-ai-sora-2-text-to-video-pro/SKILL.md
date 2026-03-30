---
name: fal-ai-sora-2-text-to-video-pro
description: >
  Use this skill for the fal.ai Sora 2 model (fal-ai/sora-2/text-to-video/pro). Text-to-video endpoint for Sora 2 Pro, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.
---

# Sora 2

Text-to-video endpoint for Sora 2 Pro, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.

**Endpoint:** `fal-ai/sora-2/text-to-video/pro`
**Source:** https://fal.ai/models/fal-ai/sora-2/text-to-video/pro/api

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

const result = await fal.subscribe("fal-ai/sora-2/text-to-video/pro", {
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
| `prompt` | string | **Yes** |  | The text prompt describing the video you want to generate |
| `aspect_ratio` | enum: `9:16`, `16:9` | No | `"16:9"` | The aspect ratio of the generated video |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | The resolution of the generated video |
| `duration` | enum: `4`, `8`, `12` | No | `4` | Duration of the generated video in seconds |
| `delete_video` | boolean | No | `true` | Whether to delete the video after generation for privacy reasons. If True, the video cannot be used for remixing and ... |
| `detect_and_block_ip` | boolean | No | `false` | If enabled, the prompt (and image for image-to-video) will be checked for known intellectual property references and ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video_id` | string | The ID of the generated video |
| `thumbnail` | ImageFile | null | Thumbnail image for the video |
| `spritesheet` | ImageFile | null | Spritesheet image for the video |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sora-2/text-to-video/pro", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sora-2/text-to-video/pro", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sora-2/text-to-video/pro", {
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

- API page: https://fal.ai/models/fal-ai/sora-2/text-to-video/pro/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/text-to-video/pro
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
