---
name: kling-motion-control
description: >
  Use this skill for the Kling AI Kling Motion Control API (/v1/videos/image2video).
  Generate videos with motion brush control using the Kling AI API. Paint motion trajectories on specific regions of an image to control object movement in the generated video.
---

# Kling Motion Control

Generate videos with motion brush control using the Kling AI API. Paint motion trajectories on specific regions of an image to control object movement in the generated video.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/videos/image2video`
**Query Task:** `GET /v1/videos/image2video/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FmotionControl)

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
  --url https://api-singapore.klingai.com/v1/videos/image2video \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model_name": "kling-v2-6",
    "prompt": "<your prompt>",
    "image": "<image_url_or_base64>"
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
    "model_name": "kling-v2-6",
    "prompt": "<your prompt>",
    "image": "<image_url_or_base64>"
}

resp = requests.post(
    "https://api-singapore.klingai.com/v1/videos/image2video",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"https://api-singapore.klingai.com/v1/videos/image2video/{task_id}",
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
const createResp = await fetch("https://api-singapore.klingai.com/v1/videos/image2video", {
  method: "POST",
  headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    "model_name": "kling-v2-6",
    "prompt": "<your prompt>",
    "image": "<image_url_or_base64>"
}),
});
const { data } = await createResp.json();
const taskId = data.task_id;
console.log("Task:", taskId);

// 2. Poll for result
while (true) {
  const resp = await fetch(`https://api-singapore.klingai.com/v1/videos/image2video/${taskId}`, {
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
| `kling-v1` | V1 base model, 720p, 30fps |
| `kling-v1-5` | V1.5, improved image-to-video, 720p/1080p |
| `kling-v2-6` | V2.6, latest v2 with sound + motion control |
| `kling-v3` | V3, 3-15s variable duration, multi-shot, std/pro |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model_name` | string | No | kling-v2-6 | Model NameEnum: kling-v2-6kling- |
| `prompt` | string | No | — | Text prompt, can include positive and negative descriptions Can add elements to the scene, achieve camera movement effects, etc. See Kling "Motion Control" User Guide Cannot exceed 2500 characters |
| `image_url` | string | **Yes** | — | Reference image. Characters, background and other elements in generated video will follow this reference. Video content requirements: Character proportions should match the reference motion as much as |
| `video_url` | string | **Yes** | — | URL of reference video. Character actions in generated video will follow this reference. Video content requirements: Character should show clear upper body or full body including all limbs and head, a |
| `element_list` | array | No | — | Reference Element List based on element ID configuration Load with key:value format as follows: "element_list":[ { "element_id": 829836802793406551 } ] When referencing the element, the generated vide |
| `element_id` | long | **Yes** | — | Element ID from element |
| `librarykeep_original_sound` | string | No | yes | Whether to keep the original sound of the videoEnum: |
| `yesnocharacter_orientation` | string | **Yes** | — | Character orientation in generated video, can match image or videoEnum: imagevideo image: Match character orientation in the image; reference video duration must not exceed 10 seconds video: Match cha |
| `mode` | string | **Yes** | — | Video generation modeEnum: stdpro std: Standard Mode - basic mode, cost-effective pro: Professional Mode (High Quality) - high performance mode, better video quality Support varies by model version an |
| `watermark_info` | object | No | — | Whether to generate watermarked results simultaneously Defined by the enabled parameter, format: "watermark_info": { "enabled": boolean } true: generate watermarked result, false: do not generate Cust |
| `callback_url` | string | No | — | Callback notification URL for task result. If configured, server will notify when task status changes. For specific message schema, see Callback Protocol |
| `external_task_id` | string | No | — | Customized Task ID Will not overwrite system-generated task ID, but supports querying task by this ID Must be unique within a single user account cURLcURLcurl --request POST \ --url https://api-singap |

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

1. **Create Task** — `POST /v1/videos/image2video` → returns `task_id` with status `submitted`
2. **Poll Status** — `GET /v1/videos/image2video/{task_id}` → status cycles: `submitted` → `processing` → `succeed` / `failed`
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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FmotionControl)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
