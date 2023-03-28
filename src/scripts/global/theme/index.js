const darkModeInputCheckboxes = document.querySelectorAll('#DarkModeInputCheckbox')

const switchTheme = async () => {
  const theme = window.getTheme()
  const switchTo = theme === 'dark' ? 'light' : 'dark'

  window.localStorage.setItem('theme', switchTo)

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
