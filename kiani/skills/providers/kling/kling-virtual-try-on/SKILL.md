---
name: kling-virtual-try-on
description: >
  Use this skill for the Kling AI Virtual Try-On API. Generate virtual try-on images by combining a human reference image with a clothing image.
---

# Kling Virtual Try-On

Generate virtual try-on images by combining a human reference image with a clothing image. Supports single clothing items (upper, lower, dress) and upper+lower combinations (v1.5 model).

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/images/kolors-virtual-try-on`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `model_name` | `string` | Optional | `kolors-virtual-try-on-v1` | Model Name. Enum: `kolors-virtual-try-on-v1`, `kolors-virtual-try-on-v1-5` |
| `human_image` | `string` | Required |  | Reference human image. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px. When using Base64, do NOT add prefix. |
| `cloth_image` | `string` | Required |  | Reference clothing image. Supports product images or white-background clothing images. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px. v1-5 model supports "upper + lower" combination input (merge into one image with white background). Valid combos: upper+lower. Invalid: upper+upper, lower+lower, dress+dress, upper+dress, lower+dress. |
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
    "task_status": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/images/kolors-virtual-try-on/{task_id}`

Returns image result with `images[].index` and `images[].url`.

### Query Task (List)

**GET** `/v1/images/kolors-virtual-try-on`

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
