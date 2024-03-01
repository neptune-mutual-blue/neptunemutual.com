import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const GAS_MARGIN_MULTIPLIER = 1.5

const parseError = (iface, errorData) => {
  try {
    const errorDescription = iface.parseError(errorData)

    const message = `${errorDescription.name}(${errorDescription.args.join(', ')})`

    return message
  } catch (error) {
    // swallow
    // console.error(error)
  }
}

const getErrorMessage = (_error, iface = null) => {
  try {
    const error = _error.error || _error

    if (!error || !error.message) {
      return 'Unexpected Error Occurred'
    }

    if (iface && error?.data?.data) {
      const parsedError = parseError(iface, error.data.data)

      if (parsedError) {
        return `Error: ${parsedError.name}`
      }
    }

    if (error?.reason) {
      return error.reason
    }

    if (error?.data?.message) {
      return error.data.message.trim().replace('execution reverted: ', '')
    } else if (error?.data?.originalError?.message) {
      return error.data.originalError.message
        .trim()
        .replace('execution reverted: ', '')
    }

    return error.message.trim().replace('MetaMask Tx Signature: ', '')
  } catch (error) {
    return 'Something went wrong'
  }
}

const calculateGasMargin = (value) => {
  return new BigNumber(value.toString())
    .multipliedBy(GAS_MARGIN_MULTIPLIER)
    .decimalPlaces(0)
    .toString()
}

const encodeData = (encodeInterface, methodName, methodArgs = [], onError = err => console.error(err)) => {
  if (!encodeInterface || !methodName) {
    return
  }

  try {
    const encoded = encodeInterface.encodeFunctionData(methodName, methodArgs)
    return encoded
  } catch (error) {
    // console.log(`Error in encoding ${methodName}\n`, { methodArgs, error })
    onError(getErrorMessage(error))
  }
}

const parseEncoded = (data) => {
  data = data.trim()

  const alphaNumRegex = /^0x[a-zA-Z0-9]+$/

  if (data.match(alphaNumRegex)) {
    return {
      parsed: data
    }
  }

  return {
    error: 'Invalid format.'
  }
}

const decodeData = (encodeInterface, encodedData, onError) => {
  if (!encodeInterface) {
    return
  }

  const getInputsWithArgs = (inputs, args) => {
    return inputs.map((input) => {
      const components = input.components

      const isArray = input.baseType === 'array'

      let arg = args[input.name]

      if (isArray) {
        arg = (arg || []).map((argItem) => {
          return components ? getInputsWithArgs(components, argItem || []) : argItem.toString()
        })
      }

      if (!isArray) {
        arg = components ? getInputsWithArgs(components, arg || []) : arg
      }

      if (typeof arg === 'string' || arg._isBigNumber || input.type === 'bool') {
        arg = arg.toString()
      }

      return {
        name: input.name,
        type: input.type,
        value: arg,
        isArray
      }
    })
  }

  try {
    const decoded = encodeInterface.parseTransaction({ data: encodedData })

    const { name, signature, args, functionFragment: { inputs } } = decoded

    const inputsWithArgs = getInputsWithArgs(inputs, args)

    return { name, signature, inputs: inputsWithArgs }
  } catch (error) {
    console.log('Error in decoding data', { encodedData, error })

    if (onError) {
      onError(`${error.code}: ${error.reason}`, error)
    }
  }
}

export {
  calculateGasMargin,
  decodeData,
  encodeData,
  GAS_MARGIN_MULTIPLIER,
  getErrorMessage,
  parseEncoded
}
