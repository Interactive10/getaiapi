---
name: fal-ai-trellis
description: >
  Use this skill for the fal.ai Trellis model (fal-ai/trellis). Generate 3D models from your images using Trellis. A native 3D generative model enabling versatile and high-quality 3D asset creation.
---

# Trellis

Generate 3D models from your images using Trellis. A native 3D generative model enabling versatile and high-quality 3D asset creation.

**Endpoint:** `fal-ai/trellis`
**Source:** https://fal.ai/models/fal-ai/trellis/api

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

const result = await fal.subscribe("fal-ai/trellis", {
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
| `slat_sampling_steps` | integer | No | `12` | Sampling steps for structured latent generation |
| `ss_sampling_steps` | integer | No | `12` | Sampling steps for sparse structure generation |
| `image_url` | string | **Yes** |  | URL of the input image to convert to 3D |
| `slat_guidance_strength` | float | No | `3` | Guidance strength for structured latent generation |
| `ss_guidance_strength` | float | No | `7.5` | Guidance strength for sparse structure generation |
| `mesh_simplify` | float | No | `0.95` | Mesh simplification factor |
| `seed` | integer | null | No |  | Random seed for reproducibility |
| `texture_size` | enum: `512`, `1024`, `2048` | No | `1024` | Texture resolution |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `model_mesh` | File |  |
| `timings` | Timings | Processing timings |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/trellis", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/trellis", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/trellis", {
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

- API page: https://fal.ai/models/fal-ai/trellis/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/trellis
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
