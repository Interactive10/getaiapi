---
name: kling-tts
description: >
  Use this skill for the Kling AI Text-to-Speech (TTS) API. Synthesize speech audio from text input with configurable voice, language, and speed.
---

# Kling TTS (Text-to-Speech)

Synthesize speech audio from text using various voice options with configurable language and speed settings.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Create Task

**POST** `/v1/audio/tts`

This is a synchronous API that returns the result directly in the response.

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Required |  | Text content for audio synthesis. Max 1000 characters. |
| `voice_id` | `string` | Required |  | Voice ID. See Voice Guide for available voices. Voice preview naming: Voice Name#Voice ID#Voice Language. |
| `voice_language` | `string` | Required | `zh` | Voice language. Enum: `zh` (Chinese), `en` (English). Must correspond to the Voice ID. |
| `voice_speed` | `float` | Optional | `1.0` | Speech rate. Range: [0.8, 2.0], one decimal place precision. Values outside range are automatically rounded. |

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
    "task_result": {
      "audios": [
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

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.
