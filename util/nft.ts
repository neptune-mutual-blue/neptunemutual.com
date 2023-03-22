const truncateAddress = (address: string): string => {
  if (address.length !== 42) return 'INVALID_ADDRESS'

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
  )

  if (match === null) return address

  return `${match[1]}…${match[2]}`
}

export { truncateAddress }
