import dotenv from 'dotenv-safe'

import { ChatGPTAPI } from '../../src'

dotenv.config()

/**
 * Demo CLI for testing the `onProgress` streaming support.
 *
 * ```
 * npx tsx demos/demo-on-progress.ts
 * ```
 */
async function main() {
  const api = new ChatGPTAPI({
    debug: true,
    isAigcaas: true,
    aigcaasSecretId: process.env.AIGCAAS_SECRET_ID,
    aigcaasSecretKey: process.env.AIGCAAS_SECRET_KEY
  })

  const prompt = 'Hello'

  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log('partialResponse', partialResponse.text)
    }
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
