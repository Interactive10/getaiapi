---
name: replicate-adirik-text2tex
description: >
  Use this skill for the Replicate Text2Tex model (adirik/text2tex). Use the Text2Tex model via Replicate API.
---

# Text2Tex

**Model:** `adirik/text2tex`
**Source:** https://replicate.com/adirik/text2tex
**Version:** `e4d7ce43a04fee4af4deae267171f2538a5e3f0761d94078465d0196f6cb6387`

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

const output = await replicate.run("adirik/text2tex", {
  input: {
        "prompt": "your prompt here",
        "obj_file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("adirik/text2tex",
    input={
        "prompt": "your prompt here",
        "obj_file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/adirik/text2tex/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here", "obj_file": "your value here"}}'
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
| `obj_file` | string (URL) | **Yes** |  | 3D object (shape) file to generate the texture onto |
| `prompt` | string | **Yes** |  | Prompt to generate a 3D object. |
| `negative_prompt` | string | No | `""` | Negative prompt to generate a 3D object. |
| `ddim_steps` | integer | No | `50` | Number of steps for DDIM |
| `new_strength` | float | No | `1` | Amount of DDIM steps for the new view |
| `update_strength` | float | No | `0.3` | Amount of DDIM steps for updating the view |
| `num_viewpoints` | enum (8 values) | No | `36` | Number of viewpoints |
| `viewpoint_mode` | enum: `predefined`, `hemisphere` | No | `"predefined"` | Viewpoint mode |
| `update_steps` | integer | No | `20` | Number of update steps |
| `update_mode` | enum: `sequential`, `heuristic`, `random` | No | `"heuristic"` | Update mode |
| `seed` | integer | No |  | Seed |

---

## Output Schema

**Type:** string (URL)
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "adirik/text2tex",
  input: {
        "prompt": "your prompt here",
        "obj_file": "your value here"
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

- Model page: https://replicate.com/adirik/text2tex
- API page: https://replicate.com/adirik/text2tex/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
