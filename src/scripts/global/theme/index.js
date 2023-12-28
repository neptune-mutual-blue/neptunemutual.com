const darkModeInputCheckboxes = document.querySelectorAll('#DarkModeInputCheckbox')

const switchTheme = async () => {
  const theme = window.getTheme()
  const switchTo = theme === 'dark' ? 'light' : 'dark'

  window.localStorage.setItem('theme', switchTo)

  updateThemeLinks(theme, switchTo)

  darkModeInputCheckboxes.forEach(async (darkModeInputCheckbox) => {
    await window.loadTheme(darkModeInputCheckbox)
  })
}

const theme = window.getTheme()

darkModeInputCheckboxes.forEach(darkModeInputCheckbox => {
  darkModeInputCheckbox.checked = theme === 'dark'

  darkModeInputCheckbox.addEventListener('click', switchTheme, { passive: true })
})

try {
  const updateUrl = new URL(window.location)

  updateUrl.searchParams.delete('theme')

  window.history.replaceState({}, undefined, updateUrl)
} catch (error) {
  console.error(error)
  console.warn('Unable to clear search params')
}

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

const switchTweetTheme = (currentTheme, targetTheme) => {
  if (currentTheme === targetTheme) {
    return
  }

  const tweets = document.querySelectorAll('[data-tweet-id]')

  tweets.forEach((tweet) => {
    const src = tweet.getAttribute('src')
    tweet.setAttribute('src', src.replace('theme=' + currentTheme, 'theme=' + targetTheme))
  })
}

const updateThemeLinks = (currentTheme, newTheme) => {
  const links = document.querySelectorAll('a')

  links.forEach(link => {
    if (supportsTheme(link.href)) {
      link.href = addTheme(link.href, window.getTheme())
    }
  })

  switchTweetTheme(currentTheme || 'light', newTheme || window.getTheme())
}

updateThemeLinks()

// Wait for the loading of the theme
setTimeout(() => {
  switchTweetTheme('light', window.getTheme())
}, 1000)
