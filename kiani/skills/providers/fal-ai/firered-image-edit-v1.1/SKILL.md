---
name: fal-ai-firered-image-edit-v1.1
description: >
  Use this skill for the fal.ai Firered Image Edit V1.1 model (fal-ai/firered-image-edit-v1.1). FireRed Image Edit v1.1 is an updated version of FireRed Image Edit, with improved image editing capabilities.
---

# Firered Image Edit V1.1

FireRed Image Edit v1.1 is an updated version of FireRed Image Edit, with improved image editing capabilities.

**Endpoint:** `fal-ai/firered-image-edit-v1.1`
**Source:** https://fal.ai/models/fal-ai/firered-image-edit-v1.1/api

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

const result = await fal.subscribe("fal-ai/firered-image-edit-v1.1", {
  input: {
        "prompt": "your value here",
        "image_urls": []
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
| `prompt` | string | **Yes** |  | The editing instruction describing what changes to make to the image. Supports both English and Chinese instructions. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | The size of the generated image. If None, uses the input image dimensions. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use for inference speed optimization. |
| `output_format` | enum: `jpeg`, `png` | No | `"png"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `4` | Classifier-free guidance scale. Higher values make the model follow the prompt more closely. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `image_urls` | list<string> | **Yes** |  | The URLs of the images to edit. Supports single image editing and multi-image references (e.g., virtual try-on, style... |
| `negative_prompt` | string | No | `""` | The negative prompt for the generation. |
| `num_inference_steps` | integer | No | `30` | The number of inference steps to perform. More steps generally produce higher quality results. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The edited image files info. |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/firered-image-edit-v1.1", {
  input: {
        "prompt": "your value here",
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/firered-image-edit-v1.1", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/firered-image-edit-v1.1", {
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

- API page: https://fal.ai/models/fal-ai/firered-image-edit-v1.1/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/firered-image-edit-v1.1
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
