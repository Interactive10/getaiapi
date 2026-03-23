---
name: fal-ai-cat-vton
description: >
  Use this skill for the fal.ai try-on model (fal-ai/cat-vton). Image based high quality Virtual Try-On
---

# try-on

Image based high quality Virtual Try-On

**Endpoint:** `fal-ai/cat-vton`
**Source:** https://fal.ai/models/fal-ai/cat-vton/api

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

const result = await fal.subscribe("fal-ai/cat-vton", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png",
        "cloth_type": "upper"
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
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"portrait_4_3"` | The size of the generated image. |
| `human_image_url` | string | **Yes** |  | Url for the human image. |
| `cloth_type` | enum: `upper`, `lower`, `overall`, `inner`, `outer` | **Yes** |  | Type of the Cloth to be tried on.          Options:         upper: Upper body cloth         lower: Lower body cloth  ... |
| `guidance_scale` | float | No | `2.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to perform. |
| `seed` | integer | No |  | The same seed and the same input given to the same version of the model             will output the same image every ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The output image. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/cat-vton", {
  input: {
        "garment_image_url": "https://example.com/input.png",
        "human_image_url": "https://example.com/input.png",
        "cloth_type": "upper"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/cat-vton", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/cat-vton", {
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

- API page: https://fal.ai/models/fal-ai/cat-vton/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/cat-vton
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
