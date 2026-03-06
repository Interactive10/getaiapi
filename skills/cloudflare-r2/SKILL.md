# Cloudflare R2 File Storage – SKILL.md

## Overview

Cloudflare R2 is an S3-compatible object storage service with **zero egress fees**. It uses the standard AWS S3 API, so existing S3 SDKs work with minimal config changes. This skill covers bucket setup, authentication, CRUD operations, presigned URLs, CORS, and common integration patterns.

---

## 1. Prerequisites

- A Cloudflare account with R2 purchased (billing enabled in dashboard)
- Your **Cloudflare Account ID** (found in dashboard → Overview → right sidebar)
- Node.js 18+ (for JS/TS examples) or Python 3.8+ (for boto3 examples)

---

## 2. Create a Bucket

### Via Dashboard
1. Go to **R2 Object Storage** → **Overview**
2. Click **Create bucket**
3. Enter a bucket name → **Create bucket**

### Via Wrangler CLI
```bash
npm i -D wrangler@latest
wrangler login
wrangler r2 bucket create <BUCKET_NAME>
```

### Via AWS CLI
```bash
aws s3api create-bucket \
  --bucket <BUCKET_NAME> \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

---

## 3. Authentication – Create API Tokens

1. Dashboard → **R2 Object Storage** → **Manage R2 API Tokens**
2. Choose **Account API token** or **User API token**
3. Select permissions:
   | Permission | Scope |
   |---|---|
   | Admin Read & Write | Create/delete buckets, read/write objects |
   | Admin Read only | List buckets, read objects |
   | Object Read & Write | Read/write objects in specific buckets |
   | Object Read only | Read objects in specific buckets |
4. Save the **Access Key ID** and **Secret Access Key** immediately (secret shown only once)

### Environment Variables
```env
R2_ACCOUNT_ID=<your-account-id>
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_SECRET_ACCESS_KEY=<your-secret-access-key>
R2_BUCKET=<your-bucket-name>
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
```

### Jurisdiction-Specific Endpoints
- **EU:** `https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com`
- **FedRAMP:** `https://<ACCOUNT_ID>.fedramp.r2.cloudflarestorage.com`

---

## 4. S3 Client Setup

### Node.js (AWS SDK v3) – Recommended for servers/backends
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
```

### Node.js (aws4fetch) – Recommended for Cloudflare Workers
```bash
npm install aws4fetch
```

```typescript
import { AwsClient } from 'aws4fetch';

const r2 = new AwsClient({
  service: 's3',
  region: 'auto',
  accessKeyId: env.R2_ACCESS_KEY_ID,
  secretAccessKey: env.R2_SECRET_ACCESS_KEY,
});

const R2_URL = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
```

> **Important:** `@aws-sdk/client-s3` does NOT work inside Cloudflare Workers (uses Node.js `fs` module). Use `aws4fetch` for Workers.

### Python (boto3)
```bash
pip install boto3
```

```python
import boto3

r2 = boto3.client(
    's3',
    endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=SECRET_ACCESS_KEY,
    region_name='auto',
)
```

---

## 5. Common Operations

### Upload an Object
```typescript
// AWS SDK v3
await r2.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/photo.png',
  Body: fileBuffer,
  ContentType: 'image/png',
}));
```

### Download an Object
```typescript
const response = await r2.send(new GetObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/photo.png',
}));
const data = await response.Body?.transformToByteArray();
```

### List Objects
```typescript
const response = await r2.send(new ListObjectsV2Command({
  Bucket: 'my-bucket',
  Prefix: 'uploads/',
  MaxKeys: 100,
}));
const keys = response.Contents?.map(obj => obj.Key);
```

### Delete an Object
```typescript
await r2.send(new DeleteObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/photo.png',
}));
```

---

## 6. Presigned URLs

Presigned URLs grant temporary access (read or write) without exposing credentials. They are generated **client-side** using AWS Signature V4 — no R2 API call is needed.

### Generate a Download URL (GET)
```typescript
const url = await getSignedUrl(
  r2,
  new GetObjectCommand({ Bucket: 'my-bucket', Key: 'photo.png' }),
  { expiresIn: 3600 } // 1 hour
);
```

### Generate an Upload URL (PUT)
```typescript
const url = await getSignedUrl(
  r2,
  new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: 'uploads/photo.png',
    ContentType: 'image/png',
  }),
  { expiresIn: 3600 }
);
```

### Using the Upload URL from a Client
```bash
curl -X PUT "<presigned-url>" \
  -H "Content-Type: image/png" \
  --data-binary @photo.png
