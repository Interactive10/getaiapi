---
name: fal-ai-auto-caption
description: >
  Use this skill for the fal.ai Auto-Captioner model (fal-ai/auto-caption). Automatically generates text captions for your videos from the audio as per text colour/font specifications
---

# Auto-Captioner

Automatically generates text captions for your videos from the audio as per text colour/font specifications

**Endpoint:** `fal-ai/auto-caption`
**Source:** https://fal.ai/models/fal-ai/auto-caption/api

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

const result = await fal.subscribe("fal-ai/auto-caption", {
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
| `txt_font` | string | No | `"Standard"` | Font for generated captions. Choose one in 'Arial','Standard','Garamond', 'Times New Roman','Georgia', or pass a url ... |
| `video_url` | string | **Yes** |  | URL to the .mp4 video with audio. Only videos of size <100MB are allowed. |
| `top_align` | string | float | No | `"center"` | Top-to-bottom alignment of the text. Can be a string ('top', 'center', 'bottom') or a float (0.0-1.0) |
| `txt_color` | string | No | `"white"` | Colour of the text. Can be a RGB tuple, a color name, or an hexadecimal notation. |
| `stroke_width` | integer | No | `1` | Width of the text strokes in pixels |
| `refresh_interval` | float | No | `1.5` | Number of seconds the captions should stay on screen. A higher number will also result in more text being displayed a... |
| `font_size` | integer | No | `24` | Size of text in generated captions. |
| `left_align` | string | float | No | `"center"` | Left-to-right alignment of the text. Can be a string ('left', 'center', 'right') or a float (0.0-1.0) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `video_url` | string | URL to the caption .mp4 video. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/auto-caption", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/auto-caption", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/auto-caption", {
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

- API page: https://fal.ai/models/fal-ai/auto-caption/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/auto-caption
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
