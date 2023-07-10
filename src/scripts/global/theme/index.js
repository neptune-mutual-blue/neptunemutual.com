const darkModeInputCheckboxes = document.querySelectorAll('#DarkModeInputCheckbox')

const switchTheme = async () => {
  const theme = window.getTheme()
  const switchTo = theme === 'dark' ? 'light' : 'dark'

  window.localStorage.setItem('theme', switchTo)

  updateThemeLinks()

  darkModeInputCheckboxes.forEach(async (darkModeInputCheckbox) => {
    await window.loadTheme(darkModeInputCheckbox)
  })
}

const theme = window.getTheme()

darkModeInputCheckboxes.forEach(darkModeInputCheckbox => {
  darkModeInputCheckbox.checked = theme === 'dark'

  darkModeInputCheckbox.addEventListener('click', switchTheme, { passive: true })
})

// This doesn't account for theme being a middle parameter in the URL Search Param. Please use only as first or last param.
const search = window.location.search
  .replace(/&?theme=[dark|light]+&?/g, '')
  .trim()

const newURL =
window.location.pathname + (search.length <= 1 ? '' : search)

window.history.replaceState({}, undefined, newURL)

window.localStorage.setItem('theme', theme)

const isValidUrl = (href) => {
  try {
    // eslint-disable-next-line no-new
    new URL(href) // Throws error for relative urls
    return true
  } catch (error) { }
  return false
}

const isSameHost = (href) => {
  const url = new URL(href)
  const currentUrl = new URL(window.location)
  return url.host === currentUrl.host
}

const supportsTheme = (href) => {
  if (!isValidUrl(href) || isSameHost(href)) {
    return false
  }

  const hostsWithSameHeader = ['nft.neptunemutual.com', 'neptunemutual.com', 'explorer.neptunemutual.net', 'ipfs.neptunemutual.net']

  const url = new URL(href)

  if (!hostsWithSameHeader.includes(url.host)) {
    return false
  }

  return true
}

const addTheme = (href, theme) => {
  if (!theme) {
    return href
  }

  const url = new URL(href)
  url.searchParams.set('theme', theme)
  return url.href
}

const updateThemeLinks = () => {
  const links = document.querySelectorAll('a')

  links.forEach(link => {
    if (supportsTheme(link.href)) {
      link.href = addTheme(link.href, window.getTheme())
    }
  })
}

updateThemeLinks()
