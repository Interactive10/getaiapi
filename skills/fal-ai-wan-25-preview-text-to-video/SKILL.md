---
name: fal-ai-wan-25-preview-text-to-video
description: >
  Use this skill for the fal.ai Wan 2.5 Text to Video model (fal-ai/wan-25-preview/text-to-video). Wan 2.5 text-to-video model.
---

# Wan 2.5 Text to Video

Wan 2.5 text-to-video model.

**Endpoint:** `fal-ai/wan-25-preview/text-to-video`
**Source:** https://fal.ai/models/fal-ai/wan-25-preview/text-to-video/api

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

const result = await fal.subscribe("fal-ai/wan-25-preview/text-to-video", {
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
| `prompt` | string | **Yes** |  | The text prompt for video generation. Supports Chinese and English, max 800 characters. |
| `duration` | enum: `5`, `10` | No | `"5"` | Duration of the generated video in seconds. Choose between 5 or 10 seconds. |
| `resolution` | enum: `480p`, `720p`, `1080p` | No | `"1080p"` | Video resolution tier |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | The aspect ratio of the generated video |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `audio_url` | string | null | No |  | URL of the audio to use as the background music. Must be publicly accessible. Limit handling: If the audio duration e... |
| `negative_prompt` | string | null | No |  | Negative prompt to describe content to avoid. Max 500 characters. |
| `enable_prompt_expansion` | boolean | No | `true` | Whether to enable prompt rewriting using LLM. Improves results for short prompts but increases processing time. |

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
const { request_id } = await fal.queue.submit("fal-ai/wan-25-preview/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-25-preview/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-25-preview/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/wan-25-preview/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-25-preview/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
