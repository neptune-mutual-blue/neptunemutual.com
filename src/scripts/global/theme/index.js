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

window.history.pushState({}, undefined, newURL)

window.localStorage.setItem('theme', theme)

const updateThemeLinks = () => {
  const linksWithThemes = document.querySelectorAll('a[data-include-theme]')

  linksWithThemes.forEach(link => {
    if (link.href.includes('?theme=')) {
      link.href = link.href.replace(/\?theme=[dark|light]+/g, '') + '?theme=' + window.getTheme()
    } else {
      link.href = link.href + '?theme=' + window.getTheme()
    }
  })
}

updateThemeLinks()
