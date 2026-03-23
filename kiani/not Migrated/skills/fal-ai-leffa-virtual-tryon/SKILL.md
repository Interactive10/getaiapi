---
name: fal-ai-leffa-virtual-tryon
description: >
  Use this skill for the fal.ai Leffa Virtual TryOn model (fal-ai/leffa/virtual-tryon). Leffa Virtual TryOn is a high quality image based Try-On endpoint which can be used for commercial try on.
---

# Leffa Virtual TryOn

Leffa Virtual TryOn is a high quality image based Try-On endpoint which can be used for commercial try on.

**Endpoint:** `fal-ai/leffa/virtual-tryon`
**Source:** https://fal.ai/models/fal-ai/leffa/virtual-tryon/api

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

const result = await fal.subscribe("fal-ai/leffa/virtual-tryon", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png",
        "garment_type": "upper_body"
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
| `garment_image_url` | string | **Yes** |  | Url to the garment image. |
| `human_image_url` | string | **Yes** |  | Url for the human image. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `garment_type` | enum: `upper_body`, `lower_body`, `dresses` | **Yes** |  | The type of the garment used for virtual try-on. |
| `guidance_scale` | float | No | `2.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your in... |
| `seed` | integer | null | No |  | The same seed and the same input given to the same version of the model             will output the same image every ... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to perform. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |
| `seed` | integer | The seed for the inference. |
| `has_nsfw_concepts` | boolean | Whether the image contains NSFW concepts. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/leffa/virtual-tryon", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png",
        "garment_type": "upper_body"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/leffa/virtual-tryon", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/leffa/virtual-tryon", {
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

- API page: https://fal.ai/models/fal-ai/leffa/virtual-tryon/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/leffa/virtual-tryon
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
