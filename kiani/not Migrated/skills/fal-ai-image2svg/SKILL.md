---
name: fal-ai-image2svg
description: >
  Use this skill for the fal.ai Image2svg model (fal-ai/image2svg). Image2SVG transforms raster images into clean vector graphics, preserving visual quality while enabling scalable, customizable SVG outputs with precise control over detail levels.
---

# Image2svg

Image2SVG transforms raster images into clean vector graphics, preserving visual quality while enabling scalable, customizable SVG outputs with precise control over detail levels.

**Endpoint:** `fal-ai/image2svg`
**Source:** https://fal.ai/models/fal-ai/image2svg/api

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

const result = await fal.subscribe("fal-ai/image2svg", {
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
| `splice_threshold` | integer | No | `45` | Splice threshold for joining paths |
| `color_precision` | integer | No | `6` | Color quantization level |
| `hierarchical` | enum: `stacked`, `cutout` | No | `"stacked"` | Hierarchical mode: stacked or cutout |
| `colormode` | enum: `color`, `binary` | No | `"color"` | Choose between color or binary (black and white) output |
| `max_iterations` | integer | No | `10` | Maximum number of iterations for optimization |
| `length_threshold` | float | No | `4` | Length threshold for curves/lines |
| `image_url` | string | **Yes** |  | The image to convert to SVG |
| `mode` | enum: `spline`, `polygon` | No | `"spline"` | Mode: spline (curved) or polygon (straight lines) |
| `path_precision` | integer | No | `3` | Decimal precision for path coordinates |
| `corner_threshold` | integer | No | `60` | Corner detection threshold in degrees |
| `filter_speckle` | integer | No | `4` | Filter out small speckles and noise |
| `layer_difference` | integer | No | `16` | Layer difference threshold for hierarchical mode |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<File> | The converted SVG file |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/image2svg", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/image2svg", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/image2svg", {
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

- API page: https://fal.ai/models/fal-ai/image2svg/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/image2svg
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
