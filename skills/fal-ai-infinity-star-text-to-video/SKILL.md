---
name: fal-ai-infinity-star-text-to-video
description: >
  Use this skill for the fal.ai Infinity Star model (fal-ai/infinity-star/text-to-video). InfinityStar’s unified 8B spacetime autoregressive engine to turn any text prompt into crisp 720p videos - 10× faster than diffusion models.
---

# Infinity Star

InfinityStar’s unified 8B spacetime autoregressive engine to turn any text prompt into crisp 720p videos - 10× faster than diffusion models.

**Endpoint:** `fal-ai/infinity-star/text-to-video`
**Source:** https://fal.ai/models/fal-ai/infinity-star/text-to-video/api

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

const result = await fal.subscribe("fal-ai/infinity-star/text-to-video", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  | Text prompt for generating the video |
| `aspect_ratio` | enum: `16:9`, `1:1`, `9:16` | No | `"16:9"` | Aspect ratio of the generated output |
| `tau_video` | float | No | `0.4` | Tau value for video scale |
| `use_apg` | boolean | No | `true` | Whether to use APG |
| `guidance_scale` | float | No | `7.5` | Guidance scale for generation |
| `seed` | integer | null | No |  | Random seed for reproducibility. Leave empty for random generation. |
| `num_inference_steps` | integer | No | `50` | Number of inference steps |
| `negative_prompt` | string | No | `""` | Negative prompt to guide what to avoid in generation |
| `enhance_prompt` | boolean | No | `true` | Whether to use an LLM to enhance the prompt. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/infinity-star/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/infinity-star/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/infinity-star/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/infinity-star/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/infinity-star/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
