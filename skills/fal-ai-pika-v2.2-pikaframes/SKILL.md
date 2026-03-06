---
name: fal-ai-pika-v2.2-pikaframes
description: >
  Use this skill for the fal.ai Pika model (fal-ai/pika/v2.2/pikaframes). Discover ultimate control with Pikaframes key frame interpolation, a stunning image-to-video feature that allows you to upload up to 5 keyframes, customize their transition length and prompt, and see 
---

# Pika

Discover ultimate control with Pikaframes key frame interpolation, a stunning image-to-video feature that allows you to upload up to 5 keyframes, customize their transition length and prompt, and see their images come to life as seamless videos.

**Endpoint:** `fal-ai/pika/v2.2/pikaframes`
**Source:** https://fal.ai/models/fal-ai/pika/v2.2/pikaframes/api

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

const result = await fal.subscribe("fal-ai/pika/v2.2/pikaframes", {
  input: {
        "image_urls": []
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
| `prompt` | string | null | No |  | Default prompt for all transitions. Individual transition prompts override this. |
| `resolution` | enum: `720p`, `1080p` | No | `"720p"` | The resolution of the generated video |
| `transitions` | list<KeyframeTransition> | No |  | Configuration for each transition. Length must be len(image_urls) - 1. Total duration of all transitions must not exc... |
| `seed` | integer | null | No |  | The seed for the random number generator |
| `image_urls` | list<string> | **Yes** |  | URLs of keyframe images (2-5 images) to create transitions between |
| `negative_prompt` | string | No | `""` | A negative prompt to guide the model |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/pika/v2.2/pikaframes", {
  input: {
        "image_urls": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/pika/v2.2/pikaframes", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/pika/v2.2/pikaframes", {
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

- API page: https://fal.ai/models/fal-ai/pika/v2.2/pikaframes/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/pika/v2.2/pikaframes
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
