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

const createJoiSchema = (func, arrayLengths) => {
  const { inputs, stateMutability, name } = func

  if (!inputs?.length) return

  arrayLengths = arrayLengths || Array(inputs.length).fill(1)

  const joiSchema = {}

  if (stateMutability === 'payable') joiSchema[name] = getJoiType('uint')

  function getSchemaObject (_inputs, prevIdx = null) {
    const schemaObject = {}

    _inputs.map((_input, i) => {
      const { isArray, actualType } = getTypeInfo(_input.type)
      const arrayLength = arrayLengths[i]

      if (isArray) {
        Array.from({ length: arrayLength }).map((_, arrIdx) => {
          const index = getIndex(getIndex(arrIdx, i), prevIdx)

          if (actualType === 'tuple' && Array.isArray(_input.components)) {
            Object.assign(schemaObject, getSchemaObject(_input.components, index))
            return null
          }
          schemaObject[index] = getJoiType(actualType)
          return null
        })

        return null
      }

      if (_input.type === 'tuple' && Array.isArray(_input.components)) {
        Object.assign(schemaObject, getSchemaObject(_input.components, getIndex(i, prevIdx)))
        return null
      }
      schemaObject[getIndex(i, prevIdx)] = getJoiType(_input.type)
      return null
    })

    return schemaObject
  }

  Object.assign(joiSchema, getSchemaObject(inputs))

  return Joi.object(joiSchema)
}

const checkInputErrors = (schema, inputData) => {
  if (schema && inputData) {
    const { error: _error } = schema.validate(inputData)
    if (_error) return true
  }

  return false
}

const checkEmptyInputs = (inputs, inputData, name, stateMutability) => {
  if (stateMutability === 'payable' && !inputData[name]) return true

  if (Array.from(Object.values(inputData)).find(i => !i)) return true

  function getF (_inputs, prevIdx) {
    const empty = _inputs.find((input, i) => {
      if (input.type === 'tuple' && Array.isArray(input.components)) return getF(input.components, getIndex(i, prevIdx))

      if (!inputData[getIndex(i, prevIdx)]) return true

      return false
    })

    return Boolean(empty)
  }

  return getF(inputs)
}

const isInputError = (schema, inputData, _field) => {
  if (schema && inputData[_field]) {
    const { error: _error } = schema.validate(inputData, { abortEarly: false })

    if (_error && _error.details.find(d => d.path.includes(_field.toString()))) return true
  }
  return false
}

const checkInputError = (type, value) => {
  if (!value) return false

  const schema = Joi.object({ key: getJoiType(type) })
  const { error } = schema.validate({ key: value })

  return Boolean(error)
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

      if (Array.isArray(input.components)) {
        const _data = getEncodedDataArray(input.components)
        return isArray ? [_data] : _data
      }

      return defaultData(input.type)
    })

    return data
  }

  return getEncodedDataArray(_function.inputs)
}

function getWriteArguments (inputData) {
  function getInputs (inputs) {
    let data = Object.values(inputs)
    data = data.map(item => {
      if (typeof item === 'object') return getInputs(item)
      return item
    })

    return data.filter(Boolean)
  }

  return getInputs(inputData)
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

function getIndex (idx, prevIndex) {
  return ['number', 'string'].includes(typeof prevIndex) ? `${prevIndex}-${idx}` : idx
}

function updateObjectByArrayOfKeys (obj, keys, value) {
  let newObj = { ...obj }

  const key = keys.shift()
  if (keys.length) {
    newObj[key] = updateObjectByArrayOfKeys(newObj[key], keys, value)
  } else {
    newObj[key] = value
  }

  const isArray = Object.keys(newObj).every(k => !isNaN(Number(k)))
  if (isArray) newObj = Object.values(newObj)
  return newObj
}

function getObjectValue (_obj, _keys = []) {
  const obj = { ..._obj }
  const keys = [..._keys]

  let key = keys.shift()
  let value = { ...obj }

  while (key && value) {
    value = value[key]
    key = keys.shift()
  }

  return value
}

export {
  getTypeInfo,
  checkInputErrors,
  createJoiSchema,
  getPlaceholder,
  isInputError,
  getFunctionSignature,
  getDefaultEncodeData,
  getWriteArguments,
  getOutputResponse,
  getIndex,
  checkEmptyInputs,
  updateObjectByArrayOfKeys,
  checkInputError,
  getObjectValue
}
