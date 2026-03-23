---
name: fal-ai-heygen-v2-translate-precision
description: >
  Use this skill for the fal.ai Heygen model (fal-ai/heygen/v2/translate/precision). Heygen Translate Model with Extreme Precision
---

# Heygen

Heygen Translate Model with Extreme Precision

**Endpoint:** `fal-ai/heygen/v2/translate/precision`
**Source:** https://fal.ai/models/fal-ai/heygen/v2/translate/precision/api

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

const result = await fal.subscribe("fal-ai/heygen/v2/translate/precision", {
  input: {
        "video_url": "https://example.com/input.png",
        "output_language": "English"
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
| `translate_audio_only` | boolean | null | No | `false` | Translate only the audio, ignore the faces and only translate the voice track |
| `enable_dynamic_duration` | boolean | null | No | `true` | Enable dynamic duration to enhance conversational fluidity between languages with different speaking rates |
| `speaker_num` | integer | null | No |  | Number of speakers in the video |
| `video_url` | string | **Yes** |  | URL of the video to translate. |
| `output_language` | enum (178 values) | **Yes** |  | The target language to translate the video into |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/heygen/v2/translate/precision", {
  input: {
        "video_url": "https://example.com/input.png",
        "output_language": "English"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/heygen/v2/translate/precision", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/heygen/v2/translate/precision", {
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

- API page: https://fal.ai/models/fal-ai/heygen/v2/translate/precision/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/heygen/v2/translate/precision
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
