# Kling Video v3 Pro — Image-to-Video API Reference

**Endpoint:** `fal-ai/kling-video/v3/pro/image-to-video`  
**Source:** https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video/api

---

## Overview

Kling V3 Pro is the latest generation image-to-video model, offering top-tier cinematic visuals, fluid motion, and native audio generation. It supports custom element references (characters/objects), multi-shot video generation, and voice IDs for spoken output.

---

## Quick Start

### 1. Install the Client

```bash
npm install --save @fal-ai/client
```

> **Note:** The `@fal-ai/serverless-client` package is deprecated. Use `@fal-ai/client` instead.

### 2. Set Your API Key

```bash
export FAL_KEY="YOUR_API_KEY"
```

### 3. Submit a Request

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/kling-video/v3/pro/image-to-video", {
  input: {
    start_image_url: "https://...your-image.png",
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

The API uses an API Key. Set the `FAL_KEY` environment variable, or configure it in code:

```javascript
import { fal } from "@fal-ai/client";
fal.config({ credentials: "YOUR_FAL_KEY" });
```

> **Important:** When running client-side code (browser, mobile), use a server-side proxy to protect your API key. See the [fal.ai server-side integration guide](https://docs.fal.ai/model-endpoints/server-side).

---

## Queue (Long-Running Requests)

For models with slower inference, use the queue API to submit, poll status, and retrieve results. You can also configure a webhook URL.

### Submit to Queue

```javascript
const { request_id } = await fal.queue.submit("fal-ai/kling-video/v3/pro/image-to-video", {
  input: {
    start_image_url: "https://...your-image.png",
  },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Check Status

```javascript
const status = await fal.queue.status("fal-ai/kling-video/v3/pro/image-to-video", {
  requestId: "<request_id>",
  logs: true,
});
```

### Get Result

```javascript
const result = await fal.queue.result("fal-ai/kling-video/v3/pro/image-to-video", {
  requestId: "<request_id>",
});
console.log(result.data);
```

---

## File Handling

File inputs accept URLs, Base64 data URIs, or uploaded files via the fal storage API:

- **Data URI (base64):** Pass a base64 data URI directly. Convenient but may impact performance for large files.
- **Hosted URL:** Pass any publicly accessible URL. Some hosts may rate-limit or block cross-site requests.
- **fal Storage Upload:** Use `fal.storage.upload(file)` to upload and receive a hosted URL.

```javascript
const file = new File(["..."], "image.png", { type: "image/png" });
const url = await fal.storage.upload(file);
```

---

## Input Schema

| Parameter         | Type                              | Required | Description                                                                                                    |
| ----------------- | --------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `prompt`          | string                            | No       | Text prompt for video generation. Either `prompt` or `multi_prompt` must be provided, but not both.            |
| `multi_prompt`    | list\<KlingV3MultiPromptElement\> | No       | List of prompts for multi-shot video generation. Divides video into multiple shots.                            |
| `start_image_url` | string                            | **Yes**  | URL of the image to be used for the video.                                                                     |
| `duration`        | DurationEnum                      | No       | Duration of generated video in seconds. Values: `3`–`15`. Default: `"5"`.                                      |
| `generate_audio`  | boolean                           | No       | Whether to generate native audio. Supports Chinese and English. Default: `true`.                               |
| `end_image_url`   | string                            | No       | URL of the image to be used for the end of the video.                                                          |
| `voice_ids`       | list\<string\>                    | No       | Voice IDs for generation. Reference in prompt with `<<<voice_1>>>` and `<<<voice_2>>>`. Max 2 voices per task. |
| `elements`        | list\<KlingV3ComboElementInput\>  | No       | Elements (characters/objects) to include. Reference in prompt as `@Element1`, `@Element2`, etc.                |
| `shot_type`       | ShotTypeEnum                      | No       | Type of multi-shot generation. Required when `multi_prompt` is provided. Default: `"customize"`.               |
| `aspect_ratio`    | AspectRatioEnum                   | No       | Aspect ratio of the video frame. Values: `16:9`, `9:16`, `1:1`. Default: `"16:9"`.                             |
| `negative_prompt` | string                            | No       | Negative prompt. Default: `"blur, distort, and low quality"`.                                                  |
| `cfg_scale`       | float                             | No       | CFG scale — how closely the model follows the prompt. Default: `0.5`.                                          |

### Example Input

```json
{
  "prompt": "The craftsman slowly examines the bowl, turning it gently in his weathered hands...",
  "start_image_url": "https://storage.googleapis.com/falserverless/example_inputs/kling-v3/pro-i2v/start_image.png",
  "duration": "12",
  "generate_audio": true,
  "elements": [
    {
      "reference_image_urls": ["https://...glasses_back.png"],
      "frontal_image_url": "https://...glasses.png"
    },
    {
      "video_url": "https://...child_video.mp4"
    }
  ],
  "aspect_ratio": "16:9",
  "negative_prompt": "blur, distort, and low quality",
  "cfg_scale": 0.5
}
```

---

## Output Schema

| Parameter | Type | Required | Description                                                                                     |
| --------- | ---- | -------- | ----------------------------------------------------------------------------------------------- |
| `video`   | File | **Yes**  | The generated video file object containing `url`, `content_type`, `file_name`, and `file_size`. |

### Example Output

```json
{
  "video": {
    "file_size": 8431922,
    "file_name": "out.mp4",
    "content_type": "video/mp4",
    "url": "https://storage.googleapis.com/falserverless/example_outputs/kling-v3/pro-i2v/out.mp4"
  }
}
```

---

## Enumerations

### DurationEnum

Possible values: `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15` (seconds). Default: `"5"`.

### AspectRatioEnum

Possible values: `16:9`, `9:16`, `1:1`. Default: `"16:9"`.

### ShotTypeEnum

Possible values: `customize`. Default: `"customize"`.

---

## Elements (Custom Characters/Objects)

Each element can be either an image set (frontal + reference images) or a video. Reference them in your prompt as `@Element1`, `@Element2`, etc.

### Image Set Element

```json
{
  "frontal_image_url": "https://...front.png",
  "reference_image_urls": ["https://...back.png"]
}
```

### Video Element

```json
{
  "video_url": "https://...video.mp4"
}
```

---

## Multi-Prompt (Multi-Shot)

Use `multi_prompt` to divide the video into multiple shots, each with its own prompt and duration:

```json
[
  { "prompt": "Shot 1 description", "duration": "5" },
  { "prompt": "Shot 2 description", "duration": "7" }
]
```

---

## Notes

- Either `prompt` or `multi_prompt` must be provided, but not both.
- Native audio generation supports Chinese and English. Other languages are auto-translated to English.
- For English speech, use lowercase letters; for acronyms or proper nouns, use uppercase.
- Maximum 2 voice IDs per task. Reference voices with `<<<voice_1>>>` and `<<<voice_2>>>`.
- Get voice IDs from the [Kling Video create-voice endpoint](https://fal.ai/models/fal-ai/kling-video/create-voice).
