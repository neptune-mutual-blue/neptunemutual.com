let animated = false
const textNode = document.querySelector('.typing-text code')
const textContent = textNode.textContent
const offsetHeight = textNode.offsetHeight
const delay = 1
let timeout

async function typeWriter (text, index = 0) {
  if (index === 0) {
    textNode.textContent = ''
  }

  const Prism = await import('prismjs')

  if (index >= text.length) {
    clearTimeout(timeout)
    return
  }

  textNode.innerHTML = Prism.highlight(textNode.textContent + text.charAt(index), Prism.languages.js, 'js')

  timeout = setTimeout(() => {
    typeWriter(text, index + 1)
  }, delay)
}

const animateCode = () => {
  textNode.parentElement.style.height = offsetHeight + 'px'
  textNode.parentElement.style.overflow = 'hidden'

  typeWriter(textContent)
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animated) {
      animated = true
      animateCode()
      observer.unobserve(textNode)
    }
  })
})

observer.observe(textNode)
textNode.textContent = ''
