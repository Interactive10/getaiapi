#!/usr/bin/env python3
"""
fal.ai Skill Scraper — Auto-generate SKILL.md files for fal.ai models.

Uses fal.ai's public JSON APIs:
  - Model list: https://fal.ai/api/models?page={n}&limit=50
  - OpenAPI spec: https://fal.ai/api/openapi/queue/openapi.json?endpoint_id={model_id}

Usage:
  python tools/fal-skill-scraper.py --dry-run
  python tools/fal-skill-scraper.py --filter image-to-video --limit 5
  python tools/fal-skill-scraper.py --verbose
"""

import argparse
import json
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

MODELS_API = "https://fal.ai/api/models"
OPENAPI_API = "https://fal.ai/api/openapi/queue/openapi.json"
FAL_MODEL_PAGE = "https://fal.ai/models/{endpoint}/api"
DEFAULT_OUTPUT_DIR = "./skills"
DEFAULT_DELAY = 1.0
MAX_RETRIES = 3
PAGE_LIMIT = 50

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def slugify(endpoint: str) -> str:
    """Convert endpoint like 'fal-ai/kling-video/v3/pro/image-to-video' to dir name."""
    return endpoint.replace("/", "-")


def fetch_json(url: str, params: dict | None = None, retries: int = MAX_RETRIES) -> dict | None:
    """Fetch JSON with retry + backoff. Returns None on failure."""
    for attempt in range(retries):
        try:
            resp = requests.get(url, params=params, timeout=30)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 2 ** (attempt + 1)))
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
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
    """Parse Endpoint lines from existing SKILL.md files."""
    endpoints = set()
    skills_path = Path(output_dir)
    if not skills_path.exists():
        return endpoints

    for skill_dir in skills_path.glob("fal-ai-*/SKILL.md"):
        try:
            text = skill_dir.read_text()
            # Match both formats: **Endpoint:** `...` and ```\n...\n```
            for match in re.finditer(r'\*\*Endpoint[:\s]*\*\*[:\s]*`([^`]+)`', text):
                endpoints.add(match.group(1))
            # Also check for bare endpoint in code block after "## Endpoint"
            for match in re.finditer(r'##\s*Endpoint\s*\n+```\n([^\n]+)\n```', text):
                endpoints.add(match.group(1))
        except Exception:
            continue

    return endpoints


# ---------------------------------------------------------------------------
# Model list fetching
# ---------------------------------------------------------------------------


def fetch_all_models(filter_text: str | None = None, limit: int | None = None,
                     delay: float = DEFAULT_DELAY, verbose: bool = False) -> list[dict]:
    """Fetch all models from the paginated API."""
    models = []
    page = 1

    while True:
        if verbose:
            print(f"Fetching models page {page}...")

        data = fetch_json(MODELS_API, params={"page": page, "limit": PAGE_LIMIT})
        if not data:
            print(f"Failed to fetch models page {page}, stopping.")
            break

        page_models = data if isinstance(data, list) else data.get("items", data.get("data", data.get("models", [])))
        if not page_models:
            break

        models.extend(page_models)

        # Check if we've reached the end
        total = data.get("total", data.get("pages", 0) * PAGE_LIMIT) if isinstance(data, dict) else None
        if total and len(models) >= total:
            break
        if len(page_models) < PAGE_LIMIT:
            break

        page += 1
        time.sleep(delay * 0.5)  # Light delay between list pages

    if verbose:
        print(f"Fetched {len(models)} total models.")

    # Filter by category/text if specified
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

    # Remove deprecated/removed/unlisted models
    active = []
    for m in models:
        if m.get("deprecated") or m.get("removed") or m.get("unlisted"):
            continue
        status = (m.get("status") or "").lower()
        if status in ("deprecated", "removed", "unlisted"):
            continue
        active.append(m)
    if verbose and len(active) != len(models):
        print(f"Removed {len(models) - len(active)} deprecated/removed/unlisted models.")
    models = active

    # Apply limit
    if limit and len(models) > limit:
        models = models[:limit]

    return models


# ---------------------------------------------------------------------------
# OpenAPI Schema Extraction
# ---------------------------------------------------------------------------


def resolve_ref(ref: str, spec: dict) -> dict | None:
    """Resolve a $ref pointer like '#/components/schemas/Foo'."""
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


