---
name: kling-text-to-video
description: >
  Use this skill for the Kling AI Kling Text to Video API (/v1/videos/text2video).
  Generate videos from text prompts using the Kling AI API. Supports multiple model versions (v1 through v3), standard/pro modes, multi-shot storyboards, camera control, sound generation, and variable duration (3-15s).
---

# Kling Text to Video

Generate videos from text prompts using the Kling AI API. Supports multiple model versions (v1 through v3), standard/pro modes, multi-shot storyboards, camera control, sound generation, and variable duration (3-15s).

**Provider:** Kling AI (Kuaishou)
**API Domain:** `https://api-singapore.klingai.com`
**Create Task:** `POST /v1/videos/text2video`
**Query Task:** `GET /v1/videos/text2video/{task_id}`
**Source:** [Kling API Docs](https://kling.ai/document-api/apiReference%2Fmodel%2FtextToVideo)

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
    "model_name": "kling-v2-6",
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
    "model_name": "kling-v2-6",
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
    "model_name": "kling-v2-6",
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
| `kling-v1` | V1 base model, 720p, 30fps |
| `kling-v1-6` | V1.6, multi-image support, 720p/1080p |
| `kling-v2-master` | V2 Master, 720p, 24fps |
| `kling-v2-1-master` | V2.1 Master, 1080p, 24fps |
| `kling-v2-5-turbo` | V2.5 Turbo, faster generation, 1080p |
| `kling-v2-6` | V2.6, latest v2 with sound + motion control |
| `kling-v3` | V3, 3-15s variable duration, multi-shot, std/pro |

---

## Input Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model_name` | string | No | kling-v1 | Model NameEnum: kling-v1kling-v1-6kling-v2-masterkling-v2-1-masterkling-v2-5-turbokling-v2-6kling- |
| `multi_shot` | boolean | No | false | Whether to generate multi-shot videoWhen true: the prompt parameter is invalid, and the first/end frame generation is not supported. When false: the shot_type and multi_prompt parameters are invalid |
| `shot_type` | string | No | — | Storyboard methodEnum: customizeintelligenceWhen multi_shot is true, this parameter is required |
| `prompt` | string | No | — | Positive text prompt💡The Omni model can achieve various capabilities through Prompt with elements, images, videos, and other content: Specify elements/images/videos using <<<>>> format, e.g.: <<<elem |
| `multi_prompt` | array | No | — | Each storyboard cue can include both positive and negative descriptionsDefine the shot sequence number, corresponding prompt word, and duration through the index, prompt, and duration parameters, wher |
| `negative_prompt` | string | No | — | Negative text prompt Cannot exceed 2500 characters It is recommended to supplement negative prompt via negative sentences within positive prompts |
| `sound` | string | No | off | Is sound generated simultaneously when generating videosEnum: onoffThe support range for different model versions and video modes varies. For details, see Capability Map |
| `cfg_scale` | float | No | 0.5 | The degree of freedom for generating video; the larger the value, the smaller the degree of freedom of the model Value range: [0, 1] kling-v2.x models do not support this parameter |
| `mode` | string | No | std | Video generation modeEnum: stdpro std: Standard mode, basic mode, cost-effective pro: Expert mode (high quality), high performance mode, better video quality The support range for different model vers |
| `camera_control` | object | No | — | Terms of controlling camera movement (if not specified, the model will intelligently match based on the input text/images)The support range for different model versions and video modes varies. For det |
| `type` | string | No | — | Predefined camera movements typeEnum: simpledown_backforward_upright_turn_forwardleft_turn_forward simple: Simple camera movement, you can choose one of six options in "config" down_back: Camera desce |
| `config` | object | No | — | Contains 6 fields, used to specify the camera's movement or change in different directions Required when type is simple, not required for other types Choose 1 of the following 6 parameters, only one c |
| `horizontal` | float | No | — | Horizontal, controls the camera's movement along the horizontal axis (translation along the x-axis) Value range: [-10, 10] Negative value indicates a translation to the left, positive value indicates  |
| `vertical` | float | No | — | Vertical, controls the camera's movement along the vertical axis (translation along the y-axis) Value range: [-10, 10] Negative value indicates a downward translation, positive value indicates an upwa |
| `pan` | float | No | — | Pan, controls the camera's rotation in the horizontal plane (rotation around the y-axis) Value range: [-10, 10] Negative value indicates rotation to the left around y-axis, positive value indicates ro |
| `tilt` | float | No | — | Tilt, controls the camera's rotation in the vertical plane (rotation around the x-axis) Value range: [-10, 10] Negative value indicates rotation down around x-axis, positive value indicates rotation u |
| `roll` | float | No | — | Roll, controls the camera's roll (rotation around the z-axis) Value range: [-10, 10] Negative value indicates counterclockwise rotation around z-axis, positive value indicates clockwise rotation aroun |
| `zoom` | float | No | — | Zoom, controls the camera's focal length change, affecting the distance of the field of view Value range: [-10, 10] Negative value indicates longer focal length, smaller field of view; positive value  |
| `aspect_ratio` | string | No | 16:9 | The aspect ratio of the generated video frame (width:height)Enum: 16:99:161: |
| `duration` | string | No | 5 | Video Length, unit: s (seconds)Enum: 3456789101112131415The support range for different model versions and video modes varies. For details, see Capability Map |
| `watermark_info` | object | No | — | Whether to generate watermarked results simultaneously Defined by the enabled parameter, format: "watermark_info": { "enabled": boolean } true: generate watermarked result, false: do not generate Cust |
| `callback_url` | string | No | — | Callback notification URL for this task result. If configured, the server will actively notify when the task status changes For specific message schema, see Callback Protocol |
| `external_task_id` | string | No | — | Customized Task ID Users can provide a customized task ID, which will not overwrite the system-generated task ID but can be used for task queries Must be unique within a single user account cURLcURLcu |

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

- [Kling API Documentation](https://kling.ai/document-api/apiReference%2Fmodel%2FtextToVideo)
- [Kling Developer Console](https://kling.ai/dev/api-key)
- [Authentication Guide](https://kling.ai/document-api/apiReference%2FcommonInfo)
- [Rate Limits](https://kling.ai/document-api/apiReference%2FrateLimits)
- [Callback Protocol](https://kling.ai/document-api/apiReference%2FcallbackProtocol)
- [Video Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FvideoModels)
- [Image Models Capability Map](https://kling.ai/document-api/apiReference%2Fmodel%2FimageModels)
