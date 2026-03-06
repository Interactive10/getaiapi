---
name: fal-ai-wan-vision-enhancer
description: >
  Use this skill for the fal.ai Wan Vision Enhancer model (fal-ai/wan-vision-enhancer). Wan Vision Enhancer for magnify/enhance video with high fidelity and creativity.
---

# Wan Vision Enhancer

Wan Vision Enhancer for magnify/enhance video with high fidelity and creativity.

**Endpoint:** `fal-ai/wan-vision-enhancer`
**Source:** https://fal.ai/models/fal-ai/wan-vision-enhancer/api

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

const result = await fal.subscribe("fal-ai/wan-vision-enhancer", {
  input: {
        "video_url": "https://example.com/input.png"
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
| `prompt` | string | null | No |  | Optional prompt to prepend to the VLM-generated description. Leave empty to use only the auto-generated description f... |
| `video_url` | string | **Yes** |  | The URL of the video to enhance with Wan Video. Maximum 200MB file size. Videos longer than 500 frames will have only... |
| `seed` | integer | null | No |  | Random seed for reproducibility. If not provided, a random seed will be used. |
| `target_resolution` | enum: `720p`, `1080p` | No | `"720p"` | Target output resolution for the enhanced video. 720p (native, fast) or 1080p (upscaled, slower). Processing is alway... |
| `negative_prompt` | string | null | No | `"oversaturated, overexposed, static, blurry details, subtitles, stylized, artwork, painting, still frame, overall gray, worst quality, low quality, JPEG artifacts, ugly, mutated, extra fingers, poorly drawn hands, poorly drawn face, deformed, disfigured, malformed limbs, fused fingers, static motion, cluttered background, three legs, crowded background, walking backwards"` | Negative prompt to avoid unwanted features. |
| `creativity` | integer | No | `1` | Controls how much the model enhances/changes the video. 0 = Minimal change (preserves original), 1 = Subtle enhanceme... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `timings` | Timings | The timings of the different steps in the workflow. |
| `video` | File | The enhanced video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-vision-enhancer", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-vision-enhancer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-vision-enhancer", {
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

- API page: https://fal.ai/models/fal-ai/wan-vision-enhancer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-vision-enhancer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
