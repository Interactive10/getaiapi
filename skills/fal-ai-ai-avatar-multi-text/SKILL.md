---
name: fal-ai-ai-avatar-multi-text
description: >
  Use this skill for the fal.ai Ai Avatar model (fal-ai/ai-avatar/multi-text). MultiTalk model generates a multi-person conversation video from an image and text inputs. Converts text to speech for each person, generating a realistic conversation scene.
---

# Ai Avatar

MultiTalk model generates a multi-person conversation video from an image and text inputs. Converts text to speech for each person, generating a realistic conversation scene.

**Endpoint:** `fal-ai/ai-avatar/multi-text`
**Source:** https://fal.ai/models/fal-ai/ai-avatar/multi-text/api

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

const result = await fal.subscribe("fal-ai/ai-avatar/multi-text", {
  input: {
        "prompt": "your value here",
        "second_text_input": "your value here",
        "first_text_input": "your value here",
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
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `second_text_input` | string | **Yes** |  | The text input to guide video generation. |
| `acceleration` | enum: `none`, `regular`, `high` | No | `"regular"` | The acceleration level to use for generation. |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of the video to generate. Must be either 480p or 720p. |
| `first_text_input` | string | **Yes** |  | The text input to guide video generation. |
| `image_url` | string | **Yes** |  | URL of the input image. If the input image does not match the chosen aspect ratio, it is resized and center cropped. |
| `voice2` | enum (20 values) | No | `"Roger"` | The second person's voice to use for speech generation |
| `voice1` | enum (20 values) | No | `"Sarah"` | The first person's voice to use for speech generation |
| `seed` | integer | No | `81` | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_frames` | integer | No | `191` | Number of frames to generate. Must be between 81 to 129 (inclusive). If the number of frames is greater than 81, the ... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File | The generated video file. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ai-avatar/multi-text", {
  input: {
        "prompt": "your value here",
        "second_text_input": "your value here",
        "first_text_input": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ai-avatar/multi-text", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ai-avatar/multi-text", {
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

- API page: https://fal.ai/models/fal-ai/ai-avatar/multi-text/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ai-avatar/multi-text
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