def flatten_schema(schema: dict, spec: dict, seen: set | None = None) -> dict:
    """Resolve $ref pointers in a schema, with cycle detection."""
    if seen is None:
        seen = set()

    if "$ref" in schema:
        ref = schema["$ref"]
        if ref in seen:
            return {"type": "object", "description": "(circular reference)"}
        seen.add(ref)
        resolved = resolve_ref(ref, spec)
        if resolved:
            return flatten_schema(resolved, spec, seen)
        return schema

    result = dict(schema)

    # Resolve nested properties
    if "properties" in result:
        new_props = {}
        for k, v in result["properties"].items():
            new_props[k] = flatten_schema(v, spec, set(seen))
        result["properties"] = new_props

    # Resolve items in arrays
    if "items" in result:
        result["items"] = flatten_schema(result["items"], spec, set(seen))

    # Resolve allOf / oneOf / anyOf
    for key in ("allOf", "oneOf", "anyOf"):
        if key in result:
            result[key] = [flatten_schema(s, spec, set(seen)) for s in result[key]]

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
        unique = list(dict.fromkeys(types))  # dedupe preserving order
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
        if fmt == "binary":
            return "file (binary)"
        if fmt in ("uri", "url"):
            return "string (URL)"
        return "string"
    if t == "object":
        title = schema.get("title", "")
        if title:
            return title
        return "object"

    if "title" in schema:
        return schema["title"]

    return str(t)


def extract_schemas(endpoint: str, spec: dict) -> tuple[dict | None, dict | None]:
    """Extract input and output schemas from an OpenAPI spec."""
    paths = spec.get("paths", {})
    if not paths:
        return None, None

    # Find the POST path for input schema
    post_op = None
    for path, methods in paths.items():
        if "post" in methods:
            post_op = methods["post"]
            break

    # Input schema from POST requestBody
    input_schema = None
    if post_op:
        req_body = post_op.get("requestBody", {})
        content = req_body.get("content", {})
        json_content = content.get("application/json", {})
        raw_input = json_content.get("schema", {})
        if raw_input:
            input_schema = flatten_schema(raw_input, spec)

    # Output schema: prefer GET /requests/{request_id} (actual model output)
    # over POST response (which is typically QueueStatus)
    output_schema = None
    for path, methods in paths.items():
        if "/requests/" in path and path.endswith("}") and "get" in methods:
            # This is the result endpoint: GET /endpoint/requests/{request_id}
            # Skip the /status path
            if "/status" in path:
                continue
            get_op = methods["get"]
            responses = get_op.get("responses", {})
            resp_200 = responses.get("200", {})
            resp_content = resp_200.get("content", {})
            resp_json = resp_content.get("application/json", {})
            raw_output = resp_json.get("schema", {})
            if raw_output:
                output_schema = flatten_schema(raw_output, spec)
                break

    # Fallback: use POST 200 response if no result endpoint found
    if not output_schema and post_op:
        responses = post_op.get("responses", {})
        resp_200 = responses.get("200", {})
        resp_content = resp_200.get("content", {})
        resp_json = resp_content.get("application/json", {})
        raw_output = resp_json.get("schema", {})
        if raw_output:
            candidate = flatten_schema(raw_output, spec)
            # Skip if it's just QueueStatus
            title = candidate.get("title", "")
            if "QueueStatus" not in title:
                output_schema = candidate

    return input_schema, output_schema


def schema_to_table_rows(schema: dict, required_fields: list | None = None) -> list[dict]:
    """Convert a flattened schema's properties to table row dicts."""
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

        # Clean description: single line, escape pipes
        row["description"] = row["description"].replace("\n", " ").replace("|", "\\|").strip()
        if len(row["description"]) > 120:
            row["description"] = row["description"][:117] + "..."

        rows.append(row)

    return rows


# ---------------------------------------------------------------------------
# SKILL.md Generation
# ---------------------------------------------------------------------------


def get_model_name(model: dict, endpoint: str) -> str:
    """Get a display name for the model."""
    name = model.get("title") or model.get("name") or ""
    if name:
        return name
    # Fall back to endpoint slug
    return endpoint.split("/")[-1].replace("-", " ").title()


def get_model_description(model: dict) -> str:
    """Get model description."""
    return (model.get("shortDescription") or model.get("description") or model.get("summary") or "").strip()


