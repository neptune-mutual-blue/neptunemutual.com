{
  const toggleButton = document.getElementById('NetworkSelectButton')
  const menu = document.querySelector('#NetworkSelectButton + .menu[data-open]')

  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation()

    const currentState = menu.getAttribute('data-open')
    const newState = currentState === 'true' ? 'false' : 'true'
    menu.setAttribute('data-open', newState)

    document.addEventListener('click', (ev) => {
      const isClickOutside = !ev.target.closest('#NetworkSelectButton + .menu[data-open]')

      if (isClickOutside) {
        menu.setAttribute('data-open', 'false')
      }
    })
  })
}
