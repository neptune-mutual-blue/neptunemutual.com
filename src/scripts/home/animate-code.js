let animated = false
const textNode = document.querySelector('.typing-text code')

const animateCode = async () => {
  textNode.parentElement.style.height = textNode.offsetHeight + 'px'
  textNode.parentElement.style.overflow = 'hidden'
  const Prism = await import('prismjs')

  const delay = 1
  let timeout

  function typeWriter (text, index = 0) {
    if (index === 0) {
      textNode.textContent = ''
    }

    if (index >= text.length) {
      clearTimeout(timeout)
      return
    }

    textNode.innerHTML = Prism.highlight(textNode.textContent + text.charAt(index), Prism.languages.js, 'js')

    timeout = setTimeout(() => {
      typeWriter(text, index + 1)
    }, delay)
  }

  typeWriter(textNode.textContent)
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animated) {
      animated = true
      animateCode()
    }
  })
})

observer.observe(textNode)
