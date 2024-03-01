{
  const body = document.querySelector('body')

  const click = (event) => {
    event.stopPropagation()

    const mobileMenu = document.getElementById('MobileMenu')
    const openState = mobileMenu.getAttribute('data-open')
    const newState = openState === 'true' ? 'false' : 'true'

    mobileMenu.setAttribute('data-open', newState)
    event.currentTarget.setAttribute('data-open', newState)

    body.style.overflowY = newState === 'true' ? 'hidden' : 'visible'
  }

  document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('#MobileMenu[data-open="true"]')
    const button = document.querySelector(
      '.hamburger.button.container[data-open]'
    )

    if (!mobileMenu) {
      return
    }

    if (!e.target.closest('#MobileMenu')) {
      mobileMenu.setAttribute('data-open', 'false')
      button.setAttribute('data-open', 'false')
      body.style.overflowY = 'visible'
    }
  })

  document.querySelector('button.hamburger.button.container').addEventListener('click', click)

  const keydown = (e) => {
    const mobileMenu = document.querySelector('#MobileMenu[data-open="true"]')
    const button = document.querySelector(
      '.hamburger.button.container[data-open]'
    )
    const key = e.which || e.keyCode || e.charCode

    if (key !== 27 || !mobileMenu) {
      return
    }

    mobileMenu.setAttribute('data-open', 'false')
    button.setAttribute('data-open', 'false')
    body.style.overflowY = 'visible'
  }

  document.addEventListener('keydown', keydown)
}
