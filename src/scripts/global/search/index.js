import { copyToClipboard } from '../../util/copy'
import { debounce } from '../../util/search'
import { search } from './search'
import { setupSearchPagination } from './search-pagination'

const searchOverlay = document.querySelector('.search.dimmer')
const searchInputField = document.getElementById('ModalSearchInputSearch')
const inputClearButton = document.querySelector('#ModalSearchInputSearch + button.clear')

const handleKeyDown = (e) => {
  if ((e.key === 'Escape' || e.which === 27) && !searchInputField.value) {
    searchOverlay.classList.add('hidden')
    document.querySelector('html body').classList.remove('no', 'vertical', 'scroll')
    document.removeEventListener('keydown', handleKeyDown)
  }
}

const handleClick = (e) => {
  const clickedOutside = !e.target.closest('.ui.search.modal')

  if (clickedOutside) {
    searchOverlay.classList.add('hidden')
    searchOverlay.removeEventListener('click', handleClick)

    // enable page scrolling
    document.querySelector('html body').classList.remove('no', 'vertical', 'scroll')
  }
}

const onActivate = async () => {
  searchOverlay.classList.toggle('hidden')

  searchInputField.focus()

  searchOverlay.addEventListener('click', handleClick)

  // disable page scrolling
  document.querySelector('html body').classList.add('no', 'vertical', 'scroll')

  document.addEventListener('keydown', handleKeyDown)
}

const updateCopyButtons = () => {
  const copyButtons = document.querySelectorAll('.search.result .item > .footer button.copy')

  const handleCopy = (e) => {
    const href = `${window.location.origin}${e.currentTarget.getAttribute('data-link')}`
    const btn = e.currentTarget
    copyToClipboard(href, () => {
      const initialAttr = btn.getAttribute('data-tooltip')
      btn.setAttribute('data-tooltip', 'Copied')

      setTimeout(() => {
        btn.setAttribute('data-tooltip', initialAttr)
      }, 1500)
    })
  }

  copyButtons.forEach((copyButton) => {
    copyButton.addEventListener('click', handleCopy)
  })
}

const onSearch = async (e) => {
  const { srcElement } = e
  const term = srcElement.value.trim()
  await search(term)
  updateCopyButtons()
}

const debouncedOnSearch = debounce(onSearch)

const onClear = () => {
  searchInputField.value = ''
  searchInputField.focus()
  setupSearchPagination(1, 1)
  search()
}

document.getElementById('SearchInputSearch').addEventListener('focus', onActivate, { passive: true })
searchInputField.addEventListener('input', debouncedOnSearch, { passive: true })
inputClearButton.addEventListener('click', onClear, { passive: true })

setupSearchPagination(1, 1)
