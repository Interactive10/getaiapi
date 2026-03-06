---
name: fal-ai-esrgan
description: >
  Use this skill for the fal.ai Upscale Images model (fal-ai/esrgan). Upscale images by a given factor.
---

# Upscale Images

Upscale images by a given factor.

**Endpoint:** `fal-ai/esrgan`
**Source:** https://fal.ai/models/fal-ai/esrgan/api

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

const result = await fal.subscribe("fal-ai/esrgan", {
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
| `model` | enum: `RealESRGAN_x4plus`, `RealESRGAN_x2plus`, `RealESRGAN_x4plus_anime_6B`, `RealESRGAN_x4_v3`, `RealESRGAN_x4_wdn_v3`, `RealESRGAN_x4_anime_v3` | No | `"RealESRGAN_x4plus"` | Model to use for upscaling |
| `face` | boolean | No | `false` | Upscaling a face |
| `scale` | float | No | `2` | Rescaling factor |
| `tile` | integer | No | `0` | Tile size. Default is 0, that is no tile. When encountering the out-of-GPU-memory issue, please specify it, e.g., 400... |
| `output_format` | enum: `png`, `jpeg` | No | `"png"` | Output image format (png or jpeg) |
| `image_url` | string | **Yes** |  | Url to input image |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/esrgan", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/esrgan", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/esrgan", {
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

- API page: https://fal.ai/models/fal-ai/esrgan/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/esrgan
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
