const getTextNodeHeight = (textNode: Node): number => {
  const range = document.createRange()
  range.selectNodeContents(textNode)
  const rect = range.getBoundingClientRect()
  return rect.bottom - rect.top
}

const toggleDescription = (index: string, toggler: Element): void => {
  const descriptionRow = document.querySelector(`tr[data-index="${index}"]`)
  const togglerRow = document.querySelector(`td[data-index="${index}"]`)

  if ((descriptionRow?.textContent?.trim() ?? '').length === 0) {
    return
  }

  toggler.classList.toggle('inverted')

  if (!(descriptionRow?.classList.contains('hidden') ?? false)) {
    descriptionRow?.classList.add('hidden')
    return
  }

  const descriptionRows = document.querySelectorAll('tr[data-index]')

  descriptionRows.forEach((row) => {
    row.classList.add('hidden')
  })

  const togglers = document.querySelectorAll('td[data-index]')

  togglers.forEach((row) => {
    row.classList.remove('inverted')
  })

  togglerRow?.classList.add('inverted')
  descriptionRow?.classList.remove('hidden')

  const descriptionWrapper = descriptionRow?.querySelector(
    '.description.wrapper'
  )

  const descriptionContent = descriptionWrapper?.querySelector('.description.content');

  (descriptionWrapper as HTMLElement).style.height = `${getTextNodeHeight(descriptionContent?.firstChild as Node)}px`
}

const setupTogglers = (): void => {
  const togglers = document.querySelectorAll('td[data-index]')
  // Add event listeners to fire confetti when a button is clicked.
  togglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
      toggleDescription((toggler as HTMLElement).dataset.index ?? '', toggler)
    }, { passive: true })
  })
}

export { setupTogglers }
