{
  const items = document.querySelectorAll('.contracts.list.view .item')
  const input = document.querySelector('.search.input')
  const buttons = document.querySelectorAll('.ui.filter.tab.list button')

  const showAll = () => items.forEach(x => x.classList.remove('hidden'))
  const hideAll = () => items.forEach(x => x.classList.add('hidden'))

  const updateFilterButtons = () => {
    const activeCount = document
      .querySelectorAll('.contracts.list.view[data-scope="regular"] .item:not(.hidden)')
      .length
    const expiredCount = document
      .querySelectorAll('.contracts.list.view[data-scope="expired"] .item:not(.hidden)')
      .length

    buttons.forEach((button) => {
      const buttonScope = button.getAttribute('data-scope')

      if (buttonScope === 'regular') {
        button.querySelector('span.badge').textContent = activeCount
      }

      if (buttonScope === 'expired') {
        button.querySelector('span.badge').textContent = expiredCount
      }
    })
  }

  const onInput = (e) => {
    const search = (e.srcElement.value ?? '').trim().toLowerCase()

    if (!search) {
      showAll()
      updateFilterButtons()
      return
    }

    hideAll()

    items.forEach((x) => {
      const text = x.textContent.toLowerCase()

      if (text.includes(search)) {
        x.classList.remove('hidden')
      }
    })

    updateFilterButtons()
  }

  input.addEventListener('input', onInput, { passive: true })
}

{
  const regular = document.querySelector('.ui.contracts.list.view[data-scope=regular]')
  const expired = document.querySelector('.ui.contracts.list.view[data-scope=expired]')

  const buttons = document.querySelectorAll('.ui.filter.tab.list button')

  const onClick = (e) => {
    buttons.forEach(x => x.classList.remove('active'))

    const { srcElement } = e
    const button = srcElement.closest('button')
    button.classList.add('active')
    const { scope } = button.dataset

    if (scope === 'regular') {
      expired && expired.classList.add('initially', 'hidden')
      regular.classList.remove('initially', 'hidden')
      return
    }

    regular.classList.add('initially', 'hidden')
    expired && expired.classList.remove('initially', 'hidden')
  }

  buttons.forEach(x => x.addEventListener('click', onClick, { passive: true }))
}
