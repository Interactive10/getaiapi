#!/usr/bin/env python3
"""
WaveSpeed AI Skill Scraper — Auto-generate SKILL.md files for WaveSpeed AI models.

Scrapes WaveSpeed's public website (no API key required):
  - Model list:    https://wavespeed.ai/models
  - Model details: https://wavespeed.ai/models/{provider}/{model}/{variant}

API pattern (for generated skills):
  - Submit task:  POST https://api.wavespeed.ai/api/v3/{model_path}
  - Get result:   GET  https://api.wavespeed.ai/api/v3/predictions/{task_id}

Usage:
  python tools/wavespeed-skill-scraper.py --dry-run
  python tools/wavespeed-skill-scraper.py --all
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
MODELS_PAGE_URL = "https://wavespeed.ai/models"
MODEL_PAGE_URL = "https://wavespeed.ai/models/{model_path}"
DOCS_PAGE_URL = "https://wavespeed.ai/docs/docs-api/{provider}/{model_variant}"
DEFAULT_OUTPUT_DIR = "./skills"
DEFAULT_DELAY = 0.5
MAX_RETRIES = 3

# Regex to extract model paths from the HTML — matches /models/{provider}/{model}
# and optionally /{variant}. Filters out media/static file URLs.
MODEL_PATH_RE = re.compile(
    r'/models/([\w-]+/[\w.-]+(?:/[\w.-]+)?)'
    r'(?=["\s\'<>\?#])'
)
MEDIA_EXT_RE = re.compile(r'\.(jpg|jpeg|png|gif|svg|webp|mp4|webm|mov|js|css|ico|woff|woff2|ttf)(\?|$)', re.IGNORECASE)

# Known model paths from WaveSpeed (fallback if scraping fails)
KNOWN_MODEL_PATHS = [
    "alibaba/wan-2.5/image-edit",
    "alibaba/wan-2.5/video-extend",
    "alibaba/wan-2.5/video-extend-fast",
    "alibaba/wan-2.6/image-to-video-spicy",
    "bria/fibo/video-background-remover",
    "bria/fibo/video-upscaler",
    "bytedance/dreamactor-v2",
    "bytedance/seedance-v1-pro-i2v-480p",
    "bytedance/seedream-v3.1",
    "elevenlabs/dubbing",
    "elevenlabs/music",
    "google/gemini-2.5-flash/text-to-speech",
    "google/gemini-2.5-pro/text-to-speech",
    "google/nano-banana-2/edit",
    "google/nano-banana-2/edit-fast",
    "google/nano-banana-2/text-to-image",
    "google/nano-banana-2/text-to-image-fast",
    "google/nano-banana-pro/edit",
    "google/nano-banana-pro/edit-multi",
    "google/nano-banana-pro/edit-ultra",
    "google/nano-banana-pro/text-to-image-ultra",
    "google/nano-banana/edit",
    "google/veo3.1-fast/image-to-video",
    "inworld/inworld-1.5-mini/text-to-speech",
    "kwaivgi/kling-v2.5-turbo-pro/image-to-video",
    "kwaivgi/kling-v3.0-std/motion-control",
    "kwaivgi/kling-video-to-audio",
    "minimax/hailuo-02/i2v-standard",
    "minimax/music-02",
    "wavespeed-ai/ace-step-1.5",
    "wavespeed-ai/flashvsr",
    "wavespeed-ai/flux-dev",
    "wavespeed-ai/flux-dev-lora",
    "wavespeed-ai/flux-dev-lora-ultra-fast",
    "wavespeed-ai/flux-dev-ultra-fast",
    "wavespeed-ai/flux-fill-dev",
    "wavespeed-ai/flux-redux-dev",
    "wavespeed-ai/flux-redux-pro",
    "wavespeed-ai/flux-schnell",
    "wavespeed-ai/flux-schnell-lora",
    "wavespeed-ai/hunyuan-3d-v3.1/text-to-3d-rapid",
    "wavespeed-ai/hunyuan-video-foley",
    "wavespeed-ai/hunyuan-video/i2v",
    "wavespeed-ai/hunyuan-video/t2v",
    "wavespeed-ai/longcat-avatar",
    "wavespeed-ai/ltx-2-19b/control",
    "wavespeed-ai/ltx-2-19b/video-upscaler",
    "wavespeed-ai/meshy6/image-to-3d",
    "wavespeed-ai/meshy6/text-to-3d",
    "wavespeed-ai/molmo2/image-content-moderator",
    "wavespeed-ai/molmo2/text-content-moderator",
    "wavespeed-ai/molmo2/video-content-moderator",
    "wavespeed-ai/qwen-image-2.0-pro/text-to-image",
    "wavespeed-ai/qwen-image-2.0/edit",
    "wavespeed-ai/qwen-image/edit-multiple-angles",
    "wavespeed-ai/qwen-image/edit-plus-lora",
    "wavespeed-ai/qwen-image/layered",
    "wavespeed-ai/qwen-image/text-to-image",
    "wavespeed-ai/sam3-image",
    "wavespeed-ai/sam3-image-rle",
    "wavespeed-ai/sam3-video-rle",
    "wavespeed-ai/seedvr2/image",
    "wavespeed-ai/skyreels-v3/talking-avatar",
    "wavespeed-ai/soulx-flashhead",
    "wavespeed-ai/ultimate-image-upscaler",
    "wavespeed-ai/ultimate-video-upscaler",
    "wavespeed-ai/video-background-remover",
    "wavespeed-ai/video-upscaler-pro",
    "wavespeed-ai/wan-2.1/i2v-480p",
    "wavespeed-ai/wan-2.1/i2v-480p-lora",
    "wavespeed-ai/wan-2.1/i2v-480p-lora-ultra-fast",
    "wavespeed-ai/wan-2.1/i2v-480p-ultra-fast",
    "wavespeed-ai/wan-2.1/i2v-720p",
    "wavespeed-ai/wan-2.1/i2v-720p-lora",
    "wavespeed-ai/wan-2.1/i2v-720p-lora-ultra-fast",
    "wavespeed-ai/wan-2.1/i2v-720p-ultra-fast",
    "wavespeed-ai/wan-2.1/t2v-480p",
    "wavespeed-ai/wan-2.1/t2v-480p-lora",
    "wavespeed-ai/wan-2.1/t2v-480p-lora-ultra-fast",
    "wavespeed-ai/wan-2.1/t2v-480p-ultra-fast",
    "wavespeed-ai/wan-2.1/t2v-720p",
    "wavespeed-ai/wan-2.1/t2v-720p-lora",
    "wavespeed-ai/wan-2.1/t2v-720p-lora-ultra-fast",
    "wavespeed-ai/wan-2.1/t2v-720p-ultra-fast",
    "wavespeed-ai/wan-2.2-image-lora-trainer",
    "wavespeed-ai/wan-2.2/animate",
    "wavespeed-ai/wan-2.2/i2v-720p",
    "wavespeed-ai/wan-flf2v",
    "wavespeed-ai/wan-flf2v/end_image",
    "wavespeed-ai/z-image-lora-trainer",
    "wavespeed-ai/z-image/base-lora-trainer",
    "wavespeed-ai/z-image/turbo",
    "wavespeed-ai/z-image/turbo-lora",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def slugify(model_path: str) -> str:
    """Convert model path like 'google/nano-banana-2/text-to-image' to 'wavespeed-google-nano-banana-2-text-to-image'."""
    return "wavespeed-" + model_path.replace("/", "-")


def fetch_page(url: str, retries: int = MAX_RETRIES, verbose: bool = False) -> str | None:
    """Fetch an HTML page with retry + backoff. Returns None on failure."""
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; WaveSpeedSkillScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=headers, timeout=30)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 2 ** (attempt + 1)))
                if verbose:
                    print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 404:
                if verbose:
                    print(f"  404 Not Found: {url}")
                return None
            resp.raise_for_status()
            return resp.text
        except requests.RequestException as e:
            if attempt < retries - 1:
                wait = 2 ** (attempt + 1)
                if verbose:
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
# Model Discovery (scrape public website)
# ---------------------------------------------------------------------------


def scrape_model_paths(verbose: bool = False) -> list[str]:
    """Scrape model paths from https://wavespeed.ai/models HTML page."""
    if verbose:
        print("Fetching model list from https://wavespeed.ai/models ...")

    html = fetch_page(MODELS_PAGE_URL, verbose=verbose)
    if not html:
        print("Warning: Could not fetch models page, falling back to known model list.")
        return list(KNOWN_MODEL_PATHS)

    # Extract all /models/{path} links from HTML
    raw_matches = MODEL_PATH_RE.findall(html)

    # Deduplicate and filter out media file URLs
    seen = set()
    paths = []
    for path in raw_matches:
        path = path.strip("/")
        if path in seen:
            continue
        # Skip media/static file URLs
        if MEDIA_EXT_RE.search(path):
            continue
        # Must have at least provider/model (2 segments)
        parts = path.split("/")
        if len(parts) < 2:
            continue
        seen.add(path)
        paths.append(path)

    if verbose:
        print(f"  Found {len(paths)} model paths from HTML.")

    if not paths:
        print("Warning: No model paths extracted from HTML, falling back to known model list.")
        return list(KNOWN_MODEL_PATHS)

    return sorted(paths)


