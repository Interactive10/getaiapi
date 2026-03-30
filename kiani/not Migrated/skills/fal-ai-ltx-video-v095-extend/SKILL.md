---
name: fal-ai-ltx-video-v095-extend
description: >
  Use this skill for the fal.ai LTX Video-0.9.5 model (fal-ai/ltx-video-v095/extend). Generate videos from prompts and videos using LTX Video-0.9.5
---

# LTX Video-0.9.5

Generate videos from prompts and videos using LTX Video-0.9.5

**Endpoint:** `fal-ai/ltx-video-v095/extend`
**Source:** https://fal.ai/models/fal-ai/ltx-video-v095/extend/api

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

const result = await fal.subscribe("fal-ai/ltx-video-v095/extend", {
  input: {
        "prompt": "your value here",
        "video": "..."
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
| `prompt` | string | **Yes** |  | Text prompt to guide generation |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video (480p or 720p). |
| `aspect_ratio` | enum: `9:16`, `16:9` | No | `"16:9"` | Aspect ratio of the generated video (16:9 or 9:16). |
| `expand_prompt` | boolean | No | `true` | Whether to expand the prompt using the model's own capabilities. |
| `num_inference_steps` | integer | No | `40` | Number of inference steps |
| `seed` | integer | null | No |  | Random seed for generation |
| `video` | VideoConditioningInput | **Yes** |  |  |
| `negative_prompt` | string | No | `"worst quality, inconsistent motion, blurry, jittery, distorted"` | Negative prompt for generation |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-video-v095/extend", {
  input: {
        "prompt": "your value here",
        "video": "..."
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-video-v095/extend", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-video-v095/extend", {
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

- API page: https://fal.ai/models/fal-ai/ltx-video-v095/extend/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-video-v095/extend
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
