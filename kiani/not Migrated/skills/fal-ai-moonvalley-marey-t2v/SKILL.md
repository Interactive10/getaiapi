---
name: fal-ai-moonvalley-marey-t2v
description: >
  Use this skill for the fal.ai Marey Realism V1.5 model (moonvalley/marey/t2v). Generate a video from a text prompt with Marey, a generative video model trained exclusively on fully licensed data.
---

# Marey Realism V1.5

Generate a video from a text prompt with Marey, a generative video model trained exclusively on fully licensed data.

**Endpoint:** `moonvalley/marey/t2v`
**Source:** https://fal.ai/models/moonvalley/marey/t2v/api

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

const result = await fal.subscribe("moonvalley/marey/t2v", {
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
| `prompt` | string | **Yes** |  | The prompt to generate a video from |
| `duration` | enum: `5s`, `10s` | No | `"5s"` | The duration of the generated video. |
| `dimensions` | enum: `1920x1080`, `1152x1152`, `1536x1152`, `1152x1536` | No | `"1920x1080"` | The dimensions of the generated video in width x height format. |
| `guidance_scale` | float | null | No |  | Controls how strongly the generation is guided by the prompt (0-20). Higher values follow the prompt more closely. |
| `seed` | integer | null | No | `-1` | Seed for random number generation. Use -1 for random seed each run. |
| `negative_prompt` | string | null | No | `"<synthetic> <scene cut> low-poly, flat shader, bad rigging, stiff animation, uncanny eyes, low-quality textures, looping glitch, cheap effect, overbloom, bloom spam, default lighting, game asset, stiff face, ugly specular, AI artifacts"` | Negative prompt used to guide the model away from undesirable features. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("moonvalley/marey/t2v", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("moonvalley/marey/t2v", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("moonvalley/marey/t2v", {
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

- API page: https://fal.ai/models/moonvalley/marey/t2v/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=moonvalley/marey/t2v
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
