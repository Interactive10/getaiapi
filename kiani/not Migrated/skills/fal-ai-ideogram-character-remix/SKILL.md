---
name: fal-ai-ideogram-character-remix
description: >
  Use this skill for the fal.ai Ideogram V3 Character Remix model (fal-ai/ideogram/character/remix). Transform your consistent character into different art styles, settings, or scenarios while maintaining their distinctive appearance and identity
---

# Ideogram V3 Character Remix

Transform your consistent character into different art styles, settings, or scenarios while maintaining their distinctive appearance and identity

**Endpoint:** `fal-ai/ideogram/character/remix`
**Source:** https://fal.ai/models/fal-ai/ideogram/character/remix/api

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

const result = await fal.subscribe("fal-ai/ideogram/character/remix", {
  input: {
        "prompt": "your value here",
        "reference_image_urls": [],
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
| `prompt` | string | **Yes** |  | The prompt to remix the image with |
| `image_size` | ImageSize | enum: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | null | No | `"square_hd"` | The resolution of the generated image |
| `style` | enum: `AUTO`, `REALISTIC`, `FICTION` | No | `"AUTO"` | The style type to generate with. Cannot be used with style_codes. |
| `expand_prompt` | boolean | No | `true` | Determine if MagicPrompt should be used in generating the request or not. |
| `rendering_speed` | enum: `TURBO`, `BALANCED`, `QUALITY` | No | `"BALANCED"` | The rendering speed to use. |
| `reference_mask_urls` | list<string> | No |  | A set of masks to apply to the character references. Currently only 1 mask is supported, rest will be ignored. (maxim... |
| `reference_image_urls` | list<string> | **Yes** |  | A set of images to use as character references. Currently only 1 image is supported, rest will be ignored. (maximum t... |
| `image_urls` | list<string> | null | No |  | A set of images to use as style references (maximum total size 10MB across all style references). The images should b... |
| `negative_prompt` | string | No | `""` | Description of what to exclude from an image. Descriptions in the prompt take precedence to descriptions in the negat... |
| `num_images` | integer | No | `1` | Number of images to generate. |
| `image_url` | string | **Yes** |  | The image URL to remix |
| `style_codes` | list<string> | null | No |  | A list of 8 character hexadecimal codes representing the style of the image. Cannot be used in conjunction with style... |
| `color_palette` | ColorPalette | null | No |  | A color palette for generation, must EITHER be specified via one of the presets (name) or explicitly via hexadecimal ... |
| `strength` | float | No | `0.8` | Strength of the input image in the remix |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `seed` | integer | null | No |  | Seed for the random number generator |

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
const { request_id } = await fal.queue.submit("fal-ai/ideogram/character/remix", {
  input: {
        "prompt": "your value here",
        "reference_image_urls": [],
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ideogram/character/remix", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ideogram/character/remix", {
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

- API page: https://fal.ai/models/fal-ai/ideogram/character/remix/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ideogram/character/remix
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
