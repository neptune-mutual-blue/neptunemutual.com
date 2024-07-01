import { defineConfig } from 'astro/config'
import dotenv from 'dotenv'

import { env } from './util/env'

dotenv.config()

/** @type {import('astro').AstroUserConfig} */
const config = defineConfig({
  integrations: [],
  server: {
    port: 3001,
    host: true,
    headers: {
      'content-security-policy': env('CSP')
    }
  },
  vite: {
    build: {
      minify: 'esbuild',
      chunkSizeWarningLimit: 2000
    }
  }
})

export default config // eslint-disable-line
