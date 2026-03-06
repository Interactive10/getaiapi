---
name: fal-ai-magi-distilled
description: >
  Use this skill for the fal.ai MAGI-1 (Distilled) model (fal-ai/magi-distilled). MAGI-1 distilled is a faster video generation model with exceptional understanding of physical interactions and cinematic prompts
---

# MAGI-1 (Distilled)

MAGI-1 distilled is a faster video generation model with exceptional understanding of physical interactions and cinematic prompts

**Endpoint:** `fal-ai/magi-distilled`
**Source:** https://fal.ai/models/fal-ai/magi-distilled/api

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

const result = await fal.subscribe("fal-ai/magi-distilled", {
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video (480p or 720p). 480p is 0.5 billing units, and 720p is 1 billing unit. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', the aspect ratio will be determined automatically based on the input ... |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_frames` | integer | null | No | `96` | Number of frames to generate. Must be between 96 and 192 (inclusive). Each additional 24 frames beyond 96 incurs an a... |
| `num_inference_steps` | enum: `4`, `8`, `16`, `32` | No | `16` | Number of inference steps for sampling. Higher values give better quality but take longer. |

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
const { request_id } = await fal.queue.submit("fal-ai/magi-distilled", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/magi-distilled", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/magi-distilled", {
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

- API page: https://fal.ai/models/fal-ai/magi-distilled/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/magi-distilled
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
