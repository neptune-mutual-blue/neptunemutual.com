import { onError } from './error'
import { post } from './request'
import { onSuccess } from './success'

{
  const buttons = document.querySelectorAll('.ui.newsletter.subscription.primary.button')

  const click = async (e) => {
    const el = e.currentTarget
    const container = el.closest('.email.subscription.container')
    const input = container.querySelector('input[type=email]')

    input.closest('.container').classList.remove('error')

    const { valid } = input.validity

    if (!valid) {
      input.closest('.container').classList.add('error')
      return
    }

    const { value } = input

    container.classList.add('locked')

    const result = await post(value)

    if (result.valid) {
      onSuccess(el)
      return
    }

    onError(el)
  }

  buttons.forEach(x => x.addEventListener('click', click, { passive: true }))
}
