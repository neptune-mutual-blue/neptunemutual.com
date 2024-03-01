const createContractKey = (name: string, address: string, network: string | number): string => {
  const joined = [name, address, network]
    .filter(Boolean)
    .map(item => item.toString().trim().toLowerCase().split(' ').join('_'))
    .join('_')

  return joined
}

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  // append timestamp to make it unique
  result += '_' + Date.now().toString()

  return result
}

export { createContractKey, generateRandomString }