def scrape_model_details(model_path: str, verbose: bool = False) -> dict:
    """Scrape details from an individual model page. Returns a dict with available info."""
    url = MODEL_PAGE_URL.format(model_path=model_path)
    details = {
        "model_path": model_path,
        "name": "",
        "description": "",
        "parameters": [],
        "pricing": "",
    }

    if verbose:
        print(f"  Fetching model page: {url}")

    html = fetch_page(url, verbose=verbose)
    if not html:
        return details

    # Try to extract the page title — often the model name
    title_match = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
    if title_match:
        title = title_match.group(1).strip()
        # Clean up common suffixes like " - WaveSpeed" or " | WaveSpeed"
        title = re.sub(r'\s*[-|]\s*WaveSpeed.*$', '', title, flags=re.IGNORECASE).strip()
        if title:
            details["name"] = title

    # Try to extract description from meta tags
    desc_match = re.search(
        r'<meta\s+(?:name|property)=["\'](?:description|og:description)["\']\s+content=["\']([^"\']+)["\']',
        html, re.IGNORECASE
    )
    if not desc_match:
        desc_match = re.search(
            r'content=["\']([^"\']+)["\']\s+(?:name|property)=["\'](?:description|og:description)["\']',
            html, re.IGNORECASE
        )
    if desc_match:
        details["description"] = desc_match.group(1).strip()

    # Try to extract parameter names from HTML text
    # Look for common patterns: parameter names in code blocks, tables, etc.
    param_matches = re.findall(
        r'(?:parameter|param|field|input)[s]?\s*.*?[`"\'](\w+)[`"\'].*?(?:string|integer|boolean|number|float|array|enum)',
        html, re.IGNORECASE
    )
    if param_matches:
        details["parameters"] = list(dict.fromkeys(param_matches))  # dedupe, keep order

    # Try to extract pricing info
    price_match = re.search(r'\$[\d.]+\s*(?:/|per)', html)
    if price_match:
        details["pricing"] = price_match.group(0).strip()

    return details


