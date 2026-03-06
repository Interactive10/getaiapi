---
name: fal-kling-video
description: Generate videos from images using the fal.ai Kling Video O3 Standard Image-to-Video API. Use when the user wants to animate an image, create a video from a still image, or generate image-to-video content. Supports start/end frames, variable duration (3-15s), native audio generation, and multi-shot prompts.
---

# fal.ai Kling Video O3 — Image to Video

Generate videos from images using the Kling O3 model (standard mode) via the fal.ai API.

**Endpoint:** `fal-ai/kling-video/o3/standard/image-to-video`

## Prerequisites

- A fal.ai API key set as the environment variable `FAL_KEY`
- The `@fal-ai/client` npm package (for JS) or direct HTTP requests (for Python/curl)
- An input image accessible via URL (or upload one first via `fal.storage.upload`)

## Quick Start (Python — HTTP)

```python
import os, time, requests

FAL_KEY = os.environ["FAL_KEY"]
BASE = "https://queue.fal.run/fal-ai/kling-video/o3/standard/image-to-video"
HEADERS = {
    "Authorization": f"Key {FAL_KEY}",
    "Content-Type": "application/json",
}

# 1. Submit the request
payload = {
    "image_url": "<PUBLIC_IMAGE_URL>",       # required
    "prompt": "A gentle breeze moves through the scene",  # optional
    "duration": "5",                          # 3-15 seconds
}
resp = requests.post(BASE, json=payload, headers=HEADERS)
request_id = resp.json()["request_id"]

# 2. Poll for completion
status_url = f"{BASE}/requests/{request_id}/status"
while True:
    status = requests.get(status_url, headers=HEADERS).json()
    if status["status"] == "COMPLETED":
        break
    time.sleep(5)

# 3. Fetch result
result_url = f"{BASE}/requests/{request_id}"
result = requests.get(result_url, headers=HEADERS).json()
video_url = result["video"]["url"]
print(f"Video ready: {video_url}")
```

## Quick Start (JavaScript)

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/kling-video/o3/standard/image-to-video", {
  input: {
    image_url: "<PUBLIC_IMAGE_URL>",
    prompt: "The character walks forward slowly",
    duration: "5",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});

console.log(result.data.video.url);
```

## Input Schema

| Parameter        | Type          | Required | Default       | Description                                                                   |
| ---------------- | ------------- | -------- | ------------- | ----------------------------------------------------------------------------- |
| `image_url`      | string        | **Yes**  | —             | URL of the start frame image                                                  |
| `prompt`         | string        | No       | —             | Text prompt for video generation. Either `prompt` or `multi_prompt`, not both |
| `end_image_url`  | string        | No       | —             | URL of the end frame image                                                    |
| `duration`       | string (enum) | No       | `"5"`         | Video duration in seconds: `"3"` through `"15"`                               |
| `generate_audio` | boolean       | No       | `false`       | Generate native audio (supports Chinese & English)                            |
| `multi_prompt`   | list          | No       | —             | Multi-shot prompts (list of `{prompt, duration}` objects)                     |
| `shot_type`      | string        | No       | `"customize"` | Multi-shot type. Only value: `"customize"`                                    |

### multi_prompt element

| Field      | Type          | Required | Default | Description                            |
| ---------- | ------------- | -------- | ------- | -------------------------------------- |
| `prompt`   | string        | **Yes**  | —       | Prompt for this shot                   |
| `duration` | string (enum) | No       | `"5"`   | Duration of this shot (`"3"` – `"15"`) |

## Output Schema

| Field                | Type    | Description                |
| -------------------- | ------- | -------------------------- |
| `video`              | File    | The generated video        |
| `video.url`          | string  | Download URL for the video |
| `video.content_type` | string  | `"video/mp4"`              |
| `video.file_size`    | integer | Size in bytes              |
| `video.file_name`    | string  | Filename                   |

## Step-by-Step Usage

1. **Prepare the image:** The input image must be a publicly accessible URL. If you have a local file, upload it first:
   - JS: `const url = await fal.storage.upload(file);`
   - Python: Upload to your own storage or use the fal upload endpoint.

2. **Build the payload:** At minimum, provide `image_url`. Add `prompt` to guide the animation, `end_image_url` for start-to-end frame interpolation, and `duration` to control length.

3. **Submit:** Use the queue-based API (recommended for production) or the subscribe helper (JS client).

4. **Poll / wait:** The generation takes ~30-120 seconds depending on duration. The JS `fal.subscribe` handles polling automatically. For HTTP, poll the status endpoint.

5. **Download:** The result contains `video.url` — a direct download link to the `.mp4` file.

## Tips & Best Practices

- **Prompt quality matters:** Describe motion and camera movement explicitly (e.g., "slow zoom in", "character turns to face camera").
- **End frames:** Providing `end_image_url` gives the model a target to interpolate toward — great for controlled transitions.
- **Duration:** Longer durations (10-15s) need stronger prompts; shorter durations (3-5s) are more reliable.
- **Multi-shot:** Use `multi_prompt` to create videos with multiple distinct scenes/shots. Total duration is the sum of shot durations (max 15s).
- **Audio:** Set `generate_audio: true` for native audio. Works best with Chinese or English speech prompts.
- **Negative prompt** is not exposed in the O3 standard image-to-video endpoint directly but defaults to `"blur, distort, and low quality"` internally.

## Error Handling

- If the image URL is not publicly accessible, the request will fail. Always verify the URL is reachable.
- Queue requests can time out for very long durations. Set appropriate polling intervals (5-10s).
- Check `status.status` for `"FAILED"` and handle gracefully.

## Authentication

Set the `FAL_KEY` environment variable, or configure it in code:

```javascript
fal.config({ credentials: "YOUR_FAL_KEY" });
```

For HTTP requests, use the `Authorization: Key <FAL_KEY>` header.
