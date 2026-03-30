---
name: replicate-awilliamson10-meta-nougat
description: >
  Use this skill for the Replicate Meta Nougat model (awilliamson10/meta-nougat). Use the Meta Nougat model via Replicate API.
---

# Meta Nougat

**Model:** `awilliamson10/meta-nougat`
**Source:** https://replicate.com/awilliamson10/meta-nougat
**Version:** `872fa99400b0eeb8bfc82ef433aa378976b4311178ff64fed439470249902071`

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

const output = await replicate.run("awilliamson10/meta-nougat", {
  input: {
        "pdf_link": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("awilliamson10/meta-nougat",
    input={
        "pdf_link": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/awilliamson10/meta-nougat/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"pdf_link": "your value here"}}'
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
| `pdf_link` | string | **Yes** |  | Link to the PDF to be annotated |

---

## Output Schema

**Type:** string
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "awilliamson10/meta-nougat",
  input: {
        "pdf_link": "your value here"
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

- Model page: https://replicate.com/awilliamson10/meta-nougat
- API page: https://replicate.com/awilliamson10/meta-nougat/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
