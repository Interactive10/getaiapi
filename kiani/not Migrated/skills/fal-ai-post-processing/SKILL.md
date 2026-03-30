---
name: fal-ai-post-processing
description: >
  Use this skill for the fal.ai Post Processing model (fal-ai/post-processing). Post Processing is an endpoint that can enhance images using a variety of techniques including grain, blur, sharpen, and more.
---

# Post Processing

Post Processing is an endpoint that can enhance images using a variety of techniques including grain, blur, sharpen, and more.

**Endpoint:** `fal-ai/post-processing`
**Source:** https://fal.ai/models/fal-ai/post-processing/api

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

const result = await fal.subscribe("fal-ai/post-processing", {
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
| `blue_shift` | integer | No | `0` | Blue channel shift amount |
| `enable_parabolize` | boolean | No | `false` | Enable parabolize effect |
| `green_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Green channel shift direction |
| `enable_glow` | boolean | No | `false` | Enable glow effect |
| `dodge_burn_mode` | enum (8 values) | No | `"dodge"` | Dodge and burn mode |
| `glow_intensity` | float | No | `1` | Glow intensity |
| `blur_sigma` | float | No | `1` | Sigma for Gaussian blur |
| `desaturate_method` | enum: `luminance (Rec.709)`, `luminance (Rec.601)`, `average`, `lightness` | No | `"luminance (Rec.709)"` | Desaturation method |
| `enable_blur` | boolean | No | `false` | Enable blur effect |
| `blur_radius` | integer | No | `3` | Blur radius |
| `cas_amount` | float | No | `0.8` | CAS sharpening amount |
| `dodge_burn_intensity` | float | No | `0.5` | Dodge and burn intensity |
| `tint_mode` | enum (20 values) | No | `"sepia"` | Tint color mode |
| `gamma` | float | No | `1` | Gamma adjustment |
| `dissolve_image_url` | string | No | `""` | URL of second image for dissolve |
| `enable_vignette` | boolean | No | `false` | Enable vignette effect |
| `blur_type` | enum: `gaussian`, `kuwahara` | No | `"gaussian"` | Type of blur to apply |
| `red_shift` | integer | No | `0` | Red channel shift amount |
| `grain_style` | enum: `modern`, `analog`, `kodak`, `fuji`, `cinematic`, `newspaper` | No | `"modern"` | Style of film grain to apply |
| `grain_intensity` | float | No | `0.4` | Film grain intensity (when enabled) |
| `vertex_y` | float | No | `0.5` | Vertex Y position |
| `smart_sharpen_strength` | float | No | `5` | Smart sharpen strength |
| `red_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Red channel shift direction |
| `image_url` | string | **Yes** |  | URL of image to process |
| `vertex_x` | float | No | `0.5` | Vertex X position |
| `tint_strength` | float | No | `1` | Tint strength |
| `enable_dissolve` | boolean | No | `false` | Enable dissolve effect |
| `enable_desaturate` | boolean | No | `false` | Enable desaturation effect |
| `enable_grain` | boolean | No | `false` | Enable film grain effect |
| `solarize_threshold` | float | No | `0.5` | Solarize threshold |
| `enable_sharpen` | boolean | No | `false` | Enable sharpen effect |
| `enable_dodge_burn` | boolean | No | `false` | Enable dodge and burn effect |
| `glow_radius` | integer | No | `5` | Glow blur radius |
| `noise_radius` | integer | No | `7` | Noise radius for smart sharpen |
| `enable_color_correction` | boolean | No | `false` | Enable color correction |
| `enable_solarize` | boolean | No | `false` | Enable solarize effect |
| `contrast` | float | No | `0` | Contrast adjustment |
| `sharpen_alpha` | float | No | `1` | Sharpen strength (for basic mode) |
| `grain_scale` | float | No | `10` | Film grain scale (when enabled) |
| `brightness` | float | No | `0` | Brightness adjustment |
| `temperature` | float | No | `0` | Color temperature adjustment |
| `blue_direction` | enum: `horizontal`, `vertical` | No | `"horizontal"` | Blue channel shift direction |
| `dissolve_factor` | float | No | `0.5` | Dissolve blend factor |
| `sharpen_mode` | enum: `basic`, `smart`, `cas` | No | `"basic"` | Type of sharpening to apply |
| `vignette_strength` | float | No | `0.5` | Vignette strength (when enabled) |
| `sharpen_radius` | integer | No | `1` | Sharpen radius (for basic mode) |
| `parabolize_coeff` | float | No | `1` | Parabolize coefficient |
| `saturation` | float | No | `0` | Saturation adjustment |
| `enable_tint` | boolean | No | `false` | Enable color tint effect |
| `green_shift` | integer | No | `0` | Green channel shift amount |
| `preserve_edges` | float | No | `0.75` | Edge preservation factor |
| `desaturate_factor` | float | No | `1` | Desaturation factor |
| `smart_sharpen_ratio` | float | No | `0.5` | Smart sharpen blend ratio |
| `enable_chromatic` | boolean | No | `false` | Enable chromatic aberration |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<Image> | The processed images |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/post-processing", {
  input: {
        "image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/post-processing", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/post-processing", {
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

- API page: https://fal.ai/models/fal-ai/post-processing/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/post-processing
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
