---
name: fal-ai-bria-product-shot
description: >
  Use this skill for the fal.ai Bria Product Shot model (fal-ai/bria/product-shot). Place any product in any scenery with just a prompt or reference image while maintaining high integrity of the product. Trained exclusively on licensed data for safe and risk-free commercial use and o
---

# Bria Product Shot

Place any product in any scenery with just a prompt or reference image while maintaining high integrity of the product. Trained exclusively on licensed data for safe and risk-free commercial use and optimized for eCommerce.

**Endpoint:** `fal-ai/bria/product-shot`
**Source:** https://fal.ai/models/fal-ai/bria/product-shot/api

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

const result = await fal.subscribe("fal-ai/bria/product-shot", {
  input: {
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
| `ref_image_url` | string | No | `""` | The URL of the reference image to be used for generating the new scene or background for the product shot. Use "" to ... |
| `manual_placement_selection` | enum (10 values) | No | `"bottom_center"` | If you've selected placement_type=manual_placement, you should use this parameter to specify which placements/positio... |
| `num_results` | integer | No | `1` | The number of lifestyle product shots you would like to generate. You will get num_results x 10 results when placemen... |
| `padding_values` | list<integer> | No |  | The desired padding in pixels around the product, when using placement_type=manual_padding. The order of the values i... |
| `shot_size` | list<integer> | No | `[1000, 1000]` | The desired size of the final product shot. For optimal results, the total number of pixels should be around 1,000,00... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `placement_type` | enum: `original`, `automatic`, `manual_placement`, `manual_padding` | No | `"manual_placement"` | This parameter allows you to control the positioning of the product in the image. Choosing 'original' will preserve t... |
| `original_quality` | boolean | No | `false` | This flag is only relevant when placement_type=original. If true, the output image retains the original input image's... |
| `fast` | boolean | No | `true` | Whether to use the fast model |
| `optimize_description` | boolean | No | `true` | Whether to optimize the scene description |
| `scene_description` | string | null | No |  | Text description of the new scene or background for the provided product shot. Bria currently supports prompts in Eng... |
| `image_url` | string | **Yes** |  | The URL of the product shot to be placed in a lifestyle shot. If both image_url and image_file are provided, image_ur... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bria/product-shot", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bria/product-shot", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bria/product-shot", {
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

- API page: https://fal.ai/models/fal-ai/bria/product-shot/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bria/product-shot
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