# ---------------------------------------------------------------------------
# Model info helpers
# ---------------------------------------------------------------------------


def model_path_to_name(model_path: str) -> str:
    """Convert a model path to a human-readable display name.

    E.g. 'google/nano-banana-2/text-to-image' -> 'Google Nano Banana 2 Text To Image'
    """
    parts = model_path.split("/")
    # Capitalize each segment, replace hyphens with spaces
    name_parts = []
    for part in parts:
        name_parts.append(part.replace("-", " ").replace("_", " ").title())
    return " ".join(name_parts)


def guess_model_type(model_path: str) -> str:
    """Guess the model type/category from the path."""
    path_lower = model_path.lower()
    if "text-to-image" in path_lower or "t2i" in path_lower:
        return "Text to Image"
    if "image-to-video" in path_lower or "i2v" in path_lower:
        return "Image to Video"
    if "text-to-video" in path_lower or "t2v" in path_lower:
        return "Text to Video"
    if "text-to-speech" in path_lower or "tts" in path_lower:
        return "Text to Speech"
    if "text-to-3d" in path_lower:
        return "Text to 3D"
    if "image-to-3d" in path_lower:
        return "Image to 3D"
    if "upscal" in path_lower:
        return "Upscaler"
    if "background-remov" in path_lower:
        return "Background Removal"
    if "edit" in path_lower:
        return "Image Editing"
    if "lora" in path_lower and "trainer" in path_lower:
        return "LoRA Training"
    if "avatar" in path_lower:
        return "Avatar"
    if "music" in path_lower:
        return "Music Generation"
    if "audio" in path_lower:
        return "Audio"
    if "dubbing" in path_lower:
        return "Dubbing"
    if "moderat" in path_lower:
        return "Content Moderation"
    if "video-extend" in path_lower:
        return "Video Extension"
    if "animate" in path_lower:
        return "Animation"
    if "redux" in path_lower or "fill" in path_lower:
        return "Image Generation"
    if "flux" in path_lower or "image" in path_lower:
        return "Image Generation"
    if "video" in path_lower or "wan" in path_lower:
        return "Video Generation"
    if "sam" in path_lower:
        return "Segmentation"
    return ""


