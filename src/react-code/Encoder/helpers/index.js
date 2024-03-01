import { ethers } from 'ethers'

const isJSON = (string) => {
  try {
    JSON.parse(string)
    return true
  } catch (error) {
    return false
  }
}

const isArray = (string) => {
  try {
    const res = JSON.parse(string)
    return Array.isArray(res)
  } catch (error) {
    return false
  }
}

const isValidAbi = (string) => {
  try {
    const res = JSON.parse(string)

    if (Array.isArray(res)) {
      const _iface = new ethers.utils.Interface(res)

      if (_iface) {
        return true
      }
    }
  } catch {}

  return false
}

export { isArray, isJSON, isValidAbi }
