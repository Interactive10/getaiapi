---
name: fal-ai-flowedit
description: >
  Use this skill for the fal.ai Flow-Edit model (fal-ai/flowedit). The model provides you high quality image editing capabilities.
---

# Flow-Edit

The model provides you high quality image editing capabilities.

**Endpoint:** `fal-ai/flowedit`
**Source:** https://fal.ai/models/fal-ai/flowedit/api

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

const result = await fal.subscribe("fal-ai/flowedit", {
  input: {
        "image_url": "https://example.com/input.png",
        "source_prompt": "your value here",
        "target_prompt": "your value here"
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
| `src_guidance_scale` | integer | No | `1.5` | Guidance scale for the source. |
| `n_min` | integer | No | `0` | Minimum step for improved style edits |
| `n_max` | integer | No | `23` | Control the strength of the edit |
| `image_url` | string | **Yes** |  | URL of image to be used for relighting |
| `source_prompt` | string | **Yes** |  | Prompt of the image to be used. |
| `tar_guidance_scale` | integer | No | `5.5` | Guidance scale for target. |
| `target_prompt` | string | **Yes** |  | Prompt of the image to be made. |
| `seed` | integer | No |  | Random seed for reproducible generation. If set none, a random seed will be used. |
| `num_inference_steps` | integer | No | `28` | Steps for which the model should run. |
| `n_avg` | integer | No | `1` | Average step count |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The generated image file info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flowedit", {
  input: {
        "image_url": "https://example.com/input.png",
        "source_prompt": "your value here",
        "target_prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flowedit", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flowedit", {
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

- API page: https://fal.ai/models/fal-ai/flowedit/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flowedit
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
