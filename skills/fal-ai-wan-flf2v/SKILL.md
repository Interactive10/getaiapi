---
name: fal-ai-wan-flf2v
description: >
  Use this skill for the fal.ai Wan-2.1 First-Last-Frame-to-Video model (fal-ai/wan-flf2v). Wan-2.1 flf2v generates dynamic videos by intelligently bridging a given first frame to a desired end frame through smooth, coherent motion sequences.
---

# Wan-2.1 First-Last-Frame-to-Video

Wan-2.1 flf2v generates dynamic videos by intelligently bridging a given first frame to a desired end frame through smooth, coherent motion sequences.

**Endpoint:** `fal-ai/wan-flf2v`
**Source:** https://fal.ai/models/fal-ai/wan-flf2v/api

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

const result = await fal.subscribe("fal-ai/wan-flf2v", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png",
        "end_image_url": "https://example.com/input.png"
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
| `shift` | float | No | `5` | Shift parameter for video generation. |
| `prompt` | string | **Yes** |  | The text prompt to guide video generation. |
| `acceleration` | enum: `none`, `regular` | No | `"regular"` | Acceleration level to use. The more acceleration, the faster the generation, but with lower quality. The recommended ... |
| `frames_per_second` | integer | null | No | `16` | Frames per second of the generated video. Must be between 5 to 24. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `start_image_url` | string | **Yes** |  | URL of the starting image. If the input image does not match the chosen aspect ratio, it is resized and center cropped. |
| `end_image_url` | string | **Yes** |  | URL of the ending image. If the input image does not match the chosen aspect ratio, it is resized and center cropped. |
| `negative_prompt` | string | No | `"bright colors, overexposed, static, blurred details, subtitles, style, artwork, painting, picture, still, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, malformed limbs, fused fingers, still picture, cluttered background, three legs, many people in the background, walking backwards"` | Negative prompt for video generation. |
| `num_frames` | integer | null | No | `81` | Number of frames to generate. Must be between 81 to 100 (inclusive). If the number of frames is greater than 81, the ... |
| `resolution` | enum: `480p`, `720p` | No | `"720p"` | Resolution of the generated video (480p or 720p). 480p is 0.5 billing units, and 720p is 1 billing unit. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', the aspect ratio will be determined automatically based on the input ... |
| `enable_prompt_expansion` | boolean | No | `false` | Whether to enable prompt expansion. |
| `num_inference_steps` | integer | No | `30` | Number of inference steps for sampling. Higher values give better quality but take longer. |
| `guide_scale` | float | No | `5` | Classifier-free guidance scale. Higher values give better adherence to the prompt but may decrease quality. |
| `seed` | integer | null | No |  | Random seed for reproducibility. If None, a random seed is chosen. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/wan-flf2v", {
  input: {
        "prompt": "your value here",
        "start_image_url": "https://example.com/input.png",
        "end_image_url": "https://example.com/input.png"
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/wan-flf2v", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/wan-flf2v", {
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

- API page: https://fal.ai/models/fal-ai/wan-flf2v/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/wan-flf2v
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
