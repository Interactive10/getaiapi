---
name: kling-image-recognize
description: >
  Use this skill for the Kling AI Image Recognize API. Detect and segment subjects, faces, heads, and clothing in images.
---

# Kling Image Recognize

Detect and segment subjects, faces (with/without hair), and clothing in images. Returns segmentation masks for each detected element. This is a synchronous API.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Image Recognize

**POST** `/v1/videos/image-recognize`

#### Request Body

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | Required |  | Image to recognize. Supports Base64 or URL. Formats: .jpg/.jpeg/.png. Size: <=10MB, min 300px, ratio 1:2.5~2.5:1. When using Base64, do NOT add any prefix. |

#### Response

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "final_unit_deduction": "string",
    "task_result": {
      "images": [
        {
          "type": "object_seg",
          "is_contain": true,
          "url": "string"
        },
        {
          "type": "head_seg",
          "is_contain": true,
          "url": "string"
        },
        {
          "type": "face_seg",
          "is_contain": true,
          "url": "string"
        },
        {
          "type": "cloth_seg",
          "is_contain": true,
          "url": "string"
        }
      ]
    }
  }
}
```

#### Segmentation Types

| Type | Description |
|------|-------------|
| `object_seg` | Subject/object recognition result |
| `head_seg` | Facial recognition with hair included |
| `face_seg` | Facial recognition without hair |
| `cloth_seg` | Clothing recognition result |

Each result includes `is_contain` (boolean indicating if the subject was identified) and `url` (segmentation mask image URL).

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.