def generate_skill_md(endpoint: str, model: dict, input_schema: dict | None,
                      output_schema: dict | None) -> str:
    """Generate a SKILL.md file content."""
    name = get_model_name(model, endpoint)
    description = get_model_description(model)
    slug = slugify(endpoint)
    source_url = FAL_MODEL_PAGE.format(endpoint=endpoint)

    # Build frontmatter description for skill matching
    short_desc = description[:200] if description else f"Use the {name} model via fal.ai API."
    frontmatter_desc = (
        f"Use this skill for the fal.ai {name} model ({endpoint}). {short_desc}"
    )

    lines = []

    # --- Frontmatter ---
    lines.append("---")
    lines.append(f"name: {slug}")
    lines.append(f"description: >")
    lines.append(f"  {frontmatter_desc}")
    lines.append("---")
    lines.append("")

    # --- Title ---
    lines.append(f"# {name}")
    lines.append("")
    if description:
        lines.append(description)
        lines.append("")

    lines.append(f"**Endpoint:** `{endpoint}`")
    lines.append(f"**Source:** {source_url}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Quick Start ---
    lines.append("## Quick Start")
    lines.append("")
    lines.append("### 1. Install the Client")
    lines.append("")
    lines.append("```bash")
    lines.append("npm install --save @fal-ai/client")
    lines.append("```")
    lines.append("")
    lines.append("### 2. Set Your API Key")
    lines.append("")
    lines.append("```bash")
    lines.append('export FAL_KEY="YOUR_API_KEY"')
    lines.append("```")
    lines.append("")
    lines.append("### 3. Submit a Request")
    lines.append("")

    # Build a minimal example input
    example_input = _build_example_input(input_schema)
    example_input_str = json.dumps(example_input, indent=4) if example_input else '{\n    "prompt": "your prompt here"\n  }'
    # Indent for inside the subscribe call
    indented_input = example_input_str.replace("\n", "\n    ")

    lines.append("```javascript")
    lines.append('import { fal } from "@fal-ai/client";')
    lines.append("")
    lines.append(f'const result = await fal.subscribe("{endpoint}", {{')
    lines.append(f"  input: {indented_input},")
    lines.append("  logs: true,")
    lines.append("  onQueueUpdate: (update) => {")
    lines.append('    if (update.status === "IN_PROGRESS") {')
    lines.append("      update.logs.map((l) => l.message).forEach(console.log);")
    lines.append("    }")
    lines.append("  },")
    lines.append("});")
    lines.append("console.log(result.data);")
    lines.append("console.log(result.requestId);")
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Authentication ---
    lines.append("## Authentication")
    lines.append("")
    lines.append("Set the `FAL_KEY` environment variable, or configure in code:")
    lines.append("")
    lines.append("```javascript")
    lines.append('import { fal } from "@fal-ai/client";')
    lines.append('fal.config({ credentials: "YOUR_FAL_KEY" });')
    lines.append("```")
    lines.append("")
    lines.append("> **Important:** When running client-side, use a server-side proxy to protect your API key.")
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
    if output_schema and output_schema.get("properties"):
        output_rows = schema_to_table_rows(output_schema)
        if output_rows:
            lines.append("## Output Schema")
            lines.append("")
            lines.append("| Field | Type | Description |")
            lines.append("| --- | --- | --- |")
            for row in output_rows:
                lines.append(f"| `{row['name']}` | {row['type']} | {row['description']} |")
            lines.append("")
            lines.append("---")
            lines.append("")

    # --- Queue API ---
    lines.append("## Queue API (Long-Running Requests)")
    lines.append("")
    lines.append("### Submit to Queue")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const {{ request_id }} = await fal.queue.submit("{endpoint}", {{')
    lines.append(f"  input: {indented_input},")
    lines.append('  webhookUrl: "https://optional.webhook.url/for/results",')
    lines.append("});")
    lines.append("```")
    lines.append("")
    lines.append("### Check Status")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const status = await fal.queue.status("{endpoint}", {{')
    lines.append('  requestId: "<request_id>",')
    lines.append("  logs: true,")
    lines.append("});")
    lines.append("```")
    lines.append("")
    lines.append("### Get Result")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const result = await fal.queue.result("{endpoint}", {{')
    lines.append('  requestId: "<request_id>",')
    lines.append("});")
    lines.append("console.log(result.data);")
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")

    # --- Tips ---
    lines.append("## Tips")
    lines.append("")
    lines.append("- Use `fal.subscribe` for quick scripts; use queue API for production workloads.")
    lines.append("- Set `webhookUrl` on queue submit to get notified when processing completes.")
    lines.append("- File inputs accept URLs, Base64 data URIs, or uploaded files via `fal.storage.upload(file)`.")
    lines.append("")
    lines.append("## References")
    lines.append("")
    lines.append(f"- API page: {source_url}")
    lines.append(f"- OpenAPI spec: {OPENAPI_API}?endpoint_id={endpoint}")
    lines.append("- Queue docs: https://docs.fal.ai/model-endpoints/queue")
    lines.append("- File uploads: https://docs.fal.ai/model-endpoints#file-uploads")
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
            if "url" in name.lower() or "image" in name.lower():
                example[name] = "https://example.com/input.png"
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


def get_endpoint(model: dict) -> str | None:
    """Extract the endpoint ID from a model dict. Tries common field names."""
    for key in ("id", "endpoint_id", "endpointId", "slug", "model_id"):
        val = model.get(key)
        if val and isinstance(val, str) and "/" in val:
            return val
    # Try constructing from owner + name
    owner = model.get("owner", "")
    name = model.get("name", "")
    if owner and name:
        return f"{owner}/{name}"
    return None


def main():
    parser = argparse.ArgumentParser(
        description="Auto-generate SKILL.md files for fal.ai models"
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="List models that would be processed, don't write files")
    parser.add_argument("--filter", type=str, default=None,
                        help="Filter models by keyword (e.g. 'image-to-video')")
    parser.add_argument("--limit", type=int, default=None,
                        help="Max number of models to process")
    parser.add_argument("--delay", type=float, default=DEFAULT_DELAY,
                        help=f"Rate limit delay in seconds (default: {DEFAULT_DELAY})")
    parser.add_argument("--output-dir", type=str, default=DEFAULT_OUTPUT_DIR,
                        help=f"Skills output directory (default: {DEFAULT_OUTPUT_DIR})")
    parser.add_argument("--verbose", action="store_true",
                        help="Show detailed progress")
    parser.add_argument("--endpoint", type=str, default=None,
                        help="Process a single specific endpoint ID")

    args = parser.parse_args()

    # 1. Load existing endpoints
    existing = load_existing_endpoints(args.output_dir)
    if args.verbose:
        print(f"Found {len(existing)} existing skill endpoints: {existing}")

    # 2. Single endpoint mode
    if args.endpoint:
        endpoint = args.endpoint
        if endpoint in existing:
            print(f"Skill already exists for {endpoint}, skipping.")
            return

        print(f"Processing single endpoint: {endpoint}")
        spec = fetch_json(OPENAPI_API, params={"endpoint_id": endpoint})
        if not spec:
            print(f"Failed to fetch OpenAPI spec for {endpoint}")
            sys.exit(1)

        input_schema, output_schema = extract_schemas(endpoint, spec)
        # Use a minimal model dict
        model = {"title": endpoint.split("/")[-1].replace("-", " ").title()}
        content = generate_skill_md(endpoint, model, input_schema, output_schema)

        if args.dry_run:
            print(content)
            return

        slug = slugify(endpoint)
        out_dir = Path(args.output_dir) / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "SKILL.md"
        out_file.write_text(content)
        print(f"Wrote: {out_file}")
        return

    # 3. Fetch all models
    models = fetch_all_models(
        filter_text=args.filter,
        limit=args.limit,
        delay=args.delay,
        verbose=args.verbose,
    )

    if not models:
        print("No models found.")
        sys.exit(1)

    # 4. Filter out existing
    new_models = []
    for m in models:
        endpoint = get_endpoint(m)
        if not endpoint:
            if args.verbose:
                print(f"  Skipping model with no endpoint: {m.get('title', m.get('name', '?'))}")
            continue
        if endpoint in existing:
            if args.verbose:
                print(f"  Already have: {endpoint}")
            continue
        new_models.append((endpoint, m))

    print(f"\n{len(new_models)} new models to process (out of {len(models)} total, {len(existing)} existing).\n")

    if args.dry_run:
        for endpoint, m in new_models:
            name = get_model_name(m, endpoint)
            print(f"  {endpoint}  —  {name}")
        print(f"\nDry run complete. Use without --dry-run to generate files.")
        return

    # 5. Process each new model
    success = 0
    skipped = 0
    for i, (endpoint, model) in enumerate(new_models, 1):
        name = get_model_name(model, endpoint)
        print(f"[{i}/{len(new_models)}] {endpoint} ({name})")

        spec = fetch_json(OPENAPI_API, params={"endpoint_id": endpoint})
        if not spec:
            print(f"  SKIP: Could not fetch OpenAPI spec")
            skipped += 1
            time.sleep(args.delay)
            continue

        input_schema, output_schema = extract_schemas(endpoint, spec)
        if not input_schema and not output_schema:
            print(f"  SKIP: No input/output schemas found")
            skipped += 1
            time.sleep(args.delay)
            continue

        content = generate_skill_md(endpoint, model, input_schema, output_schema)

        slug = slugify(endpoint)
        out_dir = Path(args.output_dir) / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "SKILL.md"
        out_file.write_text(content)

        if args.verbose:
            props_in = len((input_schema or {}).get("properties", {}))
            props_out = len((output_schema or {}).get("properties", {}))
            print(f"  Wrote: {out_file} ({props_in} input params, {props_out} output fields)")
        else:
            print(f"  -> {out_file}")

        success += 1
        time.sleep(args.delay)

    print(f"\nDone! Generated {success} skills, skipped {skipped}.")


if __name__ == "__main__":
    main()
