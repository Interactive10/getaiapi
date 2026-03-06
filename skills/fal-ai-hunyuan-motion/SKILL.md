---
name: fal-ai-hunyuan-motion
description: >
  Use this skill for the fal.ai Hunyuan Motion [1B] model (fal-ai/hunyuan-motion). Generate 3D human motions via text-to-generation interface of Hunyuan Motion!
---

# Hunyuan Motion [1B]

Generate 3D human motions via text-to-generation interface of Hunyuan Motion!

**Endpoint:** `fal-ai/hunyuan-motion`
**Source:** https://fal.ai/models/fal-ai/hunyuan-motion/api

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

const result = await fal.subscribe("fal-ai/hunyuan-motion", {
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
| `prompt` | string | **Yes** |  | Text prompt describing the motion to generate. |
| `duration` | float | No | `5` | Motion duration in seconds (0.5-12.0). |
| `guidance_scale` | float | No | `5` | Classifier-free guidance scale. Higher = more faithful to prompt. |
| `seed` | integer | null | No |  | Random seed for reproducible generation. |
| `output_format` | enum: `fbx`, `dict` | No | `"fbx"` | Output format: 'fbx' for animation files, 'dict' for raw JSON. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `fbx_file` | File | null | Generated FBX animation file. |
| `motion_json` | File | null | Generated motion data as JSON. |
| `seed` | integer | Seed used for generation. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/hunyuan-motion", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/hunyuan-motion", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/hunyuan-motion", {
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

- API page: https://fal.ai/models/fal-ai/hunyuan-motion/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hunyuan-motion
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
