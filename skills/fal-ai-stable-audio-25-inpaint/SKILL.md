---
name: fal-ai-stable-audio-25-inpaint
description: >
  Use this skill for the fal.ai Stable Audio 25 model (fal-ai/stable-audio-25/inpaint). Generate high quality music and sound effects using Stable Audio 2.5 from StabilityAI
---

# Stable Audio 25

Generate high quality music and sound effects using Stable Audio 2.5 from StabilityAI

**Endpoint:** `fal-ai/stable-audio-25/inpaint`
**Source:** https://fal.ai/models/fal-ai/stable-audio-25/inpaint/api

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

const result = await fal.subscribe("fal-ai/stable-audio-25/inpaint", {
  input: {
        "prompt": "your value here",
        "audio_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The prompt to guide the audio generation |
| `num_inference_steps` | integer | No | `8` | The number of steps to denoise the audio for |
| `mask_end` | integer | No | `190` | The end point of the audio mask |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `seconds_total` | integer | null | No | `190` | The duration of the audio clip to generate. If not provided, it will be set to the duration of the input audio. |
| `seed` | integer | null | No |  |  |
| `guidance_scale` | integer | No | `1` | How strictly the diffusion process adheres to the prompt text (higher values make your audio closer to your prompt). |
| `audio_url` | string | **Yes** |  | The audio clip to inpaint |
| `mask_start` | integer | No | `30` | The start point of the audio mask |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The random seed used for generation |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/stable-audio-25/inpaint", {
  input: {
        "prompt": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/stable-audio-25/inpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/stable-audio-25/inpaint", {
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

- API page: https://fal.ai/models/fal-ai/stable-audio-25/inpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/stable-audio-25/inpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
