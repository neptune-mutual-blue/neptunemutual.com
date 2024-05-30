import {
  cache,
  fromCache
} from '../../util/cache'
import { getCacheUrl } from '../../util/search'

const SECONDS = 100
const DAYS = 24 * 60 * 60 * SECONDS
const duration = 7 * DAYS

const request = async () => {
  try {
    const url = getCacheUrl()
    const content = await fetch(url)
    const { docs } = await content.json()

    return docs.map((x) => {
      return {
        title: x.title,
        subtitle: x.subtitle ?? x.intro,
        text: x.htmlAsText,
        html: x.html,
        slug: x.slug,
        parent: x.parent?.slug
      }
    })
  } catch (error) {
    console.error('Could not get docs')
  }

  return null
}

const getDocs = async (key) => {
  const cached = await fromCache(key)

  if (!cached) {
    console.debug('Cache is empty. Requesting a copy.')
    const docs = await request()

    console.debug('Request successful. Caching this response.')
    const expiry = new Date().getTime() + duration
    await cache(docs, key, expiry)

    return docs
  }

  return cached
}

export { getDocs }
