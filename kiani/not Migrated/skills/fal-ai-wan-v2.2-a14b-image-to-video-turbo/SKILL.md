---
name: fal-ai-wan-v2.2-a14b-image-to-video-turbo
description: >
  Use this skill for the fal.ai Wan model (fal-ai/wan/v2.2-a14b/image-to-video/turbo). Wan-2.2 Turbo image-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts.
---

# Wan

Wan-2.2 Turbo image-to-video is a video model that generates high-quality videos with high visual quality and motion diversity from text prompts.

**Endpoint:** `fal-ai/wan/v2.2-a14b/image-to-video/turbo`
**Source:** https://fal.ai/models/fal-ai/wan/v2.2-a14b/image-to-video/turbo/api

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

const result = await fal.subscribe("fal-ai/wan/v2.2-a14b/image-to-video/turbo", {
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
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the output video. Faster write mode means faster results but larger file size, balanced write mode ... |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', the aspect ratio will be determined automatically based on the input ... |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level to use. The more acceleration, the faster the generation, but with lower quality. The recommended ... |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"720p"` | Resolution of the generated video (480p, 580p, or 720p). |
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `enable_output_safety_checker` | boolean | No | `false` | If set to true, output video will be checked for safety after generation. |
| `image_url` | string | **Yes** |  | URL of the input image. If the input image does not match the chosen aspect ratio, it is resized and center cropped. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the output video. Higher quality means better visual quality but larger file size. |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. This will use a large language model to expand the prompt with additional details... |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `end_image_url` | string | null | No |  | URL of the end image. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, input data will be checked for safety before processing. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The text prompt used for video generation. |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan/v2.2-a14b/image-to-video/turbo", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan/v2.2-a14b/image-to-video/turbo", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan/v2.2-a14b/image-to-video/turbo", {
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

- API page: https://fal.ai/models/fal-ai/wan/v2.2-a14b/image-to-video/turbo/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan/v2.2-a14b/image-to-video/turbo
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
