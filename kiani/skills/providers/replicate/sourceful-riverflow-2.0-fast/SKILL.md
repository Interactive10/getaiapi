---
name: replicate-sourceful-riverflow-2.0-fast
description: >
  Use this skill for the Replicate Riverflow 2.0 Fast model (sourceful/riverflow-2.0-fast). Use the Riverflow 2.0 Fast model via Replicate API.
---

# Riverflow 2.0 Fast

**Model:** `sourceful/riverflow-2.0-fast`
**Source:** https://replicate.com/sourceful/riverflow-2.0-fast
**Version:** `a1af72ca3c8327906b0fc231adfcf6d1f049d32f038ba7b9f65462545208e47d`

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

const output = await replicate.run("sourceful/riverflow-2.0-fast", {
  input: {
        "instruction": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("sourceful/riverflow-2.0-fast",
    input={
        "instruction": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/sourceful/riverflow-2.0-fast/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"instruction": "your value here"}}'
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
| `instruction` | string | **Yes** |  | Generation instruction (text-to-image or edit). Minimum 2 characters. |
| `init_images` | list<> | No |  | Optional init images (i2i). URLs or uploads. Pro: up to 10, Fast: up to 4. |
| `super_resolution_refs` | list<> | No |  | Optional reference images for detail fix (up to 4). Used in i2i and refsr. |
| `resolution` | enum: `1K`, `2K` | No | `"1K"` | Target resolution: 1K or 2K. |
| `aspect_ratio` | enum (11 values) | No | `"auto"` | Aspect ratio for output. auto uses model choice. |
| `output_format` | enum: `webp`, `png` | No | `"webp"` | Output image format. API returns webp; png will be converted in Python. |
| `font_urls` | list<string> | No |  | Optional font URLs (ttf/otf/woff/woff2). Up to 2. |
| `font_texts` | list<string> | No |  | Text strings matching font_urls (≤300 chars each). |
| `transparency` | boolean | No | `false` | Enable transparent background when supported. |
| `enhance_prompt` | boolean | No | `false` | Let model enhance the instruction. |
| `max_iterations` | integer | No | `1` | Number of internal reasoning iterations (1-3). |
| `safety_checker` | boolean | No | `true` | Enable Sourceful safety checker (t2i). |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "sourceful/riverflow-2.0-fast",
  input: {
        "instruction": "your value here"
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

- Model page: https://replicate.com/sourceful/riverflow-2.0-fast
- API page: https://replicate.com/sourceful/riverflow-2.0-fast/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
