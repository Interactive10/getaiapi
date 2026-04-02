---
name: fal-ai-pixverse-v3.5-text-to-video
description: >
  Use this skill for the fal.ai PixVerse v3.5 model (fal-ai/pixverse/v3.5/text-to-video). Generate high quality video clips from text prompts using PixVerse v3.5
---

# PixVerse v3.5

Generate high quality video clips from text prompts using PixVerse v3.5

**Endpoint:** `fal-ai/pixverse/v3.5/text-to-video`
**Source:** https://fal.ai/models/fal-ai/pixverse/v3.5/text-to-video/api

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

const result = await fal.subscribe("fal-ai/pixverse/v3.5/text-to-video", {
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
| `prompt` | string | **Yes** |  |  |
| `aspect_ratio` | enum: `16:9`, `4:3`, `1:1`, `3:4`, `9:16` | No | `"16:9"` | The aspect ratio of the generated video |
| `duration` | enum: `5`, `8` | No | `"5"` | The duration of the generated video in seconds. 8s videos cost double. 1080p videos are limited to 5 seconds |
| `style` | enum: `anime`, `3d_animation`, `clay`, `comic`, `cyberpunk` | null | No |  | The style of the generated video |
| `resolution` | enum: `360p`, `540p`, `720p`, `1080p` | No | `"720p"` | The resolution of the generated video |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same video every... |
| `negative_prompt` | string | No | `""` | Negative prompt to be used for the generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pixverse/v3.5/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pixverse/v3.5/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pixverse/v3.5/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/pixverse/v3.5/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pixverse/v3.5/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
