---
name: fal-ai-omnigen-v2
description: >
  Use this skill for the fal.ai Omnigen V2 model (fal-ai/omnigen-v2). OmniGen is a unified image generation model that can generate a wide range of images from multi-modal prompts. It can be used for various tasks such as Image Editing, Personalized Image Generation, Vi
---

# Omnigen V2

OmniGen is a unified image generation model that can generate a wide range of images from multi-modal prompts. It can be used for various tasks such as Image Editing, Personalized Image Generation, Virtual Try-On, Multi Person Generation and more!

**Endpoint:** `fal-ai/omnigen-v2`
**Source:** https://fal.ai/models/fal-ai/omnigen-v2/api

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

const result = await fal.subscribe("fal-ai/omnigen-v2", {
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
| `prompt` | string | **Yes** |  | The prompt to generate or edit an image. Use specific language like 'Add the bird from image 1 to the desk in image 2... |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square_hd"` | The size of the generated image. |
| `scheduler` | enum: `euler`, `dpmsolver` | No | `"euler"` | The scheduler to use for the diffusion process. |
| `cfg_range_end` | float | No | `1` | CFG range end value. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `"(((deformed))), blurry, over saturation, bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), fused fingers, messy drawing, broken legs censor, censored, censor_bar"` | Negative prompt to guide what should not be in the image. |
| `text_guidance_scale` | float | No | `5` | The Text Guidance scale controls how closely the model follows the text prompt.             Higher values make the mo... |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `image_guidance_scale` | float | No | `2` | The Image Guidance scale controls how closely the model follows the input images.             For image editing: 1.3-... |
| `input_image_urls` | list<string> | No | `[]` | URLs of input images to use for image editing or multi-image generation. Support up to 3 images. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `cfg_range_start` | float | No | `0` | CFG range start value. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to perform. |

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
const { request_id } = await fal.queue.submit("fal-ai/omnigen-v2", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/omnigen-v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/omnigen-v2", {
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

- API page: https://fal.ai/models/fal-ai/omnigen-v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/omnigen-v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
