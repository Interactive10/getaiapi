---
name: fal-ai-ltx-2-19b-video-to-video-lora
description: >
  Use this skill for the fal.ai LTX-2 19B model (fal-ai/ltx-2-19b/video-to-video/lora). Generate video with audio from videos using LTX-2 and custom LoRA
---

# LTX-2 19B

Generate video with audio from videos using LTX-2 and custom LoRA

**Endpoint:** `fal-ai/ltx-2-19b/video-to-video/lora`
**Source:** https://fal.ai/models/fal-ai/ltx-2-19b/video-to-video/lora/api

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

const result = await fal.subscribe("fal-ai/ltx-2-19b/video-to-video/lora", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "loras": []
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
| `prompt` | string | **Yes** |  | The prompt to generate the video from. |
| `video_url` | string | **Yes** |  | The URL of the video to generate the video from. |
| `use_multiscale` | boolean | No | `true` | Whether to use multi-scale generation. If True, the model will generate the video at a smaller scale first, then use ... |
| `generate_audio` | boolean | No | `true` | Whether to generate audio for the video. |
| `ic_lora_scale` | float | No | `1` | The scale of the IC-LoRA to use. This allows you to control the strength of the IC-LoRA. |
| `loras` | list<LoRAInput> | **Yes** |  | The LoRAs to use for the generation. |
| `video_size` | ImageSize | enum (7 values) | No | `"auto"` | The size of the generated video. |
| `guidance_scale` | float | No | `3` | The guidance scale to use. |
| `camera_lora_scale` | float | No | `1` | The scale of the camera LoRA to use. This allows you to control the camera movement of the generated video more accur... |
| `end_image_url` | string | null | No |  | The URL of the image to use as the end of the video. |
| `num_frames` | integer | No | `121` | The number of frames to generate. |
| `video_strength` | float | No | `1` | Video conditioning strength. Lower values represent more freedom given to the model to change the video content. |
| `video_output_type` | enum: `X264 (.mp4)`, `VP9 (.webm)`, `PRORES4444 (.mov)`, `GIF (.gif)` | No | `"X264 (.mp4)"` | The output type of the generated video. |
| `image_url` | string | null | No |  | An optional URL of an image to use as the first frame of the video. |
| `sync_mode` | boolean | No | `false` | If `True`, the media will be returned as a data URI and the output data won't be available in the request history. |
| `video_quality` | enum: `low`, `medium`, `high`, `maximum` | No | `"high"` | The quality of the generated video. |
| `enable_prompt_expansion` | boolean | No | `true` | Whether to enable prompt expansion. |
| `seed` | integer | null | No |  | The seed for the random number generator. |
| `match_video_length` | boolean | No | `true` | When enabled, the number of frames will be calculated based on the video duration and FPS. When disabled, use the spe... |
| `acceleration` | enum: `none`, `regular`, `high`, `full` | No | `"regular"` | The acceleration level to use. |
| `fps` | float | No | `25` | The frames per second of the generated video. |
| `camera_lora` | enum (8 values) | No | `"none"` | The camera LoRA to use. This allows you to control the camera movement of the generated video more accurately than ju... |
| `enable_safety_checker` | boolean | No | `true` | Whether to enable the safety checker. |
| `image_strength` | float | No | `1` | The strength of the image to use for the video generation. |
| `negative_prompt` | string | No | `"blurry, out of focus, overexposed, underexposed, low contrast, washed out colors, excessive noise, grainy texture, poor lighting, flickering, motion blur, distorted proportions, unnatural skin tones, deformed facial features, asymmetrical face, missing facial features, extra limbs, disfigured hands, wrong hand count, artifacts around text, inconsistent perspective, camera shake, incorrect depth of field, background too sharp, background clutter, distracting reflections, harsh shadows, inconsistent lighting direction, color banding, cartoonish rendering, 3D CGI look, unrealistic materials, uncanny valley effect, incorrect ethnicity, wrong gender, exaggerated expressions, wrong gaze direction, mismatched lip sync, silent or muted audio, distorted voice, robotic voice, echo, background noise, off-sync audio,incorrect dialogue, added dialogue, repetitive speech, jittery movement, awkward pauses, incorrect timing, unnatural transitions, inconsistent framing, tilted camera, flat lighting, inconsistent tone, cinematic oversaturation, stylized filters, or AI artifacts."` | The negative prompt to generate the video from. |
| `preprocessor` | enum: `depth`, `canny`, `pose`, `none` | No | `"none"` | The preprocessor to use for the video. When a preprocessor is used and `ic_lora_type` is set to `match_preprocessor`,... |
| `ic_lora` | enum: `match_preprocessor`, `canny`, `depth`, `pose`, `detailer`, `none` | No | `"match_preprocessor"` | The type of IC-LoRA to load. In-Context LoRA weights are used to condition the video based on edge, depth, or pose vi... |
| `video_write_mode` | enum: `fast`, `balanced`, `small` | No | `"balanced"` | The write mode of the generated video. |
| `audio_url` | string | null | No |  | An optional URL of an audio to use as the audio for the video. If not provided, any audio present in the input video ... |
| `audio_strength` | float | No | `1` | Audio conditioning strength. Lower values represent more freedom given to the model to change the audio content. |
| `end_image_strength` | float | No | `1` | The strength of the end image to use for the video generation. |
| `match_input_fps` | boolean | No | `true` | When true, match the output FPS to the input video's FPS instead of using the default target FPS. |
| `num_inference_steps` | integer | No | `40` | The number of inference steps to use. |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `prompt` | string | The prompt used for the generation. |
| `seed` | integer | The seed used for the random number generator. |
| `video` | VideoFile |  |

---

## Queue API (Long-Running Requests)

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/ltx-2-19b/video-to-video/lora", {
  input: {
        "prompt": "your value here",
        "video_url": "https://example.com/input.png",
        "loras": []
    },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/ltx-2-19b/video-to-video/lora", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/ltx-2-19b/video-to-video/lora", {
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

- API page: https://fal.ai/models/fal-ai/ltx-2-19b/video-to-video/lora/api
- OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ltx-2-19b/video-to-video/lora
- Queue docs: https://docs.fal.ai/model-endpoints/queue
- File uploads: https://docs.fal.ai/model-endpoints#file-uploads
