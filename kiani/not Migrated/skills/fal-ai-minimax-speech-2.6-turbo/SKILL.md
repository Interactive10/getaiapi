---
name: fal-ai-minimax-speech-2.6-turbo
description: >
  Use this skill for the fal.ai MiniMax Speech 2.6 [Turbo] model (fal-ai/minimax/speech-2.6-turbo). Generate speech from text prompts and different voices using the MiniMax Speech-2.6 HD model, which leverages advanced AI techniques to create high-quality text-to-speech.
---

# MiniMax Speech 2.6 [Turbo]

Generate speech from text prompts and different voices using the MiniMax Speech-2.6 HD model, which leverages advanced AI techniques to create high-quality text-to-speech.

**Endpoint:** `fal-ai/minimax/speech-2.6-turbo`
**Source:** https://fal.ai/models/fal-ai/minimax/speech-2.6-turbo/api

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

const result = await fal.subscribe("fal-ai/minimax/speech-2.6-turbo", {
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
| `prompt` | string | **Yes** |  | Text to convert to speech. Paragraph breaks should be marked with newline characters. **NOTE**: You can customize spe... |
| `language_boost` | enum (38 values) | null | No |  | Enhance recognition of specified languages and dialects |
| `output_format` | enum: `url`, `hex` | No | `"hex"` | Format of the output content (non-streaming only) |
| `pronunciation_dict` | PronunciationDict | null | No |  | Custom pronunciation dictionary for text replacement |
| `voice_setting` | VoiceSetting | No |  |  |
| `normalization_setting` | LoudnessNormalizationSetting | No |  |  |
| `audio_setting` | AudioSetting | No |  |  |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `duration_ms` | integer | Duration of the audio in milliseconds |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/minimax/speech-2.6-turbo", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/minimax/speech-2.6-turbo", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/minimax/speech-2.6-turbo", {
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

- API page: https://fal.ai/models/fal-ai/minimax/speech-2.6-turbo/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/speech-2.6-turbo
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
