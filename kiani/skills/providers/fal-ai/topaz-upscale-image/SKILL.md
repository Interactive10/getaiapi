---
name: fal-ai-topaz-upscale-image
description: >
  Use this skill for the fal.ai Topaz model (fal-ai/topaz/upscale/image). Use the powerful and accurate topaz image enhancer to enhance your images.
---

# Topaz

Use the powerful and accurate topaz image enhancer to enhance your images.

**Endpoint:** `fal-ai/topaz/upscale/image`
**Source:** https://fal.ai/models/fal-ai/topaz/upscale/image/api

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

const result = await fal.subscribe("fal-ai/topaz/upscale/image", {
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
| `face_enhancement_creativity` | float | No | `0` | Creativity level for face enhancement. 0.0 means no creativity, 1.0 means maximum creativity. Ignored if face ehnance... |
| `face_enhancement_strength` | float | No | `0.8` | Strength of the face enhancement. 0.0 means no enhancement, 1.0 means maximum enhancement. Ignored if face ehnancemen... |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | Output format of the upscaled image. |
| `face_enhancement` | boolean | No | `true` | Whether to apply face enhancement to the image. |
| `image_url` | string | **Yes** |  | Url of the image to be upscaled |
| `model` | enum (8 values) | No | `"Standard V2"` | Model to use for image enhancement. |
| `subject_detection` | enum: `All`, `Foreground`, `Background` | No | `"All"` | Subject detection mode for the image enhancement. |
| `crop_to_fill` | boolean | No | `false` |  |
| `upscale_factor` | float | No | `2` | Factor to upscale the video by (e.g. 2.0 doubles width and height) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/topaz/upscale/image", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/topaz/upscale/image", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/topaz/upscale/image", {
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

- API page: https://fal.ai/models/fal-ai/topaz/upscale/image/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/topaz/upscale/image
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
