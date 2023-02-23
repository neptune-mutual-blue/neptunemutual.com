// Javascript is available, proceed with animation
const animatableElements = document.querySelectorAll('.animate')

animatableElements.forEach((x) => {
  const delayClass = Array.from(x.classList).find((cls) => cls.includes('delay'))
  if (delayClass) {
    x.classList.remove(delayClass)
  }
  x.classList.add('hidden')
  setTimeout(() => {
    x.classList.remove('initial', 'hidden')
    if (delayClass) {
      x.classList.add(delayClass)
    }
    x.classList.add('show')
  }, 0)
})

const showAnimation = (el) => {
  el.classList.remove('hidden')
  setTimeout(() => {
    el.classList.add('show')
  }, 0)
}

const hideAnimation = (el) => {
  el.classList.remove('show')
  setTimeout(() => {
    el.classList.add('hidden')
  }, 0)
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target)
      showAnimation(entry.target)
    } else {
      hideAnimation(entry.target)
    }
  })
})

animatableElements
  .forEach((el) => observer.observe(el))
