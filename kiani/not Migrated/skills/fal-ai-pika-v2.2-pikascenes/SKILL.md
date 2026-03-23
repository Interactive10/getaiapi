---
name: fal-ai-pika-v2.2-pikascenes
description: >
  Use this skill for the fal.ai Pika Scenes (v2.2) model (fal-ai/pika/v2.2/pikascenes). Pika Scenes v2.2 creates videos from a images with high quality output.
---

# Pika Scenes (v2.2)

Pika Scenes v2.2 creates videos from a images with high quality output.

**Endpoint:** `fal-ai/pika/v2.2/pikascenes`
**Source:** https://fal.ai/models/fal-ai/pika/v2.2/pikascenes/api

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

const result = await fal.subscribe("fal-ai/pika/v2.2/pikascenes", {
  input: {
        "prompt": "your value here",
        "image_urls": []
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
| `prompt` | string | **Yes** |  | Text prompt describing the desired video |
| `aspect_ratio` | enum (7 values) | No | `"16:9"` | The aspect ratio of the generated video |
| `duration` | enum: `5`, `10` | No | `5` | The duration of the generated video in seconds |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | The resolution of the generated video |
| `ingredients_mode` | enum: `precise`, `creative` | No | `"precise"` | Mode for integrating multiple images. Precise mode is more accurate, creative mode is more creative. |
| `seed` | integer | null | No |  | The seed for the random number generator |
| `image_urls` | list<string> | **Yes** |  | URLs of images to combine into a video |
| `negative_prompt` | string | No | `"ugly, bad, terrible"` | A negative prompt to guide the model |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pika/v2.2/pikascenes", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pika/v2.2/pikascenes", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pika/v2.2/pikascenes", {
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

- API page: https://fal.ai/models/fal-ai/pika/v2.2/pikascenes/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pika/v2.2/pikascenes
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
