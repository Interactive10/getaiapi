---
name: replicate-zsxkib-yolo-world
description: >
  Use this skill for the Replicate Yolo World model (zsxkib/yolo-world). Use the Yolo World model via Replicate API.
---

# Yolo World

**Model:** `zsxkib/yolo-world`
**Source:** https://replicate.com/zsxkib/yolo-world
**Version:** `07aee09fc38bc4459409caa872ea416717712f4e6e875f8751a0d0d5bbea902f`

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

const output = await replicate.run("zsxkib/yolo-world", {
  input: {
        "input_media": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("zsxkib/yolo-world",
    input={
        "input_media": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/zsxkib/yolo-world/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"input_media": "your value here"}}'
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
| `input_media` | string (URL) | **Yes** |  | Path to the input image or video |
| `class_names` | string | No | `"dog, eye, tongue, ear, leash, backpack, person, nose"` | Enter the classes to be detected, separated by comma |
| `max_num_boxes` | integer | No | `100` | Maximum number of bounding boxes to display |
| `score_thr` | float | No | `0.05` | Score threshold for displaying bounding boxes |
| `nms_thr` | float | No | `0.5` | NMS threshold |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "zsxkib/yolo-world",
  input: {
        "input_media": "your value here"
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

- Model page: https://replicate.com/zsxkib/yolo-world
- API page: https://replicate.com/zsxkib/yolo-world/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
