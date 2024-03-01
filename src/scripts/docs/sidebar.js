{
  const contentMenuButton = document.querySelector('.docs.content.menu button')
  const sidebar = document.querySelector('.documentation .ui.sidebar.menu[data-open]')
  const sidebarOverlay = document.querySelector('.documentation .dimmer.sidebar')

  const toggleSidebarAndOverlay = (overlayClick = false) => {
    const currentState = sidebar.getAttribute('data-open')
    const newState = currentState === 'false' ? 'true' : 'false'
    sidebar.setAttribute('data-open', overlayClick ? 'false' : newState)

    if (overlayClick) {
      sidebarOverlay.classList.add('hidden')
      return
    }

    sidebarOverlay.classList.toggle('hidden')
  }

  contentMenuButton.addEventListener('click', () => toggleSidebarAndOverlay(false))

  sidebarOverlay.addEventListener('click', () => toggleSidebarAndOverlay(true))
}
