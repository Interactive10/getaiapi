---
name: kling-reference-to-image
description: >
  Use this skill for the Kling AI Multi-Image to Image API. Generate images from multiple subject reference images with optional scene and style references.
---

# Kling Multi-Image to Image (Reference to Image)

Generate images from multiple subject reference images combined with optional scene and style reference images. Supports up to 4 subject images with text prompts.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/images/multi-image2image`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-v2` | Model Name. Enum: `kling-v2`, `kling-v2-1` |
| `prompt` | `string` | Optional |  | Positive text prompt. Max 2500 characters. |
| `subject_image_list` | `array` | Required |  | Subject reference images. 1-4 images. Upload pre-cropped images (no API-side cropping). |
| `subject_image_list[].subject_image` | `string` | Required |  | Image URL or Base64. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. When using Base64, do NOT add prefix. |
| `scene_image` | `string` | Optional |  | Scene reference image. Same format requirements. |
| `style_image` | `string` | Optional |  | Style reference image. Same format requirements. |
| `n` | `int` | Optional | `1` | Number of generated images. Range: [1, 9] |
| `aspect_ratio` | `string` | Optional | `16:9` | Aspect ratio. Enum: `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` |
| `watermark_info` | `object` | Optional |  | Watermark config. `{ "enabled": boolean }` |
| `callback_url` | `string` | Optional |  | Callback URL for task status changes |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "task_id": "string",
    "task_info": { "external_task_id": "string" },
    "task_status": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/images/multi-image2image/{task_id}`

Returns image result with `images[].index`, `images[].url`, `images[].watermark_url`.

### Query Task (List)

**GET** `/v1/images/multi-image2image`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured. Generated assets cleared after 30 days.
