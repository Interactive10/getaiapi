---
name: fal-ai-vibevoice
description: >
  Use this skill for the fal.ai VibeVoice 1.5B model (fal-ai/vibevoice). Generate long, expressive multi-voice speech using Microsoft's powerful TTS
---

# VibeVoice 1.5B

Generate long, expressive multi-voice speech using Microsoft's powerful TTS

**Endpoint:** `fal-ai/vibevoice`
**Source:** https://fal.ai/models/fal-ai/vibevoice/api

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

const result = await fal.subscribe("fal-ai/vibevoice", {
  input: {
        "script": "your value here",
        "speakers": []
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
| `script` | string | **Yes** |  | The script to convert to speech. Can be formatted with 'Speaker X:' prefixes for multi-speaker dialogues. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. |
| `speakers` | list<VibeVoiceSpeaker> | **Yes** |  | List of speakers to use for the script. If not provided, will be inferred from the script or voice samples. |
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
const { request_id } = await fal.queue.submit("fal-ai/vibevoice", {
  input: {
        "script": "your value here",
        "speakers": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/vibevoice", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/vibevoice", {
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

- API page: https://fal.ai/models/fal-ai/vibevoice/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/vibevoice
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
