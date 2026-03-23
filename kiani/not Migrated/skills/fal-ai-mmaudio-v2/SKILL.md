---
name: fal-ai-mmaudio-v2
description: >
  Use this skill for the fal.ai MMAudio V2 model (fal-ai/mmaudio-v2). MMAudio generates synchronized audio given video and/or text inputs. It can be combined with video models to get videos with audio.
---

# MMAudio V2

MMAudio generates synchronized audio given video and/or text inputs. It can be combined with video models to get videos with audio.

**Endpoint:** `fal-ai/mmaudio-v2`
**Source:** https://fal.ai/models/fal-ai/mmaudio-v2/api

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

const result = await fal.subscribe("fal-ai/mmaudio-v2", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
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
| `prompt` | string | **Yes** |  | The prompt to generate the audio for. |
| `video_url` | string | **Yes** |  | The URL of the video to generate the audio for. |
| `num_steps` | integer | No | `25` | The number of steps to generate the audio for. |
| `duration` | float | No | `8` | The duration of the audio to generate. |
| `cfg_strength` | float | No | `4.5` | The strength of Classifier Free Guidance. |
| `seed` | integer | No |  | The seed for the random number generator |
| `mask_away_clip` | boolean | No | `false` | Whether to mask away the clip. |
| `negative_prompt` | string | No | `""` | The negative prompt to generate the audio for. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | The generated video with the lip sync. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/mmaudio-v2", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/mmaudio-v2", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/mmaudio-v2", {
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

- API page: https://fal.ai/models/fal-ai/mmaudio-v2/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/mmaudio-v2
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
