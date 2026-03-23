---
name: fal-ai-bria-expand
description: >
  Use this skill for the fal.ai Bria Expand Image model (fal-ai/bria/expand). Bria Expand expands images beyond their borders in high quality. Trained exclusively on licensed data for safe and risk-free commercial use. Access the model's source code and weights: https://bria.ai
---

# Bria Expand Image

Bria Expand expands images beyond their borders in high quality. Trained exclusively on licensed data for safe and risk-free commercial use. Access the model's source code and weights: https://bria.ai/contact-us

**Endpoint:** `fal-ai/bria/expand`
**Source:** https://fal.ai/models/fal-ai/bria/expand/api

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

const result = await fal.subscribe("fal-ai/bria/expand", {
  input: {
        "image_url": "https://example.com/input.png",
        "canvas_size": []
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
| `prompt` | string | No | `""` | Text on which you wish to base the image expansion. This parameter is optional. Bria currently supports prompts in En... |
| `aspect_ratio` | enum (9 values) | null | No |  | The desired aspect ratio of the final image. Will be used over original_image_size and original_image_location if pro... |
| `original_image_location` | list<integer> | null | No |  | The desired location of the original image, inside the full canvas. Provide the location of the upper left corner of ... |
| `image_url` | string | **Yes** |  | The URL of the input image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `original_image_size` | list<integer> | null | No |  | The desired size of the original image, inside the full canvas. Ensure that the ratio of input image foreground or ma... |
| `canvas_size` | list<integer> | **Yes** |  | The desired size of the final image, after the expansion. should have an area of less than 5000x5000 pixels. |
| `seed` | integer | null | No |  | You can choose whether you want your generated expension to be random or predictable. You can recreate the same resul... |
| `negative_prompt` | string | No | `""` | The negative prompt you would like to use to generate images. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |
| `seed` | integer | Seed value used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bria/expand", {
  input: {
        "image_url": "https://example.com/input.png",
        "canvas_size": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bria/expand", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bria/expand", {
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

- API page: https://fal.ai/models/fal-ai/bria/expand/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bria/expand
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
