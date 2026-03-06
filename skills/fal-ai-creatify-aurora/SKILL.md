---
name: fal-ai-creatify-aurora
description: >
  Use this skill for the fal.ai Creatify Aurora model (fal-ai/creatify/aurora). Generate high fidelity, studio quality videos of your avatar speaking or singing using the Aurora from Creatify team!
---

# Creatify Aurora

Generate high fidelity, studio quality videos of your avatar speaking or singing using the Aurora from Creatify team!

**Endpoint:** `fal-ai/creatify/aurora`
**Source:** https://fal.ai/models/fal-ai/creatify/aurora/api

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

const result = await fal.subscribe("fal-ai/creatify/aurora", {
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
| `prompt` | string | null | No |  | A text prompt to guide the video generation process. |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | The resolution of the generated video. |
| `audio_url` | string | **Yes** |  | The URL of the audio file to be used for video generation. |
| `audio_guidance_scale` | float | null | No | `2` | Guidance scale to be used for audio adherence. |
| `guidance_scale` | float | null | No | `1` | Guidance scale to be used for text prompt adherence. |
| `image_url` | string | **Yes** |  | The URL of the image file to be used for video generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/creatify/aurora", {
  input: {
        "audio_url": "https://example.com/input.png",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/creatify/aurora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/creatify/aurora", {
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

- API page: https://fal.ai/models/fal-ai/creatify/aurora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/creatify/aurora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
