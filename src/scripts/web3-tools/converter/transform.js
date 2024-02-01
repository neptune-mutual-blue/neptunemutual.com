import {
  bytes32ToNumber,
  bytes32ToString,
  numberToBytes32,
  stringToBytes32
} from './web3-type-transformers'

const transformWeb3Types = (input, from, to, addPadding) => {
  if (from === 'string' && to === 'bytes32') {
    return stringToBytes32(input, addPadding)
  }

  if (input.length === 0) {
    return ''
  }

  if (from === 'number' && to === 'bytes32') {
    return '0x' + numberToBytes32(input)
  }

  if (from === 'bytes32' && to === 'string') {
    return bytes32ToString(input)
  }

  if (from === 'bytes32' && to === 'number') {
    return bytes32ToNumber(input)
  }
}

export { transformWeb3Types }
