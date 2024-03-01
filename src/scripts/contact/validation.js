{
  const fields = document.querySelectorAll('.contact.form input, .contact.form textarea')

  function blur () {
    const { valid } = this.validity
    const target = this.closest('.input.container')

    if (!target) {
      return
    }

    target.classList.remove('error')

    if (!valid) {
      target.classList.add('error')
    }
  }

  fields.forEach(x => x.addEventListener('blur', blur, { passive: true }))
}
