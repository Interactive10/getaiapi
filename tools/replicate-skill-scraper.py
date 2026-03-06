#!/usr/bin/env python3
"""
Replicate Skill Scraper — Auto-generate SKILL.md files for Replicate models.

Uses Replicate's public API:
  - Model info: https://api.replicate.com/v1/models/{owner}/{name}
  - Model versions: https://api.replicate.com/v1/models/{owner}/{name}/versions
  - Collection list: https://api.replicate.com/v1/collections/{slug}
  - Search: https://api.replicate.com/v1/models?query={query}

Requires REPLICATE_API_TOKEN env var.

Usage:
  python tools/replicate-skill-scraper.py --model xai/grok-imagine-video
  python tools/replicate-skill-scraper.py --search "text to video" --limit 5
  python tools/replicate-skill-scraper.py --collection text-to-video --dry-run
  python tools/replicate-skill-scraper.py --verbose
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

API_BASE = "https://api.replicate.com/v1"
REPLICATE_PAGE = "https://replicate.com/{owner}/{name}"
DEFAULT_OUTPUT_DIR = "./skills"
DEFAULT_DELAY = 0.5
MAX_RETRIES = 3

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def get_token() -> str:
    """Get Replicate API token from env."""
    token = os.environ.get("REPLICATE_API_TOKEN", "")
    if not token:
        print("Error: REPLICATE_API_TOKEN environment variable is required.")
        print("Get your token at: https://replicate.com/account/api-tokens")
        sys.exit(1)
    return token


def slugify(owner: str, name: str) -> str:
    """Convert owner/name to directory slug like 'xai-grok-imagine-video'."""
    return f"{owner}-{name}".replace("/", "-")


def fetch_json(url: str, token: str, params: dict | None = None,
               retries: int = MAX_RETRIES) -> dict | None:
    """Fetch JSON with retry + backoff. Returns None on failure."""
    headers = {"Authorization": f"Bearer {token}"}
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=headers, params=params, timeout=30)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 2 ** (attempt + 1)))
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 401:
                print("Error: Invalid REPLICATE_API_TOKEN. Check your token.")
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
    """Parse Endpoint lines from existing SKILL.md files to find replicate models."""
    endpoints = set()
    skills_path = Path(output_dir)
    if not skills_path.exists():
        return endpoints

    for skill_file in skills_path.glob("*/SKILL.md"):
        try:
            text = skill_file.read_text()
            for match in re.finditer(r'\*\*Model[:\s]*\*\*[:\s]*`([^`]+)`', text):
                endpoints.add(match.group(1))
            # Also match **Endpoint:** format for compatibility
            for match in re.finditer(r'\*\*Endpoint[:\s]*\*\*[:\s]*`([^`]+)`', text):
                val = match.group(1)
                if "/" in val and not val.startswith("fal-ai"):
                    endpoints.add(val)
        except Exception:
            continue

    return endpoints


# ---------------------------------------------------------------------------
# Model fetching
# ---------------------------------------------------------------------------


def fetch_model(owner: str, name: str, token: str, verbose: bool = False) -> dict | None:
    """Fetch a single model's info."""
    url = f"{API_BASE}/models/{owner}/{name}"
    if verbose:
        print(f"Fetching model: {owner}/{name}")
    return fetch_json(url, token)


def fetch_latest_version(owner: str, name: str, token: str,
                         verbose: bool = False) -> dict | None:
    """Fetch the latest version of a model (contains the schema)."""
    url = f"{API_BASE}/models/{owner}/{name}/versions"
    if verbose:
        print(f"Fetching versions for: {owner}/{name}")
    data = fetch_json(url, token)
    if not data:
        return None

    results = data.get("results", [])
    if not results:
        return None

    # First result is the latest version
    return results[0]


