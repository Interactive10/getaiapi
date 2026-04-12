---
name: fal-ai-wan-motion
description: >
  Use this skill for the fal.ai Wan Motion model (fal-ai/wan-motion). Wan Motion is a streamlined character animation model that transfers motion from a driving video onto a reference character image. Based on Wan-Animate which preserves the original character's proport
---

# Wan Motion

Wan Motion is a streamlined character animation model that transfers motion from a driving video onto a reference character image. Based on Wan-Animate which preserves the original character's proportions, Simple uses pose retargeting to adapt the driving video's skeleton to match the reference character's body shape, producing more natural results when the two have different builds. It outputs at 720p with optimized defaults for fast, high-quality generation — just provide a video, an image, and an optional prompt.

**Endpoint:** `fal-ai/wan-motion`
**Source:** https://fal.ai/models/fal-ai/wan-motion/api

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

const result = await fal.subscribe("fal-ai/wan-motion", {
  input: {
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
| `adapt_motion` | boolean | No | `true` | Adapts the driving video's motion to match the reference image's body proportions. Recommended when the driving video... |
| `video_url` | string | **Yes** |  | URL of the driving video (provides the motion). |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level to use. 'regular' enables caching for faster generation, 'none' disables it. |
| `prompt` | string | No | `""` | Optional text prompt to guide the generation. |
| `enhance_identity` | boolean | No | `false` | Enhances identity preservation by preprocessing the reference image with Flux Kontext Edit before animation. Produces... |
| `image_url` | string | **Yes** |  | URL of the reference image (provides the character appearance). |
| `enable_safety_checker` | boolean | No | `true` | If set to true, input and output will be checked for safety. |
| `seed` | integer | null | No |  | Random seed for reproducibility. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generation. |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-motion", {
  input: {
        "video_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-motion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-motion", {
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

- API page: https://fal.ai/models/fal-ai/wan-motion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-motion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
