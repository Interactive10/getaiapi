#!/usr/bin/env python3
"""
Replicate Skill Scraper — Auto-generate SKILL.md files for Replicate models.

Uses Replicate's PUBLIC endpoints (no API key required):
  - Model schema: https://replicate.com/api/models/{owner}/{name}/versions
  - Collection pages: https://replicate.com/collections/{slug} (HTML)

Usage:
  python tools/replicate-skill-scraper.py --model xai/grok-imagine-video
  python tools/replicate-skill-scraper.py --collection text-to-video --dry-run
  python tools/replicate-skill-scraper.py --search "video" --limit 5
  python tools/replicate-skill-scraper.py --all --limit 3
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

REPLICATE_BASE = "https://replicate.com"
REPLICATE_PAGE = "https://replicate.com/{owner}/{name}"
DEFAULT_OUTPUT_DIR = "./skills"
DEFAULT_DELAY = 0.5
MAX_RETRIES = 3

# All known Replicate collections
ALL_COLLECTIONS = [
    "text-to-image", "image-editing", "super-resolution", "ai-image-restoration",
    "sketch-to-image", "flux",
    "text-to-video", "image-to-video", "video-editing", "ai-enhance-videos",
    "video-to-text", "lipsync", "wan-video",
    "text-to-speech", "speech-to-text", "speaker-diarization",
    "ai-music-generation", "sing-with-voices",
    "language-models", "vision-models", "embedding-models", "control-net",
    "text-recognition-ocr", "ai-detect-objects", "remove-backgrounds",
    "detect-nsfw-content", "text-classification",
    "ai-face-generator", "face-swap", "3d-models", "generate-emoji",
    "generate-anime",
    "official", "try-for-free", "utilities",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def slugify(owner: str, name: str) -> str:
    """Convert owner/name to directory slug like 'replicate-xai-grok-imagine-video'."""
    return f"replicate-{owner}-{name}".replace("/", "-")


def fetch_url(url: str, retries: int = MAX_RETRIES, expect_json: bool = True):
    """Fetch a URL with retry + backoff. Returns parsed JSON or raw text."""
    for attempt in range(retries):
        try:
            resp = requests.get(url, timeout=30, headers={
                "User-Agent": "Mozilla/5.0 (compatible; SkillScraper/1.0)"
            })
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 2 ** (attempt + 1)))
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 404:
                return None
            resp.raise_for_status()
            if expect_json:
                return resp.json()
            return resp.text
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


def load_existing_endpoints(output_dir: str) -> set:
    """Parse Endpoint lines from existing SKILL.md files to find replicate models."""
    endpoints = set()
    skills_path = Path(output_dir)
    if not skills_path.exists():
        return endpoints

    for skill_file in skills_path.glob("replicate-*/SKILL.md"):
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
# Model Discovery (Public Endpoints — No Auth)
# ---------------------------------------------------------------------------


def fetch_collection_models(slug: str, verbose: bool = False) -> list:
    """Scrape models from a Replicate collection HTML page.

    Fetches https://replicate.com/collections/{slug} and parses the HTML
    to extract model owner/name pairs from links.
    """
    url = f"{REPLICATE_BASE}/collections/{slug}"
    if verbose:
        print(f"Fetching collection page: {url}")

    html = fetch_url(url, expect_json=False)
    if not html:
        return []

    # Extract model links from the collection page HTML.
    # Model links follow the pattern: href="/{owner}/{name}" where owner and name
    # are alphanumeric with hyphens/underscores, and are NOT system paths.
    # We look for links that appear in model card contexts.
    system_paths = {
        "collections", "docs", "about", "pricing", "blog", "changelog",
        "explore", "deployments", "api", "account", "signin", "signup",
        "search", "topics", "terms", "privacy", "security", "contact",
        "models", "predictions", "hardware", "billing", "teams",
    }

    # Find all /{owner}/{name} patterns in href attributes
    pattern = re.compile(r'href="/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_.-]+)"')
    found = {}
    for match in pattern.finditer(html):
        owner = match.group(1)
        name = match.group(2)
        # Skip system paths and static assets
        if owner.lower() in system_paths:
            continue
        if name.lower() in ("settings", "tokens", "api-tokens"):
            continue
        model_id = f"{owner}/{name}"
        if model_id not in found:
            found[model_id] = {"owner": owner, "name": name}

    models = list(found.values())
    if verbose:
        print(f"  Found {len(models)} models in collection '{slug}'")
    return models


def fetch_model_versions(owner: str, name: str, verbose: bool = False) -> dict | None:
    """Fetch model version data from the public API endpoint.

    Uses: https://replicate.com/api/models/{owner}/{name}/versions
    Returns the full JSON response or None on failure.
    """
    url = f"{REPLICATE_BASE}/api/models/{owner}/{name}/versions"
    if verbose:
        print(f"  Fetching versions: {url}")
    return fetch_url(url, expect_json=True)


def search_collections(keyword: str) -> list:
    """Search across collection names for a keyword match.

    Returns a list of matching collection slugs.
    """
    keyword_lower = keyword.lower()
    matches = []
    for slug in ALL_COLLECTIONS:
        # Match against the slug (hyphens act as word separators)
        slug_words = slug.replace("-", " ").lower()
        if keyword_lower in slug_words or keyword_lower in slug:
            matches.append(slug)
    return matches


# ---------------------------------------------------------------------------
# Schema Extraction
# ---------------------------------------------------------------------------


def extract_schemas_from_versions_data(data: dict) -> tuple:
    """Extract input and output schemas from the versions API response.

    The schema is at:
      data['data'][0]['_extras']['dereferenced_openapi_schema']
        ['paths']['/predictions']['post']['requestBody']
        ['content']['application/json']['schema']['properties']['input']
    """
    versions = data.get("data", [])
    if not versions:
        # Fallback: try 'results' key (older format)
        versions = data.get("results", [])
    if not versions:
        return None, None

    version = versions[0]

    # Try the public endpoint structure first
    extras = version.get("_extras", {})
    openapi = extras.get("dereferenced_openapi_schema")
    if openapi:
        return _extract_from_dereferenced_openapi(openapi)

    # Fallback: try openapi_schema at version level
    openapi = version.get("openapi_schema")
    if openapi:
        return _extract_from_openapi(openapi)

    # Fallback: direct schema fields
    input_schema = version.get("input_schema") or version.get("schema", {}).get("input")
    output_schema = version.get("output_schema") or version.get("schema", {}).get("output")
    return input_schema, output_schema


def _extract_from_dereferenced_openapi(spec: dict) -> tuple:
    """Extract input/output from the dereferenced OpenAPI schema (public endpoint)."""
    input_schema = None
    output_schema = None

    try:
        predictions_post = spec["paths"]["/predictions"]["post"]
        req_body = predictions_post["requestBody"]["content"]["application/json"]["schema"]
        props = req_body.get("properties", {})
        input_schema = props.get("input")
    except (KeyError, TypeError):
        pass

    # Try output from the same path
    try:
        predictions_post = spec["paths"]["/predictions"]["post"]
        req_body = predictions_post["requestBody"]["content"]["application/json"]["schema"]
        props = req_body.get("properties", {})
        output_schema = props.get("output")
    except (KeyError, TypeError):
        pass

    # Fallback: output from components.schemas.Output
    if not output_schema:
        try:
            output_schema = spec["components"]["schemas"]["Output"]
        except (KeyError, TypeError):
            pass

    return input_schema, output_schema


def _extract_from_openapi(spec: dict) -> tuple:
    """Extract input/output schemas from Replicate's OpenAPI spec (components style)."""
    components = spec.get("components", {}).get("schemas", {})

    input_schema = components.get("Input")
    if input_schema:
        input_schema = _resolve_refs(input_schema, spec)

    output_schema = components.get("Output")
    if output_schema:
        output_schema = _resolve_refs(output_schema, spec)

    return input_schema, output_schema


