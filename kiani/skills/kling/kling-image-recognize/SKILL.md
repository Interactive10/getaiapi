---
name: kling-image-recognize
description: >
  Use this skill for the Kling AI Kling Image Recognize API (/v1/images/image-recognize).
  Recognize and understand image content using the Kling AI API. Extract descriptions, objects, and semantic information from images.
---

# Kling Image Recognize

Recognize and understand image content using the Kling AI API. Extract descriptions, objects, and semantic information from images.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/images/image-recognize`
**Query Task:** `GET /v1/images/image-recognize/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FimageRecognize)

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
  --url https://api-singapore.klingai.com/v1/images/image-recognize \
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
    "https://api-singapore.klingai.com/v1/images/image-recognize",
    json=payload,
    headers=HEADERS,
)
task_id = resp.json()["data"]["task_id"]
print(f"Task created: {task_id}")

# 2. Poll for result
while True:
    result = requests.get(
        f"https://api-singapore.klingai.com/v1/images/image-recognize/{task_id}",
        headers=HEADERS,
    ).json()
    status = result["data"]["task_status"]
    print(f"Status: {status}")
    if status == "succeed":
        audio_url = result["data"]["audios[0].url"]
        print(f"Result: {audio_url}")
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
const createResp = await fetch("https://api-singapore.klingai.com/v1/images/image-recognize", {
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
  const resp = await fetch(`https://api-singapore.klingai.com/v1/images/image-recognize/${taskId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const result = await resp.json();
  if (result.data.task_status === "succeed") {
    console.log("Result:", result.data.audios[0].url);
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

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `image` | string | **Yes** | — | Image to be recognizedSupport inputting image Base64 encoding or image URL (ensure accessibility). Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 |

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
          "id": "string",
          "url": "string",
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

1. **Create Task** — `POST /v1/images/image-recognize` → returns `task_id` with status `submitted`
2. **Poll Status** — `GET /v1/images/image-recognize/{task_id}` → status cycles: `submitted` → `processing` → `succeed` / `failed`
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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FimageRecognize)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)

---

## Raw Documentation

<details>
<summary>Full API documentation text</summary>

```
Image RecognizeImage RecognizePOST/v1/videos/image-recognizecURLcURLCopyCollapsecurl --request POST \
  --url https://api-singapore.klingai.com/v1/videos/image-recognize \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "image": "https://p2-kling.klingai.com/kcdn/cdn-kcdn112452/kling-qa-test/multi-1.png"
  }'200CopyCollapse{
  "code": 0, // Error codes; Specific definitions can be found in Error codes
  "message": "string", // Error information
  "request_id": "string", // Request ID, generated by the system, is used to track requests and troubleshoot problems
  "data": {
    "final_unit_deduction": "string", //  The deduction units of task
    "task_result": {
      "images": [
        {
          "type": "object_seg", // Identification of subject recognition results
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "head_seg", // Identification of facial recognition results for individuals with hair included
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "face_seg", // Identification of facial recognition results for individuals without hair included
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "cloth_seg", // Identification of clothing recognition results
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        }
      ]
    },
    "final_unit_deduction": "string" // The deduction units of task
  }
}Request HeaderContent-TypestringRequiredDefault to application/jsonData Exchange FormatAuthorizationstringRequiredAuthentication information, refer to API authenticationRequest BodyimagestringRequiredImage to be recognizedSupport inputting image Base64 encoding or image URL (ensure accessibility).
Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 encoding format. When submitting data, do not add any prefixes to the Base64-encoded string, such as data:image/png;base64,. The correct parameter format should be the Base64-encoded string itself. Please provide only the Base64-encoded string portion so that the system can correctly process and parse your data.
Supported image formats: .jpg / .jpeg / .png. The image file size cannot exceed 10MB, and the width and height dimensions of the image shall not be less than 300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1.
cURLcURLCopyCollapsecurl --request POST \
  --url https://api-singapore.klingai.com/v1/videos/image-recognize \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "image": "https://p2-kling.klingai.com/kcdn/cdn-kcdn112452/kling-qa-test/multi-1.png"
  }'200CopyCollapse{
  "code": 0, // Error codes; Specific definitions can be found in Error codes
  "message": "string", // Error information
  "request_id": "string", // Request ID, generated by the system, is used to track requests and troubleshoot problems
  "data": {
    "final_unit_deduction": "string", //  The deduction units of task
    "task_result": {
      "images": [
        {
          "type": "object_seg", // Identification of subject recognition results
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "head_seg", // Identification of facial recognition results for individuals with hair included
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "face_seg", // Identification of facial recognition results for individuals without hair included
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        },
        {
          "type": "cloth_seg", // Identification of clothing recognition results
          "is_contain": true, // Has the subject been identified; Boolean value
          "url": "string" //URL for generating videos，such as https://p1.a.kwimgs.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_46554461/-2878350957757294165/output.png（请注意，为保障信息安全，生成的图片/视频会在30天后被清理，请及时转存）
        }
      ]
    },
    "final_unit_deduction": "string" // The deduction units of task
  }
}
```

</details>
