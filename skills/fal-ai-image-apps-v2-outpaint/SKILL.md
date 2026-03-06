---
name: fal-ai-image-apps-v2-outpaint
description: >
  Use this skill for the fal.ai Image Outpaint model (fal-ai/image-apps-v2/outpaint). Directional outpainting. Choose edges to expand. left, right, top, or center (uniform all sides). Only expanded areas are generated; an optional zoom-out pulls the frame back by the chosen amount.
---

# Image Outpaint

Directional outpainting. Choose edges to expand. left, right, top, or center (uniform all sides). Only expanded areas are generated; an optional zoom-out pulls the frame back by the chosen amount.

**Endpoint:** `fal-ai/image-apps-v2/outpaint`
**Source:** https://fal.ai/models/fal-ai/image-apps-v2/outpaint/api

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

const result = await fal.subscribe("fal-ai/image-apps-v2/outpaint", {
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
| `prompt` | string | No | `""` | Optional prompt to guide the outpainting. If provided, it will be appended to the base outpaint instruction. Example:... |
| `expand_right` | integer | No | `0` | Number of pixels to add as black margin on the right side (0-700). |
| `zoom_out_percentage` | float | No | `20` | Percentage to zoom out the image. If set, the image will be scaled down by this percentage and black margins will be ... |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `output_format` | enum: `png`, `jpeg`, `jpg`, `webp` | No | `"png"` | The format of the output image. |
| `image_url` | string | **Yes** |  | Image URL to outpaint |
| `sync_mode` | boolean | No | `false` | If True, the function will wait for the image to be generated and uploaded before returning the response. If False, t... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `expand_left` | integer | No | `0` | Number of pixels to add as black margin on the left side (0-700). |
| `expand_bottom` | integer | No | `400` | Number of pixels to add as black margin on the bottom side (0-700). |
| `expand_top` | integer | No | `0` | Number of pixels to add as black margin on the top side (0-700). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | Outpainted image with extended scene |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/image-apps-v2/outpaint", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image-apps-v2/outpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image-apps-v2/outpaint", {
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

- API page: https://fal.ai/models/fal-ai/image-apps-v2/outpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image-apps-v2/outpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
