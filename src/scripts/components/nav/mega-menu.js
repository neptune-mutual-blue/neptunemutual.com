{
  const subMenu = document.querySelector('.sub.menu.container')

  const enablePageScroll = () => {
    document.querySelector('html').style.overflow = 'auto'
  }

  const disablePageScroll = () => {
    document.querySelector('html').style.overflow = 'hidden'
  }

  const click = (event) => {
    event.stopPropagation()

    const openState = subMenu.getAttribute('data-open')
    const newState = openState === 'true' ? 'false' : 'true'

    subMenu.setAttribute('data-open', newState)
    event.currentTarget.setAttribute('data-open', newState)

    if (newState === 'true') {
      disablePageScroll()
      return
    }

    enablePageScroll()
  }

  document.querySelector('.display.resources.mega.menu').addEventListener('click', click)

  document.addEventListener('click', (e) => {
    const button = document.querySelector('nav button[data-open="true"]')

    if (!button) {
      return
    }

    const width = window.innerWidth

    if (width < 1024) {
      if (!e.target.closest('#MobileMenu')) {
        subMenu.setAttribute('data-open', 'false')
        button.setAttribute('data-open', 'false')
        enablePageScroll()
      }

      return
    }

    if (!e.target.closest('.sub.menu.container')) {
      subMenu.setAttribute('data-open', 'false')
      button.setAttribute('data-open', 'false')
      enablePageScroll()
    }
  })
}
