#!/usr/bin/env python3
"""
WaveSpeed AI Skill Scraper — Auto-generate SKILL.md files for WaveSpeed AI models.

Uses WaveSpeed AI's API:
  - List models: GET https://api.wavespeed.ai/api/v3/models
  - Submit task:  POST https://api.wavespeed.ai/api/v3/{model_id}
  - Get result:   GET https://api.wavespeed.ai/api/v3/predictions/{task_id}

Requires WAVESPEED_API_KEY env var.

Usage:
  python tools/wavespeed-skill-scraper.py --dry-run
  python tools/wavespeed-skill-scraper.py --filter "text-to-video" --limit 5
  python tools/wavespeed-skill-scraper.py --model wavespeed-ai/flux-dev
  python tools/wavespeed-skill-scraper.py --verbose
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    print("Error: 'requests' package required. Install with: pip install requests")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

API_BASE = "https://api.wavespeed.ai/api/v3"
MODELS_URL = f"{API_BASE}/models"
WAVESPEED_PAGE = "https://wavespeed.ai/models/{model_id}"
DEFAULT_OUTPUT_DIR = "./skills"
DEFAULT_DELAY = 0.5
MAX_RETRIES = 3

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def get_token() -> str:
    """Get WaveSpeed API key from env."""
    token = os.environ.get("WAVESPEED_API_KEY", "")
    if not token:
        print("Error: WAVESPEED_API_KEY environment variable is required.")
        print("Get your key at: https://wavespeed.ai/accesskey")
        sys.exit(1)
    return token


def slugify(model_id: str) -> str:
    """Convert model_id like 'wavespeed-ai/flux-dev' to dir name 'wavespeed-ai-flux-dev'."""
    return model_id.replace("/", "-")


def fetch_json(url: str, token: str, params: dict | None = None,
               retries: int = MAX_RETRIES) -> dict | None:
    """Fetch JSON with retry + backoff. Returns None on failure."""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=headers, params=params, timeout=30)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 2 ** (attempt + 1)))
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 401:
                print("Error: Invalid WAVESPEED_API_KEY. Check your token.")
                sys.exit(1)
            if resp.status_code == 404:
                return None
            resp.raise_for_status()
            return resp.json()
        except requests.RequestException as e:
            if attempt < retries - 1:
                wait = 2 ** (attempt + 1)
                print(f"  Retry {attempt + 1}/{retries} after error: {e} (waiting {wait}s)")
                time.sleep(wait)
            else:
                print(f"  Failed after {retries} attempts: {e}")
                return None
    return None


# ---------------------------------------------------------------------------
# Existing skills detection
# ---------------------------------------------------------------------------


def load_existing_endpoints(output_dir: str) -> set[str]:
    """Parse Model lines from existing SKILL.md files to find WaveSpeed models."""
    endpoints = set()
    skills_path = Path(output_dir)
    if not skills_path.exists():
        return endpoints

    for skill_file in skills_path.glob("*/SKILL.md"):
        try:
            text = skill_file.read_text()
            # Match **Model:** `...` or **Endpoint:** `...` with wavespeed reference
            if "wavespeed" not in text.lower():
                continue
            for match in re.finditer(r'\*\*(?:Model|Endpoint)[:\s]*\*\*[:\s]*`([^`]+)`', text):
                endpoints.add(match.group(1))
        except Exception:
            continue

    return endpoints


# ---------------------------------------------------------------------------
# Model fetching
# ---------------------------------------------------------------------------


def fetch_all_models(token: str, verbose: bool = False) -> list[dict]:
    """Fetch all models from the WaveSpeed API."""
    if verbose:
        print("Fetching models list...")

    data = fetch_json(MODELS_URL, token)
    if not data:
        print("Failed to fetch models.")
        return []

    # Handle response structure: { code, message, data: [...] }
    models = data.get("data", data) if isinstance(data, dict) else data
    if isinstance(models, dict):
        # Maybe the response is { models: [...] } or similar
        models = models.get("models", models.get("items", models.get("results", [])))

    if not isinstance(models, list):
        if verbose:
            print(f"Unexpected response structure: {type(models)}")
            print(f"Keys: {data.keys() if isinstance(data, dict) else 'N/A'}")
        return []

    if verbose:
        print(f"Fetched {len(models)} models.")

    return models


def filter_models(models: list[dict], filter_text: str | None = None,
                  limit: int | None = None, verbose: bool = False) -> list[dict]:
    """Filter and limit models."""
    if filter_text:
        filter_lower = filter_text.lower()
        filtered = []
        for m in models:
            searchable = json.dumps(m).lower()
            if filter_lower in searchable:
                filtered.append(m)
        if verbose:
            print(f"Filtered to {len(filtered)} models matching '{filter_text}'.")
        models = filtered

    if limit and len(models) > limit:
        models = models[:limit]

    return models


# ---------------------------------------------------------------------------
# Schema Extraction
# ---------------------------------------------------------------------------


def extract_input_schema(model: dict) -> dict | None:
    """Extract input schema from a model's api_schema or api_schemas field."""
    # Try api_schemas array (from docs)
    schemas = model.get("api_schemas") or model.get("api_schema")
    if isinstance(schemas, list):
        for s in schemas:
            req_schema = s.get("request_schema")
            if req_schema and isinstance(req_schema, dict):
                return req_schema
    elif isinstance(schemas, dict):
        # Single schema object
        req_schema = schemas.get("request_schema")
        if req_schema and isinstance(req_schema, dict):
            return req_schema
        # Maybe the schema itself has properties
        if schemas.get("properties"):
            return schemas

    # Try direct input_schema field
    input_schema = model.get("input_schema")
    if input_schema and isinstance(input_schema, dict):
        return input_schema

    # Try parameters field
    params = model.get("parameters")
    if params and isinstance(params, dict) and params.get("properties"):
        return params

    return None


