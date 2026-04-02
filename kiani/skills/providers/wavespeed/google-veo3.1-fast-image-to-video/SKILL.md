---
name: wavespeed-google-veo3.1-fast-image-to-video
description: >
  Use this skill for the WaveSpeed AI Google Veo 3.1 Fast | Image To Video Native 1080p Quality And Speed model (google/veo3.1-fast/image-to-video). Google Veo 3.1 Fast is an Image-to-Video model with native 1080p output for high-detail videos from images and fast performance. Ready-to-use REST inference API, best performance, no coldstarts, affor
---

# Google Veo 3.1 Fast | Image To Video Native 1080p Quality And Speed

Google Veo 3.1 Fast is an Image-to-Video model with native 1080p output for high-detail videos from images and fast performance. Ready-to-use REST inference API, best performance, no coldstarts, affordable pricing.

**Type:** Image to Video
**Model:** `google/veo3.1-fast/image-to-video`
**Source:** https://wavespeed.ai/models/google/veo3.1-fast/image-to-video

---

## Quick Start

### 1. Set Your API Key

```bash
export WAVESPEED_API_KEY="YOUR_API_KEY"
```

### 2. Submit a Task

```bash
curl -X POST "https://api.wavespeed.ai/api/v3/google/veo3.1-fast/image-to-video" \
  -H "Authorization: Bearer $WAVESPEED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "your prompt here", "image": "https://example.com/input.png"}'
```

### JavaScript Example

```javascript
const response = await fetch("https://api.wavespeed.ai/api/v3/google/veo3.1-fast/image-to-video", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.WAVESPEED_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
        "prompt": "your prompt here",
        "image": "https://example.com/input.png"
    }),
});

const { data } = await response.json();
const taskId = data.id;
console.log("Task submitted:", taskId);

// Poll for result
const result = await fetch(`https://api.wavespeed.ai/api/v3/predictions/${taskId}`, {
  headers: {
    "Authorization": `Bearer ${process.env.WAVESPEED_API_KEY}`,
  },
});
const { data: prediction } = await result.json();
console.log(prediction.outputs);
```

### Python Example

```python
import os, time, requests

API_KEY = os.environ["WAVESPEED_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

# Submit task
resp = requests.post("https://api.wavespeed.ai/api/v3/google/veo3.1-fast/image-to-video",
    headers=HEADERS,
    json={
        "prompt": "your prompt here",
        "image": "https://example.com/input.png"
    },
)
task_id = resp.json()["data"]["id"]

# Poll for result
while True:
    result = requests.get(f"https://api.wavespeed.ai/api/v3/predictions/{task_id}",
        headers=HEADERS).json()
    status = result["data"]["status"]
    if status == "completed":
        print(result["data"]["outputs"])
        break
    elif status == "failed":
        print("Error:", result["data"].get("error"))
        break
    time.sleep(1)
```

---

## Authentication

Include your API key in the `Authorization` header as a Bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

Get your API key at: https://wavespeed.ai/accesskey

> **Note:** API keys require a top-up to activate. Keys created before your first top-up will not work.

---

## Input Parameters

> For the full list of parameters, defaults, and accepted values, check the model's API docs:
> - Model page: https://wavespeed.ai/models/google/veo3.1-fast/image-to-video
> - API docs: https://wavespeed.ai/docs/docs-api/google/veo3.1-fast-image-to-video

**Common parameters** (based on model type):

| Parameter | Type | Description |
| --- | --- | --- |
| `prompt` | string | Text prompt describing what to generate |
| `image` | string | Input image URL |
| `enable_sync_mode` | boolean | Wait for result in the initial response |
| `enable_base64_output` | boolean | Return base64-encoded output instead of URL |
| `webhook_url` | string | URL to receive async notification when task completes |

**Additional parameters found on model page:** `root_last_image`, `false`, `What`, `OpenAI`, `Kuaishou`, `Google`, `Alibaba`, `Tencent`, `Shengshu`, `WaveSpeedAI`

---

## Output

Results are returned via the predictions endpoint:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique task identifier |
| `model` | string | Model used for generation |
| `status` | string | `created`, `processing`, `completed`, `failed` |
| `outputs` | list<string> | URLs to generated content |
| `timings.inference` | integer | Generation duration in ms |
| `error` | string | Error description (on failure only) |
| `created_at` | string | ISO 8601 timestamp |

---

## Task Lifecycle

### 1. Submit Task

**POST** `https://api.wavespeed.ai/api/v3/google/veo3.1-fast/image-to-video`

### 2. Poll for Result

**GET** `https://api.wavespeed.ai/api/v3/predictions/{task_id}`

### 3. Task Statuses

| Status | Meaning |
| --- | --- |
| `created` | Task queued, continue polling |
| `processing` | Generation underway, continue polling |
| `completed` | Done — retrieve outputs |
| `failed` | Error — check error field |

### 4. Delete Task

**DELETE** `https://api.wavespeed.ai/api/v3/predictions/{task_id}`

---

## Tips

- Poll with ~1 second intervals; max wait ~300 seconds for long tasks.
- Use `webhook_url` in your request body for async notifications instead of polling.
- File inputs accept URLs. Use the upload API for local files: `POST /api/v3/upload`.
- Output URLs are hosted on the WaveSpeed CDN and may expire — download promptly.

## References

- Model page: https://wavespeed.ai/models/google/veo3.1-fast/image-to-video
- API docs: https://wavespeed.ai/docs/docs-api/google/veo3.1-fast-image-to-video
- API reference: https://wavespeed.ai/docs/api-reference
- Authentication: https://wavespeed.ai/docs/api-authentication
- Submit task: https://wavespeed.ai/docs/submit-task
- Get result: https://wavespeed.ai/docs/get-result
