---
name: fal-ai-qwen-image-edit-2509-lora-gallery-multiple-angles
description: >
  Use this skill for the fal.ai Qwen Image Edit 2509 Lora Gallery model (fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles). Precise camera position and angle control (rotation, zoom, vertical movement)
---

# Qwen Image Edit 2509 Lora Gallery

Precise camera position and angle control (rotation, zoom, vertical movement)

**Endpoint:** `fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles`
**Source:** https://fal.ai/models/fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles/api

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

const result = await fal.subscribe("fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles", {
  input: {
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
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No |  | The size of the generated image. If not provided, the size of the final input image will be used. |
| `wide_angle_lens` | boolean | No | `false` | Enable wide-angle lens effect |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level for image generation. 'regular' balances speed and quality. |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker for the generated image. |
| `guidance_scale` | float | No | `1` | The CFG (Classifier Free Guidance) scale. Controls how closely the model follows the prompt. |
| `image_urls` | list<string> | **Yes** |  | The URL of the image to adjust camera angle for. |
| `negative_prompt` | string | No | `" "` | The negative prompt for the generation |
| `vertical_angle` | float | No | `0` | Adjust vertical camera angle (-1=bird's-eye view/looking down, 0=neutral, 1=worm's-eye view/looking up) |
| `num_images` | integer | No | `1` | Number of images to generate |
| `lora_scale` | float | No | `1.25` | The scale factor for the LoRA model. Controls the strength of the camera control effect. |
| `output_format` | enum: `png`, `jpeg`, `webp` | No | `"png"` | The format of the output image |
| `rotate_right_left` | float | No | `0` | Rotate camera left (positive) or right (negative) in degrees. Positive values rotate left, negative values rotate right. |
| `move_forward` | float | No | `0` | Move camera forward (0=no movement, 10=close-up) |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and won't be saved in history. |
| `seed` | integer | null | No |  | Random seed for reproducibility. Same seed with same prompt will produce same result. |
| `num_inference_steps` | integer | No | `6` | The number of inference steps to perform. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated/edited images |
| `seed` | integer | The seed used for generation |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles", {
  input: {
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles", {
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

- API page: https://fal.ai/models/fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/qwen-image-edit-2509-lora-gallery/multiple-angles
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
