import { Api } from '../../../../../types/enum'
import * as enumerable from './enumerable'

const get = async (): Promise<SitemapItem[]> => {
  const result = []

  const items = await enumerable.resolve()

  for (const item of items) {
    const { enumerable, prefix } = item

    for (const entry of enumerable) {
      let { slug } = entry

      // Account for documentation nesting
      if (prefix === Api.Doc) {
        const parent = (entry as Documentation & WithSlug).parent

        if (parent !== undefined) {
          slug = `${parent.slug}/${slug}`
        }
      }

      result.push({ loc: `/${prefix}/${slug}/` })
    }
  }

  return result
}

export { get }
