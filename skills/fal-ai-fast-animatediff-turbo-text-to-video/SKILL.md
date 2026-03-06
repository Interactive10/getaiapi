---
name: fal-ai-fast-animatediff-turbo-text-to-video
description: >
  Use this skill for the fal.ai AnimateDiff Turbo model (fal-ai/fast-animatediff/turbo/text-to-video). Animate your ideas in lightning speed!
---

# AnimateDiff Turbo

Animate your ideas in lightning speed!

**Endpoint:** `fal-ai/fast-animatediff/turbo/text-to-video`
**Source:** https://fal.ai/models/fal-ai/fast-animatediff/turbo/text-to-video/api

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

const result = await fal.subscribe("fal-ai/fast-animatediff/turbo/text-to-video", {
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
| `prompt` | string | **Yes** |  | The prompt to use for generating the video. Be as descriptive as possible for best results. |
| `fps` | integer | No | `8` | Number of frames per second to extract from the video. |
| `video_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | No | `"square"` | The size of the video to generate. |
| `guidance_scale` | float | No | `2` | The CFG (Classifier Free Guidance) scale is a measure of how close you want the model to stick to your prompt when lo... |
| `num_inference_steps` | integer | No | `8` | The number of inference steps to perform. 4-12 is recommended for turbo mode. |
| `num_frames` | integer | No | `16` | The number of frames to generate for the video. |
| `negative_prompt` | string | No | `"(bad quality, worst quality:1.2), ugly faces, bad anime"` | The negative prompt to use. Use it to address details that you don't want             in the image. This could be col... |
| `seed` | integer | null | No |  | The same seed and the same prompt given to the same version of Stable Diffusion             will output the same imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | Seed used for generating the video. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/fast-animatediff/turbo/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/fast-animatediff/turbo/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/fast-animatediff/turbo/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/fast-animatediff/turbo/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/fast-animatediff/turbo/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
