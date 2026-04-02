---
name: fal-ai-ace-step-audio-outpaint
description: >
  Use this skill for the fal.ai ACE-Step model (fal-ai/ace-step/audio-outpaint). Extend the beginning or end of provided audio with lyrics and/or style using ACE-Step
---

# ACE-Step

Extend the beginning or end of provided audio with lyrics and/or style using ACE-Step

**Endpoint:** `fal-ai/ace-step/audio-outpaint`
**Source:** https://fal.ai/models/fal-ai/ace-step/audio-outpaint/api

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

const result = await fal.subscribe("fal-ai/ace-step/audio-outpaint", {
  input: {
        "tags": "your value here",
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
| `number_of_steps` | integer | No | `27` | Number of steps to generate the audio. |
| `tags` | string | **Yes** |  | Comma-separated list of genre tags to control the style of the generated audio. |
| `minimum_guidance_scale` | float | No | `3` | Minimum guidance scale for the generation after the decay. |
| `extend_after_duration` | float | No | `30` | Duration in seconds to extend the audio from the end. |
| `lyrics` | string | No | `""` | Lyrics to be sung in the audio. If not provided or if [inst] or [instrumental] is the content of this field, no lyric... |
| `tag_guidance_scale` | float | No | `5` | Tag guidance scale for the generation. |
| `scheduler` | enum: `euler`, `heun` | No | `"euler"` | Scheduler to use for the generation process. |
| `extend_before_duration` | float | No | `0` | Duration in seconds to extend the audio from the start. |
| `guidance_type` | enum: `cfg`, `apg`, `cfg_star` | No | `"apg"` | Type of CFG to use for the generation process. |
| `guidance_scale` | float | No | `15` | Guidance scale for the generation. |
| `lyric_guidance_scale` | float | No | `1.5` | Lyric guidance scale for the generation. |
| `guidance_interval` | float | No | `0.5` | Guidance interval for the generation. 0.5 means only apply guidance in the middle steps (0.25 * infer_steps to 0.75 *... |
| `guidance_interval_decay` | float | No | `0` | Guidance interval decay for the generation. Guidance scale will decay from guidance_scale to min_guidance_scale in th... |
| `audio_url` | string | **Yes** |  | URL of the audio file to be outpainted. |
| `seed` | integer | No |  | Random seed for reproducibility. If not provided, a random seed will be used. |
| `granularity_scale` | integer | No | `10` | Granularity scale for the generation process. Higher values can reduce artifacts. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `tags` | string | The genre tags used in the generation process. |
| `lyrics` | string | The lyrics used in the generation process. |
| `seed` | integer | The random seed used for the generation process. |
| `audio` | File | The generated audio file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ace-step/audio-outpaint", {
  input: {
        "tags": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ace-step/audio-outpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ace-step/audio-outpaint", {
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

- API page: https://fal.ai/models/fal-ai/ace-step/audio-outpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ace-step/audio-outpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
