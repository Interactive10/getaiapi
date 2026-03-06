---
name: fal-ai-video-prompt-generator
description: >
  Use this skill for the fal.ai Video Prompt Generator model (fal-ai/video-prompt-generator). Generate video prompts using a variety of techniques including camera direction, style, pacing, special effects and more.
---

# Video Prompt Generator

Generate video prompts using a variety of techniques including camera direction, style, pacing, special effects and more.

**Endpoint:** `fal-ai/video-prompt-generator`
**Source:** https://fal.ai/models/fal-ai/video-prompt-generator/api

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

const result = await fal.subscribe("fal-ai/video-prompt-generator", {
  input: {
        "input_concept": "your value here"
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
| `custom_elements` | string | No | `""` | Custom technical elements (optional) |
| `style` | enum (10 values) | No | `"Simple"` | Style of the video prompt |
| `camera_direction` | enum (18 values) | No | `"None"` | Camera direction |
| `pacing` | enum (20 values) | No | `"None"` | Pacing rhythm |
| `special_effects` | enum (21 values) | No | `"None"` | Special effects approach |
| `image_url` | string | No |  | URL of an image to analyze and incorporate into the video prompt (optional) |
| `model` | enum (12 values) | No | `"google/gemini-2.0-flash-001"` | Model to use |
| `camera_style` | enum (21 values) | No | `"None"` | Camera movement style |
| `input_concept` | string | **Yes** |  | Core concept or thematic input for the video prompt |
| `prompt_length` | enum: `Short`, `Medium`, `Long` | No | `"Medium"` | Length of the prompt |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | Generated video prompt |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/video-prompt-generator", {
  input: {
        "input_concept": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/video-prompt-generator", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/video-prompt-generator", {
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

- API page: https://fal.ai/models/fal-ai/video-prompt-generator/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/video-prompt-generator
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
