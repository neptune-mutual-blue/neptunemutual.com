import { getPagination } from '../../../../util/pagination'
import { filterHackData } from './filter'

let previousPageEventListener: EventListener

let nextPageEventListener: EventListener

const setupPagination = (totalPages: number, currentPage: number): void => {
  const pagination = getPagination(totalPages, currentPage)

  const pagesHtml = pagination
    .pages?.map((page) => {
      return page != null
        ? `<a class="ui page link pointer color button${page === currentPage ? ' active' : ''}">
              <span class="content">
                ${page}
              </span>
            </a>`
        : '<span class="continues"> ... </span>'
    })
    .join('\n') ?? ''

  const pageNumbers = document.querySelector('.page.numbers')

  if (pageNumbers != null) {
    pageNumbers.innerHTML = pagesHtml
  }

  const previousPage = document.querySelector('.previous.page')
  const nextPage = document.querySelector('.next.page')

  const table = document.querySelector('table')

  if (previousPage != null) {
    if (pagination.previous != null) {
      previousPage.removeAttribute('data-disabled')
    } else {
      previousPage.setAttribute('data-disabled', 'true')
    }
  }

  if (nextPage != null) {
    if (pagination.next != null) {
      nextPage.removeAttribute('data-disabled')
    } else {
      nextPage.setAttribute('data-disabled', 'true')
    }
  }

  const pages = document.querySelectorAll('.page')

  if (previousPageEventListener != null && previousPage != null) {
    previousPage.removeEventListener('click', previousPageEventListener)
  }

  if (nextPageEventListener != null && nextPage != null) {
    nextPage.removeEventListener('click', nextPageEventListener)
  }

  previousPageEventListener = (e: Event) => {
    e.preventDefault()

    if (pagination.previous != null) {
      filterHackData(parseInt(table?.dataset.page ?? '2') - 1).catch(console.error)
    }
  }

  nextPageEventListener = (e: Event) => {
    e.preventDefault()

    if (pagination.next != null) {
      filterHackData(parseInt(table?.dataset.page ?? '0') + 1).catch(console.error)
    }
  }

  if (previousPage != null) {
    previousPage.addEventListener('click', previousPageEventListener, { passive: true })
  }

  if (nextPage != null) {
    nextPage.addEventListener('click', nextPageEventListener, { passive: true })
  }

  pages.forEach((page) => {
    page.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (
        !page.classList.contains('next') &&
        !page.classList.contains('previous')
      ) {
        filterHackData(parseInt(page.textContent ?? '1')).catch(console.error)
      }
    }, { passive: true })
  })
}

export { setupPagination }