```

```javascript
// Browser / React
await fetch(presignedUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type },
});
```

### Presigned URLs in Cloudflare Workers (aws4fetch)
```typescript
const signedRequest = await r2.sign(
  new Request(`${R2_URL}/my-bucket/photo.png?X-Amz-Expires=3600`),
  { aws: { signQuery: true } }
);
const presignedUrl = signedRequest.url.toString();
```

### Key Rules
- Presigned URLs only work with the S3 API domain (`<ACCOUNT_ID>.r2.cloudflarestorage.com`), **not** custom domains
- When using `ContentType` in a PUT presigned URL, the client **must** send a matching `Content-Type` header
- URLs can be reused until they expire

---

## 7. CORS Configuration

CORS is **required** for browser-based uploads/downloads via presigned URLs, even though the URL itself handles auth.

### Example CORS Policy (Dashboard → Bucket → Settings → CORS Policy)
```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

### Via Wrangler
```bash
wrangler r2 bucket cors put <BUCKET_NAME> --rules '[{"AllowedOrigins":["*"],"AllowedMethods":["GET","PUT"],"AllowedHeaders":["Content-Type"]}]'
```

> **Production tip:** Never use `"AllowedOrigins": ["*"]` in production. Restrict to your actual domains.

---

## 8. Public Buckets

To serve objects publicly (without presigned URLs):
1. Dashboard → R2 → Bucket → **Settings**
2. Enable **Public access**
3. Objects are accessible at: `https://pub-<hash>.r2.dev/<key>`

You can also connect a custom domain for public access.

---

## 9. Typical Integration Pattern (Backend API + Browser Upload)

```
Browser                    Your Backend               Cloudflare R2
   │                           │                           │
   │  POST /upload-url         │                           │
   │  {filename, contentType}  │                           │
   │ ─────────────────────────>│                           │
   │                           │  Generate presigned PUT   │
   │                           │  URL (no R2 call needed)  │
   │  { url, key }             │                           │
   │ <─────────────────────────│                           │
   │                           │                           │
   │  PUT <presigned-url>      │                           │
   │  Body: file               │                           │
   │ ──────────────────────────────────────────────────────>│
   │                           │                           │
   │  200 OK                   │                           │
   │ <──────────────────────────────────────────────────────│
```

---

## 10. Temporary Access Credentials

For scoped, short-lived credentials (e.g., per-user access):

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/temp-access-credentials" \
  -H "Authorization: Bearer <CF_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "bucket": "my-bucket",
    "parentAccessKeyId": "<R2_ACCESS_KEY_ID>",
    "permission": "object-read-write",
    "ttlSeconds": 3600,
    "prefixes": ["user-123/"]
  }'
```

Use the returned `accessKeyId`, `secretAccessKey`, and `sessionToken` as temporary S3 credentials.

---

## 11. Pricing Summary

| Resource | Free Tier | Cost Beyond Free |
|---|---|---|
| Storage | 10 GB/month | $0.015/GB/month |
| Class A ops (write) | 1M requests/month | $4.50/million |
| Class B ops (read) | 10M requests/month | $0.36/million |
| **Egress** | **Unlimited** | **$0.00 (free forever)** |

---

## 12. Common Pitfalls

1. **`fs.readFile is not implemented`** – You're using `@aws-sdk/client-s3` inside a Cloudflare Worker. Switch to `aws4fetch`.
2. **CORS errors on browser upload** – Add a CORS policy to the bucket. Presigned URLs alone don't bypass CORS.
3. **Presigned URL on custom domain** – Presigned URLs only work on `<ACCOUNT_ID>.r2.cloudflarestorage.com`, not custom domains.
4. **Secret key lost** – Cannot be retrieved after creation. Delete the token and create a new one.
5. **`ContentType` mismatch** – If you signed a PUT URL with a specific `ContentType`, the upload request must send the exact same `Content-Type` header.
6. **Jurisdiction mismatch** – EU/FedRAMP buckets must use their specific endpoints. A standard endpoint cannot access jurisdictional buckets.

---

## References

- [R2 Getting Started](https://developers.cloudflare.com/r2/get-started/)
- [R2 Authentication / API Tokens](https://developers.cloudflare.com/r2/api/tokens/)
- [R2 S3 API Compatibility](https://developers.cloudflare.com/r2/api/s3/api/)
- [R2 Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
- [R2 CORS Configuration](https://developers.cloudflare.com/r2/buckets/cors/)
- [R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [aws4fetch (for Workers)](https://developers.cloudflare.com/r2/examples/aws/aws4fetch/)
- [AWS SDK v3 examples](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/)
- [boto3 examples](https://developers.cloudflare.com/r2/examples/aws/boto3/)
