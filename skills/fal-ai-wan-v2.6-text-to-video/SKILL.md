---
name: fal-ai-wan-v2.6-text-to-video
description: >
  Use this skill for the fal.ai Wan v2.6 Text to Video model (wan/v2.6/text-to-video). Wan 2.6 text-to-video model.
---

# Wan v2.6 Text to Video

Wan 2.6 text-to-video model.

**Endpoint:** `wan/v2.6/text-to-video`
**Source:** https://fal.ai/models/wan/v2.6/text-to-video/api

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

const result = await fal.subscribe("wan/v2.6/text-to-video", {
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
| `prompt` | string | **Yes** |  | The text prompt for video generation. Supports Chinese and English, max 800 characters. For multi-shot videos, use fo... |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | Video resolution tier. Wan 2.6 T2V only supports 720p and 1080p (no 480p). |
| `duration` | enum: `5`, `10`, `15` | No | `"5"` | Duration of the generated video in seconds. Choose between 5, 10, or 15 seconds. |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1`, `4:3`, `3:4` | No | `"16:9"` | The aspect ratio of the generated video. Wan 2.6 supports additional ratios. |
| `enable_prompt_expansion` | boolean | No | `true` | Whether to enable prompt rewriting using LLM. Improves results for short prompts but increases processing time. |
| `audio_url` | string | null | No |  | URL of the audio to use as the background music. Must be publicly accessible. Limit handling: If the audio duration e... |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `multi_shots` | boolean | No | `true` | When true, enables intelligent multi-shot segmentation for coherent narrative videos. Only active when enable_prompt_... |
| `negative_prompt` | string | null | No | `""` | Negative prompt to describe content to avoid. Max 500 characters. |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `actual_prompt` | string | null | The actual prompt used if prompt rewriting was enabled |
| `seed` | integer | The seed used for generation |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("wan/v2.6/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("wan/v2.6/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("wan/v2.6/text-to-video", {
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

- API page: https://fal.ai/models/wan/v2.6/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=wan/v2.6/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
