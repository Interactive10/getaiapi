---
name: fal-ai-animatediff-sparsectrl-lcm
description: >
  Use this skill for the fal.ai Animatediff SparseCtrl LCM model (fal-ai/animatediff-sparsectrl-lcm). Animate Your Drawings with Latent Consistency Models!
---

# Animatediff SparseCtrl LCM

Animate Your Drawings with Latent Consistency Models!

**Endpoint:** `fal-ai/animatediff-sparsectrl-lcm`
**Source:** https://fal.ai/models/fal-ai/animatediff-sparsectrl-lcm/api

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

const result = await fal.subscribe("fal-ai/animatediff-sparsectrl-lcm", {
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
| `seed` | integer | No |  | The same seed and the same prompt given to the same version of Stable         Diffusion will output the same image ev... |
| `controlnet_type` | enum: `scribble`, `rgb` | No | `"scribble"` | The type of controlnet to use for generating the video. The controlnet determines how the video will be animated. |
| `keyframe_2_index` | integer | No | `0` | The frame index of the third keyframe to use for the generation. |
| `keyframe_0_index` | integer | No | `0` | The frame index of the first keyframe to use for the generation. |
| `keyframe_1_image_url` | string | No |  | The URL of the second keyframe to use for the generation. |
| `keyframe_1_index` | integer | No | `0` | The frame index of the second keyframe to use for the generation. |
| `guidance_scale` | integer | No | `1` | The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when lo... |
| `num_inference_steps` | integer | No | `4` | Increasing the amount of steps tells Stable Diffusion that it should take more steps to generate your final result wh... |
| `keyframe_2_image_url` | string | No |  | The URL of the third keyframe to use for the generation. |
| `negative_prompt` | string | No | `""` | The negative prompt to use. Use it to specify what you don't want. |
| `keyframe_0_image_url` | string | No |  | The URL of the first keyframe to use for the generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used to generate the video. |
| `video` | File | Generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/animatediff-sparsectrl-lcm", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/animatediff-sparsectrl-lcm", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/animatediff-sparsectrl-lcm", {
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

- API page: https://fal.ai/models/fal-ai/animatediff-sparsectrl-lcm/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/animatediff-sparsectrl-lcm
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
