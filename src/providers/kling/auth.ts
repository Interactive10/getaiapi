import { createHmac } from 'crypto'

/** Generates an HS256 JWT for Kling API authentication. */
export function generateJwt(accessKey: string, secretKey: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(JSON.stringify({
    iss: accessKey,
    exp: now + 1800,
    nbf: now - 5,
  })).toString('base64url')
  const signature = createHmac('sha256', secretKey)
    .update(`${header}.${payload}`)
    .digest('base64url')
  return `${header}.${payload}.${signature}`
}

/** Builds Authorization + Content-Type headers for a Kling API call. */
export function buildAuthHeaders(accessKey: string, secretKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${generateJwt(accessKey, secretKey)}`,
    'Content-Type': 'application/json',
  }
}
