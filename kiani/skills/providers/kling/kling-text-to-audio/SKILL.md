---
name: kling-text-to-audio
description: >
  Use this skill for the Kling AI Text to Audio API. Generate sound effects and ambient audio from text descriptions.
---

# Kling Text to Audio

Generate sound effects and ambient audio from text descriptions. Produces audio in both MP3 and WAV formats.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/audio/text-to-audio`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `prompt` | `string` | Required |  | Text prompt describing the desired sound. Max 200 characters. |
| `duration` | `float` | Required |  | Generated audio duration. Range: 3.0s - 10.0s, one decimal place precision. |
| `external_task_id` | `string` | Optional |  | Custom task ID. Must be unique per user. |
| `callback_url` | `string` | Optional |  | Callback URL for task status changes |

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

**GET** `/v1/audio/text-to-audio/{task_id}`

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
      "audios": [
        {
          "id": "string",
          "url_mp3": "string",
          "url_wav": "string",
          "duration_mp3": "string",
          "duration_wav": "string"
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

**GET** `/v1/audio/text-to-audio`

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
