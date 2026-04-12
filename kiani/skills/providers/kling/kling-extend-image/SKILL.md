---
name: kling-extend-image
description: >
  Use this skill for the Kling AI Image Expansion (Outpainting) API. Expand images in any direction with configurable expansion ratios and optional text prompts.
---

# Kling Image Expansion

Expand images by outpainting in any direction (up, down, left, right) with configurable expansion ratios. The total area of the new image must not exceed 3x the original.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/images/editing/expand`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | Required |  | Reference image. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. When using Base64, do NOT add prefix. |
| `up_expansion_ratio` | `float` | Required |  | Upward expansion ratio (multiples of original height). Range: [0, 2]. Total new area must not exceed 3x original. |
| `down_expansion_ratio` | `float` | Required |  | Downward expansion ratio. Range: [0, 2]. |
| `left_expansion_ratio` | `float` | Required |  | Leftward expansion ratio (multiples of original width). Range: [0, 2]. |
| `right_expansion_ratio` | `float` | Required |  | Rightward expansion ratio. Range: [0, 2]. |
| `prompt` | `string` | Optional |  | Positive text prompt. Max 2500 characters. |
| `n` | `int` | Optional | `1` | Number of generated images. Range: [1, 9] |
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

**GET** `/v1/images/editing/expand/{task_id}`

Returns task status and result with expanded image URLs.

### Query Task (List)

**GET** `/v1/images/editing/expand`

#### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageNum` | `int` | Optional | `1` | Page number. Range: [1, 1000] |
| `pageSize` | `int` | Optional | `30` | Items per page. Range: [1, 500] |

---

## Expansion Ratio Calculation

```python
import math

def calculate_expansion_ratios(width, height, area_multiplier, aspect_ratio):
    target_area = area_multiplier * width * height
    target_height = math.sqrt(target_area / aspect_ratio)
    target_width = target_height * aspect_ratio
    expand_top = (target_height - height) / 2
    expand_left = (target_width - width) / 2
    top_ratio = expand_top / height
    left_ratio = expand_left / width
    return f"{top_ratio:.4f},{top_ratio:.4f},{left_ratio:.4f},{left_ratio:.4f}"

# Example: 100x100, 3x area, 16:9 ratio -> "0.1495,0.1495,0.6547,0.6547"
```

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.

## Callback Protocol

POST notifications on task status changes when callback_url is configured. Generated assets cleared after 30 days.
