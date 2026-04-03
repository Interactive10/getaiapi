---
name: kling-ai-multi-shot
description: >
  Use this skill for the Kling AI Multi-Shot API. Generate multi-angle reference images from a single frontal element image for use in video generation.
---

# Kling AI Multi-Shot

Generate multi-angle reference images from a single frontal element image. Produces 3 images per result (url_1, url_2, url_3) showing different angles/views of the subject.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/general/ai-multi-shot`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `element_frontal_image` | `string` | Required |  | Frontal element image. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. |
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
    "task_info": { "external_task_id": "string" },
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (Single)

**GET** `/v1/general/ai-multi-shot/{task_id}`

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
    "task_info": { "external_task_id": "string" },
    "task_result": {
      "images": [
        {
          "index": 0,
          "url_1": "string",
          "url_2": "string",
          "url_3": "string"
        }
      ]
    },
    "final_unit_deduction": "string",
    "created_at": 1722769557708,
    "updated_at": 1722769557708
  }
}
```

### Query Task (List)

**GET** `/v1/general/ai-multi-shot`

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
