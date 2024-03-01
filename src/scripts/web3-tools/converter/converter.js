import { transformWeb3Types } from './transform'

const input = document.querySelector('#input')
const result = document.querySelector('#result')
const copyButton = document.querySelector('.copy.button.container button')
const copiedButton = document.querySelector('.copied.button.container')
const paddingSwitch = document.querySelector('#padding-switch')
const paddingContainer = document.querySelector('.padding.container')

const onKeyUp = (e) => {
  const urlParts = window.location.pathname.split('/')[2].split('-')
  const from = urlParts[0]
  const to = urlParts[2]

  if (e.target.value.length !== 0 && !e.target.validity.valid) {
    result.value = ''
    return
  }

  const operationSupportsPadding = from === 'string' && to === 'bytes32'

  const newResult = transformWeb3Types(e.target.value, from, to, operationSupportsPadding ? paddingSwitch.checked : false)
  result.value = newResult
  copyButton.disabled = newResult.length === 0
}

if (paddingSwitch) {
  paddingSwitch.addEventListener('change', (e) => {
    e.stopPropagation()
    onKeyUp({ target: input })
  })
}

input.addEventListener('keyup', onKeyUp)

if (paddingContainer) {
  paddingContainer.addEventListener('click', (e) => {
    if (e.target.id !== paddingSwitch.id) {
      paddingSwitch.checked = !paddingSwitch.checked
      onKeyUp({ target: input })
    }
  })
}

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(result.value)
    copyButton.style.display = 'none'
    copiedButton.style.display = 'block'

    setTimeout(() => {
      copiedButton.style.display = 'none'
      copyButton.style.display = 'block'
    }, 1000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
})
