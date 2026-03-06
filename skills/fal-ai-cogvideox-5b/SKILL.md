---
name: fal-ai-cogvideox-5b
description: >
  Use this skill for the fal.ai CogVideoX-5B model (fal-ai/cogvideox-5b). Generate videos from prompts using CogVideoX-5B
---

# CogVideoX-5B

Generate videos from prompts using CogVideoX-5B

**Endpoint:** `fal-ai/cogvideox-5b`
**Source:** https://fal.ai/models/fal-ai/cogvideox-5b/api

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

const result = await fal.subscribe("fal-ai/cogvideox-5b", {
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `use_rife` | boolean | No | `true` | Use RIFE for video interpolation |
| `loras` | list<LoraWeight> | No | `[]` | The LoRAs to use for the image generation. We currently support one lora. |
| `video_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `{'height': 480, 'width': 720}` | The size of the generated video. |
| `guidance_scale` | float | No | `7` | The CFG (Classifier Free Guidance) scale is a measure of how close you want             the model to stick to your pr... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of the model             will output the same video every... |
| `export_fps` | integer | No | `16` | The target FPS of the video |
| `negative_prompt` | string | No | `""` | The negative prompt to generate video from |
| `num_inference_steps` | integer | No | `50` | The number of inference steps to perform. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for generating the video. |
| `seed` | integer | Seed of the generated video. It will be the same value of the one passed in the             input or the randomly gen... |
| `timings` | Timings |  |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/cogvideox-5b", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/cogvideox-5b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/cogvideox-5b", {
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

- API page: https://fal.ai/models/fal-ai/cogvideox-5b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/cogvideox-5b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