def _resolve_ref(ref: str, spec: dict):
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


def schema_to_table_rows(schema: dict, required_fields: list | None = None) -> list:
    """Convert schema properties to table row dicts."""
    props = schema.get("properties", {})
    if required_fields is None:
        required_fields = schema.get("required", [])

    # Sort by x-order if available, otherwise preserve insertion order
    ordered_props = sorted(
        props.items(),
        key=lambda kv: kv[1].get("x-order", 9999)
    )

    rows = []
    for name, prop in ordered_props:
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
    version_id = model.get("version_id", "")
    if version_id:
        lines.append(f"**Version:** `{version_id}`")
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
# Main Processing
# ---------------------------------------------------------------------------


def parse_model_id(model_id: str) -> tuple:
    """Parse 'owner/name' into (owner, name)."""
    parts = model_id.strip().split("/")
    if len(parts) != 2:
        print(f"Error: Invalid model ID '{model_id}'. Expected format: owner/name")
        sys.exit(1)
    return parts[0], parts[1]


def process_model(owner: str, name: str, output_dir: str,
                  dry_run: bool = False, verbose: bool = False) -> bool:
    """Process a single model: fetch schema from public endpoint, generate SKILL.md."""
    model_id = f"{owner}/{name}"
    print(f"  Processing: {model_id}")

    # Fetch version data from public endpoint
    data = fetch_model_versions(owner, name, verbose)
    if not data:
        print(f"  SKIP: Could not fetch version data for {model_id}")
        return False

    input_schema, output_schema = extract_schemas_from_versions_data(data)

    if not input_schema and not output_schema:
        print(f"  SKIP: No schemas found for {model_id}")
        return False

    # Build a minimal model dict for generate_skill_md
    # Extract description and version_id from the versions data
    versions = data.get("data", []) or data.get("results", [])
    version_id = ""
    description = ""
    if versions:
        version_id = versions[0].get("id", "")
        # Try to get description from model-level data
        model_info = data.get("model", {})
        description = model_info.get("description", "") if model_info else ""

    model = {
        "owner": owner,
        "name": name,
        "description": description,
        "version_id": version_id,
    }

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


