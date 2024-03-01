export const truncateAddress = (address) => {
  if (!address) {
    return 'No Account'
  }

  const match = address.match(
    /^(0x[a-zA-Z0-9]{5})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
  )

  if (!match) {
    return address
  }

  return `${match[1]}…${match[2]}`
}
