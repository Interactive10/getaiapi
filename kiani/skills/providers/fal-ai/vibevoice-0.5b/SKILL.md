---
name: fal-ai-vibevoice-0.5b
description: >
  Use this skill for the fal.ai Vibevoice model (fal-ai/vibevoice/0.5b). Generate long speech snippets fast using Microsoft's powerful TTS.
---

# Vibevoice

Generate long speech snippets fast using Microsoft's powerful TTS.

**Endpoint:** `fal-ai/vibevoice/0.5b`
**Source:** https://fal.ai/models/fal-ai/vibevoice/0.5b/api

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

const result = await fal.subscribe("fal-ai/vibevoice/0.5b", {
  input: {
        "script": "your value here",
        "speaker": "Frank"
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
| `script` | string | **Yes** |  | The script to convert to speech. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. |
| `speaker` | enum: `Frank`, `Wayne`, `Carter`, `Emma`, `Grace`, `Mike` | **Yes** |  | Voice to use for speaking. |
| `cfg_scale` | float | No | `1.3` | CFG (Classifier-Free Guidance) scale for generation. Higher values increase adherence to text. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `duration` | float | Duration of the generated audio in seconds |
| `rtf` | float | Real-time factor (generation_time / audio_duration). Lower is better. |
| `sample_rate` | integer | Sample rate of the generated audio |
| `audio` | File |  |
| `generation_time` | float | Time taken to generate the audio in seconds |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/vibevoice/0.5b", {
  input: {
        "script": "your value here",
        "speaker": "Frank"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/vibevoice/0.5b", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/vibevoice/0.5b", {
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

- API page: https://fal.ai/models/fal-ai/vibevoice/0.5b/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/vibevoice/0.5b
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
