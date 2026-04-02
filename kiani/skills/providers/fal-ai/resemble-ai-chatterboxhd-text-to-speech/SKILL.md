---
name: fal-ai-resemble-ai-chatterboxhd-text-to-speech
description: >
  Use this skill for the fal.ai Chatterboxhd model (resemble-ai/chatterboxhd/text-to-speech). Generate expressive, natural speech with Resemble AI's Chatterbox. Features unique emotion control, instant voice cloning from short audio, and built-in watermarking.
---

# Chatterboxhd

Generate expressive, natural speech with Resemble AI's Chatterbox. Features unique emotion control, instant voice cloning from short audio, and built-in watermarking.

**Endpoint:** `resemble-ai/chatterboxhd/text-to-speech`
**Source:** https://fal.ai/models/resemble-ai/chatterboxhd/text-to-speech/api

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

const result = await fal.subscribe("resemble-ai/chatterboxhd/text-to-speech", {
  input: {
        "prompt": "your prompt here"
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
| `text` | string | No | `"My name is Maximus Decimus Meridius, commander of the Armies of the North, General of the Felix Legions and loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next."` | Text to synthesize into speech. |
| `exaggeration` | float | No | `0.5` | Controls emotion exaggeration. Range typically 0.25 to 2.0. |
| `high_quality_audio` | boolean | No | `false` | If True, the generated audio will be upscaled to 48kHz. The generation of the audio will take longer, but the quality... |
| `voice` | enum (9 values) | No |  | The voice to use for the TTS request. If neither voice nor audio are provided, a random voice will be used. |
| `audio_url` | string | No |  | URL to the audio sample to use as a voice prompt for zero-shot TTS voice cloning. Providing a audio sample will overr... |
| `temperature` | float | No | `0.8` | Controls the randomness of generation. Range typically 0.05 to 5. |
| `seed` | integer | No | `0` | Useful to control the reproducibility of the generated audio. Assuming all other properties didn't change, a fixed se... |
| `cfg` | float | No | `0.5` | Classifier-free guidance scale (CFG) controls the conditioning factor. Range typically 0.2 to 1.0. For expressive or ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | Audio | The generated audio file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("resemble-ai/chatterboxhd/text-to-speech", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("resemble-ai/chatterboxhd/text-to-speech", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("resemble-ai/chatterboxhd/text-to-speech", {
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

- API page: https://fal.ai/models/resemble-ai/chatterboxhd/text-to-speech/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=resemble-ai/chatterboxhd/text-to-speech
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
