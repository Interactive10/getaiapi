---
name: fal-ai-switti
description: >
  Use this skill for the fal.ai Switti 1024 model (fal-ai/switti). Switti is a scale-wise transformer for fast text-to-image generation that outperforms existing T2I AR models and competes with state-of-the-art T2I diffusion models while being faster than distilled d
---

# Switti 1024

Switti is a scale-wise transformer for fast text-to-image generation that outperforms existing T2I AR models and competes with state-of-the-art T2I diffusion models while being faster than distilled diffusion models.

**Endpoint:** `fal-ai/switti`
**Source:** https://fal.ai/models/fal-ai/switti/api

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

const result = await fal.subscribe("fal-ai/switti", {
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
| `sampling_top_k` | integer | No | `400` | The number of top-k tokens to sample from. |
| `turn_off_cfg_start_si` | integer | No | `8` | Disable CFG starting scale |
| `guidance_scale` | float | No | `6` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `smooth_start_si` | integer | No | `2` | Smoothing starting scale |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `last_scale_temp` | float | No | `0.1` | Temperature after disabling CFG |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `more_diverse` | boolean | No | `false` | More diverse sampling |
| `sync_mode` | boolean | No | `false` | If set to true, the function will wait for the image to be generated and uploaded             before returning the re... |
| `more_smooth` | boolean | No | `true` | Smoothing with Gumbel softmax sampling |
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `sampling_top_p` | float | No | `0.95` | The top-p probability to sample from. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `images` | list<Image> | The generated images |
| `timings` | Timings |  |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/switti", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/switti", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/switti", {
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

- API page: https://fal.ai/models/fal-ai/switti/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/switti
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
