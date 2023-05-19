import crypto from 'crypto'

const uuidv4Re =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isValidUUIDv4(str: string): boolean {
  return str && uuidv4Re.test(str)
}

export function getAigcaasSignHeaders(signInput: {
  secretId: string
  secretKey: string
}) {
  const timestamp = Math.round(Date.now() / 1000)
  const nonce = 10000 + Math.round(Math.random() * 90000)
  const hash = crypto.createHash('sha256')
  hash.update(`${timestamp}${signInput.secretKey}${nonce}`)
  const token = hash.digest('hex')

  const headers = {
    SecretID: signInput.secretId,
    Nonce: `${nonce}`,
    Token: token,
    Timestamp: `${timestamp}`,
    'Content-Type': 'application/json'
  }
  return headers
}
