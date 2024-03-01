{
  const isValidUrl = (str) => {
    try {
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const u = new URL(str)
      return true
    } catch (error) {}

    return false
  }

  const urlInputs = document.querySelectorAll('input[type="url"]')

  for (const i of urlInputs) {
    i.addEventListener('change', (ev) => {
      if (!ev.target.value || isValidUrl(ev.target.value)) {
        return
      }

      const updated = 'https://' + ev.target.value

      if (isValidUrl(updated)) {
        ev.target.value = updated
      }
    }, { passive: true })
  }
}
