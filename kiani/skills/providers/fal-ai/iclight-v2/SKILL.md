---
name: fal-ai-iclight-v2
description: >
  Use this skill for the fal.ai IC-Light-v2 for Image Relighting model (fal-ai/iclight-v2). An endpoint for re-lighting photos and changing their backgrounds per a given description
---

# IC-Light-v2 for Image Relighting

An endpoint for re-lighting photos and changing their backgrounds per a given description

**Endpoint:** `fal-ai/iclight-v2`
**Source:** https://fal.ai/models/fal-ai/iclight-v2/api

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

const result = await fal.subscribe("fal-ai/iclight-v2", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
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
| `initial_latent` | enum: `None`, `Left`, `Right`, `Top`, `Bottom` | No | `"None"` | Provide lighting conditions for the model |
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No |  | The size of the generated image. |
| `background_threshold` | float | No | `0.67` | Threshold for the background removal algorithm. A high threshold will produce sharper masks. Note: This parameter is ... |
| `mask_image_url` | string | No |  | URL of mask to be used for ic-light conditioning image |
| `guidance_scale` | float | No | `5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `lowres_denoise` | float | No | `0.98` | Strength for low-resolution pass. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `negative_prompt` | string | No | `""` | Negative Prompt for the image |
| `num_images` | integer | No | `1` | The number of images to generate. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `hr_downscale` | float | No | `0.5` |  |
| `image_url` | string | **Yes** |  | URL of image to be used for relighting |
| `sync_mode` | boolean | No | `false` | If set to true, the function will wait for the image to be generated and uploaded             before returning the re... |
| `highres_denoise` | float | No | `0.95` | Strength for high-resolution pass. Only used if enable_hr_fix is True. |
| `num_inference_steps` | integer | No | `28` | The number of inference steps to perform. |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `enable_hr_fix` | boolean | No | `false` | Use HR fix |
| `cfg` | float | No | `1` | The real classifier-free-guidance scale for the generation. |

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
const { request_id } = await fal.queue.submit("fal-ai/iclight-v2", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/iclight-v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/iclight-v2", {
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

- API page: https://fal.ai/models/fal-ai/iclight-v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/iclight-v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
