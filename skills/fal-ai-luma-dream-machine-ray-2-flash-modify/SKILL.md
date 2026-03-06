---
name: fal-ai-luma-dream-machine-ray-2-flash-modify
description: >
  Use this skill for the fal.ai Luma Ray 2 Flash Modify model (fal-ai/luma-dream-machine/ray-2-flash/modify). Ray2 Flash Modify is a video generative model capable of restyling or retexturing the entire shot, from turning live-action into CG or stylized animation, to changing wardrobe, props, or the overall a
---

# Luma Ray 2 Flash Modify

Ray2 Flash Modify is a video generative model capable of restyling or retexturing the entire shot, from turning live-action into CG or stylized animation, to changing wardrobe, props, or the overall aesthetic and swap environments or time periods, giving you control over background, location, or even weather.

**Endpoint:** `fal-ai/luma-dream-machine/ray-2-flash/modify`
**Source:** https://fal.ai/models/fal-ai/luma-dream-machine/ray-2-flash/modify/api

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

const result = await fal.subscribe("fal-ai/luma-dream-machine/ray-2-flash/modify", {
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
| `prompt` | string | null | No |  | Instruction for modifying the video |
| `video_url` | string | **Yes** |  | URL of the input video to modify |
| `mode` | enum (9 values) | No | `"flex_1"` | Amount of modification to apply to the video, adhere_1 is the least amount of modification, reimagine_3 is the most |
| `image_url` | string | null | No |  | Optional URL of the first frame image for modification |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/luma-dream-machine/ray-2-flash/modify", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/luma-dream-machine/ray-2-flash/modify", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/luma-dream-machine/ray-2-flash/modify", {
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

- API page: https://fal.ai/models/fal-ai/luma-dream-machine/ray-2-flash/modify/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/luma-dream-machine/ray-2-flash/modify
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
