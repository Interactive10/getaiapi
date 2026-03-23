---
name: fal-ai-hunyuan-video-v1.5-text-to-video
description: >
  Use this skill for the fal.ai Hunyuan Video V1.5 model (fal-ai/hunyuan-video-v1.5/text-to-video). Hunyuan Video 1.5 is Tencent's latest and best video model
---

# Hunyuan Video V1.5

Hunyuan Video 1.5 is Tencent's latest and best video model

**Endpoint:** `fal-ai/hunyuan-video-v1.5/text-to-video`
**Source:** https://fal.ai/models/fal-ai/hunyuan-video-v1.5/text-to-video/api

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

const result = await fal.subscribe("fal-ai/hunyuan-video-v1.5/text-to-video", {
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
| `prompt` | string | **Yes** |  | The prompt to generate the video. |
| `resolution` | string | No | `"480p"` | The resolution of the video. |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | The aspect ratio of the video. |
| `enable_prompt_expansion` | boolean | No | `true` | Enable prompt expansion to enhance the input prompt. |
| `seed` | integer | null | No |  | Random seed for reproducibility. |
| `num_inference_steps` | integer | No | `28` | The number of inference steps. |
| `negative_prompt` | string | No | `""` | The negative prompt to guide what not to generate. |
| `num_frames` | integer | No | `121` | The number of frames to generate. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video-v1.5/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-video-v1.5/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-video-v1.5/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-video-v1.5/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-video-v1.5/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
