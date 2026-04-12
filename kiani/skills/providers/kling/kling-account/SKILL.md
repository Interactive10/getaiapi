---
name: kling-account
description: >
  Use this skill for the Kling AI Account Information API. Query resource package list, remaining balances, and usage costs under the account.
---

# Kling Account Information

Query resource package subscriptions and remaining balances under a Kling AI account.

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## API Reference

### Query Resource Package List and Remaining Balances

**GET** `/account/costs`

Free to call. Returns all resource packages (video, image, virtual try-on) and their remaining quantities.

> **Note:** Remaining quantity statistics have a **12-hour delay**. Control request rate to QPS ≤ 1.

#### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `start_time` | `int` | Required | Query start time, Unix timestamp in ms |
| `end_time` | `int` | Required | Query end time, Unix timestamp in ms |
| `resource_pack_name` | `string` | Optional | Filter by exact resource package name |

#### Request Example

```bash
curl --request GET \
  --url 'https://api-singapore.klingai.com/account/costs?start_time=1726124664368&end_time=1727366400000' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json'
```

#### Response (200)

```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "code": 0,
    "msg": "string",
    "resource_pack_subscribe_infos": [
      {
        "resource_pack_name": "Video Generation - 10,000 entries",
        "resource_pack_id": "509f3fd3d4ab4a3f9eec5db27aa44f27",
        "resource_pack_type": "decreasing_total",
        "total_quantity": 200.0,
        "remaining_quantity": 118.0,
        "purchase_time": 1726124664368,
        "effective_time": 1726124664368,
        "invalid_time": 1727366400000,
        "status": "expired"
      }
    ]
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `resource_pack_name` | `string` | Human-readable package name |
| `resource_pack_id` | `string` | Unique package identifier |
| `resource_pack_type` | `string` | `"decreasing_total"` = fixed total that decreases; `"constant_period"` = periodic refresh |
| `total_quantity` | `float` | Total units in the package |
| `remaining_quantity` | `float` | Remaining units (12h delay) |
| `purchase_time` | `int` | Purchase time, Unix ms |
| `effective_time` | `int` | Activation time, Unix ms |
| `invalid_time` | `int` | Expiration time, Unix ms |
| `status` | `string` | `"toBeOnline"` = pending; `"online"` = active; `"expired"` = expired; `"runOut"` = exhausted |

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.
