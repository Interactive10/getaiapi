---
name: kling-image-omni
description: >
  Use this skill for the Kling AI Omni-Image API. Generate images using multi-modal prompts combining text, reference images, and elements with support for series generation.
---

# Kling Omni-Image

Generate images using multi-modal prompts that combine text, reference images, and elements. Supports series image generation and automatic aspect ratio detection.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/images/omni-image`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kling-image-o1` | Model Name. Enum: `kling-image-o1`, `kling-v3-omni` |
| `prompt` | `string` | Required |  | Text prompt. Max 2500 characters. Use `<<<image_1>>>` format to reference images. See KLING Omni Model User Guide for capabilities. |
| `image_list` | `array` | Optional |  | Reference image list. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. Sum of elements and images must not exceed 10. |
| `image_list[].image` | `string` | Required |  | Image URL or Base64 string |
| `element_list` | `array` | Optional |  | Reference element list. Sum of elements and images must not exceed 10. |
| `element_list[].element_id` | `long` | Required |  | Element ID from element library |
| `resolution` | `string` | Optional | `1k` | Image resolution. Enum: `1k`, `2k`, `4k` |
| `result_type` | `string` | Optional | `single` | Output type. Enum: `single` (single image), `series` (series of images) |
| `n` | `int` | Optional | `1` | Number of generated images. Range: [1, 9]. Invalid when result_type is `series`. |
| `series_amount` | `int` | Optional | `4` | Number of images in a series. Range: [2, 9]. Invalid when result_type is `single`. |
| `aspect_ratio` | `string` | Optional | `auto` | Aspect ratio. Enum: `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9`, `auto` (intelligent detection) |
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

**GET** `/v1/images/omni-image/{task_id}`

#### Response

Returns `task_result` with `result_type`, `images[]` (for single), and `series_images[]` (for series). Each contains `index`, `url`, and `watermark_url`.

### Query Task (List)

**GET** `/v1/images/omni-image`

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
