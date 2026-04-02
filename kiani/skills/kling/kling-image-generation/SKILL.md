---
name: kling-image-generation
description: >
  Use this skill for the Kling AI Kling Image Generation API (/v1/images/generations).
  Generate images from text prompts or reference images using the Kling AI API. Supports text-to-image and image-to-image with multiple model versions, resolutions up to 2K, and batch generation.
---

# Kling Image Generation

Generate images from text prompts or reference images using the Kling AI API. Supports text-to-image and image-to-image with multiple model versions, resolutions up to 2K, and batch generation.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/images/generations`
**Query Task:** `GET /v1/images/generations/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FimageGeneration)

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
  --url https://api-singapore.klingai.com/v1/images/generations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model_name": "kling-v2-1",
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
    "model_name": "kling-v2-1",
    "prompt": "<your prompt>"
}

resp = requests.post(
    "https://api-singapore.klingai.com/v1/images/generations",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"https://api-singapore.klingai.com/v1/images/generations/{task_id}",
        headers=HEADERS,
    ).json()
    status = result["data"]["task_status"]
    print(f"Status: {status}")
    if status == "succeed":
        image_url = result["data"]["images[0].url"]
        print(f"Result: {image_url}")
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
const createResp = await fetch("https://api-singapore.klingai.com/v1/images/generations", {
  method: "POST",
  headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    "model_name": "kling-v2-1",
    "prompt": "<your prompt>"
}),
});
const { data } = await createResp.json();
const taskId = data.task_id;
console.log("Task:", taskId);

// 2. Poll for result
while (true) {
  const resp = await fetch(`https://api-singapore.klingai.com/v1/images/generations/${taskId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const result = await resp.json();
  if (result.data.task_status === "succeed") {
    console.log("Result:", result.data.images[0].url);
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
| `kling-v2` | V2 base image model, 1K/2K resolution |
| `kling-v2-new` | V2 New, restyle-focused image model |
| `kling-v2-1` | V2.1, std+pro modes, 720p/1080p, 24fps |
| `kling-v3` | V3, 3-15s variable duration, multi-shot, std/pro |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model_name` | string | No | kling-v1 | Model NameEnum: kling-v1kling-v1-5kling-v2kling-v2-newkling-v2-1kling- |
| `prompt` | string | **Yes** | — | Positive text promptCannot exceed 2500 characters |
| `negative_prompt` | string | No | — | Negative text promptCannot exceed 2500 characters Note: In the Image-to-Image scenario (when the "image" field is not empty), negative prompts are not supported. |
| `image` | string | No | — | Reference Image Support inputting image Base64 encoding or image URL (ensure accessibility) Base64 Encoding Note: Please note, if you use the Base64 method, make sure all image data parameters you pas |
| `image_reference` | string | No | — | Image reference typeEnum: subjectface subject: character feature reference, face: character appearance reference When using face, the uploaded image must contain only one face Required when using klin |
| `image_fidelity` | float | No | 0.5 | Face reference intensity for user-uploaded images during generationValue range: [0, 1], The larger the value, the stronger the reference intensity Only kling-v1, kling-v1-5 support this parameter |
| `human_fidelity` | float | No | 0.45 | Facial reference intensity, refers to the similarity of the facial features of the person in the reference imageOnly image_reference parameter is subject is available Value range: [0, 1], The larger t |
| `element_list` | array | No | — | Reference element list based on element library ID Load with key:value format as follows: "element_list":[ { "element_id": long }, { "element_id": long } ]The amount of reference element is related to |
| `element_id` | long | **Yes** | — | Element |
| `aspect_ratio` | string | No | 16:9 | Aspect ratio of the generated images (width:height)Enum: 16:99:161:14:33:43:22:321:9Different model versions support varying ranges. For details, refer to the Capability Map |
| `watermark_info` | object | No | — | Whether to generate watermarked results simultaneously Defined by the enabled parameter, format: "watermark_info": { "enabled": boolean } true: generate watermarked result, false: do not generate Cust |
| `callback_url` | string | No | — | The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes. For specific message schema, see Callback Protocol |
| `external_task_id` | string | No | — | Customized Task ID Will not overwrite system-generated task ID, but supports querying task by this ID Please note that the customized task ID must be unique within a single user account. cURLcURLcurl  |

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
      "images": [
        {
          "index": 0,
          "url": "string"
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

1. **Create Task** — `POST /v1/images/generations` → returns `task_id` with status `submitted`
2. **Poll Status** — `GET /v1/images/generations/{task_id}` → status cycles: `submitted` → `processing` → `succeed` / `failed`
3. **Get Result** — When `task_status === "succeed"`, result URLs are in `data.task_result.images[].url`

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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FimageGeneration)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
