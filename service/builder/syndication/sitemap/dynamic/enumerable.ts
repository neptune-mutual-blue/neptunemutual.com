import { entries } from './config'
import { sitemapFor } from './lambda'

const make = (): Array<Promise<SitemapEnumerable>> => {
  const promises = []

  for (const entry of entries) {
    const [type, prefix] = entry
    const promise = sitemapFor(type, prefix ?? type)

    promises.push(promise)
  }

  return promises
}

const resolve = async (): Promise<SitemapEnumerable[]> => {
  const promises = make()
  const result = await Promise.allSettled(promises)

  return result.filter(({ status }) => status === 'fulfilled').map(p => (p as PromiseFulfilledResult<SitemapEnumerable>).value)
}

export { resolve }
