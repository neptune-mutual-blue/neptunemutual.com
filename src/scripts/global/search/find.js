import { getIDBValidKey } from '../../util/search'
import { getDocs } from './request'
import { setupSearchPagination } from './search-pagination'

const PAGE_SIZE = 10

const coalesce = (x, or) => {
  return x ?? or
}

const find = async (searchTerm, page = 1) => {
  searchTerm = coalesce(searchTerm, '')

  const key = getIDBValidKey()
  const data = await getDocs(key)

  const results = data.filter((x) => {
    return (
      coalesce(x.title, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.subtitle, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.text, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.html, '').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  })

  if (!results || results.length === 0) {
    return null
  }

  setupSearchPagination(Math.ceil(results.length / PAGE_SIZE), page)

  return results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
}

export { find }
