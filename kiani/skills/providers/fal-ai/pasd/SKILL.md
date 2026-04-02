---
name: fal-ai-pasd
description: >
  Use this skill for the fal.ai PASD model (fal-ai/pasd). Pixel-Aware Diffusion Model for Realistic Image Super-Resolution and Personalized Stylization
---

# PASD

Pixel-Aware Diffusion Model for Realistic Image Super-Resolution and Personalized Stylization

**Endpoint:** `fal-ai/pasd`
**Source:** https://fal.ai/models/fal-ai/pasd/api

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

const result = await fal.subscribe("fal-ai/pasd", {
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
| `conditioning_scale` | float | No | `0.8` | ControlNet conditioning scale (0.1-1.0) |
| `prompt` | string | No | `""` | Additional prompt to guide super-resolution |
| `image_url` | string | **Yes** |  | Input image to super-resolve |
| `steps` | integer | No | `25` | Number of inference steps (10-50) |
| `scale` | integer | No | `2` | Upscaling factor (1-4x) |
| `guidance_scale` | float | No | `7` | Guidance scale for diffusion (1.0-20.0) |
| `negative_prompt` | string | No | `"blurry, dirty, messy, frames, deformed, dotted, noise, raster lines, unclear, lowres, over-smoothed, painting, ai generated"` | Negative prompt to avoid unwanted artifacts |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated super-resolved images |
| `timings` | Timings | Timing information for different processing stages |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pasd", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pasd", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pasd", {
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

- API page: https://fal.ai/models/fal-ai/pasd/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pasd
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
