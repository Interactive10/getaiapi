---
name: fal-ai-lightx-recamera
description: >
  Use this skill for the fal.ai Lightx model (fal-ai/lightx/recamera). Use the capabilities of lightx to relight and recamera your videos.
---

# Lightx

Use the capabilities of lightx to relight and recamera your videos.

**Endpoint:** `fal-ai/lightx/recamera`
**Source:** https://fal.ai/models/fal-ai/lightx/recamera/api

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

const result = await fal.subscribe("fal-ai/lightx/recamera", {
  input: {
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
| `prompt` | string | null | No |  | Optional text prompt. If omitted, Light-X will auto-caption the video. |
| `video_url` | string | **Yes** |  | URL of the input video. |
| `trajectory` | TrajectoryParameters | null | No |  | Camera trajectory parameters (required for recamera mode). |
| `camera` | enum: `traj`, `target` | No | `"traj"` | Camera control mode. |
| `target_pose` | list<float> | null | No |  | Target camera pose [theta, phi, radius, x, y] (required when camera='target'). |
| `mode` | enum: `gradual`, `bullet`, `direct`, `dolly-zoom` | No | `"gradual"` | Camera motion mode. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `viz_video` | File | null | Optional: visualization/debug video (if produced by the pipeline). |
| `seed` | integer | The seed used for generation. |
| `input_video` | File | null | Optional: normalized/processed input video (if produced by the pipeline). |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/lightx/recamera", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/lightx/recamera", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/lightx/recamera", {
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

- API page: https://fal.ai/models/fal-ai/lightx/recamera/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/lightx/recamera
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
