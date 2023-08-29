import { getPagination } from '../../../../util/pagination'
import { search } from './search'

let previousPageEventListener

let nextPageEventListener

const searchInputField = document.getElementById('ModalSearchInputSearch')
const searchModal = document.querySelector('.ui.search.modal')

const setupSearchPagination = (totalPages, currentPage) => {
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

  const pageNumbers = searchModal.querySelector('.page.numbers')

  if (pageNumbers != null) {
    pageNumbers.innerHTML = pagesHtml

    searchModal.dataset.page = currentPage.toString()
  }

  const previousPage = searchModal.querySelector('.previous.page')
  const nextPage = searchModal.querySelector('.next.page')

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

  const pages = searchModal.querySelectorAll('.page')

  if (previousPageEventListener != null && previousPage != null) {
    previousPage.removeEventListener('click', previousPageEventListener)
  }

  if (nextPageEventListener != null && nextPage != null) {
    nextPage.removeEventListener('click', nextPageEventListener)
  }

  previousPageEventListener = (e) => {
    e.preventDefault()

    if (pagination.previous != null) {
      search(searchInputField.value.trim(), parseInt(searchModal?.dataset.page ?? '2') - 1).catch(console.error)
    }
  }

  nextPageEventListener = (e) => {
    e.preventDefault()

    if (pagination.next != null) {
      search(searchInputField.value.trim(), parseInt(searchModal?.dataset.page ?? '0') + 1).catch(console.error)
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
        search(searchInputField.value.trim(), parseInt(page.textContent ?? '1')).catch(console.error)
      }
    }, { passive: true })
  })
}

export { setupSearchPagination }
