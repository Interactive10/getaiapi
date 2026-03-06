---
name: fal-ai-flux-pro-v1.1
description: >
  Use this skill for the fal.ai FLUX1.1 [pro] model (fal-ai/flux-pro/v1.1). FLUX1.1 [pro] is an enhanced version of FLUX.1 [pro], improved image generation capabilities, delivering superior composition, detail, and artistic fidelity compared to its predecessor.
---

# FLUX1.1 [pro]

FLUX1.1 [pro] is an enhanced version of FLUX.1 [pro], improved image generation capabilities, delivering superior composition, detail, and artistic fidelity compared to its predecessor.

**Endpoint:** `fal-ai/flux-pro/v1.1`
**Source:** https://fal.ai/models/fal-ai/flux-pro/v1.1/api

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

const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"landscape_4_3"` | The size of the generated image. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `safety_tolerance` | enum: `1`, `2`, `3`, `4`, `5`, `6` | No | `"2"` | The safety tolerance level for the generated image. 1 being the most strict and 5 being the most permissive. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `enhance_prompt` | boolean | No | `false` | Whether to enhance the prompt for better results. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated image files info. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `timings` | Timings |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/flux-pro/v1.1", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/flux-pro/v1.1", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/flux-pro/v1.1", {
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

- API page: https://fal.ai/models/fal-ai/flux-pro/v1.1/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/flux-pro/v1.1
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
