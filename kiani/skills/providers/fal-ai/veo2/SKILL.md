---
name: fal-ai-veo2
description: >
  Use this skill for the fal.ai Veo 2 model (fal-ai/veo2). Veo 2 creates videos with realistic motion and high quality output. Explore different styles and find your own with extensive camera controls.
---

# Veo 2

Veo 2 creates videos with realistic motion and high quality output. Explore different styles and find your own with extensive camera controls.

**Endpoint:** `fal-ai/veo2`
**Source:** https://fal.ai/models/fal-ai/veo2/api

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

const result = await fal.subscribe("fal-ai/veo2", {
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
| `aspect_ratio` | enum: `9:16`, `16:9`, `1:1` | No | `"16:9"` | The aspect ratio of the generated video |
| `auto_fix` | boolean | No | `true` | Whether to automatically attempt to fix prompts that fail content policy or other validation checks by rewriting them |
| `duration` | enum: `5s`, `6s`, `7s`, `8s` | No | `"5s"` | The duration of the generated video in seconds |
| `seed` | integer | null | No |  | A seed to use for the video generation |
| `negative_prompt` | string | null | No |  | A negative prompt to guide the video generation |
| `enhance_prompt` | boolean | No | `true` | Whether to enhance the video generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/veo2", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/veo2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/veo2", {
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

- API page: https://fal.ai/models/fal-ai/veo2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
