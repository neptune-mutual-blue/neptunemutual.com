import { filterHackData } from './filter'

const setupSorting = (): void => {
  const buttons = document.querySelectorAll('button[data-sorting-key]')
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const sortingKey = (btn as HTMLButtonElement).dataset.sortingKey ?? ''

      const table = document.querySelector('table')
      const currentSortKey = table?.dataset.sortKey ?? ''

      let newSortKey = ''

      if (currentSortKey.includes(sortingKey)) {
        // Same Key Clicked
        if (currentSortKey.includes('-')) {
          newSortKey = currentSortKey.replace('-', '')
          btn.classList.remove('desc')
        } else {
          newSortKey = '-' + currentSortKey
          btn.classList.add('desc')
        }
      } else {
        newSortKey = '-' + sortingKey
        buttons.forEach((b) => b.classList.remove('desc', 'active'))
        btn.classList.add('desc', 'active')
      }

      if (table != null) {
        table.dataset.sortKey = newSortKey
      }

      filterHackData(1).catch(console.error)
    }, { passive: true })
  })
}

export { setupSorting }
