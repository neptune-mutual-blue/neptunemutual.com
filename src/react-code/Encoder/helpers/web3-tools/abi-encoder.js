import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import Joi from 'joi'

const ARGS_TYPE_PATTERN = /([a-zA-Z0-9]+)(\[(\d*)\])?/

const getTypeInfo = (type) => {
  // eslint-disable-next-line no-unused-vars
  const [_, _type, isArray, argCount] = Array.from(
    type.match(ARGS_TYPE_PATTERN)
  )

  return {
    actualType: _type,
    isArray: Boolean(isArray),
    argCount: argCount ? Number(argCount) : undefined
  }
}

const getPlaceholder = (type) => {
  const _getPlaceholder = (_type) => {
    let _val = ''
    switch (_type) {
      case 'uint':
      case 'uint8':
      case 'uint16':
      case 'uint256':
        _val = 111222333
        break

      case 'bytes':
      case 'bytes32':
        _val = '0x112233...'
        break

      case 'bytes4':
        _val = '0x12345678'
        break

      case 'address':
        _val = '0x11...22'
        break

      case 'bool':
        _val = 'true'
        break

      case 'tuple':
        _val = '[ ... ]'
        break

      default:
        _val = 'hello'
    }

    return _val
  }

  const { actualType, isArray, argCount } = getTypeInfo(type)

  if (actualType === 'tuple') {
    return isArray ? `[${_getPlaceholder(actualType)}]` : _getPlaceholder(actualType)
  }

  if (isArray) {
    const values = Array(argCount || 1).fill(0).map(() => `"${_getPlaceholder(actualType)}"`)
    return `[${values.join(',')}]`
  }

  return _getPlaceholder(type)
}

const getJoiType = (type) => {
  const _getType = (_type) => {
    let _joiType = Joi.string()
    switch (_type) {
      case 'address':
        _joiType = Joi.string()
          .length(42)
          .required()
          .alphanum()
          .custom((value, helper) => {
            try {
              ethers.utils.getAddress(value)
              return value
            } catch { }

            return helper.message('Invalid account')
          })
        break

      case 'bytes':
      case 'bytes32':
        _joiType = Joi.string().custom((val, helper) => {
          if (val.startsWith('0x')) return val
          return helper.message('Invalid value for bytes type')
        })
        break

      case 'bytes4':
        _joiType = Joi.string().custom((val, helper) => {
          if (val.startsWith('0x') && val.length === 10) return val
          return helper.message('Invalid value for bytes4 type')
        })
        break

      case 'uint':
      case 'uint8':
      case 'uint16':
      case 'uint256':
        _joiType = Joi.custom((_val, helper) => {
          try {
            const bn = BigNumber(_val).isPositive()
            return bn || helper.message('invalid value provided')
          } catch { }
          return helper.message('invalid value provided')
        })
        break

      case 'bool':
        _joiType = Joi.boolean()
        break

      default:
        _joiType = Joi.string()
        break
    }

    return _joiType
  }

  const { actualType: _type, isArray, argCount } = getTypeInfo(type)
  const joiType = _getType(_type)
  return isArray
    ? Joi.string().custom((_val, helper) => {
      try {
        const _parsed = JSON.parse(_val)
        if (_parsed) {
          return argCount
            ? Joi.array().items(joiType).length(argCount).validate(_parsed)
            : Joi.array().items(joiType).validate(_parsed)
        }
      } catch { }
      return helper.message('must be valid json')
    })
    : joiType
}

const createJoiSchema = func => {
  const { inputs, stateMutability, name } = func

  if (!inputs?.length) return

  const joiSchema = {}

  if (stateMutability === 'payable') joiSchema[name] = getJoiType('uint')

  inputs.map((i, idx1) => {
    joiSchema[i.name || idx1] = getJoiType(i.type)
    return true
  })

  return Joi.object(joiSchema)
}

const checkInputErrors = (schema, inputData) => {
  if (schema && inputData) {
    const { error: _error } = schema.validate(inputData)
    if (_error) return true
  }

  return false
}

const isInputError = (schema, inputData, _field) => {
  if (schema && inputData[_field]) {
    const { error: _error } = schema.validate(inputData, { abortEarly: false })

    if (_error && _error.details.find(d => d.path.includes(_field.toString()))) return true
  }
  return false
}

const defaultData = type => {
  const { actualType, isArray, argCount } = getTypeInfo(type)

  let _value = '0x7465737400000000000000000000000000000000000000000000000000000000'

  if (actualType.startsWith('uint')) _value = 1
  if (actualType.startsWith('address')) _value = '0x0000000000000000000000000000000000000000'
  if (actualType.startsWith('bool')) _value = 'true'
  if (actualType === 'bytes4') _value = '0x12345678'

  const returnValue = isArray
    ? Array(argCount || 1).fill(0).map(() => _value)
    : _value

  return returnValue
}

function getFunctionSignature (_function) {
  function getArgsSignature (inps) {
    const args = inps.map(input => {
      const { isArray } = getTypeInfo(input.type)

      if (['tuple', 'tuple[]'].includes(input.type) && Array.isArray(input.components)) {
        const _args = getArgsSignature(input.components)
        return `${_args}${isArray ? '[]' : ''}`
      }

      return `${input.type}`
    })

    return `(${args.join(', ')})`
  }

  return `${_function.name}${getArgsSignature(_function.inputs)}`
}

function getDefaultEncodeData (_function) {
  function getEncodedDataArray (inps) {
    const data = inps.map(input => {
      const { isArray } = getTypeInfo(input.type)

      if (['tuple', 'tuple[]'].includes(input.type) && Array.isArray(input.components)) {
        const _data = getEncodedDataArray(input.components)
        return isArray ? [_data] : _data
      }

      return defaultData(input.type)
    })

    return data
  }

  return getEncodedDataArray(_function.inputs)
}

function getWriteArguments (_function, inputData) {
  const inputs = _function.inputs.map((input, idx1) => {
    const { actualType, isArray } = getTypeInfo(input.type)

    const val = inputData[input.name || idx1]

    if (isArray || actualType === 'tuple') {
      try {
        const parsed = JSON.parse(val)
        if (parsed && Array.isArray(parsed)) return parsed
      } catch {}
    }

    return val
  })

  return inputs.filter(Boolean)
}

function getOutputResponse (func, outputResponse) {
  let outputArray = func.outputs

  const tupleOutput = func.outputs.find(o => o.type === 'tuple')
  if (tupleOutput) outputArray = tupleOutput.components

  const outputs = outputArray.map((output, idx) => {
    const value = outputResponse[idx]?.toString()
    return {
      name: output.name,
      type: output.type,
      value
    }
  })

  return outputs.filter(Boolean)
}

export {
  checkInputErrors,
  createJoiSchema,
  getPlaceholder,
  isInputError,
  getFunctionSignature,
  getDefaultEncodeData,
  getWriteArguments,
  getOutputResponse
}
