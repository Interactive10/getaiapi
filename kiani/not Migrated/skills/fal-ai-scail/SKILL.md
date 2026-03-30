---
name: fal-ai-scail
description: >
  Use this skill for the fal.ai Scail model (fal-ai/scail). SCAIL is a character animation model that uses 3D consistent pose representations to animate reference images with coherent motion, supporting complex movements.
---

# Scail

SCAIL is a character animation model that uses 3D consistent pose representations to animate reference images with coherent motion, supporting complex movements.

**Endpoint:** `fal-ai/scail`
**Source:** https://fal.ai/models/fal-ai/scail/api

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

const result = await fal.subscribe("fal-ai/scail", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
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
| `prompt` | string | **Yes** |  | The prompt to guide video generation. |
| `resolution` | string | No | `"512p"` | Output resolution. Outputs 896x512 (landscape) or 512x896 (portrait) based on the input image aspect ratio. |
| `video_url` | string | **Yes** |  | The URL of the video to use as a reference for the video generation. |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to use for the video generation. |
| `multi_character` | boolean | No | `false` | Enable multi-character mode. Use when driving video has multiple people. |
| `image_url` | string | **Yes** |  | The URL of the image to use as a reference for the video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/scail", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/scail", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/scail", {
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

- API page: https://fal.ai/models/fal-ai/scail/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/scail
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
