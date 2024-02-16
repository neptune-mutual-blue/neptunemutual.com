const displayError = (message) => {
  const el = document.querySelector('.initially.hidden.error.message')
  el.classList.remove('initially', 'hidden')

  el.querySelector('.details').innerHTML = message
}

const post = async (payload) => {
  try {
    const { captcha } = payload

    if (!captcha) {
      throw new Error('Please solve the captcha')
    }

    if (!window.server) {
      return false
    }

    const body = JSON.stringify(payload, null, 2)

    const url = new URL('/contact', window.server)

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    if (!response.ok) {
      const { code, data, message } = result
      displayError([code, data, message].join(': '))
      return
    }

    const success = document.querySelector('.success.message')

    success.classList.remove('initially', 'hidden')
    document.querySelector('.contact.form').reset()

    setTimeout(() => {
      success.classList.add('initially', 'hidden')
    }, 5000)
  } catch (error) {
    displayError(error.toString())
  }
}

export { post }
