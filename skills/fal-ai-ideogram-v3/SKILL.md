---
name: fal-ai-ideogram-v3
description: >
  Use this skill for the fal.ai Ideogram Text to Image model (fal-ai/ideogram/v3). Generate high-quality images, posters, and logos with Ideogram V3. Features exceptional typography handling and realistic outputs optimized for commercial and creative use.
---

# Ideogram Text to Image

Generate high-quality images, posters, and logos with Ideogram V3. Features exceptional typography handling and realistic outputs optimized for commercial and creative use.

**Endpoint:** `fal-ai/ideogram/v3`
**Source:** https://fal.ai/models/fal-ai/ideogram/v3/api

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

const result = await fal.subscribe("fal-ai/ideogram/v3", {
  input: {
        "prompt": "your value here"
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
| `prompt` | string | **Yes** |  |  |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No | `"square_hd"` | The resolution of the generated image |
| `style` | enum: `AUTO`, `GENERAL`, `REALISTIC`, `DESIGN` | null | No |  | The style type to generate with. Cannot be used with style_codes. |
| `style_preset` | enum (62 values) | null | No |  | Style preset for generation. The chosen style preset will guide the generation. |
| `expand_prompt` | boolean | No | `true` | Determine if MagicPrompt should be used in generating the request or not. |
| `rendering_speed` | enum: `TURBO`, `BALANCED`, `QUALITY` | No | `"BALANCED"` | The rendering speed to use. |
| `style_codes` | list<string> | null | No |  | A list of 8 character hexadecimal codes representing the style of the image. Cannot be used in conjunction with style... |
| `color_palette` | ColorPalette | null | No |  | A color palette for generation, must EITHER be specified via one of the presets (name) or explicitly via hexadecimal ... |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `seed` | integer | null | No |  | Seed for the random number generator |
| `image_urls` | list<string> | null | No |  | A set of images to use as style references (maximum total size 10MB across all style references). The images should b... |
| `negative_prompt` | string | No | `""` | Description of what to exclude from an image. Descriptions in the prompt take precedence to descriptions in the negat... |

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
const { request_id } = await fal.queue.submit("fal-ai/ideogram/v3", {
  input: {
        "prompt": "your value here"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ideogram/v3", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ideogram/v3", {
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

- API page: https://fal.ai/models/fal-ai/ideogram/v3/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ideogram/v3
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