def search_models(query: str, token: str, limit: int | None = None,
                  delay: float = DEFAULT_DELAY, verbose: bool = False) -> list[dict]:
    """Search for models using the Replicate API."""
    models = []
    url = f"{API_BASE}/models"
    params = {"query": query}

    while url:
        if verbose:
            print(f"Fetching models page...")
        data = fetch_json(url, token, params=params)
        if not data:
            break

        results = data.get("results", [])
        models.extend(results)

        if limit and len(models) >= limit:
            models = models[:limit]
            break

        next_url = data.get("next")
        if next_url:
            url = next_url
            params = None  # next URL already has params
            time.sleep(delay * 0.5)
        else:
            break

    if verbose:
        print(f"Found {len(models)} models.")
    return models


def fetch_collection(slug: str, token: str, verbose: bool = False) -> list[dict]:
    """Fetch models from a Replicate collection."""
    url = f"{API_BASE}/collections/{slug}"
    if verbose:
        print(f"Fetching collection: {slug}")
    data = fetch_json(url, token)
    if not data:
        return []
    return data.get("models", [])


# ---------------------------------------------------------------------------
# Schema Extraction
# ---------------------------------------------------------------------------


def extract_schemas_from_version(version: dict) -> tuple[dict | None, dict | None]:
    """Extract input and output schemas from a model version."""
    openapi_schema = version.get("openapi_schema")

    if openapi_schema:
        return _extract_from_openapi(openapi_schema)

    # Fallback: use top-level input/output schema fields
    input_schema = version.get("input_schema") or version.get("schema", {}).get("input")
    output_schema = version.get("output_schema") or version.get("schema", {}).get("output")
    return input_schema, output_schema


def _extract_from_openapi(spec: dict) -> tuple[dict | None, dict | None]:
    """Extract input/output schemas from Replicate's OpenAPI spec."""
    components = spec.get("components", {}).get("schemas", {})

    # Input is typically under "Input" schema
    input_schema = components.get("Input")
    if input_schema:
        input_schema = _resolve_refs(input_schema, spec)

    # Output is typically under "Output" schema
    output_schema = components.get("Output")
    if output_schema:
        output_schema = _resolve_refs(output_schema, spec)

    return input_schema, output_schema


def _resolve_ref(ref: str, spec: dict) -> dict | None:
    """Resolve a $ref pointer."""
    if not ref.startswith("#/"):
        return None
    parts = ref.lstrip("#/").split("/")
    node = spec
    for p in parts:
        if isinstance(node, dict):
            node = node.get(p)
        else:
            return None
        if node is None:
            return None
    return node


def _resolve_refs(schema: dict, spec: dict, seen: set | None = None) -> dict:
    """Recursively resolve $ref pointers with cycle detection."""
    if seen is None:
        seen = set()

    if "$ref" in schema:
        ref = schema["$ref"]
        if ref in seen:
            return {"type": "object", "description": "(circular reference)"}
        seen.add(ref)
        resolved = _resolve_ref(ref, spec)
        if resolved:
            return _resolve_refs(resolved, spec, seen)
        return schema

    result = dict(schema)

    if "properties" in result:
        new_props = {}
        for k, v in result["properties"].items():
            new_props[k] = _resolve_refs(v, spec, set(seen))
        result["properties"] = new_props

    if "items" in result:
        result["items"] = _resolve_refs(result["items"], spec, set(seen))

    for key in ("allOf", "oneOf", "anyOf"):
        if key in result:
            result[key] = [_resolve_refs(s, spec, set(seen)) for s in result[key]]

    return result


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
        if fmt == "uri":
            return "string (URL)"
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


def get_model_name(model: dict) -> str:
    """Get a display name for the model."""
    name = model.get("name", "")
    owner = model.get("owner", "")
    # Use the 'description' field's first sentence or construct from name
    display = name.replace("-", " ").replace("_", " ").title()
    if owner:
        display = f"{owner}/{name}"
    return display


def get_model_description(model: dict) -> str:
    """Get model description."""
    return (model.get("description") or "").strip()


