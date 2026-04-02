---
name: fal-ai-kandinsky5-text-to-video-distill
description: >
  Use this skill for the fal.ai Kandinsky5 model (fal-ai/kandinsky5/text-to-video/distill). Kandinsky 5.0 Distilled is a lightweight diffusion model for fast, high-quality text-to-video generation.
---

# Kandinsky5

Kandinsky 5.0 Distilled is a lightweight diffusion model for fast, high-quality text-to-video generation.

**Endpoint:** `fal-ai/kandinsky5/text-to-video/distill`
**Source:** https://fal.ai/models/fal-ai/kandinsky5/text-to-video/distill/api

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

const result = await fal.subscribe("fal-ai/kandinsky5/text-to-video/distill", {
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `aspect_ratio` | enum: `3:2`, `1:1`, `2:3` | No | `"3:2"` | Aspect ratio of the generated video. One of (3:2, 1:1, 2:3). |
| `resolution` | string | No | `"768x512"` | Resolution of the generated video in W:H format. Will be calculated based on the aspect ratio(768x512, 512x512, 512x7... |
| `duration` | enum: `5s`, `10s` | No | `"5s"` | The length of the video to generate (5s or 10s) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | null | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kandinsky5/text-to-video/distill", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kandinsky5/text-to-video/distill", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kandinsky5/text-to-video/distill", {
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

- API page: https://fal.ai/models/fal-ai/kandinsky5/text-to-video/distill/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kandinsky5/text-to-video/distill
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
