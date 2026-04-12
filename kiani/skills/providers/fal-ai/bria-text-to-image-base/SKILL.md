---
name: fal-ai-bria-text-to-image-base
description: >
  Use this skill for the fal.ai Bria Text-to-Image Base model (fal-ai/bria/text-to-image/base). Bria's Text-to-Image model, trained exclusively on licensed data for safe and risk-free commercial use. Available also as source code and weights. For access to weights: https://bria.ai/contact-us
---

# Bria Text-to-Image Base

Bria's Text-to-Image model, trained exclusively on licensed data for safe and risk-free commercial use. Available also as source code and weights. For access to weights: https://bria.ai/contact-us

**Endpoint:** `fal-ai/bria/text-to-image/base`
**Source:** https://fal.ai/models/fal-ai/bria/text-to-image/base/api

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

const result = await fal.subscribe("fal-ai/bria/text-to-image/base", {
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
| `prompt` | string | **Yes** |  | The prompt you would like to use to generate images. |
| `aspect_ratio` | enum (9 values) | No | `"1:1"` | The aspect ratio of the image. When a guidance method is being used, the aspect ratio is defined by the guidance imag... |
| `prompt_enhancement` | boolean | No | `false` | When set to true, enhances the provided prompt by generating additional, more descriptive variations, resulting in mo... |
| `guidance` | list<GuidanceInput> | No | `[]` | Guidance images to use for the generation. Up to 4 guidance methods can be combined during a single inference. |
| `num_images` | integer | No | `4` | How many images you would like to generate. When using any Guidance Method, Value is set to 1. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `5` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `num_inference_steps` | integer | No | `30` | The number of iterations the model goes through to refine the generated image. This parameter is optional. |
| `negative_prompt` | string | No | `""` | The negative prompt you would like to use to generate images. |
| `medium` | enum: `photography`, `art` | No |  | Which medium should be included in your generated images. This parameter is optional. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The generated images |
| `seed` | integer | Seed value used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bria/text-to-image/base", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bria/text-to-image/base", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bria/text-to-image/base", {
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

- API page: https://fal.ai/models/fal-ai/bria/text-to-image/base/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bria/text-to-image/base
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
