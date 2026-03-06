---
name: fal-ai-flux-2-klein-realtime
description: >
  Use this skill for the fal.ai Flux 2 [klein] Realtime model (fal-ai/flux-2/klein/realtime). Realtime generation with FLUX.2 [klein] from Black Forest Labs.
---

# Flux 2 [klein] Realtime

Realtime generation with FLUX.2 [klein] from Black Forest Labs.

**Endpoint:** `fal-ai/flux-2/klein/realtime`
**Source:** https://fal.ai/models/fal-ai/flux-2/klein/realtime/api

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

const result = await fal.subscribe("fal-ai/flux-2/klein/realtime", {
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
| `prompt` | string | No | `"Turn this into "Living oil painting, melting gold and sapphire""` | The prompt to guide image editing. |
| `image_size` | enum: `square`, `square_hd` | No | `"square"` | The size of the generated image. square=768x768, square_hd=1024x1024. |
| `image_url` | string | **Yes** |  | Base64-encoded image data URI for editing. CDN URLs are not supported for realtime. For optimal performance, use 704x... |
| `enable_interpolation` | boolean | No | `false` | Enable RIFE frame interpolation between consecutive frames (doubles output frames). |
| `num_inference_steps` | integer | No | `3` |  |
| `schedule_mu` | float | No | `2.3` | Schedule mu for time shift. 2.3=default, lower=more even denoising, 0.3=nearly linear. |
| `seed` | integer | null | No | `35` | Random seed for reproducibility. |
| `output_feedback_strength` | float | No | `1` | Output feedback loop. 1.0 = pure noise (no feedback), 0.9 = 90% noise + 10% previous output latent. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<RawImage> | Generated images as raw bytes. When interpolation is enabled, returns [interpolated_frame, current_frame] in chronolo... |
| `seed` | integer | Seed used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-2/klein/realtime", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-2/klein/realtime", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-2/klein/realtime", {
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

- API page: https://fal.ai/models/fal-ai/flux-2/klein/realtime/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-2/klein/realtime
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
