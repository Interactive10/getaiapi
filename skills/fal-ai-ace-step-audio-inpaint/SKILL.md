---
name: fal-ai-ace-step-audio-inpaint
description: >
  Use this skill for the fal.ai ACE-Step model (fal-ai/ace-step/audio-inpaint). Modify a portion of provided audio with lyrics and/or style using ACE-Step
---

# ACE-Step

Modify a portion of provided audio with lyrics and/or style using ACE-Step

**Endpoint:** `fal-ai/ace-step/audio-inpaint`
**Source:** https://fal.ai/models/fal-ai/ace-step/audio-inpaint/api

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

const result = await fal.subscribe("fal-ai/ace-step/audio-inpaint", {
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
| `start_time` | float | No | `0` | start time in seconds for the inpainting process. |
| `tags` | string | **Yes** |  | Comma-separated list of genre tags to control the style of the generated audio. |
| `minimum_guidance_scale` | float | No | `3` | Minimum guidance scale for the generation after the decay. |
| `lyrics` | string | No | `""` | Lyrics to be sung in the audio. If not provided or if [inst] or [instrumental] is the content of this field, no lyric... |
| `end_time_relative_to` | enum: `start`, `end` | No | `"start"` | Whether the end time is relative to the start or end of the audio. |
| `tag_guidance_scale` | float | No | `5` | Tag guidance scale for the generation. |
| `scheduler` | enum: `euler`, `heun` | No | `"euler"` | Scheduler to use for the generation process. |
| `end_time` | float | No | `30` | end time in seconds for the inpainting process. |
| `guidance_type` | enum: `cfg`, `apg`, `cfg_star` | No | `"apg"` | Type of CFG to use for the generation process. |
| `guidance_scale` | float | No | `15` | Guidance scale for the generation. |
| `lyric_guidance_scale` | float | No | `1.5` | Lyric guidance scale for the generation. |
| `guidance_interval` | float | No | `0.5` | Guidance interval for the generation. 0.5 means only apply guidance in the middle steps (0.25 * infer_steps to 0.75 *... |
| `variance` | float | No | `0.5` | Variance for the inpainting process. Higher values can lead to more diverse results. |
| `guidance_interval_decay` | float | No | `0` | Guidance interval decay for the generation. Guidance scale will decay from guidance_scale to min_guidance_scale in th... |
| `start_time_relative_to` | enum: `start`, `end` | No | `"start"` | Whether the start time is relative to the start or end of the audio. |
| `audio_url` | string | **Yes** |  | URL of the audio file to be inpainted. |
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
const { request_id } = await fal.queue.submit("fal-ai/ace-step/audio-inpaint", {
  input: {
        "tags": "your value here",
        "audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ace-step/audio-inpaint", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ace-step/audio-inpaint", {
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

- API page: https://fal.ai/models/fal-ai/ace-step/audio-inpaint/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ace-step/audio-inpaint
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
