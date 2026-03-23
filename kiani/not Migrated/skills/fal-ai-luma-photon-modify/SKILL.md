---
name: fal-ai-luma-photon-modify
description: >
  Use this skill for the fal.ai Luma Photon model (fal-ai/luma-photon/modify). Edit images from your prompts using Luma Photon. Photon is the most creative, personalizable, and intelligent visual models for creatives, bringing a step-function change in the cost of high-quality i
---

# Luma Photon

Edit images from your prompts using Luma Photon. Photon is the most creative, personalizable, and intelligent visual models for creatives, bringing a step-function change in the cost of high-quality image generation.

**Endpoint:** `fal-ai/luma-photon/modify`
**Source:** https://fal.ai/models/fal-ai/luma-photon/modify/api

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

const result = await fal.subscribe("fal-ai/luma-photon/modify", {
  input: {
        "strength": 1.0,
        "aspect_ratio": "1:1",
        "image_url": "https://example.com/input.png"
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
| `strength` | float | **Yes** |  | The strength of the initial image. Higher strength values are corresponding to more influence of the initial image on... |
| `aspect_ratio` | enum (7 values) | **Yes** |  | The aspect ratio of the reframed image |
| `prompt` | string | null | No |  | Instruction for modifying the image |
| `image_url` | string | **Yes** |  | URL of the input image to reframe |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | The generated image |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/luma-photon/modify", {
  input: {
        "strength": 1.0,
        "aspect_ratio": "1:1",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/luma-photon/modify", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/luma-photon/modify", {
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

- API page: https://fal.ai/models/fal-ai/luma-photon/modify/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/luma-photon/modify
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
