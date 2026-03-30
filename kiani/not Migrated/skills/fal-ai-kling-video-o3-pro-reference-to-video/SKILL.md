---
name: fal-ai-kling-video-o3-pro-reference-to-video
description: >
  Use this skill for the fal.ai Kling O3 Reference to Video [Pro] model (fal-ai/kling-video/o3/pro/reference-to-video). Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and environments.
---

# Kling O3 Reference to Video [Pro]

Transform images, elements, and text into consistent, high-quality video scenes, ensuring stable character identity, object details, and environments.

**Endpoint:** `fal-ai/kling-video/o3/pro/reference-to-video`
**Source:** https://fal.ai/models/fal-ai/kling-video/o3/pro/reference-to-video/api

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

const result = await fal.subscribe("fal-ai/kling-video/o3/pro/reference-to-video", {
  input: {
        "prompt": "your prompt here"
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
| `prompt` | string | null | No |  | Text prompt for video generation. Either prompt or multi_prompt must be provided, but not both. |
| `duration` | enum (13 values) | No | `"5"` | Video duration in seconds (3-15s). |
| `aspect_ratio` | enum: `16:9`, `9:16`, `1:1` | No | `"16:9"` | The aspect ratio of the generated video frame. |
| `generate_audio` | boolean | No | `false` | Whether to generate native audio for the video. |
| `multi_prompt` | list<KlingV3MultiPromptElement> | null | No |  | List of prompts for multi-shot video generation. |
| `shot_type` | string | No | `"customize"` | The type of multi-shot video generation. |
| `elements` | list<KlingV3ComboElementInput> | null | No |  | Elements (characters/objects) to include. Reference in prompt as @Element1, @Element2. |
| `image_urls` | list<string> | null | No |  | Reference images for style/appearance. Reference in prompt as @Image1, @Image2, etc. Maximum 4 total (elements + refe... |
| `end_image_url` | string | null | No |  | Image to use as the last frame of the video. |
| `start_image_url` | string | null | No |  | Image to use as the first frame of the video. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/o3/pro/reference-to-video", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/o3/pro/reference-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/o3/pro/reference-to-video", {
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

- API page: https://fal.ai/models/fal-ai/kling-video/o3/pro/reference-to-video/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/o3/pro/reference-to-video
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
