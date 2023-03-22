import { defineConfig } from 'astro/config'
import dotenv from 'dotenv'

import react from '@astrojs/react'

import { builder } from './service/builder'
import { env } from './util/env'

dotenv.config()
const production = env('BUILD_ENV') === 'production'

const common = [react()]
const integrations = production ? [builder, ...common] : [...common]

/** @type {import('astro').AstroUserConfig} */
const config = defineConfig({
  integrations,
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
