const handleCopy = (text, cb = () => {}) => {
  try {
    navigator.clipboard.writeText(text)
    cb()
  } catch (error) {
    console.log('Unable to copy \nSee Error below:\n', error)
  }
}

const abbreviateAccount = (input) => {
  if (!input || input.length < 26) {
    return ''
  }

  return input.slice(0, 4) + '...' + input.slice(-6)
}

export { abbreviateAccount, handleCopy }
