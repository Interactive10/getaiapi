---
name: fal-ai-steady-dancer
description: >
  Use this skill for the fal.ai Steady Dancer model (fal-ai/steady-dancer). Create smooth, realistic videos from a single photo while keeping the original appearance intact—precise motion control without losing identity or visual quality.
---

# Steady Dancer

Create smooth, realistic videos from a single photo while keeping the original appearance intact—precise motion control without losing identity or visual quality.

**Endpoint:** `fal-ai/steady-dancer`
**Source:** https://fal.ai/models/fal-ai/steady-dancer/api

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

const result = await fal.subscribe("fal-ai/steady-dancer", {
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
| `prompt` | string | No | `"A person dancing with smooth and natural movements."` | Text prompt describing the desired animation. |
| `video_url` | string | No | `"https://v3b.fal.media/files/b/0a84de68/jXDWywjhagRfR-GuZjoRs_video.mp4"` | URL of the driving pose video. The motion from this video will be transferred to the reference image. |
| `acceleration` | enum: `light`, `moderate`, `aggressive` | No | `"aggressive"` | Acceleration levels. |
| `pose_guidance_scale` | float | No | `1` | Pose guidance scale for pose control strength. |
| `shift` | float | No | `5` | Shift parameter for video generation. |
| `pose_guidance_end` | float | No | `0.4` | End ratio for pose guidance. Controls when pose guidance ends. |
| `frames_per_second` | integer | No |  | Frames per second of the generated video. Must be between 5 to 24. If not specified, uses the FPS from the input video. |
| `guidance_scale` | float | No | `1` | Classifier-free guidance scale for prompt adherence. |
| `num_frames` | integer | No |  | Number of frames to generate. If not specified, uses the frame count from the input video (capped at 241). Will be ad... |
| `use_turbo` | boolean | No | `false` | If true, applies quality enhancement for faster generation with improved quality. When enabled, parameters are automa... |
| `negative_prompt` | string | No | `"blurred, distorted face, bad anatomy, extra limbs, poorly drawn hands, poorly drawn feet, disfigured, out of frame, duplicate, watermark, signature, text"` | Negative prompt for video generation. |
| `enable_safety_checker` | boolean | No | `false` | If set to true, the safety checker will be enabled. |
| `aspect_ratio` | enum: `auto`, `16:9`, `9:16`, `1:1` | No | `"auto"` | Aspect ratio of the generated video. If 'auto', will be determined from the reference image. |
| `pose_guidance_start` | float | No | `0.1` | Start ratio for pose guidance. Controls when pose guidance begins. |
| `resolution` | enum: `480p`, `576p`, `720p` | No | `"576p"` | Resolution of the generated video. 576p is default, 720p for higher quality. 480p is lower quality. |
| `image_url` | string | No | `"https://v3b.fal.media/files/b/0a85edaa/GDUCMPrdvOMcI5JpEcU7f.png"` | URL of the reference image to animate. This is the person/character whose appearance will be preserved. |
| `preserve_audio` | boolean | No | `true` | If enabled, copies audio from the input driving video to the output video. |
| `seed` | integer | No |  | Random seed for reproducibility. If None, a random seed is chosen. |
| `num_inference_steps` | integer | No | `6` | Number of inference steps for sampling. Higher values give better quality but take longer. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `num_frames` | integer | The actual number of frames generated (aligned to 4k+1 pattern). |
| `seed` | integer | The seed used for generation. |
| `video` | File | The generated dance animation video. |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/steady-dancer", {
  input: {
        "prompt": "your prompt here"
      },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/steady-dancer", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/steady-dancer", {
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

- API page: https://fal.ai/models/fal-ai/steady-dancer/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/steady-dancer
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
