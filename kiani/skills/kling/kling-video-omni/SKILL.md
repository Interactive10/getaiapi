---
name: kling-video-omni
description: >
  Use this skill for the Kling AI Kling Video Omni API (/v1/videos/text2video).
  Unified video generation endpoint using the Kling Omni model. Supports text-to-video, image-to-video, elements, multi-shot, and voice control through a single API with prompt-based element references.
---

# Kling Video Omni

Unified video generation endpoint using the Kling Omni model. Supports text-to-video, image-to-video, elements, multi-shot, and voice control through a single API with prompt-based element references.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/videos/text2video`
**Query Task:** `GET /v1/videos/text2video/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FOmniVideo)

---

## Authentication

Kling uses **JWT (JSON Web Token)** authentication with an Access Key + Secret Key pair.

1. Get your Access Key and Secret Key from [Kling Developer Console](https://kling.ai/dev/api-key)
2. Generate a JWT token:

```python
import time
import jwt

ak = ""  # Access Key
sk = ""  # Secret Key

def encode_jwt_token(ak, sk):
    headers = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "iss": ak,
        "exp": int(time.time()) + 1800,  # 30 min validity
        "nbf": int(time.time()) - 5
    }
    return jwt.encode(payload, sk, headers=headers)

token = encode_jwt_token(ak, sk)
```

3. Include in request: `Authorization: Bearer <token>`

---

## Quick Start (cURL)

```bash
curl --request POST \
  --url https://api-singapore.klingai.com/v1/videos/text2video \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model_name": "kling-v3-omni",
    "prompt": "<your prompt>"
}'
```

## Quick Start (Python)

```python
import os, time, jwt, requests

AK = os.environ["KLING_ACCESS_KEY"]
SK = os.environ["KLING_SECRET_KEY"]

def get_token():
    headers = {"alg": "HS256", "typ": "JWT"}
    payload = {"iss": AK, "exp": int(time.time()) + 1800, "nbf": int(time.time()) - 5}
    return jwt.encode(payload, SK, headers=headers)

HEADERS = {
    "Authorization": f"Bearer {get_token()}",
    "Content-Type": "application/json",
}

# 1. Create task
payload = {
    "model_name": "kling-v3-omni",
    "prompt": "<your prompt>"
}

resp = requests.post(
    "https://api-singapore.klingai.com/v1/videos/text2video",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"https://api-singapore.klingai.com/v1/videos/text2video/{task_id}",
        headers=HEADERS,
    ).json()
    status = result["data"]["task_status"]
    print(f"Status: {status}")
    if status == "succeed":
        video_url = result["data"]["videos[0].url"]
        print(f"Result: {video_url}")
        break
    elif status == "failed":
        print(f"Failed: {result['data'].get('task_status_msg', 'unknown')}")
        break
    time.sleep(5)
```

## Quick Start (JavaScript / Node.js)

```javascript
import jwt from "jsonwebtoken";

const AK = process.env.KLING_ACCESS_KEY;
const SK = process.env.KLING_SECRET_KEY;

function getToken() {
  return jwt.sign(
    { iss: AK, exp: Math.floor(Date.now() / 1000) + 1800, nbf: Math.floor(Date.now() / 1000) - 5 },
    SK,
    { algorithm: "HS256", header: { alg: "HS256", typ: "JWT" } }
  );
}

// 1. Create task
const createResp = await fetch("https://api-singapore.klingai.com/v1/videos/text2video", {
  method: "POST",
  headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    "model_name": "kling-v3-omni",
    "prompt": "<your prompt>"
}),
});
const { data } = await createResp.json();
const taskId = data.task_id;
console.log("Task:", taskId);

// 2. Poll for result
while (true) {
  const resp = await fetch(`https://api-singapore.klingai.com/v1/videos/text2video/${taskId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const result = await resp.json();
  if (result.data.task_status === "succeed") {
    console.log("Result:", result.data.videos[0].url);
    break;
  }
  if (result.data.task_status === "failed") {
    console.error("Failed:", result.data.task_status_msg);
    break;
  }
  await new Promise((r) => setTimeout(r, 5000));
}
```

---

## Models

| Model Name | Description |
| --- | --- |
| `kling-v3-omni` | V3 Omni, unified model with prompt-based element references |
| `kling-video-o1` | Video O1, reasoning-enhanced video generation |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model_name` | string | No | kling-video-o1 | Model NameEnum: kling-video-o1kling-v3- |
| `omnimulti_shot` | boolean | No | false | Whether to generate multi-shot video.When true: the prompt parameter is invalid, and it does not support setting the start & end frames to generate videos When false: the shot_type and multi_prompt pa |
| `shot_type` | string | No | — | Storyboard method.Enum: customizeintelligenceWhen multi_shot is true, this parameter is required. |
| `prompt` | string | No | — | Text prompt words, which can include positive and negative descriptions. The prompt words can be templated to meet different video generation needs Must not exceed 2,500 characters When the "multi_sho |
| `multi_prompt` | array | No | — | Information about each storyboard, such as prompts and duration.Define shot sequence number, corresponding prompt and duration via index, prompt, and duration parameters. Supports up to 6 storyboards, |
| `image_list` | array | No | — | Reference Image List, including element, scene, style reference images. Including reference images of the element, scene, style, etc., it can also be used as the start or end frame to generate videos; |
| `image_url` | string | **Yes** | — | Image URL or |
| `element_id` | long | **Yes** | — | Element ID from element |
| `libraryvideo_list` | array | No | — | Reference Video, obtained via URL.Video Types: Can be used as feature reference video OR base video for editing (default: base) Use refer_type parameter: feature for feature reference, base for video  |
| `video_url` | string | **Yes** | — | Video |
| `keep_original_sound` | string | No | — | Keep original sound: yes to keep, no to discardEnum: |
| `yesnosound` | string | No | off | Whether to generate sound simultaneously when generating videos.Enum: onoffThe support range for different model versions and video modes varies. For details, see Capability Map |
| `mode` | string | No | pro | Video generation modeEnum: stdpro std: Standard mode, cost-effective pro: Professional mode (high quality), better video quality output The support range for different model versions and video modes v |
| `aspect_ratio` | string | No | — | Aspect ratio of generated video frame (width:height)Enum: 16:99:161:1 This parameter is required when NOT using first-frame reference or video editing function. |
| `duration` | string | No | 5 | Video duration in secondsEnum: 3456789101112131415 When using the video editing function ("refer_type": "base"), the output result is the same as the duration of the incoming video, and the current pa |
| `watermark_info` | object | No | — | Whether to generate watermarked results simultaneously Defined by the enabled parameter, format: "watermark_info": { "enabled": boolean } true: generate watermarked result, false: do not generate Cust |
| `callback_url` | string | No | — | Callback notification URL for task result. If configured, server will actively notify when task status changes. For specific message schema, see Callback Protocol |
| `external_task_id` | string | No | — | Custom task ID defined by user. Will not overwrite system-generated task ID, but supports querying task by this ID. Must be unique within a single user account. cURLcURLcurl --request POST \ --url htt |

