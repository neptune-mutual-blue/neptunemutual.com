import { AstroGlobal } from 'astro'

import { env } from './env'
import { normalizeUrl } from './url'

const getDns = (): string => new URL(env('DOMAIN_NAME')).origin

const getCanonical = (Astro: AstroGlobal): string | undefined => {
  const domain = getDns()

  const { pathname, origin } = new URL(Astro.url.pathname, domain)
  const url = new URL(pathname, origin)

  return normalizeUrl(url.href)
}

const qualifyURL = (path?: string, root?: string): string => {
  if (path === undefined) {
    return ''
  }

  const dns = root ?? getDns()
  return new URL(path, dns).href
}

const fromCdnUnqualified = (path?: string): string => {
  return `/cdn/${path as string}`
}

const fromCdn = (path?: string): string => {
  // @todo: avoid qualifying already qualified paths
  return qualifyURL(`/cdn/${path as string}`)
}

export { fromCdn, fromCdnUnqualified, getCanonical, getDns, qualifyURL }
