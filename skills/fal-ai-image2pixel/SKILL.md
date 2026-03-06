---
name: fal-ai-image2pixel
description: >
  Use this skill for the fal.ai Image2Pixel model (fal-ai/image2pixel). Turn images into pixel-perfect retro art
---

# Image2Pixel

Turn images into pixel-perfect retro art

**Endpoint:** `fal-ai/image2pixel`
**Source:** https://fal.ai/models/fal-ai/image2pixel/api

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

const result = await fal.subscribe("fal-ai/image2pixel", {
  input: {
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
| `cleanup_morph` | boolean | No | `false` | Apply morphological operations to remove noise. |
| `auto_color_detect` | boolean | No | `false` | Enable automatic detection of optimal number of colors. |
| `alpha_threshold` | integer | No | `128` | Alpha binarization threshold (0-255). |
| `snap_grid` | boolean | No | `true` | Align output to the pixel grid. |
| `fixed_palette` | list<string> | null | No |  | Optional fixed color palette as hex strings (e.g., ['#000000', '#ffffff']). |
| `scale` | integer | null | No |  | Force a specific pixel scale. If None, auto-detect. |
| `background_tolerance` | integer | No | `0` | Background tolerance (0-255). |
| `trim_borders` | boolean | No | `false` | Trim borders of the image. |
| `cleanup_jaggy` | boolean | No | `false` | Remove isolated diagonal pixels (jaggy edge cleanup). |
| `detect_method` | enum: `auto`, `runs`, `edge` | No | `"auto"` | Scale detection method to use. |
| `transparent_background` | boolean | No | `false` | Remove background of the image. This will check for contiguous color regions from the edges after correction and make... |
| `image_url` | string | **Yes** |  | The image URL to process into improved pixel art |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `downscale_method` | enum: `dominant`, `median`, `mode`, `mean`, `content-adaptive` | No | `"dominant"` | Downscaling method to produce the pixel-art output. |
| `background_mode` | enum: `edges`, `corners`, `midpoints` | No | `"corners"` | Controls where to flood-fill from when removing the background. |
| `max_colors` | integer | null | No | `32` | Maximum number of colors in the output palette. Set None to disable limit. |
| `dominant_color_threshold` | float | No | `0.05` | Dominant color threshold (0.0-1.0). |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `palette` | list<string> | The palette of the processed media. |
| `num_colors` | integer | The number of colors in the processed media. |
| `images` | list<ImageFile> | The processed pixel-art image (PNG) and the scaled image (PNG). |
| `pixel_scale` | integer | The detected pixel scale of the input. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/image2pixel", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image2pixel", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image2pixel", {
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

- API page: https://fal.ai/models/fal-ai/image2pixel/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image2pixel
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
