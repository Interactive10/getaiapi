---
name: fal-ai-bytedance-seedance-v1-pro-text-to-video
description: >
  Use this skill for the fal.ai Seedance 1.0 Pro model (fal-ai/bytedance/seedance/v1/pro/text-to-video). Seedance 1.0 Pro, a high quality video generation model developed by Bytedance.
---

# Seedance 1.0 Pro

Seedance 1.0 Pro, a high quality video generation model developed by Bytedance.

**Endpoint:** `fal-ai/bytedance/seedance/v1/pro/text-to-video`
**Source:** https://fal.ai/models/fal-ai/bytedance/seedance/v1/pro/text-to-video/api

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

const result = await fal.subscribe("fal-ai/bytedance/seedance/v1/pro/text-to-video", {
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
| `prompt` | string | **Yes** |  | The text prompt used to generate the video |
| `aspect_ratio` | enum: `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16` | No | `"16:9"` | The aspect ratio of the generated video |
| `duration` | enum (11 values) | No | `"5"` | Duration of the video in seconds |
| `resolution` | enum: `480p`, `720p`, `1080p` | No | `"1080p"` | Video resolution - 480p for faster generation, 720p for balance, 1080p for higher quality |
| `enable_safety_checker` | boolean | No | `true` | If set to true, the safety checker will be enabled. |
| `camera_fixed` | boolean | No | `false` | Whether to fix the camera position |
| `seed` | integer | null | No |  | Random seed to control video generation. Use -1 for random. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | Seed used for generation |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/bytedance/seedance/v1/pro/text-to-video", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/bytedance/seedance/v1/pro/text-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/bytedance/seedance/v1/pro/text-to-video", {
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

- API page: https://fal.ai/models/fal-ai/bytedance/seedance/v1/pro/text-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/seedance/v1/pro/text-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