def type_to_str(schema: dict) -> str:
    """Convert a JSON Schema type to a readable string."""
    if "enum" in schema:
        vals = schema["enum"]
        if len(vals) <= 6:
            return "enum: " + ", ".join(f'`{v}`' for v in vals)
        return f"enum ({len(vals)} values)"

    if "allOf" in schema:
        types = [type_to_str(s) for s in schema["allOf"]]
        return " & ".join(types)
    if "oneOf" in schema or "anyOf" in schema:
        variants = schema.get("oneOf") or schema.get("anyOf", [])
        types = [type_to_str(s) for s in variants]
        unique = list(dict.fromkeys(types))
        if len(unique) <= 3:
            return " | ".join(unique)
        return f"union ({len(unique)} types)"

    t = schema.get("type", "any")
    fmt = schema.get("format", "")

    if t == "array":
        items = schema.get("items", {})
        inner = type_to_str(items)
        return f"list<{inner}>"
    if t == "integer":
        return "integer"
    if t == "number":
        return "float"
    if t == "boolean":
        return "boolean"
    if t == "string":
        if fmt in ("uri", "url", "binary"):
            return f"string ({fmt})"
        return "string"
    if t == "object":
        title = schema.get("title", "")
        return title if title else "object"

    if "title" in schema:
        return schema["title"]

    return str(t)


def schema_to_table_rows(schema: dict, required_fields: list | None = None) -> list[dict]:
    """Convert schema properties to table row dicts."""
    props = schema.get("properties", {})
    if required_fields is None:
        required_fields = schema.get("required", [])

    rows = []
    for name, prop in props.items():
        row = {
            "name": name,
            "type": type_to_str(prop),
            "required": "**Yes**" if name in required_fields else "No",
            "default": "",
            "description": prop.get("description", ""),
        }
        if "default" in prop:
            val = prop["default"]
            if isinstance(val, str):
                row["default"] = f'`"{val}"`'
            elif isinstance(val, bool):
                row["default"] = f"`{str(val).lower()}`"
            elif val is None:
                row["default"] = ""
            else:
                row["default"] = f"`{val}`"

        # Clean description
        row["description"] = row["description"].replace("\n", " ").replace("|", "\\|").strip()
        if len(row["description"]) > 120:
            row["description"] = row["description"][:117] + "..."

        rows.append(row)

    return rows


# ---------------------------------------------------------------------------
# SKILL.md Generation
# ---------------------------------------------------------------------------


def get_model_id(model: dict) -> str | None:
    """Extract model_id from a model dict."""
    for key in ("model_id", "id", "slug", "endpoint"):
        val = model.get(key)
        if val and isinstance(val, str) and "/" in val:
            return val
    return None


def get_model_name(model: dict, model_id: str) -> str:
    """Get a display name for the model."""
    name = model.get("name") or model.get("title") or ""
    if name:
        return name
    return model_id.split("/")[-1].replace("-", " ").title()


def get_model_description(model: dict) -> str:
    """Get model description."""
    return (model.get("description") or model.get("summary") or "").strip()


def get_model_type(model: dict) -> str:
    """Get model type/category."""
    return (model.get("type") or model.get("category") or "").strip()


