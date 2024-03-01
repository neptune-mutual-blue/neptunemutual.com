import { setupPagination } from '../pagination/pagination'
import * as handlers from './handlers'

const icon = document.querySelector(".ui.dropdown.filter.container li[data-selected='true'] > i:last-child")
const careersFilterButton = document.querySelector('#CareersFilterButton')

const ROWS_PER_PAGE = 10

const updateCardVisibility = (selected, persistPage) => {
  const { department } = selected.dataset

  const table = document.querySelector('table[data-page]')

  const pageNumber = !persistPage ? 1 : Number(table?.dataset.page)
  const startIndex = pageNumber ? (pageNumber - 1) * ROWS_PER_PAGE : 0
  const endIndex = pageNumber ? startIndex + ROWS_PER_PAGE : undefined

  document.querySelectorAll('div[data-department], tr[data-department]').forEach((x) => {
    x.classList.add('initially', 'hidden')
    x.dataset.show = 'false'
  })

  const listings = department === 'Any Department' ? Array.from(document.querySelectorAll('div[data-department], tr[data-department]')) : Array.from(document.querySelectorAll(`div[data-department="${department}"], tr[data-department="${department}"]`))

  listings.slice(startIndex, endIndex).forEach((x) => {
    x.classList.remove('initially', 'hidden')
    x.dataset.show = 'true'
  })

  const totalPages = Math.ceil(listings.length / ROWS_PER_PAGE)

  if (table) {
    table.dataset.total = totalPages
  }

  setupPagination(totalPages, pageNumber)
}

const onclick = (el) => {
  const options = document.querySelectorAll('.ui.dropdown.filter.container .menu > ul > li')
  options.forEach((option) => {
    option.dataset.selected = 'false'
  })

  el.dataset.selected = 'true'

  el.appendChild(icon)
  const selectedOption = el.innerText

  const span = careersFilterButton.querySelector('span')
  span.innerHTML = selectedOption

  handlers.close()

  updateCardVisibility(el)
}

export { handlers, onclick, updateCardVisibility }
