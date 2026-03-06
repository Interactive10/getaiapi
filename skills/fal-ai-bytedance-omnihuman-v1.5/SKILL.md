---
name: fal-ai-bytedance-omnihuman-v1.5
description: >
  Use this skill for the fal.ai Bytedance OmniHuman v1.5 model (fal-ai/bytedance/omnihuman/v1.5). Omnihuman v1.5 is a new and improved version of Omnihuman. It generates video using an image of a human figure paired with an audio file. It produces vivid, high-quality videos where the character’s e
---

# Bytedance OmniHuman v1.5

Omnihuman v1.5 is a new and improved version of Omnihuman. It generates video using an image of a human figure paired with an audio file. It produces vivid, high-quality videos where the character’s emotions and movements maintain a strong correlation with the audio.

**Endpoint:** `fal-ai/bytedance/omnihuman/v1.5`
**Source:** https://fal.ai/models/fal-ai/bytedance/omnihuman/v1.5/api

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

const result = await fal.subscribe("fal-ai/bytedance/omnihuman/v1.5", {
  input: {
        "audio_url": "https://example.com/input.png",
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
| `prompt` | string | null | No |  | The text prompt used to guide the video generation. |
| `resolution` | enum: `720p`, `1080p` | No | `"1080p"` | The resolution of the generated video. Defaults to 1080p. 720p generation is faster and higher in quality. 1080p gene... |
| `turbo_mode` | boolean | No | `false` | Generate a video at a faster rate with a slight quality trade-off. |
| `audio_url` | string | **Yes** |  | The URL of the audio file to generate the video. Audio must be under 30s long for 1080p generation and under 60s long... |
| `image_url` | string | **Yes** |  | The URL of the image used to generate the video |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `duration` | float | Duration of audio input/video output as used for billing. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance/omnihuman/v1.5", {
  input: {
        "audio_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance/omnihuman/v1.5", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance/omnihuman/v1.5", {
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

- API page: https://fal.ai/models/fal-ai/bytedance/omnihuman/v1.5/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/omnihuman/v1.5
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
