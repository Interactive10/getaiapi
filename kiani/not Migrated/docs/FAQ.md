# FAQ

## Deployment

### Does getaiapi work on Vercel Edge / Cloudflare Workers?

Yes. As of v1.0.0, the model registry is bundled at build time via JSON import. There is no `readFileSync`, no `fs` dependency, and no special bundler configuration required. It works in any ESM-compatible runtime including Vercel Edge Functions, Cloudflare Workers, Deno Deploy, and Bun.

If you're upgrading from v0.x and had custom webpack/Next.js config to handle `fs`, you can remove it. See the [Migration Guide](MIGRATION.md).

## Errors

### `ProviderError: Provider fal-ai returned status 403`

This means fal-ai rejected the request at the API level. Common causes:

- **Insufficient credits** — your fal-ai account has run out of funds. Top up at [fal.ai/dashboard](https://fal.ai/dashboard).
- **Invalid API key** — your `FAL_KEY` is expired or revoked.
- **Model access restricted** — some models require approval before use.

This is not a getaiapi bug. The request is rejected before it reaches our code.

### `AuthError: Missing or invalid API key`

You haven't set the API key for the provider. Set the appropriate environment variable:

- fal-ai: `FAL_KEY`
- Replicate: `REPLICATE_API_TOKEN`
- WaveSpeed: `WAVESPEED_API_KEY`
- OpenRouter: `OPENROUTER_API_KEY`

Or use `configure({ keys: { ... } })` to set them programmatically.

### `RateLimitError: Rate limited by <provider>`

The provider returned HTTP 429. You're sending too many requests. Wait and retry, or upgrade your plan with the provider.

### `No content in LLM response` / `outputs` is empty

If you're using OpenRouter (text-generation) and getting empty `outputs[]`, make sure you're on getaiapi `>=0.4.1`. Versions `0.4.0` had a bug where the output mapper couldn't parse `choices[0].message.content`.
