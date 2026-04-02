---
name: fal-ai-multishot-master
description: >
  Use this skill for the fal.ai Multishot Master model (fal-ai/multishot-master). MultiShotMaster is a controllable multi-shot narrative video generation framework that supports text-driven inter-shot consistency, variable shot counts and shot durations, customized subject with mot
---

# Multishot Master

MultiShotMaster is a controllable multi-shot narrative video generation framework that supports text-driven inter-shot consistency, variable shot counts and shot durations, customized subject with motion control, and background-driven customized scene.

**Endpoint:** `fal-ai/multishot-master`
**Source:** https://fal.ai/models/fal-ai/multishot-master/api

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

const result = await fal.subscribe("fal-ai/multishot-master", {
  input: {
        "prompt": "your value here",
        "shots": []
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
| `prompt` | string | **Yes** |  | Global story caption describing the overall scene, subjects, setting, and visual style. This provides inter-shot cons... |
| `resolution` | enum: `480p`, `720p` | No | `"480p"` | Resolution of the generated video. |
| `shots` | list<Shot> | **Yes** |  | List of shots to generate. Each shot has its own caption and frame count. Maximum 5 shots with a combined maximum of ... |
| `aspect_ratio` | enum: `16:9`, `9:16` | No | `"16:9"` | Aspect ratio of the generated video. |
| `frames_per_second` | integer | No | `16` | Frames per second of the output video. |
| `enable_safety_checker` | boolean | No | `true` | Enable safety checker for input/output content. |
| `num_inference_steps` | integer | No | `50` | Number of denoising steps. Higher values produce better quality but take longer. |
| `seed` | integer | null | No |  | Random seed for reproducibility. |
| `negative_prompt` | string | No | `"bright colors, overexposed, static, blurred details, subtitles, style, artwork, painting, picture, still, overall gray, worst quality, low quality, JPEG compression residue, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn faces, deformed, disfigured, malformed limbs, fused fingers, still picture, cluttered background, three legs, many people in the background, walking backwards"` | Negative prompt describing undesired content in the generated video. |
| `guidance_scale` | float | No | `5` | Classifier-free guidance scale. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `seed` | integer | The seed used for generation. |
| `timings` | Timings | Performance timing information. |
| `video` | File |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/multishot-master", {
  input: {
        "prompt": "your value here",
        "shots": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/multishot-master", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/multishot-master", {
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

- API page: https://fal.ai/models/fal-ai/multishot-master/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/multishot-master
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
