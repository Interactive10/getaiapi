---
name: fal-ai-ideogram-v3-replace-background
description: >
  Use this skill for the fal.ai Ideogram Replace Background model (fal-ai/ideogram/v3/replace-background). Replace backgrounds existing images with Ideogram V3's replace background feature. Create variations and adaptations while preserving core elements and adding new creative directions through prompt gu
---

# Ideogram Replace Background

Replace backgrounds existing images with Ideogram V3's replace background feature. Create variations and adaptations while preserving core elements and adding new creative directions through prompt guidance.

**Endpoint:** `fal-ai/ideogram/v3/replace-background`
**Source:** https://fal.ai/models/fal-ai/ideogram/v3/replace-background/api

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

const result = await fal.subscribe("fal-ai/ideogram/v3/replace-background", {
  input: {
        "prompt": "your value here",
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
| `prompt` | string | **Yes** |  | Cyber punk city with neon lights and skyscrappers |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `style` | enum: `AUTO`, `GENERAL`, `REALISTIC`, `DESIGN` | null | No |  | The style type to generate with. Cannot be used with style_codes. |
| `style_preset` | enum (62 values) | null | No |  | Style preset for generation. The chosen style preset will guide the generation. |
| `expand_prompt` | boolean | No | `true` | Determine if MagicPrompt should be used in generating the request or not. |
| `rendering_speed` | enum: `TURBO`, `BALANCED`, `QUALITY` | No | `"BALANCED"` | The rendering speed to use. |
| `style_codes` | list<string> | null | No |  | A list of 8 character hexadecimal codes representing the style of the image. Cannot be used in conjunction with style... |
| `color_palette` | ColorPalette | null | No |  | A color palette for generation, must EITHER be specified via one of the presets (name) or explicitly via hexadecimal ... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `image_url` | string | **Yes** |  | The image URL whose background needs to be replaced |
| `seed` | integer | null | No |  | Seed for the random number generator |
| `image_urls` | list<string> | null | No |  | A set of images to use as style references (maximum total size 10MB across all style references). The images should b... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> |  |
| `seed` | integer | Seed used for the random number generator |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ideogram/v3/replace-background", {
  input: {
        "prompt": "your value here",
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ideogram/v3/replace-background", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ideogram/v3/replace-background", {
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

- API page: https://fal.ai/models/fal-ai/ideogram/v3/replace-background/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ideogram/v3/replace-background
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
