---
name: kling-image-generation
description: >
  Use this skill for the Kling AI Image Generation API. Generate images from text prompts with optional reference images, supporting multiple model versions and resolutions.
---

# Kling Image Generation

Generate images from text prompts with optional reference images, face/subject references, and element library support.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/images/generations`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v1` | Model Name. Enum: `kling-v1`, `kling-v1-5`, `kling-v2`, `kling-v2-new`, `kling-v2-1`, `kling-v3` |
| `prompt` | `string` | Required |  | Positive text prompt. Cannot exceed 2500 characters. |
| `negative_prompt` | `string` | Optional |  | Negative text prompt. Cannot exceed 2500 characters. Not supported in image-to-image scenario (when `image` field is not empty). |
| `image` | `string` | Optional |  | Reference image. Supports Base64 encoding or image URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, aspect ratio 1:2.5 ~ 2.5:1. Required when `image_reference` is not empty. |
| `image_reference` | `string` | Optional |  | Image reference type. Enum: `subject` (character feature reference), `face` (character appearance reference). When using `face`, uploaded image must contain only one face. Required when using kling-v1-5 and image parameter is not empty. |
| `image_fidelity` | `float` | Optional | `0.5` | Face reference intensity for user-uploaded images. Range: [0, 1]. Only kling-v1, kling-v1-5 support this parameter. |
| `human_fidelity` | `float` | Optional | `0.45` | Facial reference intensity (similarity of facial features). Only available when `image_reference` is `subject`. Range: [0, 1]. Only kling-v1-5 supports this parameter. |
| `element_list` | `array` | Optional |  | Reference element list based on element library ID. Sum of reference elements and reference images must not exceed 10. |
| `element_list[].element_id` | `long` | Required |  | Element ID |
| `resolution` | `string` | Optional | `1k` | Image generation resolution. Enum: `1k`, `2k` |
| `n` | `int` | Optional | `1` | Number of generated images. Range: [1, 9] |
| `aspect_ratio` | `string` | Optional | `16:9` | Aspect ratio (width:height). Enum: `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` |
| `watermark_info` | `object` | Optional |  | Watermark configuration. `{ "enabled": boolean }` |
| `callback_url` | `string` | Optional |  | Callback notification URL for task status changes. |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user account. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string",
    "task_info": {
      "external_task_id": "string"
    },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/images/generations/{task_id}`

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `task_id` | `string` | Required | Task ID for image generation |
| `external_task_id` | `string` | Optional | Custom task ID (alternative to task_id) |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_status": "string",
    "task_status_msg": "string",
    "final_unit_deduction": "string",
    "watermark_info": { "enabled": true },
    "task_info": { "external_task_id": "string" },
    "created_at": 1722769557708,
    "updated_at": 1722769557708,
    "task_result": {
      "images": [
        {
          "index": 0,
          "url": "string",
          "watermark_url": "string"
        }
      ]
    }
  }
}
```

### Query Task (List)

**GET** `/v1/images/generations`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Authentication

All requests require a JWT token in the `Authorization` header as a Bearer token. Generate the JWT using your access key (AK) and secret key (SK) with HS256 algorithm. The token should have an expiration of 30 minutes.

```
Authorization: Bearer <JWT_TOKEN>
```

## Callback Protocol

When `callback_url` is configured, the server sends a POST request with task status updates including `task_id`, `task_status` (submitted/processing/succeed/failed), `task_result` with generated image URLs, and timing information. Generated assets are cleared after 30 days.
