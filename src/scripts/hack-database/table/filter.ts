import { setupPagination } from './pagination'
import { getTableRows } from './renderers'
import { setupTogglers } from './togglers'

const filterHackData = async (
  page: number = 1,
  initial: boolean = false
): Promise<void> => {
  try {
    const table = document.querySelector('table')
    const count = document.querySelector('span.hack.counter')

    const tbody = table?.querySelector('tbody')
    const tablePrefixHeader = document.querySelector('.prefix.header')

    const currentSortKey = table?.dataset.sortKey ?? ''

    const searchQuery = (document.querySelector('.hack.search.input input') as HTMLInputElement).value.trim()

    const PUBLIC_HACKS_API_ORIGIN: string = import.meta.env.PUBLIC_HACKS_API_ORIGIN

    const parameters = {
      limit: '20',
      page: page.toString(),
      sort: currentSortKey,
      'where[or][0][techniques][like]': searchQuery,
      'where[or][1][name][like]': searchQuery,
      'where[or][2][description][like]': searchQuery
    }

    const params = Object.entries(parameters).map(([key, value]) => value.length > 0 ? key + '=' + value : undefined).filter(item => item).join('&')

    const response = await (
      await fetch(`${PUBLIC_HACKS_API_ORIGIN}?${params}`)
    ).json()

    const html = getTableRows(response.docs)

    if (tbody != null && table != null) {
      tbody.innerHTML = html
      table.dataset.page = response.page
    }

    setupTogglers()
    setupPagination(response.totalPages, response.page)

    if (count != null) {
      count.innerHTML = response.totalDocs
    }

    if (!initial && tablePrefixHeader != null) {
      tablePrefixHeader.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (err) {
    console.error(err)
  }
}

export { filterHackData }
