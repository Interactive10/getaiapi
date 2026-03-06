---
name: fal-ai-ip-adapter-face-id
description: >
  Use this skill for the fal.ai IP Adapter Face ID model (fal-ai/ip-adapter-face-id). High quality zero-shot personalization
---

# IP Adapter Face ID

High quality zero-shot personalization

**Endpoint:** `fal-ai/ip-adapter-face-id`
**Source:** https://fal.ai/models/fal-ai/ip-adapter-face-id/api

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

const result = await fal.subscribe("fal-ai/ip-adapter-face-id", {
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
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |
| `width` | integer | No | `512` | The width of the generated image. |
| `face_id_det_size` | integer | No | `640` | The size of the face detection model. The higher the number the more accurate             the detection will be but i... |
| `guidance_scale` | float | No | `7.5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `negative_prompt` | string | No | `"blurry, low resolution, bad, ugly, low quality, pixelated, interpolated, compression artifacts, noisey, grainy"` | The negative prompt to use.Use it to address details that you don't want             in the image. This could be colo... |
| `height` | integer | No | `512` | The height of the generated image. |
| `num_samples` | integer | No | `4` | The number of samples for face id. The more samples the better the image will             be but it will also take lo... |
| `base_sdxl_model_repo` | string | No | `"SG161222/RealVisXL_V3.0"` | The URL to the base SDXL model. Default is SG161222/RealVisXL_V3.0 |
| `base_1_5_model_repo` | string | No | `"SG161222/Realistic_Vision_V4.0_noVAE"` | The URL to the base 1.5 model. Default is SG161222/Realistic_Vision_V4.0_noVAE |
| `face_image_url` | string | null | No |  | An image of a face to match. If an image with a size of 640x640 is not provided, it will be scaled and cropped to tha... |
| `model_type` | enum: `1_5-v1`, `1_5-v1-plus`, `1_5-v2-plus`, `SDXL-v1`, `SDXL-v2-plus`, `1_5-auraface-v1` | No | `"1_5-v1"` | The model type to use. 1_5 is the default and is recommended for most use cases. |
| `face_images_data_url` | string | null | No |  | URL to zip archive with images of faces. The images embedding will be averaged to             create a more accurate ... |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to use for generating the image. The more steps             the better the image will b... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | Represents an image file. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ip-adapter-face-id", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ip-adapter-face-id", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ip-adapter-face-id", {
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

- API page: https://fal.ai/models/fal-ai/ip-adapter-face-id/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ip-adapter-face-id
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
