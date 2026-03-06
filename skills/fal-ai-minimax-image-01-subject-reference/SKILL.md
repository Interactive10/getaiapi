---
name: fal-ai-minimax-image-01-subject-reference
description: >
  Use this skill for the fal.ai Minimax Image Subject Reference model (fal-ai/minimax/image-01/subject-reference). Generate images from text and a reference image using MiniMax Image-01 for consistent character appearance.
---

# Minimax Image Subject Reference

Generate images from text and a reference image using MiniMax Image-01 for consistent character appearance.

**Endpoint:** `fal-ai/minimax/image-01/subject-reference`
**Source:** https://fal.ai/models/fal-ai/minimax/image-01/subject-reference/api

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

const result = await fal.subscribe("fal-ai/minimax/image-01/subject-reference", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | Text prompt for image generation (max 1500 characters) |
| `aspect_ratio` | enum (8 values) | No | `"1:1"` | Aspect ratio of the generated image |
| `num_images` | integer | No | `1` | Number of images to generate (1-9) |
| `prompt_optimizer` | boolean | No | `false` | Whether to enable automatic prompt optimization |
| `image_url` | string | **Yes** |  | URL of the subject reference image to use for consistent character appearance |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | Generated images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/image-01/subject-reference", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/image-01/subject-reference", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/image-01/subject-reference", {
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

- API page: https://fal.ai/models/fal-ai/minimax/image-01/subject-reference/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/image-01/subject-reference
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
