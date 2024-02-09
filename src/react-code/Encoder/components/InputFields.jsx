import { useEffect, useState } from 'react'
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { checkInputError, getObjectValue, getPlaceholder, getTypeInfo } from '../helpers/web3-tools/abi-encoder'
import { Icon } from '../../components/Icon'

const Inputs = ({ inputs, handleChange, inputData, parentKeys = [] }) => {
  const [arrayLengths, setArrayLengths] = useState(inputs.map(() => 1))

  if (!inputs.length) return null

  const handleAddArrayItem = (i) => {
    const _arrayLengths = [...arrayLengths]
    _arrayLengths[i] += 1
    setArrayLengths(_arrayLengths)
  }

  const handleRemoveArrayItem = (i, removeIdx) => {
    const _arrayLengths = [...arrayLengths]
    _arrayLengths[i] -= 1
    setArrayLengths(_arrayLengths)
  }

  return (
    <div className='inputfield container'>
      {
        inputs.map((input, i) => {
          const { isArray, actualType } = getTypeInfo(input.type)
          const type = isArray ? actualType : input.type
          const name = input.name || `input-${i}`
          const label = isArray ? `(${type})` : `${name} (${type})`

          return (
            <div key={`${parentKeys.join('-')}-${i}`} className='input group'>
              {
                isArray && (
                  <div className='array label'>
                    <p className='label'>{name} ({type})</p>
                  </div>
                )
              }

              {
                Array.from({ length: arrayLengths[i] }).map((_, arrIdx) => {
                  const index = `${parentKeys.join('-')}-${i}-${arrIdx}`

                  const _parentKeys = [...parentKeys]
                  _parentKeys.push(name)
                  if (isArray) _parentKeys.push(arrIdx)

                  return (
                    <div className={isArray ? 'array item' : ''} key={index}>
                      {
                        isArray && (
                          <div className='buttons'>
                            {
                              arrIdx === 0 && (
                                <button
                                  onClick={() => handleAddArrayItem(i)}
                                  className='plus'
                                >
                                  <Icon variant={'plus'} size={'md'} />
                                </button>
                              )
                            }

                            <button
                              onClick={() => handleRemoveArrayItem(i, arrIdx)}
                              disabled={arrayLengths[i] === 1}
                              className='close'
                            >
                              <Icon variant={'x-close'} size={'md'} />
                            </button>
                          </div>
                        )
                      }

                      {
                        Array.isArray(input.components)
                          ? (
                              <div className='tuple container' key={index}>
                                <label>{label}</label>
                                <Inputs
                                  inputs={input.components}
                                  handleChange={handleChange}
                                  inputData={inputData}
                                  parentKeys={_parentKeys}
                                />
                              </div>
                            )
                          : (
                              <InputWithLabel
                                key={`input-${index}`}
                                label={label}
                                placeholder={getPlaceholder(type)}
                                inputType={type}
                                id={`input-${index}`}
                                onChange={e => handleChange(e.target.value, _parentKeys)}
                                value={getObjectValue(inputData, _parentKeys) || ''}
                                error={checkInputError(actualType, getObjectValue(inputData, _parentKeys))}
                              />
                            )
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export const InputFields = ({ func, inputData, handleChange }) => {
  return (
    <>
      {
        func?.stateMutability === 'payable' && (
          <InputWithLabel
            label={func.name}
            inputType='uint256'
            placeholder={'payableAmount'}
            id={'payble-amount-field'}
            onChange={e => handleChange(func.name, e.target.value)}
          />
        )
      }

      <Inputs
        inputs={func.inputs}
        handleChange={handleChange}
        inputData={inputData}
      />
    </>
  )
}
