---
name: fal-ai-bria-reimagine
description: >
  Use this skill for the fal.ai Bria model (fal-ai/bria/reimagine). Structure Reference allows generating new images while preserving the structure of an input image, guided by text prompts. Perfect for transforming sketches, illustrations, or photos into new illustra
---

# Bria

Structure Reference allows generating new images while preserving the structure of an input image, guided by text prompts. Perfect for transforming sketches, illustrations, or photos into new illustrations. Trained exclusively on licensed data for safe and risk-free commercial use.

**Endpoint:** `fal-ai/bria/reimagine`
**Source:** https://fal.ai/models/fal-ai/bria/reimagine/api

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

const result = await fal.subscribe("fal-ai/bria/reimagine", {
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
| `prompt` | string | **Yes** |  | The prompt you would like to use to generate images. |
| `num_results` | integer | No | `1` | How many images you would like to generate. When using any Guidance Method, Value is set to 1. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `structure_ref_influence` | float | No | `0.75` | The influence of the structure reference on the generated image. |
| `fast` | boolean | No | `true` | Whether to use the fast model |
| `num_inference_steps` | integer | No | `30` | The number of iterations the model goes through to refine the generated image. This parameter is optional. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `structure_image_url` | string | No | `""` | The URL of the structure reference image. Use "" to leave empty. Accepted formats are jpeg, jpg, png, webp. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated images |
| `seed` | integer | Seed value used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bria/reimagine", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bria/reimagine", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bria/reimagine", {
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

- API page: https://fal.ai/models/fal-ai/bria/reimagine/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bria/reimagine
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
