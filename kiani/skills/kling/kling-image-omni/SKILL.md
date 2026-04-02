---
name: kling-image-omni
description: >
  Use this skill for the Kling AI Kling Image Omni API (/v1/images/generations).
  Unified image generation endpoint using the Kling Omni model. Supports text-to-image, image-to-image, element control, and series generation through a single API.
---

# Kling Image Omni

Unified image generation endpoint using the Kling Omni model. Supports text-to-image, image-to-image, element control, and series generation through a single API.

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/images/generations`
**Query Task:** `GET /v1/images/generations/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FOmniImage)

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
    "model_name": "kling-v3-omni",
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
| `kling-v3-omni` | V3 Omni, unified model with prompt-based element references |
| `kling-image-o1` | Image O1, reasoning-enhanced image generation |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model_name` | string | No | kling-image-o1 | Model NameEnum: kling-image-o1kling-v3- |
| `omniprompt` | string | **Yes** | — | Text prompt words, which can include positive and negative descriptions The prompt words can be templated to meet different image generation needs Must not exceed 2,500 characters Specify an image in  |
| `image_list` | array | No | — | Reference Image List Load with key:value format as follows: "image_list":[ { "image":"image_url" } ] Supports inputting image Base64 encoding or image URL (ensure accessibility) Supported image format |
| `image` | string | **Yes** | — | Image URL or Base64 |
| `stringelement_list` | array | No | — | Reference Element List based on element ID configuration Load with key:value format as follows: "element_list":[ { "element_id": 829836802793406551 } ] The sum of reference elements and reference imag |
| `element_id` | long | **Yes** | — | Element ID from element |
| `libraryresolution` | string | No | 1k | Image generation resolutionEnum: 1k2k4k 1k: 1K standard definition 2k: 2K high-res 4k: 4K high-res The support range for different model versionsvaries. For details, see Capability Map |
| `result_type` | string | No | single | Control whether to generate a single image or a series of imagesEnum: singleseriesThe support range for different model versionsvaries. For details, see Capability Map |
| `series_amount` | int | No | 4 | Number of images in a series Value range: [2, 9] When result_type is single, this parameter is invalid The support range for different model versionsvaries. For details, see Capability Map |
| `aspect_ratio` | string | No | auto | Aspect ratio of the generated images (width:height)Enum: 16:99:161:14:33:43:22:321:9auto auto is to intelligently aspect ratio of the generated image based on incoming content. When generating a new i |
| `watermark_info` | object | No | — | Whether to generate watermarked results simultaneously Defined by the enabled parameter, format: "watermark_info": { "enabled": boolean } true: generate watermarked result, false: do not generate Cust |
| `callback_url` | string | No | — | The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes For the specific message schema, see Callback Protocol |
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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FOmniImage)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
