---
name: replicate-lucataco-ace-step
description: >
  Use this skill for the Replicate Ace Step model (lucataco/ace-step). Use the Ace Step model via Replicate API.
---

# Ace Step

**Model:** `lucataco/ace-step`
**Source:** https://replicate.com/lucataco/ace-step
**Version:** `280fc4f9ee507577f880a167f639c02622421d8fecf492454320311217b688f1`

---

## Quick Start

### 1. Install the Client

```bash
npm install replicate
```

### 2. Set Your API Token

```bash
export REPLICATE_API_TOKEN="YOUR_API_TOKEN"
```

### 3. Run the Model

```javascript
import Replicate from "replicate";

const replicate = new Replicate();

const output = await replicate.run("lucataco/ace-step", {
  input: {
        "tags": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("lucataco/ace-step",
    input={
        "tags": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/lucataco/ace-step/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"tags": "your value here"}}'
```

---

## Authentication

Set the `REPLICATE_API_TOKEN` environment variable, or pass directly:

```javascript
const replicate = new Replicate({ auth: "YOUR_API_TOKEN" });
```

```python
import replicate
client = replicate.Client(api_token="YOUR_API_TOKEN")
```

---

## Input Schema

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `tags` | string | **Yes** |  | Text prompts to guide music generation, e.g., 'epic,cinematic' |
| `lyrics` | string | No |  | Lyrics for the music. Use [verse], [chorus], and [bridge] to separate different parts of the lyrics. Use [instrumenta... |
| `duration` | float | No | `60` | Duration of the generated audio in seconds. -1 means a random duration between 30 and 240 seconds. |
| `number_of_steps` | integer | No | `60` | Number of inference steps. |
| `seed` | integer | No | `-1` | Random seed. Set to -1 to randomize. |
| `scheduler` | enum: `euler`, `heun` | No | `"euler"` | Scheduler type. |
| `guidance_type` | enum: `apg`, `cfg`, `cfg_star` | No | `"apg"` | Guidance type for CFG. |
| `granularity_scale` | float | No | `10` | Omega scale for APG guidance, or similar for other CFG types. |
| `guidance_interval` | float | No | `0.5` | Guidance interval. |
| `guidance_interval_decay` | float | No | `0` | Guidance interval decay. |
| `guidance_scale` | float | No | `15` | Overall guidance scale. |
| `min_guidance_scale` | float | No | `3` | Minimum guidance scale. |
| `tag_guidance_scale` | float | No | `0` | Guidance scale for tags (text prompt). |
| `lyric_guidance_scale` | float | No | `0` | Guidance scale for lyrics. |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "lucataco/ace-step",
  input: {
        "tags": "your value here"
    },
  webhook: "https://optional.webhook.url/for/results",
  webhook_events_filter: ["completed"],
});
console.log(prediction.id);
```

### Get Prediction Status

```javascript
const prediction = await replicate.predictions.get("<prediction_id>");
console.log(prediction.status); // starting, processing, succeeded, failed, canceled
console.log(prediction.output);
```

### Cancel Prediction

```javascript
await replicate.predictions.cancel("<prediction_id>");
```

---

## Tips

- `replicate.run()` is the simplest way — it polls until the prediction completes.
- Use `replicate.predictions.create()` + webhooks for production workloads.
- File inputs accept URLs or base64-encoded data URIs.
- Use `replicate.stream()` for models that support streaming output.

## References

- Model page: https://replicate.com/lucataco/ace-step
- API page: https://replicate.com/lucataco/ace-step/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
