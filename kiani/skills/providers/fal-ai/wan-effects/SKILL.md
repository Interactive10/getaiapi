---
name: fal-ai-wan-effects
description: >
  Use this skill for the fal.ai Wan Effects model (fal-ai/wan-effects). Wan Effects generates high-quality videos with popular effects from images
---

# Wan Effects

Wan Effects generates high-quality videos with popular effects from images

**Endpoint:** `fal-ai/wan-effects`
**Source:** https://fal.ai/models/fal-ai/wan-effects/api

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

const result = await fal.subscribe("fal-ai/wan-effects", {
  input: {
        "subject": "your value here",
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
| `effect_type` | enum (43 values) | No | `"cakeify"` | The type of effect to apply to the video. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the output video. |
| `subject` | string | **Yes** |  | The subject to insert into the predefined prompt template for the selected effect. |
| `lora_scale` | float | No | `1` | The scale of the LoRA weight. Used to adjust effect intensity. |
| `image_url` | string | **Yes** |  | URL of the input image. |
| `turbo_mode` | boolean | No | `false` | Whether to use turbo mode. If True, the video will be generated faster but with lower quality. |
| `frames_per_second` | integer | No | `16` | Frames per second of the generated video. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_frames` | integer | No | `81` | Number of frames to generate. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer |  |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-effects", {
  input: {
        "subject": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-effects", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-effects", {
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

- API page: https://fal.ai/models/fal-ai/wan-effects/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-effects
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
