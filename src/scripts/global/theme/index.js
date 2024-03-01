const darkModeInputCheckboxes = document.querySelectorAll('#DarkModeInputCheckbox')

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

  const renderedTweets = document.querySelectorAll('[data-tweet-id]')

  renderedTweets.forEach((tweet) => {
    const src = tweet.getAttribute('src')
    tweet.setAttribute('src', src.replace('theme=' + currentTheme, 'theme=' + targetTheme))
  })

  const unRenderedTweets = document.querySelectorAll('blockquote.twitter-tweet')

  unRenderedTweets.forEach((tweet) => {
    tweet.setAttribute('data-theme', targetTheme)
  })
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

const updateThemeLinks = (currentTheme, newTheme) => {
  const links = document.querySelectorAll('a')

  links.forEach((link) => {
    if (supportsTheme(link.href)) {
      link.href = addTheme(link.href, window.getTheme())
    }
  })

  switchTweetTheme(currentTheme || 'light', newTheme || window.getTheme())
}

const switchTheme = async () => {
  const theme = window.getTheme()
  const switchTo = theme === 'dark' ? 'light' : 'dark'

  window.localStorage.setItem('theme', switchTo)

  updateThemeLinks(theme, switchTo)

  darkModeInputCheckboxes.forEach(async (darkModeInputCheckbox) => {
    await window.loadTheme(darkModeInputCheckbox)
  })
}

const removeThemeFromURL = () => {
  try {
    const updateUrl = new URL(window.location)

    updateUrl.searchParams.delete('theme')

    window.history.replaceState({}, undefined, updateUrl)
  } catch (error) {
    console.error(error)
    console.warn('Unable to clear search params')
  }
}

const theme = window.getTheme()
window.localStorage.setItem('theme', theme)

removeThemeFromURL()
updateThemeLinks()

darkModeInputCheckboxes.forEach((darkModeInputCheckbox) => {
  darkModeInputCheckbox.checked = theme === 'dark'

  darkModeInputCheckbox.addEventListener('click', switchTheme, { passive: true })
})

window.addEventListener('load', async () => {
  // Wait for the loading of the theme
  switchTweetTheme('light', window.getTheme())
})
