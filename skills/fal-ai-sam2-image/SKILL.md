---
name: fal-ai-sam2-image
description: >
  Use this skill for the fal.ai Segment Anything Model 2 model (fal-ai/sam2/image). SAM 2 is a model for segmenting images and videos in real-time.
---

# Segment Anything Model 2

SAM 2 is a model for segmenting images and videos in real-time.

**Endpoint:** `fal-ai/sam2/image`
**Source:** https://fal.ai/models/fal-ai/sam2/image/api

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

const result = await fal.subscribe("fal-ai/sam2/image", {
  input: {
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
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `output_format` | enum: `jpeg`, `png`, `webp` | No | `"png"` | The format of the generated image. |
| `prompts` | list<PointPrompt> | No | `[]` | List of prompts to segment the image |
| `box_prompts` | list<BoxPrompt> | No | `[]` | Coordinates for boxes |
| `apply_mask` | boolean | No | `false` | Apply the mask on the image. |
| `image_url` | string | **Yes** |  | URL of the image to be segmented |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sam2/image", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sam2/image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sam2/image", {
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

- API page: https://fal.ai/models/fal-ai/sam2/image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sam2/image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
