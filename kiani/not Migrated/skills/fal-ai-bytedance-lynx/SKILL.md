---
name: fal-ai-bytedance-lynx
description: >
  Use this skill for the fal.ai Lynx model (bytedance/lynx). Generate subject consistent videos using Lynx from ByteDance!
---

# Lynx

Generate subject consistent videos using Lynx from ByteDance!

**Endpoint:** `bytedance/lynx`
**Source:** https://fal.ai/models/bytedance/lynx/api

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

const result = await fal.subscribe("bytedance/lynx", {
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
| `prompt` | string | **Yes** |  | Text prompt to guide video generation |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | Aspect ratio of the generated video (16:9, 9:16, or 1:1) |
| `resolution` | enum: `480p`, `580p`, `720p` | No | `"720p"` | Resolution of the generated video (480p, 580p, or 720p) |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `image_url` | string | **Yes** |  | The URL of the subject image to be used for video generation |
| `strength` | float | No | `1` | Reference image scale. Controls the influence of the reference image on the generated video. |
| `frames_per_second` | integer | No | `16` | Frames per second of the generated video. Must be between 5 to 30. |
| `guidance_scale_2` | float | No | `2` | Image guidance scale. Controls how closely the generated video follows the reference image. Higher values increase ad... |
| `guidance_scale` | float | No | `5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `num_inference_steps` | integer | No | `50` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `num_frames` | integer | No | `81` | Number of frames in the generated video. Must be between 9 to 100. |
| `negative_prompt` | string | No | `"Bright tones, overexposed, blurred background, static, subtitles, style, works, paintings, images, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, misshapen limbs, fused fingers, still picture, messy background, three legs, many people in the background, walking backwards"` | Negative prompt to guide what should not appear in the generated video |
| `ip_scale` | float | No | `1` | Identity preservation scale. Controls how closely the generated video preserves the subject's identity from the refer... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("bytedance/lynx", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("bytedance/lynx", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("bytedance/lynx", {
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

- API page: https://fal.ai/models/bytedance/lynx/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=bytedance/lynx
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
