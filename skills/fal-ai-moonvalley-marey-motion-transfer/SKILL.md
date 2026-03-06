---
name: fal-ai-moonvalley-marey-motion-transfer
description: >
  Use this skill for the fal.ai Marey Realism V1.5 model (moonvalley/marey/motion-transfer). Pull motion from a reference video and apply it to new subjects or scenes.
---

# Marey Realism V1.5

Pull motion from a reference video and apply it to new subjects or scenes.

**Endpoint:** `moonvalley/marey/motion-transfer`
**Source:** https://fal.ai/models/moonvalley/marey/motion-transfer/api

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

const result = await fal.subscribe("moonvalley/marey/motion-transfer", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | The prompt to generate a video from |
| `video_url` | string | **Yes** |  | The URL of the video to use as the control video. |
| `seed` | integer | null | No | `-1` | Seed for random number generation. Use -1 for random seed each run. |
| `reference_image_url` | string | null | No |  | Optional reference image URL to use for pose control or as a starting frame |
| `negative_prompt` | string | null | No | `"<synthetic> <scene cut> low-poly, flat shader, bad rigging, stiff animation, uncanny eyes, low-quality textures, looping glitch, cheap effect, overbloom, bloom spam, default lighting, game asset, stiff face, ugly specular, AI artifacts"` | Negative prompt used to guide the model away from undesirable features. |
| `first_frame_image_url` | string | null | No | `"https://video-editor-files-prod.s3.us-east-2.amazonaws.com/users/1e4d46df-0702-4491-95ce-763592f33f34/uploaded-images/9b9dce1c-abd0-46c0-bac9-9454f8893b06/original"` | Optional first frame image URL to use as the first frame of the generated video |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("moonvalley/marey/motion-transfer", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("moonvalley/marey/motion-transfer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("moonvalley/marey/motion-transfer", {
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

- API page: https://fal.ai/models/moonvalley/marey/motion-transfer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=moonvalley/marey/motion-transfer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