def guess_example_input(model_path: str) -> dict:
    """Build a reasonable example input based on the model path."""
    path_lower = model_path.lower()

    # Image generation models
    if any(k in path_lower for k in ("text-to-image", "flux", "seedream", "nano-banana")):
        if "edit" in path_lower:
            return {"prompt": "your edit prompt here", "image": "https://example.com/input.png"}
        if "lora" in path_lower and "trainer" not in path_lower:
            return {"prompt": "your prompt here", "lora_url": "https://example.com/lora.safetensors"}
        if "redux" in path_lower:
            return {"image": "https://example.com/input.png"}
        if "fill" in path_lower:
            return {"prompt": "your prompt here", "image": "https://example.com/input.png", "mask": "https://example.com/mask.png"}
        return {"prompt": "your prompt here"}

    # Video generation models
    if any(k in path_lower for k in ("i2v", "image-to-video")):
        return {"prompt": "your prompt here", "image": "https://example.com/input.png"}
    if any(k in path_lower for k in ("t2v", "text-to-video")):
        return {"prompt": "your prompt here"}
    if "video-extend" in path_lower:
        return {"video": "https://example.com/input.mp4"}
    if "flf2v" in path_lower:
        return {"prompt": "your prompt here", "first_frame": "https://example.com/first.png", "last_frame": "https://example.com/last.png"}
    if "animate" in path_lower:
        return {"image": "https://example.com/input.png"}

    # Text to speech
    if "text-to-speech" in path_lower or "tts" in path_lower:
        return {"text": "Hello, this is a test.", "voice": "default"}

    # Text to 3D
    if "text-to-3d" in path_lower:
        return {"prompt": "a 3D model of a cat"}

    # Image to 3D
    if "image-to-3d" in path_lower:
        return {"image": "https://example.com/input.png"}

    # Upscalers
    if "upscal" in path_lower:
        if "video" in path_lower:
            return {"video": "https://example.com/input.mp4"}
        return {"image": "https://example.com/input.png"}

    # Background removal
    if "background-remov" in path_lower:
        if "video" in path_lower:
            return {"video": "https://example.com/input.mp4"}
        return {"image": "https://example.com/input.png"}

    # Avatar
    if "avatar" in path_lower:
        return {"image": "https://example.com/portrait.png", "audio": "https://example.com/audio.wav"}

    # Content moderation
    if "moderat" in path_lower:
        if "video" in path_lower:
            return {"video": "https://example.com/input.mp4"}
        if "image" in path_lower:
            return {"image": "https://example.com/input.png"}
        return {"text": "content to moderate"}

    # Music
    if "music" in path_lower:
        return {"prompt": "upbeat jazz melody"}
    if "audio" in path_lower:
        return {"video": "https://example.com/input.mp4"}

    # Dubbing
    if "dubbing" in path_lower:
        return {"video": "https://example.com/input.mp4", "target_language": "es"}

    # LoRA trainers
    if "trainer" in path_lower:
        return {"images": ["https://example.com/img1.png", "https://example.com/img2.png"], "trigger_word": "my_style"}

    # Segmentation
    if "sam" in path_lower:
        return {"image": "https://example.com/input.png"}

    # Edit models
    if "edit" in path_lower:
        return {"prompt": "your edit prompt here", "image": "https://example.com/input.png"}

    # Layered
    if "layered" in path_lower:
        return {"prompt": "your prompt here"}

    # Default fallback
    return {"prompt": "your prompt here"}


# ---------------------------------------------------------------------------
# Filter helpers
# ---------------------------------------------------------------------------


def filter_models(model_paths: list[str], filter_text: str | None = None,
                  limit: int | None = None, verbose: bool = False) -> list[str]:
    """Filter and limit model paths."""
    if filter_text:
        filter_lower = filter_text.lower()
        filtered = [p for p in model_paths if filter_lower in p.lower()]
        if verbose:
            print(f"Filtered to {len(filtered)} models matching '{filter_text}'.")
        model_paths = filtered

    if limit and len(model_paths) > limit:
        model_paths = model_paths[:limit]

    return model_paths


