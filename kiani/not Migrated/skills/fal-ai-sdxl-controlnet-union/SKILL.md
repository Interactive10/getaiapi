---
name: fal-ai-sdxl-controlnet-union
description: >
  Use this skill for the fal.ai SDXL ControlNet Union model (fal-ai/sdxl-controlnet-union). An efficent SDXL multi-controlnet text-to-image model.
---

# SDXL ControlNet Union

An efficent SDXL multi-controlnet text-to-image model.

**Endpoint:** `fal-ai/sdxl-controlnet-union`
**Source:** https://fal.ai/models/fal-ai/sdxl-controlnet-union/api

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

const result = await fal.subscribe("fal-ai/sdxl-controlnet-union", {
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the image. Be as descriptive as possible for best results. |
| `depth_preprocess` | boolean | No | `true` | Whether to preprocess the depth image. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. Leave it none to automatically infer from the control image. |
| `normal_image_url` | string | No |  | The URL of the control image. |
| `embeddings` | list<Embedding> | No | `[]` | The list of embeddings to use. |
| `teed_image_url` | string | No |  | The URL of the control image. |
| `loras` | list<LoraWeight> | No | `[]` | The list of LoRA weights to use. |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `canny_image_url` | string | No |  | The URL of the control image. |
| `segmentation_preprocess` | boolean | No | `true` | Whether to preprocess the segmentation image. |
| `format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `request_id` | string | No | `""` | An id bound to a request, can be used with response to identify the request             itself. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `segmentation_image_url` | string | No |  | The URL of the control image. |
| `openpose_image_url` | string | No |  | The URL of the control image. |
| `canny_preprocess` | boolean | No | `true` | Whether to preprocess the canny image. |
| `expand_prompt` | boolean | No | `false` | If set to true, the prompt will be expanded with additional prompts. |
| `depth_image_url` | string | No |  | The URL of the control image. |
| `normal_preprocess` | boolean | No | `true` | Whether to preprocess the normal image. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `teed_preprocess` | boolean | No | `true` | Whether to preprocess the teed image. |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `controlnet_conditioning_scale` | float | No | `0.5` | The scale of the controlnet conditioning. |
| `safety_checker_version` | enum: `v1`, `v2` | No | `"v1"` | The version of the safety checker to use. v1 is the default CompVis safety checker. v2 uses a custom ViT model. |
| `openpose_preprocess` | boolean | No | `true` | Whether to preprocess the openpose image. |
| `num_inference_steps` | integer | No | `35` | The number of inference steps to perform. |

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
const { request_id } = await fal.queue.submit("fal-ai/sdxl-controlnet-union", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sdxl-controlnet-union", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sdxl-controlnet-union", {
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

- API page: https://fal.ai/models/fal-ai/sdxl-controlnet-union/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sdxl-controlnet-union
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
