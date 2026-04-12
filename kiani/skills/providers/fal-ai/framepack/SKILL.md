---
name: fal-ai-framepack
description: >
  Use this skill for the fal.ai Framepack model (fal-ai/framepack). Framepack is an efficient Image-to-video model that autoregressively generates videos.
---

# Framepack

Framepack is an efficient Image-to-video model that autoregressively generates videos.

**Endpoint:** `fal-ai/framepack`
**Source:** https://fal.ai/models/fal-ai/framepack/api

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

const result = await fal.subscribe("fal-ai/framepack", {
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
| `prompt` | string | **Yes** |  | Text prompt for video generation (max 500 characters). |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | The aspect ratio of the video to generate. |
| `resolution` | enum: `720p`, `480p` | No | `"480p"` | The resolution of the video to generate. 720p generations cost 1.5x more than 480p generations. |
| `num_frames` | integer | No | `180` | The number of frames to generate. |
| `image_url` | string | **Yes** |  | URL of the image input. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | The seed to use for generating the video. |
| `guidance_scale` | float | No | `10` | Guidance scale for the generation. |
| `negative_prompt` | string | No | `""` | Negative prompt for video generation. |
| `cfg_scale` | float | No | `1` | Classifier-Free Guidance scale for the generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generating the video. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/framepack", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/framepack", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/framepack", {
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

- API page: https://fal.ai/models/fal-ai/framepack/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/framepack
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