def generate_skill_md(owner: str, name: str, model: dict,
                      input_schema: dict | None, output_schema: dict | None) -> str:
    """Generate a SKILL.md file content for a Replicate model."""
    model_id = f"{owner}/{name}"
    description = get_model_description(model)
    slug = slugify(owner, name)
    source_url = REPLICATE_PAGE.format(owner=owner, name=name)
    display_name = model.get("name", name).replace("-", " ").replace("_", " ").title()

    # Frontmatter
    short_desc = description[:200] if description else f"Use the {display_name} model via Replicate API."
    frontmatter_desc = (
        f"Use this skill for the Replicate {display_name} model ({model_id}). {short_desc}"
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
    lines.append(f"# {display_name}")
    lines.append("")
    if description:
        lines.append(description)
        lines.append("")

    lines.append(f"**Model:** `{model_id}`")
    lines.append(f"**Source:** {source_url}")
    if model.get("latest_version", {}).get("id"):
        lines.append(f"**Version:** `{model['latest_version']['id']}`")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Quick Start ---
    lines.append("## Quick Start")
    lines.append("")
    lines.append("### 1. Install the Client")
    lines.append("")
    lines.append("```bash")
    lines.append("npm install replicate")
    lines.append("```")
    lines.append("")
    lines.append("### 2. Set Your API Token")
    lines.append("")
    lines.append("```bash")
    lines.append('export REPLICATE_API_TOKEN="YOUR_API_TOKEN"')
    lines.append("```")
    lines.append("")
    lines.append("### 3. Run the Model")
    lines.append("")

    # Build example input
    example_input = _build_example_input(input_schema)
    example_input_str = json.dumps(example_input, indent=4) if example_input else '{\n    "prompt": "your prompt here"\n  }'
    indented_input = example_input_str.replace("\n", "\n    ")

    lines.append("```javascript")
    lines.append('import Replicate from "replicate";')
    lines.append("")
    lines.append("const replicate = new Replicate();")
    lines.append("")
    lines.append(f'const output = await replicate.run("{model_id}", {{')
    lines.append(f"  input: {indented_input},")
    lines.append("});")
    lines.append("console.log(output);")
    lines.append("```")
    lines.append("")

    # Python example
    lines.append("### Python Example")
    lines.append("")
    lines.append("```python")
    lines.append("import replicate")
    lines.append("")
    lines.append(f'output = replicate.run("{model_id}",')
    py_input = json.dumps(example_input, indent=4) if example_input else '{\n    "prompt": "your prompt here"\n}'
    py_indented = py_input.replace("\n", "\n    ")
    lines.append(f"    input={py_indented},")
    lines.append(")")
    lines.append("print(output)")
    lines.append("```")
    lines.append("")

    # cURL example
    lines.append("### cURL Example")
    lines.append("")
    lines.append("```bash")
    lines.append(f"curl -s -X POST https://api.replicate.com/v1/models/{model_id}/predictions \\")
    lines.append('  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \\')
    lines.append('  -H "Content-Type: application/json" \\')
    curl_input = json.dumps({"input": example_input or {"prompt": "your prompt here"}})
    lines.append(f"  -d '{curl_input}'")
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Authentication ---
    lines.append("## Authentication")
    lines.append("")
    lines.append("Set the `REPLICATE_API_TOKEN` environment variable, or pass directly:")
    lines.append("")
    lines.append("```javascript")
    lines.append('const replicate = new Replicate({ auth: "YOUR_API_TOKEN" });')
    lines.append("```")
    lines.append("")
    lines.append("```python")
    lines.append('import replicate')
    lines.append('client = replicate.Client(api_token="YOUR_API_TOKEN")')
    lines.append("```")
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

    # --- Output Schema ---
    if output_schema:
        lines.append("## Output Schema")
        lines.append("")
        if output_schema.get("properties"):
            output_rows = schema_to_table_rows(output_schema)
            if output_rows:
                lines.append("| Field | Type | Description |")
                lines.append("| --- | --- | --- |")
                for row in output_rows:
                    lines.append(f"| `{row['name']}` | {row['type']} | {row['description']} |")
        else:
            # Many Replicate models return a simple type (string URL, array of URLs)
            out_type = type_to_str(output_schema)
            out_desc = output_schema.get("description", "Model output")
            lines.append(f"**Type:** {out_type}")
            if out_desc:
                lines.append(f"**Description:** {out_desc}")
        lines.append("")
        lines.append("---")
        lines.append("")

    # --- Async / Webhook API ---
    lines.append("## Async API (Long-Running Predictions)")
    lines.append("")
    lines.append("### Create Prediction")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const prediction = await replicate.predictions.create({{')
    lines.append(f'  model: "{model_id}",')
    lines.append(f"  input: {indented_input},")
    lines.append('  webhook: "https://optional.webhook.url/for/results",')
    lines.append('  webhook_events_filter: ["completed"],')
    lines.append("});")
    lines.append("console.log(prediction.id);")
    lines.append("```")
    lines.append("")
    lines.append("### Get Prediction Status")
    lines.append("")
    lines.append("```javascript")
    lines.append('const prediction = await replicate.predictions.get("<prediction_id>");')
    lines.append("console.log(prediction.status); // starting, processing, succeeded, failed, canceled")
    lines.append("console.log(prediction.output);")
    lines.append("```")
    lines.append("")
    lines.append("### Cancel Prediction")
    lines.append("")
    lines.append("```javascript")
    lines.append('await replicate.predictions.cancel("<prediction_id>");')
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Tips ---
    lines.append("## Tips")
    lines.append("")
    lines.append("- `replicate.run()` is the simplest way — it polls until the prediction completes.")
    lines.append("- Use `replicate.predictions.create()` + webhooks for production workloads.")
    lines.append("- File inputs accept URLs or base64-encoded data URIs.")
    lines.append("- Use `replicate.stream()` for models that support streaming output.")
    lines.append("")
    lines.append("## References")
    lines.append("")
    lines.append(f"- Model page: {source_url}")
    lines.append(f"- API page: {source_url}/api")
    lines.append("- Replicate docs: https://replicate.com/docs")
    lines.append("- Node.js client: https://github.com/replicate/replicate-javascript")
    lines.append("- Python client: https://github.com/replicate/replicate-python")
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
            if "url" in name.lower() or "image" in name.lower() or "video" in name.lower():
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


def parse_model_id(model_id: str) -> tuple[str, str]:
    """Parse 'owner/name' into (owner, name)."""
    parts = model_id.strip().split("/")
    if len(parts) != 2:
        print(f"Error: Invalid model ID '{model_id}'. Expected format: owner/name")
        sys.exit(1)
    return parts[0], parts[1]


def process_model(owner: str, name: str, token: str, output_dir: str,
                  dry_run: bool = False, verbose: bool = False) -> bool:
    """Process a single model: fetch info + schema, generate SKILL.md."""
    model_id = f"{owner}/{name}"
    print(f"  Processing: {model_id}")

    model = fetch_model(owner, name, token, verbose)
    if not model:
        print(f"  SKIP: Could not fetch model info for {model_id}")
        return False

    # Get schema from latest version
    version = fetch_latest_version(owner, name, token, verbose)
    input_schema, output_schema = None, None
    if version:
        input_schema, output_schema = extract_schemas_from_version(version)

    # Also try model-level latest_version
    if not input_schema and model.get("latest_version"):
        input_schema, output_schema = extract_schemas_from_version(model["latest_version"])

    if not input_schema and not output_schema:
        print(f"  SKIP: No schemas found for {model_id}")
        return False

    content = generate_skill_md(owner, name, model, input_schema, output_schema)

    if dry_run:
        print(content)
        return True

    slug = slugify(owner, name)
    out_dir = Path(output_dir) / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "SKILL.md"
    out_file.write_text(content)

    if verbose:
        props_in = len((input_schema or {}).get("properties", {}))
        props_out = len((output_schema or {}).get("properties", {}))
        print(f"  Wrote: {out_file} ({props_in} input params, {props_out} output fields)")
    else:
        print(f"  -> {out_file}")

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Auto-generate SKILL.md files for Replicate models"
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview without writing files")
    parser.add_argument("--model", type=str, default=None,
                        help="Process a single model (e.g. 'xai/grok-imagine-video')")
    parser.add_argument("--models-file", type=str, default=None,
                        help="File with one model ID per line (owner/name)")
    parser.add_argument("--search", type=str, default=None,
                        help="Search for models by keyword")
    parser.add_argument("--collection", type=str, default=None,
                        help="Fetch models from a Replicate collection slug")
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

    # Load existing endpoints
    existing = load_existing_endpoints(args.output_dir) if args.skip_existing else set()
    if args.verbose:
        print(f"Found {len(existing)} existing skill endpoints.")

    # --- Single model mode ---
    if args.model:
        owner, name = parse_model_id(args.model)
        model_id = f"{owner}/{name}"
        if model_id in existing and args.skip_existing:
            print(f"Skill already exists for {model_id}, skipping. Use --no-skip-existing to override.")
            return
        process_model(owner, name, token, args.output_dir, args.dry_run, args.verbose)
        return

    # --- Models file mode ---
    if args.models_file:
        model_ids = []
        with open(args.models_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    model_ids.append(line)
        if args.limit:
            model_ids = model_ids[:args.limit]

        print(f"Processing {len(model_ids)} models from {args.models_file}")
        success, skipped = 0, 0
        for i, mid in enumerate(model_ids, 1):
            owner, name = parse_model_id(mid)
            model_id = f"{owner}/{name}"
            if model_id in existing and args.skip_existing:
                if args.verbose:
                    print(f"  Already have: {model_id}")
                skipped += 1
                continue
            print(f"[{i}/{len(model_ids)}]", end="")
            if process_model(owner, name, token, args.output_dir, args.dry_run, args.verbose):
                success += 1
            else:
                skipped += 1
            time.sleep(args.delay)
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # --- Search mode ---
    if args.search:
        models = search_models(args.search, token, args.limit, args.delay, args.verbose)
        if not models:
            print("No models found.")
            return

        if args.dry_run:
            print(f"\nFound {len(models)} models matching '{args.search}':\n")
            for m in models:
                owner = m.get("owner", "?")
                name = m.get("name", "?")
                desc = (m.get("description") or "")[:80]
                print(f"  {owner}/{name}  —  {desc}")
            print(f"\nDry run complete. Use without --dry-run to generate files.")
            return

        success, skipped = 0, 0
        for i, m in enumerate(models, 1):
            owner = m.get("owner", "")
            name = m.get("name", "")
            if not owner or not name:
                continue
            model_id = f"{owner}/{name}"
            if model_id in existing and args.skip_existing:
                if args.verbose:
                    print(f"  Already have: {model_id}")
                skipped += 1
                continue
            print(f"[{i}/{len(models)}]", end="")
            if process_model(owner, name, token, args.output_dir, args.dry_run, args.verbose):
                success += 1
            else:
                skipped += 1
            time.sleep(args.delay)
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # --- Collection mode ---
    if args.collection:
        models = fetch_collection(args.collection, token, args.verbose)
        if not models:
            print(f"No models found in collection '{args.collection}'.")
            return

        if args.limit:
            models = models[:args.limit]

        if args.dry_run:
            print(f"\nFound {len(models)} models in collection '{args.collection}':\n")
            for m in models:
                owner = m.get("owner", "?")
                name = m.get("name", "?")
                desc = (m.get("description") or "")[:80]
                print(f"  {owner}/{name}  —  {desc}")
            print(f"\nDry run complete. Use without --dry-run to generate files.")
            return

        success, skipped = 0, 0
        for i, m in enumerate(models, 1):
            owner = m.get("owner", "")
            name = m.get("name", "")
            if not owner or not name:
                continue
            model_id = f"{owner}/{name}"
            if model_id in existing and args.skip_existing:
                if args.verbose:
                    print(f"  Already have: {model_id}")
                skipped += 1
                continue
            print(f"[{i}/{len(models)}]", end="")
            if process_model(owner, name, token, args.output_dir, args.dry_run, args.verbose):
                success += 1
            else:
                skipped += 1
            time.sleep(args.delay)
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # No mode specified
    parser.print_help()
    print("\nError: Specify one of --model, --models-file, --search, or --collection.")
    sys.exit(1)


if __name__ == "__main__":
    main()
