---
name: fal-ai-workflow-utilities-auto-subtitle
description: >
  Use this skill for the fal.ai Workflow Utilities model (fal-ai/workflow-utilities/auto-subtitle). Add automatic subtitles to videos
---

# Workflow Utilities

Add automatic subtitles to videos

**Endpoint:** `fal-ai/workflow-utilities/auto-subtitle`
**Source:** https://fal.ai/models/fal-ai/workflow-utilities/auto-subtitle/api

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

const result = await fal.subscribe("fal-ai/workflow-utilities/auto-subtitle", {
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
| `video_url` | string | **Yes** |  | URL of the video file to add automatic subtitles to |
| `font_weight` | enum: `normal`, `bold`, `black` | No | `"bold"` | Font weight (TikTok style typically uses bold or black) |
| `stroke_width` | integer | No | `3` | Text stroke/outline width in pixels (0 for no stroke) |
| `font_color` | enum (13 values) | No | `"white"` | Subtitle text color for non-active words |
| `font_size` | integer | No | `100` | Font size for subtitles (TikTok style uses larger text) |
| `highlight_color` | enum (13 values) | No | `"purple"` | Color for the currently speaking word (karaoke-style highlight) |
| `y_offset` | integer | No | `75` | Vertical offset in pixels (positive = move down, negative = move up) |
| `background_opacity` | float | No | `0` | Background opacity (0.0 = fully transparent, 1.0 = fully opaque) |
| `stroke_color` | enum (13 values) | No | `"black"` | Text stroke/outline color |
| `language` | string | No | `"en"` | Language code for transcription (e.g., 'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ja', 'zh', 'ko') or 3-letter ISO co... |
| `enable_animation` | boolean | No | `true` | Enable animation effects for subtitles (bounce style entrance) |
| `font_name` | string | No | `"Montserrat"` | Any Google Font name from fonts.google.com (e.g., 'Montserrat', 'Poppins', 'BBH Sans Hegarty') |
| `position` | enum: `top`, `center`, `bottom` | No | `"bottom"` | Vertical position of subtitles |
| `words_per_subtitle` | integer | No | `3` | Maximum number of words per subtitle segment. Use 1 for single-word display, 2-3 for short phrases, or 8-12 for full ... |
| `background_color` | enum (15 values) | No | `"none"` | Background color behind text ('none' or 'transparent' for no background) |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `transcription` | string | Full transcription text |
| `subtitle_count` | integer | Number of subtitle segments generated |
| `transcription_metadata` | object | null | Additional transcription metadata from ElevenLabs (language, segments, etc.) |
| `words` | list<object> | null | Word-level timing information from transcription service |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/workflow-utilities/auto-subtitle", {
  input: {
        "video_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/workflow-utilities/auto-subtitle", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/workflow-utilities/auto-subtitle", {
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

- API page: https://fal.ai/models/fal-ai/workflow-utilities/auto-subtitle/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/workflow-utilities/auto-subtitle
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