# ---------------------------------------------------------------------------
# SKILL.md Generation
# ---------------------------------------------------------------------------


def generate_skill_md(model_path: str, details: dict) -> str:
    """Generate a SKILL.md file for a WaveSpeed AI model."""
    name = details.get("name") or model_path_to_name(model_path)
    description = details.get("description", "")
    model_type = guess_model_type(model_path)
    slug = slugify(model_path)
    source_url = MODEL_PAGE_URL.format(model_path=model_path)

    # Build docs URL: provider/model-variant
    parts = model_path.split("/")
    provider = parts[0]
    model_variant = "-".join(parts[1:])
    docs_url = DOCS_PAGE_URL.format(provider=provider, model_variant=model_variant)

    short_desc = description[:200] if description else f"Use the {name} model via WaveSpeed AI API."
    frontmatter_desc = (
        f"Use this skill for the WaveSpeed AI {name} model ({model_path}). {short_desc}"
    )

    example_input = guess_example_input(model_path)
    example_input_str = json.dumps(example_input, indent=4)

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

    lines.append(f"**Model:** `{model_path}`")
    lines.append(f"**Source:** {source_url}")
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

    # cURL example
    lines.append("```bash")
    lines.append(f'curl -X POST "{API_BASE}/{model_path}" \\')
    lines.append('  -H "Authorization: Bearer $WAVESPEED_API_KEY" \\')
    lines.append('  -H "Content-Type: application/json" \\')
    curl_body = json.dumps(example_input)
    lines.append(f"  -d '{curl_body}'")
    lines.append("```")
    lines.append("")

    # JavaScript example
    indented_input = example_input_str.replace("\n", "\n    ")
    lines.append("### JavaScript Example")
    lines.append("")
    lines.append("```javascript")
    lines.append(f'const response = await fetch("{API_BASE}/{model_path}", {{')
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
    py_input = json.dumps(example_input, indent=4)
    py_indented = py_input.replace("\n", "\n    ")
    lines.append("```python")
    lines.append("import os, time, requests")
    lines.append("")
    lines.append('API_KEY = os.environ["WAVESPEED_API_KEY"]')
    lines.append('HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}')
    lines.append("")
    lines.append("# Submit task")
    lines.append(f'resp = requests.post("{API_BASE}/{model_path}",')
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

    # --- Input Parameters ---
    lines.append("## Input Parameters")
    lines.append("")
    lines.append(f"> For the full list of parameters, defaults, and accepted values, check the model's API docs:")
    lines.append(f"> - Model page: {source_url}")
    lines.append(f"> - API docs: {docs_url}")
    lines.append("")

    # Show what we know from the example
    lines.append("**Common parameters** (based on model type):")
    lines.append("")
    lines.append("| Parameter | Type | Description |")
    lines.append("| --- | --- | --- |")
    for key, val in example_input.items():
        if isinstance(val, str):
            ptype = "string"
        elif isinstance(val, bool):
            ptype = "boolean"
        elif isinstance(val, int):
            ptype = "integer"
        elif isinstance(val, float):
            ptype = "float"
        elif isinstance(val, list):
            ptype = "array"
        else:
            ptype = "any"
        pdesc = _param_description(key, model_path)
        lines.append(f"| `{key}` | {ptype} | {pdesc} |")

    # Add common optional params
    lines.append(f"| `enable_sync_mode` | boolean | Wait for result in the initial response |")
    lines.append(f"| `enable_base64_output` | boolean | Return base64-encoded output instead of URL |")
    lines.append(f"| `webhook_url` | string | URL to receive async notification when task completes |")
    lines.append("")

    # Show scraped params if we got any
    scraped_params = details.get("parameters", [])
    if scraped_params:
        lines.append("**Additional parameters found on model page:** " + ", ".join(f"`{p}`" for p in scraped_params))
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
    lines.append(f"**POST** `{API_BASE}/{model_path}`")
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
    lines.append(f"- API docs: {docs_url}")
    lines.append("- API reference: https://wavespeed.ai/docs/api-reference")
    lines.append("- Authentication: https://wavespeed.ai/docs/api-authentication")
    lines.append("- Submit task: https://wavespeed.ai/docs/submit-task")
    lines.append("- Get result: https://wavespeed.ai/docs/get-result")
    lines.append("")

    return "\n".join(lines)


