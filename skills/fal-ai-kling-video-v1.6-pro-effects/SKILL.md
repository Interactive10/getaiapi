---
name: fal-ai-kling-video-v1.6-pro-effects
description: >
  Use this skill for the fal.ai Kling 1.6 model (fal-ai/kling-video/v1.6/pro/effects). Generate video clips from your prompts using Kling 1.6 (pro)
---

# Kling 1.6

Generate video clips from your prompts using Kling 1.6 (pro)

**Endpoint:** `fal-ai/kling-video/v1.6/pro/effects`
**Source:** https://fal.ai/models/fal-ai/kling-video/v1.6/pro/effects/api

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

const result = await fal.subscribe("fal-ai/kling-video/v1.6/pro/effects", {
  input: {
        "effect_scene": "hug"
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
| `duration` | enum: `5`, `10` | No | `"5"` | The duration of the generated video in seconds |
| `effect_scene` | enum (197 values) | **Yes** |  | The effect scene to use for the video generation |
| `input_image_urls` | list<string> | No |  | URL of images to be used for hug, kiss or heart_gesture video. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/v1.6/pro/effects", {
  input: {
        "effect_scene": "hug"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/v1.6/pro/effects", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/v1.6/pro/effects", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/v1.6/pro/effects/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/v1.6/pro/effects
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
