---
name: replicate-openai-gpt-5-structured
description: >
  Use this skill for the Replicate Gpt 5 Structured model (openai/gpt-5-structured). Use the Gpt 5 Structured model via Replicate API.
---

# Gpt 5 Structured

**Model:** `openai/gpt-5-structured`
**Source:** https://replicate.com/openai/gpt-5-structured
**Version:** `9f4cd9ec1133f55d442aeb426e42df5180a56e79a33183623611d62d4c3b44ae`

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

const output = await replicate.run("openai/gpt-5-structured", {
  input: {
        "prompt": "your prompt here"
      },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("openai/gpt-5-structured",
    input={
        "prompt": "your prompt here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/openai/gpt-5-structured/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"prompt": "your prompt here"}}'
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
| `model` | enum: `gpt-5`, `gpt-5-mini`, `gpt-5-nano` | No | `"gpt-5"` | GPT-5 model to use. |
| `prompt` | string | No |  | A simple text input to the model, equivalent to a text input with the user role. Ignored if input_item_list is provided. |
| `instructions` | string | No |  | A system (or developer) message inserted into the model's context. When using along with previous_response_id, the in... |
| `image_input` | list<string (URL)> | No | `[]` | List of images to send to the model |
| `reasoning_effort` | enum: `minimal`, `low`, `medium`, `high` | No | `"minimal"` | Constrains effort on reasoning for GPT-5 models. Currently supported values are minimal, low, medium, and high. The m... |
| `verbosity` | enum: `low`, `medium`, `high` | No | `"medium"` | Constrains the verbosity of the model's response. Lower values will result in more concise responses, while higher va... |
| `enable_web_search` | boolean | No | `false` | Allow GPT-5 to use web search for the response. |
| `simple_schema` | list<string> | No | `[]` | Create a JSON schema for the output to conform to. The schema will be created from a simple list of field specificati... |
| `input_item_list` | list<object> | No | `[]` | A list of one or many input items to the model, containing different content types. This parameter corresponds with t... |
| `previous_response_id` | string | No |  | The ID of a previous response to continue from. |
| `tools` | list<object> | No | `[]` | Tools to make available to the model. Should be a JSON object containing a list of tool definitions. |
| `json_schema` | Json Schema | No | `{}` | A JSON schema that the response must conform to. For simple data structures we recommend using `simple_text_format_sc... |
| `max_output_tokens` | integer | No |  | Maximum number of completion tokens to generate. For higher reasoning efforts you may need to increase your max_compl... |

---

## Output Schema

**Type:** Output
**Description:** Model output

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "openai/gpt-5-structured",
  input: {
        "prompt": "your prompt here"
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

- Model page: https://replicate.com/openai/gpt-5-structured
- API page: https://replicate.com/openai/gpt-5-structured/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
