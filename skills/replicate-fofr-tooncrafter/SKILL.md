---
name: replicate-fofr-tooncrafter
description: >
  Use this skill for the Replicate Tooncrafter model (fofr/tooncrafter). Use the Tooncrafter model via Replicate API.
---

# Tooncrafter

**Model:** `fofr/tooncrafter`
**Source:** https://replicate.com/fofr/tooncrafter
**Version:** `0486ff07368e816ec3d5c69b9581e7a09b55817f567a0d74caad9395c9295c77`

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

const output = await replicate.run("fofr/tooncrafter", {
  input: {
        "image_1": "https://example.com/input.png",
        "image_2": "https://example.com/input.png"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("fofr/tooncrafter",
    input={
        "image_1": "https://example.com/input.png",
        "image_2": "https://example.com/input.png"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/fofr/tooncrafter/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"image_1": "https://example.com/input.png", "image_2": "https://example.com/input.png"}}'
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
| `prompt` | string | No | `""` |  |
| `negative_prompt` | string | No | `""` | Things you do not want to see in your video |
| `max_width` | integer | No | `512` | Maximum width of the video |
| `max_height` | integer | No | `512` | Maximum height of the video |
| `image_1` | string (URL) | **Yes** |  | First input image |
| `image_2` | string (URL) | **Yes** |  | Second input image |
| `image_3` | string (URL) | No |  | Third input image (optional) |
| `image_4` | string (URL) | No |  | Fourth input image (optional) |
| `image_5` | string (URL) | No |  | Fifth input image (optional) |
| `image_6` | string (URL) | No |  | Sixth input image (optional) |
| `image_7` | string (URL) | No |  | Seventh input image (optional) |
| `image_8` | string (URL) | No |  | Eighth input image (optional) |
| `image_9` | string (URL) | No |  | Ninth input image (optional) |
| `image_10` | string (URL) | No |  | Tenth input image (optional) |
| `loop` | boolean | No | `false` | Loop the video |
| `interpolate` | boolean | No | `false` | Enable 2x interpolation using FILM |
| `color_correction` | boolean | No | `true` | If the colors are coming out strange, or if the colors between your input images are very different, disable this |
| `seed` | integer | No |  | Set a seed for reproducibility. Random by default. |

---

## Output Schema

**Type:** list<string (URL)>
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "fofr/tooncrafter",
  input: {
        "image_1": "https://example.com/input.png",
        "image_2": "https://example.com/input.png"
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

- Model page: https://replicate.com/fofr/tooncrafter
- API page: https://replicate.com/fofr/tooncrafter/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
