---
name: fal-ai-sadtalker
description: >
  Use this skill for the fal.ai Sad Talker model (fal-ai/sadtalker). Learning Realistic 3D Motion Coefficients for Stylized Audio-Driven Single Image Talking Face Animation
---

# Sad Talker

Learning Realistic 3D Motion Coefficients for Stylized Audio-Driven Single Image Talking Face Animation

**Endpoint:** `fal-ai/sadtalker`
**Source:** https://fal.ai/models/fal-ai/sadtalker/api

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

const result = await fal.subscribe("fal-ai/sadtalker", {
  input: {
        "source_image_url": "https://example.com/input.png",
        "driven_audio_url": "https://example.com/input.png"
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
| `pose_style` | integer | No | `0` | The style of the pose |
| `source_image_url` | string | **Yes** |  | URL of the source image |
| `driven_audio_url` | string | **Yes** |  | URL of the driven audio |
| `face_enhancer` | enum: `gfpgan` | No |  | The type of face enhancer to use |
| `expression_scale` | float | No | `1` | The scale of the expression |
| `face_model_resolution` | enum: `256`, `512` | No | `"256"` | The resolution of the face model |
| `still_mode` | boolean | No | `false` | Whether to use still mode. Fewer head motion, works with preprocess `full`. |
| `preprocess` | enum: `crop`, `extcrop`, `resize`, `full`, `extfull` | No | `"crop"` | The type of preprocessing to use |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File | URL of the generated video |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/sadtalker", {
  input: {
        "source_image_url": "https://example.com/input.png",
        "driven_audio_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/sadtalker", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/sadtalker", {
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

- API page: https://fal.ai/models/fal-ai/sadtalker/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sadtalker
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
