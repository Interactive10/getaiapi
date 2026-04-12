---
name: fal-ai-amt-interpolation-frame-interpolation
description: >
  Use this skill for the fal.ai AMT Frame Interpolation model (fal-ai/amt-interpolation/frame-interpolation). Interpolate between image frames
---

# AMT Frame Interpolation

Interpolate between image frames

**Endpoint:** `fal-ai/amt-interpolation/frame-interpolation`
**Source:** https://fal.ai/models/fal-ai/amt-interpolation/frame-interpolation/api

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

const result = await fal.subscribe("fal-ai/amt-interpolation/frame-interpolation", {
  input: {
        "frames": []
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
| `frames` | list<Frame> | **Yes** |  | Frames to interpolate |
| `recursive_interpolation_passes` | integer | No | `4` | Number of recursive interpolation passes |
| `output_fps` | integer | No | `24` | Output frames per second |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/amt-interpolation/frame-interpolation", {
  input: {
        "frames": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/amt-interpolation/frame-interpolation", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/amt-interpolation/frame-interpolation", {
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

- API page: https://fal.ai/models/fal-ai/amt-interpolation/frame-interpolation/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/amt-interpolation/frame-interpolation
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
