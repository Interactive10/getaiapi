---
name: kling-video-effects
description: >
  Use this skill for the Kling AI Kling Video Effects API (/v1/videos/effects).
  Apply special effects to images/videos using the Kling AI API. Includes dual-character effects (hug, kiss, heart gesture), aging effects, and other creative transformations.
---

# Kling Video Effects

Apply special effects to images/videos using the Kling AI API. Includes dual-character effects (hug, kiss, heart gesture), aging effects, and other creative transformations.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/videos/effects`
**Query Task:** `GET /v1/videos/effects/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoEffects)

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
  --url https://api-singapore.klingai.com/v1/videos/effects \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model_name": "kling-v1"
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
    "model_name": "kling-v1"
}

resp = requests.post(
    "https://api-singapore.klingai.com/v1/videos/effects",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"https://api-singapore.klingai.com/v1/videos/effects/{task_id}",
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
const createResp = await fetch("https://api-singapore.klingai.com/v1/videos/effects", {
  method: "POST",
  headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    "model_name": "kling-v1"
}),
});
const { data } = await createResp.json();
const taskId = data.task_id;
console.log("Task:", taskId);

// 2. Poll for result
while (true) {
  const resp = await fetch(`https://api-singapore.klingai.com/v1/videos/effects/${taskId}`, {
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
| `kling-v1-6` | V1.6, multi-image support, 720p/1080p |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `effect_scene` | string | **Yes** | — | Scene Name Enum: flash_drive, shush_my_dreams, french_elegance, finger_swipe, advent_of_flora, smooth_transition, kiss_pro, raid_check, snow_night_kiss, eternal_kiss, fortune_in_motion, chinese_trend, |
| `input` | object | **Yes** | — | Task input structure. Fields vary depending on the scene. Single-image effects (219 types) Scenes include: flash_drive, shush_my_dreams, advent_of_flora, raid_check, fortune_in_motion, chinese_trend,  |
| `image` | string | No | — | Reference Image (for single-image effects) Supports image Base64 encoding or image URL (ensure accessibility) Important: When using Base64, do NOT add any prefix like data:image/png;base64,. Submit on |
| `images` | array | No | — | Reference Image Group (for dual-character effects) Array length must be 2. The first image uploaded will be positioned on the left side of the composite photo, and the second image uploaded will be po |
| `callback_url` | string | No | — | The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes. For specific message schema, see Callback Protocol |
| `external_task_id` | string | No | — | Customized Task ID User-defined task ID. It will not override the system-generated task ID, but supports querying tasks by this ID Please note that it must be unique for each user cURLcURLcurl --reque |

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

1. **Create Task** — `POST /v1/videos/effects` → returns `task_id` with status `submitted`
2. **Poll Status** — `GET /v1/videos/effects/{task_id}` → status cycles: `submitted` → `processing` → `succeed` / `failed`
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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoEffects)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
