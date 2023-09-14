import { Api } from '../types/enum'

const allowed = [Api.Blog, Api.Pressroom]

const toTagHref = (prefix: Api, tag?: string): string | undefined => {
  if (tag === undefined) {
    return undefined
  }

  if (tag === undefined || tag === null) {
    return `/${prefix}`
  }

  return `/${prefix}/tag/${tag}/#${tag}`
}

const toTagsWithHref = (prefix: Api, tags: Tag[] | undefined): TagWithHref[] => {
  const withHrefs: TagWithHref[] = []

  if (tags === undefined || tags === null || tags.length === 0) {
    return withHrefs
  }

  for (const tag of tags) {
    withHrefs.push({
      href: allowed.includes(prefix) ? toTagHref(prefix, tag.slug) : undefined,
      ...tag
    })
  }

  return withHrefs
}

export { toTagHref, toTagsWithHref }
