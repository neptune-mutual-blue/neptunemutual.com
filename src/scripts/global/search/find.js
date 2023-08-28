import { getIDBValidKey } from '../../util/search'
import { getDocs } from './request'

const coalesce = (x, or) => {
  return x ?? or
}

const find = async (searchTerm) => {
  searchTerm = coalesce(searchTerm, '')

  const key = getIDBValidKey()
  const data = await getDocs(key)

  const results = data.filter((x) => {
    return (
      coalesce(x.title, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.subtitle, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.text, '').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  })

  if (!results || results.length === 0) {
    return null
  }

  return results
}

export { find }
