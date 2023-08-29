import {
  getRootPath,
  getUpdatedHtml
} from '../../util/search'
import { compose } from './dom'
import { find } from './find'
import { setupSearchPagination } from './search-pagination'

const search = async (searchTerm, page = 1) => {
  document.querySelector('.search.result').innerHTML = ''

  if (!searchTerm || searchTerm.length < 4) {
    setupSearchPagination(1, 1)
    return
  }

  const results = await find(searchTerm, page)

  if (!results) {
    setupSearchPagination(1, 1)
    return
  }

  for (const result of results) {
    const text = result.text
    const subtitle = result.subtitle
    if (!text && !subtitle) return

    const rootPath = getRootPath()
    const url = [rootPath, result.parent, result.slug].filter(x => x !== undefined).join('/')

    const html = getUpdatedHtml([text, subtitle], searchTerm)

    compose(url, result.title, html)
  }
}

export { search }
