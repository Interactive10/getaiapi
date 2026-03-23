---
name: fal-ai-diffrhythm
description: >
  Use this skill for the fal.ai DiffRhythm: Lyrics to Song model (fal-ai/diffrhythm). DiffRhythm is a blazing fast model for transforming lyrics into full songs. It boasts the capability to generate full songs in less than 30 seconds.
---

# DiffRhythm: Lyrics to Song

DiffRhythm is a blazing fast model for transforming lyrics into full songs. It boasts the capability to generate full songs in less than 30 seconds.

**Endpoint:** `fal-ai/diffrhythm`
**Source:** https://fal.ai/models/fal-ai/diffrhythm/api

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

const result = await fal.subscribe("fal-ai/diffrhythm", {
  input: {
        "lyrics": "your value here"
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
| `lyrics` | string | **Yes** |  | The prompt to generate the song from. Must have two sections. Sections start with either [chorus] or a [verse]. |
| `reference_audio_url` | string | No |  | The URL of the reference audio to use for the music generation. |
| `cfg_strength` | float | No | `4` | The CFG strength to use for the music generation. |
| `music_duration` | enum: `95s`, `285s` | No | `"95s"` | The duration of the music to generate. |
| `scheduler` | enum: `euler`, `midpoint`, `rk4`, `implicit_adams` | No | `"euler"` | The scheduler to use for the music generation. |
| `num_inference_steps` | integer | No | `32` | The number of inference steps to use for the music generation. |
| `style_prompt` | string | No |  | The style prompt to use for the music generation. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `audio` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/diffrhythm", {
  input: {
        "lyrics": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/diffrhythm", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/diffrhythm", {
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

- API page: https://fal.ai/models/fal-ai/diffrhythm/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/diffrhythm
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
