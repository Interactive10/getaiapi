---
name: fal-ai-ace-step-prompt-to-audio
description: >
  Use this skill for the fal.ai ACE-Step model (fal-ai/ace-step/prompt-to-audio). Generate music from a simple prompt using ACE-Step
---

# ACE-Step

Generate music from a simple prompt using ACE-Step

**Endpoint:** `fal-ai/ace-step/prompt-to-audio`
**Source:** https://fal.ai/models/fal-ai/ace-step/prompt-to-audio/api

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

const result = await fal.subscribe("fal-ai/ace-step/prompt-to-audio", {
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
| `number_of_steps` | integer | No | `27` | Number of steps to generate the audio. |
| `duration` | float | No | `60` | The duration of the generated audio in seconds. |
| `prompt` | string | **Yes** |  | Prompt to control the style of the generated audio. This will be used to generate tags and lyrics. |
| `minimum_guidance_scale` | float | No | `3` | Minimum guidance scale for the generation after the decay. |
| `tag_guidance_scale` | float | No | `5` | Tag guidance scale for the generation. |
| `scheduler` | enum: `euler`, `heun` | No | `"euler"` | Scheduler to use for the generation process. |
| `guidance_scale` | float | No | `15` | Guidance scale for the generation. |
| `guidance_type` | enum: `cfg`, `apg`, `cfg_star` | No | `"apg"` | Type of CFG to use for the generation process. |
| `instrumental` | boolean | No | `false` | Whether to generate an instrumental version of the audio. |
| `lyric_guidance_scale` | float | No | `1.5` | Lyric guidance scale for the generation. |
| `guidance_interval` | float | No | `0.5` | Guidance interval for the generation. 0.5 means only apply guidance in the middle steps (0.25 * infer_steps to 0.75 *... |
| `guidance_interval_decay` | float | No | `0` | Guidance interval decay for the generation. Guidance scale will decay from guidance_scale to min_guidance_scale in th... |
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
const { request_id } = await fal.queue.submit("fal-ai/ace-step/prompt-to-audio", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ace-step/prompt-to-audio", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ace-step/prompt-to-audio", {
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

- API page: https://fal.ai/models/fal-ai/ace-step/prompt-to-audio/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ace-step/prompt-to-audio
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
