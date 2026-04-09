---
name: kling-rate-limits
description: >
  Use this skill to understand Kling AI concurrency rules, rate limits, and how to handle over-limit errors when submitting generation tasks.
---

# Kling Rate Limits & Concurrency Rules

**Provider:** Kling AI
**API Base:** https://api-singapore.klingai.com

---

## Concurrency Model

Kling does not enforce a QPS (queries per second) limit. Rate limiting is based on **concurrent task count** only.

- Applies only to **task creation** endpoints — query/poll endpoints do not consume concurrency.
- Concurrency is calculated at the **account level**, shared across all API keys under the same account.
- Concurrency quota is calculated **independently per resource pack type**: video, image, virtual try-on.

---

## Concurrency Rules

| Dimension | Rule |
|-----------|------|
| Scope | Account-level; all API keys share the same quota |
| Calculation per type | Video, image, and virtual try-on are tracked independently |
| Quota value | Determined by the highest concurrency value among all **active** packages of the same type |
| Occupancy start | When task enters `submitted` status |
| Occupancy end | When task completes (success or failure) — released immediately |
| Video / Virtual Try-On | Each task occupies **1** concurrency slot |
| Image generation | Each task occupies **`n`** concurrency slots (the `n` parameter in the request) |

**Example:** If a 5-concurrency video pack and a 10-concurrency video pack are both active, the effective video concurrency = **10**.

---

## Over-Limit Error

When running tasks reach the concurrency cap, any new submission returns:

```json
{
  "code": 1303,
  "message": "parallel task over resource pack limit",
  "request_id": "9984d27b-a408-4073-ae28-17ca6a13622d"
}
```

**This is not a parameter error** — it is a transient load condition.

### Recommended Handling

- **Exponential backoff**: Retry with increasing delays (initial delay ≥ 1 second recommended).
- **Task queue**: Control submission rate via a queue; adapt dynamically to available concurrency.
- **Do not** treat error code `1303` as permanent failure — it is always retryable.

---

## Authentication

JWT Bearer token using HS256 with access key and secret key. Token validity: 30 minutes.