---

## Output Schema

### Create Task Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "submitted | processing | succeed | failed",
    "task_info": {
      "external_task_id": "string"
    },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task Response (on success)

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "succeed",
    "task_status_msg": "string",
    "task_info": {
      "external_task_id": "string"
    },
    "task_result": {
      "videos": [
        {
          "id": "string",
          "url": "string",
          "watermark_url": "string",
          "duration": "string"
        }
      ]
    },
    "final_unit_deduction": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

---

## Task Lifecycle

1. **Create Task** — `POST /v1/videos/text2video` → returns `task_id` with status `submitted`
2. **Poll Status** — `GET /v1/videos/text2video/{task_id}` → status cycles: `submitted` → `processing` → `succeed` / `failed`
3. **Get Result** — When `task_status === "succeed"`, result URLs are in `data.task_result.videos[].url`

**Polling interval:** 5-10 seconds recommended.
**Results expire:** Generated files are cleared after 30 days.

---

## Callback Support

Set `callback_url` in the create request to receive webhook notifications on status changes.

---

## Error Codes

| HTTP | Code | Meaning | Solution |
| --- | --- | --- | --- |
| 200 | 0 | Success | — |
| 401 | 1000-1004 | Auth failure | Check JWT token |
| 429 | 1100-1102 | Account issue | Check balance/package |
| 400 | 1200-1201 | Invalid params | Check request body |
| 400 | 1300-1301 | Content policy | Modify input content |
| 429 | 1302-1304 | Rate limited | Reduce frequency, use backoff |
| 500 | 5000-5002 | Server error | Retry later |

---

## References

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FOmniVideo)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