def generate_skill_md(model_id: str, model: dict, input_schema: dict | None) -> str:
    """Generate a SKILL.md file for a WaveSpeed AI model."""
    name = get_model_name(model, model_id)
    description = get_model_description(model)
    model_type = get_model_type(model)
    slug = slugify(model_id)
    source_url = WAVESPEED_PAGE.format(model_id=model_id)

    short_desc = description[:200] if description else f"Use the {name} model via WaveSpeed AI API."
    frontmatter_desc = (
        f"Use this skill for the WaveSpeed AI {name} model ({model_id}). {short_desc}"
    )

    lines = []

    # --- Frontmatter ---
    lines.append("---")
    lines.append(f"name: {slug}")
    lines.append("description: >")
    lines.append(f"  {frontmatter_desc}")
    lines.append("---")
    lines.append("")

    # --- Title ---
    lines.append(f"# {name}")
    lines.append("")
    if description:
        lines.append(description)
        lines.append("")
    if model_type:
        lines.append(f"**Type:** {model_type}")

    lines.append(f"**Model:** `{model_id}`")
    lines.append(f"**Source:** {source_url}")
    price = model.get("base_price")
    if price is not None:
        lines.append(f"**Price:** ${price}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Quick Start ---
    lines.append("## Quick Start")
    lines.append("")
    lines.append("### 1. Set Your API Key")
    lines.append("")
    lines.append("```bash")
    lines.append('export WAVESPEED_API_KEY="YOUR_API_KEY"')
    lines.append("```")
    lines.append("")
    lines.append("### 2. Submit a Task")
    lines.append("")

    example_input = _build_example_input(input_schema)
    example_input_str = json.dumps(example_input, indent=4) if example_input else '{\n    "prompt": "your prompt here"\n}'

    # cURL example
    lines.append("```bash")
    lines.append(f'curl -X POST "{API_BASE}/{model_id}" \\')
    lines.append('  -H "Authorization: Bearer $WAVESPEED_API_KEY" \\')
    lines.append('  -H "Content-Type: application/json" \\')
    curl_body = json.dumps(example_input or {"prompt": "your prompt here"})
    lines.append(f"  -d '{curl_body}'")
    lines.append("```")
    lines.append("")

    # JavaScript example
    indented_input = example_input_str.replace("\n", "\n    ")
    lines.append("### JavaScript Example")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const response = await fetch("{API_BASE}/{model_id}", {{')
    lines.append('  method: "POST",')
    lines.append("  headers: {")
    lines.append('    "Authorization": `Bearer ${process.env.WAVESPEED_API_KEY}`,')
    lines.append('    "Content-Type": "application/json",')
    lines.append("  },")
    lines.append(f"  body: JSON.stringify({indented_input}),")
    lines.append("});")
    lines.append("")
    lines.append("const { data } = await response.json();")
    lines.append("const taskId = data.id;")
    lines.append('console.log("Task submitted:", taskId);')
    lines.append("")
    lines.append("// Poll for result")
    lines.append(f'const result = await fetch(`{API_BASE}/predictions/${{taskId}}`, {{')
    lines.append("  headers: {")
    lines.append('    "Authorization": `Bearer ${process.env.WAVESPEED_API_KEY}`,')
    lines.append("  },")
    lines.append("});")
    lines.append("const { data: prediction } = await result.json();")
    lines.append("console.log(prediction.outputs);")
    lines.append("```")
    lines.append("")

    # Python example
    lines.append("### Python Example")
    lines.append("")
    py_input = json.dumps(example_input or {"prompt": "your prompt here"}, indent=4)
    py_indented = py_input.replace("\n", "\n    ")
    lines.append("```python")
    lines.append("import os, time, requests")
    lines.append("")
    lines.append('API_KEY = os.environ["WAVESPEED_API_KEY"]')
    lines.append('HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}')
    lines.append("")
    lines.append("# Submit task")
    lines.append(f'resp = requests.post("{API_BASE}/{model_id}",')
    lines.append(f"    headers=HEADERS,")
    lines.append(f"    json={py_indented},")
    lines.append(")")
    lines.append('task_id = resp.json()["data"]["id"]')
    lines.append("")
    lines.append("# Poll for result")
    lines.append("while True:")
    lines.append(f'    result = requests.get(f"{API_BASE}/predictions/{{task_id}}",')
    lines.append("        headers=HEADERS).json()")
    lines.append('    status = result["data"]["status"]')
    lines.append('    if status == "completed":')
    lines.append('        print(result["data"]["outputs"])')
    lines.append("        break")
    lines.append('    elif status == "failed":')
    lines.append('        print("Error:", result["data"].get("error"))')
    lines.append("        break")
    lines.append("    time.sleep(1)")
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Authentication ---
    lines.append("## Authentication")
    lines.append("")
    lines.append("Include your API key in the `Authorization` header as a Bearer token:")
    lines.append("")
    lines.append("```")
    lines.append("Authorization: Bearer YOUR_API_KEY")
    lines.append("```")
    lines.append("")
    lines.append("Get your API key at: https://wavespeed.ai/accesskey")
    lines.append("")
    lines.append("> **Note:** API keys require a top-up to activate. Keys created before your first top-up will not work.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Input Schema ---
    if input_schema and input_schema.get("properties"):
        input_rows = schema_to_table_rows(input_schema)
        if input_rows:
            lines.append("## Input Schema")
            lines.append("")
            lines.append("| Parameter | Type | Required | Default | Description |")
            lines.append("| --- | --- | --- | --- | --- |")
            for row in input_rows:
                lines.append(
                    f"| `{row['name']}` | {row['type']} | {row['required']} "
                    f"| {row['default']} | {row['description']} |"
                )
            lines.append("")
            lines.append("---")
            lines.append("")

    # --- Output ---
    lines.append("## Output")
    lines.append("")
    lines.append("Results are returned via the predictions endpoint:")
    lines.append("")
    lines.append("| Field | Type | Description |")
    lines.append("| --- | --- | --- |")
    lines.append("| `id` | string | Unique task identifier |")
    lines.append("| `model` | string | Model used for generation |")
    lines.append("| `status` | string | `created`, `processing`, `completed`, `failed` |")
    lines.append("| `outputs` | list<string> | URLs to generated content |")
    lines.append("| `timings.inference` | integer | Generation duration in ms |")
    lines.append("| `error` | string | Error description (on failure only) |")
    lines.append("| `created_at` | string | ISO 8601 timestamp |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Task Lifecycle ---
    lines.append("## Task Lifecycle")
    lines.append("")
    lines.append("### 1. Submit Task")
    lines.append("")
    lines.append(f"**POST** `{API_BASE}/{model_id}`")
    lines.append("")
    lines.append("### 2. Poll for Result")
    lines.append("")
    lines.append(f"**GET** `{API_BASE}/predictions/{{task_id}}`")
    lines.append("")
    lines.append("### 3. Task Statuses")
    lines.append("")
    lines.append("| Status | Meaning |")
    lines.append("| --- | --- |")
    lines.append("| `created` | Task queued, continue polling |")
    lines.append("| `processing` | Generation underway, continue polling |")
    lines.append("| `completed` | Done — retrieve outputs |")
    lines.append("| `failed` | Error — check error field |")
    lines.append("")
    lines.append("### 4. Delete Task")
    lines.append("")
    lines.append(f"**DELETE** `{API_BASE}/predictions/{{task_id}}`")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Tips ---
    lines.append("## Tips")
    lines.append("")
    lines.append("- Poll with ~1 second intervals; max wait ~300 seconds for long tasks.")
    lines.append("- Use `webhook_url` in your request body for async notifications instead of polling.")
    lines.append("- File inputs accept URLs. Use the upload API for local files: `POST /api/v3/upload`.")
    lines.append("- Output URLs are hosted on the WaveSpeed CDN and may expire — download promptly.")
    lines.append("")
    lines.append("## References")
    lines.append("")
    lines.append(f"- Model page: {source_url}")
    lines.append("- API docs: https://wavespeed.ai/docs/api-reference")
    lines.append("- Authentication: https://wavespeed.ai/docs/api-authentication")
    lines.append("- Submit task: https://wavespeed.ai/docs/submit-task")
    lines.append("- Get result: https://wavespeed.ai/docs/get-result")
    lines.append("")

    return "\n".join(lines)


def _build_example_input(schema: dict | None) -> dict | None:
    """Build a minimal example input from schema, using only required fields."""
    if not schema or not schema.get("properties"):
        return None

    required = set(schema.get("required", []))
    example = {}

    for name, prop in schema.get("properties", {}).items():
        if name not in required:
            continue

        if "default" in prop:
            example[name] = prop["default"]
        elif "enum" in prop:
            example[name] = prop["enum"][0]
        elif prop.get("type") == "string":
            if any(k in name.lower() for k in ("url", "image", "video", "audio")):
                example[name] = "https://example.com/input.png"
            elif "prompt" in name.lower():
                example[name] = "your prompt here"
            else:
                example[name] = "your value here"
        elif prop.get("type") == "integer":
            example[name] = prop.get("minimum", 1)
        elif prop.get("type") == "number":
            example[name] = prop.get("default", 1.0)
        elif prop.get("type") == "boolean":
            example[name] = True
        elif prop.get("type") == "array":
            example[name] = []
        else:
            example[name] = "..."

    return example if example else None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def process_model(model_id: str, model: dict, output_dir: str,
                  dry_run: bool = False, verbose: bool = False) -> bool:
    """Process a single model: extract schema, generate SKILL.md."""
    print(f"  Processing: {model_id}")

    input_schema = extract_input_schema(model)

    content = generate_skill_md(model_id, model, input_schema)

    if dry_run:
        print(content)
        return True

    slug = slugify(model_id)
    out_dir = Path(output_dir) / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "SKILL.md"
    out_file.write_text(content)

    if verbose:
        props = len((input_schema or {}).get("properties", {}))
        print(f"  Wrote: {out_file} ({props} input params)")
    else:
        print(f"  -> {out_file}")

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Auto-generate SKILL.md files for WaveSpeed AI models"
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview without writing files")
    parser.add_argument("--model", type=str, default=None,
                        help="Process a single model (e.g. 'wavespeed-ai/flux-dev')")
    parser.add_argument("--filter", type=str, default=None,
                        help="Filter models by keyword (e.g. 'text-to-video')")
    parser.add_argument("--limit", type=int, default=None,
                        help="Max number of models to process")
    parser.add_argument("--delay", type=float, default=DEFAULT_DELAY,
                        help=f"Rate limit delay in seconds (default: {DEFAULT_DELAY})")
    parser.add_argument("--output-dir", type=str, default=DEFAULT_OUTPUT_DIR,
                        help=f"Skills output directory (default: {DEFAULT_OUTPUT_DIR})")
    parser.add_argument("--verbose", action="store_true",
                        help="Show detailed progress")
    parser.add_argument("--skip-existing", action="store_true", default=True,
                        help="Skip models that already have skills (default: true)")
    parser.add_argument("--no-skip-existing", action="store_false", dest="skip_existing",
                        help="Re-generate even if skill already exists")

    args = parser.parse_args()

    token = get_token()

    # Load existing
    existing = load_existing_endpoints(args.output_dir) if args.skip_existing else set()
    if args.verbose:
        print(f"Found {len(existing)} existing WaveSpeed skill endpoints.")

    # --- Single model mode ---
    if args.model:
        model_id = args.model.strip()
        if model_id in existing and args.skip_existing:
            print(f"Skill already exists for {model_id}, skipping. Use --no-skip-existing to override.")
            return

        # Fetch all models to find this one's schema
        models = fetch_all_models(token, args.verbose)
        model_data = None
        for m in models:
            mid = get_model_id(m)
            if mid == model_id:
                model_data = m
                break

        if not model_data:
            # Create a minimal model dict
            print(f"  Model '{model_id}' not found in API listing, creating with minimal info.")
            model_data = {
                "model_id": model_id,
                "name": model_id.split("/")[-1].replace("-", " ").title(),
            }

        process_model(model_id, model_data, args.output_dir, args.dry_run, args.verbose)
        return

    # --- List/filter all models ---
    models = fetch_all_models(token, args.verbose)
    if not models:
        print("No models found.")
        sys.exit(1)

    models = filter_models(models, args.filter, args.limit, args.verbose)

    # Pair up model_id -> model dict, skip existing
    new_models = []
    for m in models:
        model_id = get_model_id(m)
        if not model_id:
            if args.verbose:
                print(f"  Skipping model with no ID: {m.get('name', '?')}")
            continue
        if model_id in existing and args.skip_existing:
            if args.verbose:
                print(f"  Already have: {model_id}")
            continue
        new_models.append((model_id, m))

    print(f"\n{len(new_models)} new models to process (out of {len(models)} total, {len(existing)} existing).\n")

    if args.dry_run and not args.model:
        for model_id, m in new_models:
            name = get_model_name(m, model_id)
            mtype = get_model_type(m)
            type_str = f"  [{mtype}]" if mtype else ""
            print(f"  {model_id}  —  {name}{type_str}")
        print(f"\nDry run complete. Use without --dry-run to generate files.")
        return

    # Process each
    success = 0
    skipped = 0
    for i, (model_id, model) in enumerate(new_models, 1):
        name = get_model_name(model, model_id)
        print(f"[{i}/{len(new_models)}] {model_id} ({name})")

        if process_model(model_id, model, args.output_dir, args.dry_run, args.verbose):
            success += 1
        else:
            skipped += 1
        time.sleep(args.delay)

    print(f"\nDone! Generated {success} skills, skipped {skipped}.")


if __name__ == "__main__":
    main()
