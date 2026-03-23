---
name: fal-ai-sana-video
description: >
  Use this skill for the fal.ai Sana Video model (fal-ai/sana-video). Leverage Sana's ultra-fast processing speed to generate high-quality assets that transform your text prompts into production-ready videos
---

# Sana Video

Leverage Sana's ultra-fast processing speed to generate high-quality assets that transform your text prompts into production-ready videos

**Endpoint:** `fal-ai/sana-video`
**Source:** https://fal.ai/models/fal-ai/sana-video/api

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

const result = await fal.subscribe("fal-ai/sana-video", {
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
| `prompt` | string | **Yes** |  | The text prompt describing the video to generate |
| `resolution` | enum: `480p` | No | `"480p"` | The resolution of the output video |
| `fps` | integer | No | `16` | Frames per second for the output video |
| `motion_score` | integer | No | `30` | Motion intensity score (higher = more motion) |
| `guidance_scale` | float | No | `6` | Guidance scale for generation (higher = more prompt adherence) |
| `num_inference_steps` | integer | No | `28` | Number of denoising steps |
| `seed` | integer | No |  | Random seed for reproducible generation. If not provided, a random seed will be used. |
| `negative_prompt` | string | No | `"A chaotic sequence with misshapen, deformed limbs in heavy motion blur, sudden disappearance, jump cuts, jerky movements, rapid shot changes, frames out of sync, inconsistent character shapes, temporal artifacts, jitter, and ghosting effects, creating a disorienting visual experience."` | The negative prompt describing what to avoid in the generation |
| `num_frames` | integer | No | `81` | Number of frames to generate |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The random seed used for the generation process |
| `video` | File | Generated video file |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sana-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sana-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sana-video", {
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

- API page: https://fal.ai/models/fal-ai/sana-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sana-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