def process_model_list(models: list, output_dir: str, existing: set,
                       skip_existing: bool, dry_run: bool, verbose: bool,
                       delay: float, limit: int | None = None) -> tuple:
    """Process a list of model dicts. Returns (success_count, skipped_count)."""
    if limit:
        models = models[:limit]

    success, skipped = 0, 0
    for i, m in enumerate(models, 1):
        owner = m.get("owner", "")
        name = m.get("name", "")
        if not owner or not name:
            skipped += 1
            continue
        model_id = f"{owner}/{name}"
        if model_id in existing and skip_existing:
            if verbose:
                print(f"  Already have: {model_id}")
            skipped += 1
            continue
        print(f"[{i}/{len(models)}]", end="")
        if process_model(owner, name, output_dir, dry_run, verbose):
            success += 1
        else:
            skipped += 1
        time.sleep(delay)

    return success, skipped


def main():
    parser = argparse.ArgumentParser(
        description="Auto-generate SKILL.md files for Replicate models (no API key required)"
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview without writing files")
    parser.add_argument("--model", type=str, default=None,
                        help="Process a single model (e.g. 'xai/grok-imagine-video')")
    parser.add_argument("--models-file", type=str, default=None,
                        help="File with one model ID per line (owner/name)")
    parser.add_argument("--search", type=str, default=None,
                        help="Search for models by keyword across collection names")
    parser.add_argument("--collection", type=str, default=None,
                        help="Fetch models from a Replicate collection slug")
    parser.add_argument("--all", action="store_true",
                        help="Scrape ALL known Replicate collections")
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
        process_model(owner, name, args.output_dir, args.dry_run, args.verbose)
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
            if process_model(owner, name, args.output_dir, args.dry_run, args.verbose):
                success += 1
            else:
                skipped += 1
            time.sleep(args.delay)
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # --- Search mode ---
    if args.search:
        matching_collections = search_collections(args.search)
        if not matching_collections:
            print(f"No collections matching '{args.search}'.")
            print(f"\nAvailable collections:")
            for slug in ALL_COLLECTIONS:
                print(f"  {slug}")
            return

        print(f"Found {len(matching_collections)} collections matching '{args.search}':")
        for slug in matching_collections:
            print(f"  - {slug}")
        print()

        # Gather models from all matching collections
        all_models = {}
        for slug in matching_collections:
            models = fetch_collection_models(slug, args.verbose)
            for m in models:
                mid = f"{m['owner']}/{m['name']}"
                if mid not in all_models:
                    all_models[mid] = m
            time.sleep(args.delay)

        models = list(all_models.values())
        if not models:
            print("No models found in matching collections.")
            return

        if args.dry_run:
            if args.limit:
                models = models[:args.limit]
            print(f"\nFound {len(models)} models:\n")
            for m in models:
                print(f"  {m['owner']}/{m['name']}")
            print(f"\nDry run complete. Use without --dry-run to generate files.")
            return

        success, skipped = process_model_list(
            models, args.output_dir, existing, args.skip_existing,
            args.dry_run, args.verbose, args.delay, args.limit
        )
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # --- Collection mode ---
    if args.collection:
        models = fetch_collection_models(args.collection, args.verbose)
        if not models:
            print(f"No models found in collection '{args.collection}'.")
            return

        if args.dry_run:
            if args.limit:
                models = models[:args.limit]
            print(f"\nFound {len(models)} models in collection '{args.collection}':\n")
            for m in models:
                print(f"  {m['owner']}/{m['name']}")
            print(f"\nDry run complete. Use without --dry-run to generate files.")
            return

        success, skipped = process_model_list(
            models, args.output_dir, existing, args.skip_existing,
            args.dry_run, args.verbose, args.delay, args.limit
        )
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # --- All collections mode ---
    if args.all:
        print(f"Scraping ALL {len(ALL_COLLECTIONS)} collections...")
        all_models = {}
        for slug in ALL_COLLECTIONS:
            models = fetch_collection_models(slug, args.verbose)
            for m in models:
                mid = f"{m['owner']}/{m['name']}"
                if mid not in all_models:
                    all_models[mid] = m
            time.sleep(args.delay)

        models = list(all_models.values())
        print(f"\nDiscovered {len(models)} unique models across all collections.")

        if args.dry_run:
            if args.limit:
                models = models[:args.limit]
            print(f"\nModels:\n")
            for m in models:
                print(f"  {m['owner']}/{m['name']}")
            print(f"\nDry run complete. Use without --dry-run to generate files.")
            return

        success, skipped = process_model_list(
            models, args.output_dir, existing, args.skip_existing,
            args.dry_run, args.verbose, args.delay, args.limit
        )
        print(f"\nDone! Generated {success} skills, skipped {skipped}.")
        return

    # No mode specified
    parser.print_help()
    print("\nError: Specify one of --model, --models-file, --search, --collection, or --all.")
    sys.exit(1)


if __name__ == "__main__":
    main()
