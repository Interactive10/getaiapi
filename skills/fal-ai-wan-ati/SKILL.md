---
name: fal-ai-wan-ati
description: >
  Use this skill for the fal.ai Wan Ati model (fal-ai/wan-ati). WAN-ATI is a controllable video generation model that uses trajectory instructions to guide object, local, and camera motion, enabling precise and flexible image-to-video creation.
---

# Wan Ati

WAN-ATI is a controllable video generation model that uses trajectory instructions to guide object, local, and camera motion, enabling precise and flexible image-to-video creation.

**Endpoint:** `fal-ai/wan-ati`
**Source:** https://fal.ai/models/fal-ai/wan-ati/api

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

const result = await fal.subscribe("fal-ai/wan-ati", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "track": []
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"480p"` | Resolution of the generated video (480p, 580p, 720p). |
| `image_url` | string | **Yes** |  | URL of the input image. |
| `track` | list<list<any>> | **Yes** |  | Motion tracks to guide video generation. Each track is a sequence of points defining a motion trajectory. Multiple tr... |
| `guidance_scale` | float | No | `5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `num_inference_steps` | integer | No | `40` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-ati", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png",
        "track": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-ati", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-ati", {
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

- API page: https://fal.ai/models/fal-ai/wan-ati/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-ati
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
