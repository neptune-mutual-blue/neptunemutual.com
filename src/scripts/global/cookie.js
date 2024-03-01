import { addAnalytics } from './external'

const cookieAcceptButton = document.querySelector('.cookie.popup .accept.button')
const cookieDeclineButton = document.querySelector('.cookie.popup .decline.button')
const cookieCloseButton = document.querySelector('.cookie.popup .close.button')
const popup = document.querySelector('.cookie.popup.container')

const showPopup = () => {
  if (!popup) {
    return
  }

  popup.classList.remove('initially', 'hidden')
}

const hidePopup = () => {
  if (!popup) {
    return
  }

  popup.classList.add('initially', 'hidden')
}

const checkConsentOnLoad = () => {
  const cookiesAccepted = window.localStorage.getItem('npm-cookies-accepted')

  if (cookiesAccepted === 'true') {
    addAnalytics()
  }

  if (cookiesAccepted === 'false' || cookiesAccepted === 'true') {
    hidePopup()
    return
  }

  showPopup()
}

checkConsentOnLoad()

const setNpmCookie = (value) => {
  if (value !== 'true' && value !== 'false') {
    return
  }

  if (value === 'true') {
    addAnalytics()
  }

  window.localStorage.setItem('npm-cookies-accepted', value)
  hidePopup()
}

cookieAcceptButton.addEventListener('click', () => setNpmCookie('true'))
cookieDeclineButton.addEventListener('click', () => setNpmCookie('false'))
cookieCloseButton.addEventListener('click', () => hidePopup())