def _param_description(param_name: str, model_path: str) -> str:
    """Generate a reasonable description for a common parameter name."""
    descs = {
        "prompt": "Text prompt describing what to generate",
        "image": "Input image URL",
        "video": "Input video URL",
        "audio": "Input audio URL",
        "mask": "Mask image URL for inpainting",
        "text": "Input text",
        "voice": "Voice identifier for speech synthesis",
        "target_language": "Target language code for translation/dubbing",
        "first_frame": "URL of the first frame image",
        "last_frame": "URL of the last frame image",
        "lora_url": "URL to LoRA weights file (.safetensors)",
        "images": "Array of training image URLs",
        "trigger_word": "Trigger word for LoRA activation",
    }
    return descs.get(param_name, f"See model docs for details")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def process_model(model_path: str, output_dir: str, delay: float = DEFAULT_DELAY,
                  dry_run: bool = False, verbose: bool = False,
                  fetch_details: bool = True) -> bool:
    """Process a single model: scrape details, generate SKILL.md."""
    print(f"  Processing: {model_path}")

    details = {}
    if fetch_details:
        details = scrape_model_details(model_path, verbose=verbose)
        time.sleep(delay)  # Be polite to the website

    content = generate_skill_md(model_path, details)

    if dry_run:
        print(content)
        return True

    slug = slugify(model_path)
    out_dir = Path(output_dir) / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "SKILL.md"
    out_file.write_text(content)

    if verbose:
        name = details.get("name") or model_path_to_name(model_path)
        print(f"  Wrote: {out_file} (name: {name})")
    else:
        print(f"  -> {out_file}")

    return True


def main():
    parser = argparse.ArgumentParser(
        description="Auto-generate SKILL.md files for WaveSpeed AI models (no API key required)"
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview without writing files")
    parser.add_argument("--model", type=str, default=None,
                        help="Process a single model path (e.g. 'wavespeed-ai/flux-dev')")
    parser.add_argument("--all", action="store_true",
                        help="Scrape all models from the WaveSpeed models page")
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

    # Load existing
    existing = load_existing_endpoints(args.output_dir) if args.skip_existing else set()
    if args.verbose:
        print(f"Found {len(existing)} existing WaveSpeed skill endpoints.")

    # --- Single model mode ---
    if args.model:
        model_path = args.model.strip().strip("/")
        # Remove leading "models/" if someone passes the full URL path
        if model_path.startswith("models/"):
            model_path = model_path[len("models/"):]

        if model_path in existing and args.skip_existing:
            print(f"Skill already exists for {model_path}, skipping. Use --no-skip-existing to override.")
            return

        process_model(model_path, args.output_dir, args.delay, args.dry_run, args.verbose)
        return

    # --- List/filter all models ---
    if not args.all and not args.filter:
        print("Specify --all to scrape all models, --model for a single model, or --filter to search.")
        print("Use --dry-run to preview without writing files.")
        parser.print_help()
        sys.exit(1)

    model_paths = scrape_model_paths(verbose=args.verbose)
    if not model_paths:
        print("No models found.")
        sys.exit(1)

    model_paths = filter_models(model_paths, args.filter, args.limit, args.verbose)

    # Skip existing
    new_paths = []
    for path in model_paths:
        if path in existing and args.skip_existing:
            if args.verbose:
                print(f"  Already have: {path}")
            continue
        new_paths.append(path)

    print(f"\n{len(new_paths)} new models to process (out of {len(model_paths)} total, {len(existing)} existing).\n")

    if args.dry_run and not args.model:
        for path in new_paths:
            name = model_path_to_name(path)
            mtype = guess_model_type(path)
            type_str = f"  [{mtype}]" if mtype else ""
            print(f"  {path}  --  {name}{type_str}")
        print(f"\nDry run complete. Use without --dry-run to generate files.")
        return

    # Process each
    success = 0
    skipped = 0
    for i, path in enumerate(new_paths, 1):
        name = model_path_to_name(path)
        print(f"[{i}/{len(new_paths)}] {path} ({name})")

        if process_model(path, args.output_dir, args.delay, args.dry_run, args.verbose):
            success += 1
        else:
            skipped += 1

    print(f"\nDone! Generated {success} skills, skipped {skipped}.")


if __name__ == "__main__":
    main()
