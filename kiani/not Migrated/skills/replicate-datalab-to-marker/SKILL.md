---
name: replicate-datalab-to-marker
description: >
  Use this skill for the Replicate Marker model (datalab-to/marker). Use the Marker model via Replicate API.
---

# Marker

**Model:** `datalab-to/marker`
**Source:** https://replicate.com/datalab-to/marker
**Version:** `60af7e72bef73c71197269b27a98929910d7496806efecac17d9deab596e5239`

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

const output = await replicate.run("datalab-to/marker", {
  input: {
        "file": "your value here"
    },
});
console.log(output);
```

### Python Example

```python
import replicate

output = replicate.run("datalab-to/marker",
    input={
        "file": "your value here"
    },
)
print(output)
```

### cURL Example

```bash
curl -s -X POST https://api.replicate.com/v1/models/datalab-to/marker/predictions \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input": {"file": "your value here"}}'
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
| `mode` | enum: `fast`, `balanced`, `accurate` | No | `"fast"` | Processing mode affecting speed and quality. 'fast': lowest latency, preserves most positional information. 'balanced... |
| `file` | string (URL) | **Yes** |  | Input file. Must be one of: .pdf, .doc, .docx, .ppt, .pptx, .png, .jpg, .jpeg, .webp |
| `use_llm` | boolean | No | `false` | Use an LLM to significantly improve accuracy for tables, forms, inline math, and layout detection. This merges tables... |
| `paginate` | boolean | No | `false` | Add page separators to the output. Each page will be separated by a horizontal rule containing the page number in the... |
| `force_ocr` | boolean | No | `false` | Force OCR on all pages even if text is extractable. By default, Marker automatically uses OCR only when needed (e.g.,... |
| `max_pages` | integer | No |  | Maximum number of pages to process. Cannot be specified if page_range is set - these parameters are mutually exclusive |
| `page_range` | string | No |  | Page range to parse, comma separated like 0,5-10,20. Example: '0,2-4' will process pages 0, 2, 3, and 4. Cannot be sp... |
| `skip_cache` | boolean | No | `false` | Bypass the server-side cache and force re-processing. By default, identical requests are cached to save time and cost... |
| `page_schema` | string | No |  | Structured extraction: Provide a JSON Schema to extract specific fields from your document. When provided, the model ... |
| `format_lines` | boolean | No | `false` | Detect and format inline mathematical expressions and text styles (bold, italic, etc.) in the output. Useful for docu... |
| `save_checkpoint` | boolean | No | `false` | Save processing checkpoint for iterative refinement. Checkpoints can be used with the Marker Prompt API to apply cust... |
| `disable_ocr_math` | boolean | No | `false` | Disable recognition of inline mathematical expressions during OCR. By default, math expressions are detected and can ... |
| `include_metadata` | boolean | No | `false` | Include detailed metadata and JSON structure in the output. When enabled, returns json_data (hierarchical document st... |
| `additional_config` | string | No |  | Advanced configuration options as JSON string. Options include: 'disable_links' (remove hyperlinks), 'keep_pageheader... |
| `strip_existing_ocr` | boolean | No | `false` | Remove embedded OCR text layer from the PDF and re-run OCR from scratch. Some PDFs have low-quality embedded OCR text... |
| `segmentation_schema` | string | No |  | JSON Schema for document segmentation. Define segment names and descriptions to identify and extract different sectio... |
| `block_correction_prompt` | string | No |  | Optional text prompt to guide output improvements. Use this to specify formatting preferences or extraction requireme... |
| `disable_image_extraction` | boolean | No | `false` | Skip extracting images from the PDF. By default, images are extracted and returned as base64-encoded data in the imag... |

---

## Output Schema

| Field | Type | Description |
| --- | --- | --- |
| `images` | list<> |  |
| `markdown` | string |  |
| `metadata` | Metadata |  |
| `json_data` | Json Data |  |
| `page_count` | integer |  |
| `extraction_schema_json` | string |  |

---

## Async API (Long-Running Predictions)

### Create Prediction

```javascript
const prediction = await replicate.predictions.create({
  model: "datalab-to/marker",
  input: {
        "file": "your value here"
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

- Model page: https://replicate.com/datalab-to/marker
- API page: https://replicate.com/datalab-to/marker/api
- Replicate docs: https://replicate.com/docs
- Node.js client: https://github.com/replicate/replicate-javascript
- Python client: https://github.com/replicate/replicate-python
