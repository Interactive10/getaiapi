---
name: fal-ai-sana-v1.5-4.8b
description: >
  Use this skill for the fal.ai Sana v1.5 4.8B model (fal-ai/sana/v1.5/4.8b). Sana v1.5 4.8B is a powerful text-to-image model that generates ultra-high quality 4K images with remarkable detail.
---

# Sana v1.5 4.8B

Sana v1.5 4.8B is a powerful text-to-image model that generates ultra-high quality 4K images with remarkable detail.

**Endpoint:** `fal-ai/sana/v1.5/4.8b`
**Source:** https://fal.ai/models/fal-ai/sana/v1.5/4.8b/api

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

const result = await fal.subscribe("fal-ai/sana/v1.5/4.8b", {
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
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 2160, 'width': 3840}` | The size of the generated image. |
| `guidance_scale` | float | No | `5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `style_name` | enum (10 values) | No | `"(No style)"` | The style to generate the image in. |
| `num_inference_steps` | integer | No | `18` | The number of inference steps to perform. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated image files info. |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sana/v1.5/4.8b", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sana/v1.5/4.8b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sana/v1.5/4.8b", {
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

- API page: https://fal.ai/models/fal-ai/sana/v1.5/4.8b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sana/v1.5/4.8b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
