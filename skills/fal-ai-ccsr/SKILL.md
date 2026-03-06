---
name: fal-ai-ccsr
description: >
  Use this skill for the fal.ai CCSR Upscaler model (fal-ai/ccsr). SOTA Image Upscaler
---

# CCSR Upscaler

SOTA Image Upscaler

**Endpoint:** `fal-ai/ccsr`
**Source:** https://fal.ai/models/fal-ai/ccsr/api

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

const result = await fal.subscribe("fal-ai/ccsr", {
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
| `color_fix_type` | enum: `none`, `wavelet`, `adain` | No | `"adain"` | Type of color correction for samples. |
| `tile_diffusion_size` | integer | No | `1024` | Size of patch. |
| `tile_vae_decoder_size` | integer | No | `226` | Size of VAE patch. |
| `tile_vae_encoder_size` | integer | No | `1024` | Size of latent image |
| `t_min` | float | No | `0.3333` | The starting point of uniform sampling strategy. |
| `image_url` | string | **Yes** |  | The URL or data URI of the image to upscale. |
| `tile_diffusion_stride` | integer | No | `512` | Stride of sliding patch. |
| `tile_vae` | boolean | No | `false` | If specified, a patch-based sampling strategy will be used for VAE decoding. |
| `scale` | float | No | `2` | The scale of the output image. The higher the scale, the bigger the output image will be. |
| `seed` | integer | No |  | Seed for reproducibility. Different seeds will make slightly different results. |
| `t_max` | float | No | `0.6667` | The ending point of uniform sampling strategy. |
| `steps` | integer | No | `50` | The number of steps to run the model for. The higher the number the better the quality and longer it will take to gen... |
| `tile_diffusion` | enum: `none`, `mix`, `gaussian` | No | `"none"` | If specified, a patch-based sampling strategy will be used for sampling. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `image` | Image | The generated image file info. |
| `seed` | integer | The seed used for the generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ccsr", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ccsr", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ccsr", {
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

- API page: https://fal.ai/models/fal-ai/ccsr/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ccsr
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
