{
  const elements = document.querySelectorAll('select[data-value]')

  elements.forEach((x) => {
    const { value } = x.dataset
    x.value = value
    x.removeAttribute('data-value')
  })
}
