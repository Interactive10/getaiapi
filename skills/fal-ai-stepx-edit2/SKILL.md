---
name: fal-ai-stepx-edit2
description: >
  Use this skill for the fal.ai Stepx Edit2 model (fal-ai/stepx-edit2). Image-to-image editing with Step1X-Edit v2 from StepFun. Reasoning-enhanced modifications through a thinking–editing–reflection loop with MLLM world knowledge for abstract instruction comprehension.
---

# Stepx Edit2

Image-to-image editing with Step1X-Edit v2 from StepFun. Reasoning-enhanced modifications through a thinking–editing–reflection loop with MLLM world knowledge for abstract instruction comprehension.

**Endpoint:** `fal-ai/stepx-edit2`
**Source:** https://fal.ai/models/fal-ai/stepx-edit2/api

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

const result = await fal.subscribe("fal-ai/stepx-edit2", {
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
| `prompt` | string | **Yes** |  | The prompt to generate an image from. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `enable_reflection_mode` | boolean | No | `true` | Enable reflection mode. Reviews outputs, corrects unintended changes, and determines when editing is complete. |
| `output_format` | enum: `jpeg`, `png` | No | `"jpeg"` | The format of the generated image. |
| `image_url` | string | **Yes** |  | The image URL to generate an image from. Needs to match the dimensions of the mask. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `guidance_scale` | float | No | `6` | The true CFG scale. Controls how closely the model follows the prompt. |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same image every... |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to perform. Recommended: 50. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `enable_thinking_mode` | boolean | No | `true` | Enable thinking mode. Uses multimodal language model knowledge to interpret abstract editing instructions. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the image. |
| `has_nsfw_concepts` | list<boolean> | Whether the generated images contain NSFW concepts. |
| `images` | list<Image> | The generated images |
| `best_info` | list<object> | null | Reflection analysis (only available when reflection mode is enabled). |
| `seed` | integer | Seed of the generated Image. It will be the same value of the one passed in the             input or the randomly gen... |
| `reformat_prompt` | string | null | The model's interpretation of your instruction (only available when thinking mode is enabled). |
| `think_info` | list<string> | null | Reasoning process details (only available when thinking mode is enabled). |
| `timings` | Timings |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/stepx-edit2", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/stepx-edit2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/stepx-edit2", {
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

- API page: https://fal.ai/models/fal-ai/stepx-edit2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/stepx-edit2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
