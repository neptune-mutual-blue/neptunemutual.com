import { useState } from 'react'
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { checkInputError, getIndex, getObjectValue, getPlaceholder, getTypeInfo, isInputError } from '../helpers/web3-tools/abi-encoder'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'

const Inputs = ({ inputs, handleChange, schema, inputData, prevIndex, parentKeys = [] }) => {
  const [arrayLengths, setArrayLengths] = useState(Array(inputs.length).fill(1))

  if (!inputs.length) return null

  return (
    <div className='inputfield container'>
      {
        inputs.map((input, i) => {
          const { isArray, actualType } = getTypeInfo(input.type)
          const type = isArray ? actualType : input.type
          const label = isArray ? `(${type})` : `${input.name || '<input>'} (${type})`

          return (
            <div key={i} className='input group'>
              {
                isArray && (
                  <div className='array label'>
                    <p className='label'>{input.name || '<input>'} ({type})</p>

                    <Button
                      onClick={() => {
                        const _arrayLengths = [...arrayLengths]
                        _arrayLengths[i] += 1
                        setArrayLengths([..._arrayLengths])
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )
              }

              {
                Array.from({ length: arrayLengths[i] }).map((_, arrIdx) => {
                  const index = getIndex(isArray ? getIndex(arrIdx, i) : i, prevIndex)

                  const name = input.name || `<input>-${i}`

                  const _parentKeys = [...parentKeys]
                  _parentKeys.push(name)
                  if (isArray) _parentKeys.push(arrIdx)
                  // const keyArray = [...parentKeys, name]
                  // console.log('keyArray', keyArray, 'name', name)

                  return (
                    <div className={isArray ? 'array item' : ''} key={index}>
                      {
                        isArray && (
                          <button
                            onClick={() => {
                              const _arrayLengths = [...arrayLengths]
                              _arrayLengths[i] -= 1
                              setArrayLengths([..._arrayLengths])
                            }}
                            disabled={arrayLengths[i] === 1}
                            className='close'
                          >
                            <Icon variant={'x-close'} size={'md'} />
                          </button>
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
                                schema={schema}
                                inputData={inputData}
                                prevIndex={index}
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
                              error={checkInputError(actualType, getObjectValue(inputData, _parentKeys))}
                              // errorIcon='alert-circle'
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

export const InputFields = ({ func, schema, inputData, handleChange }) => (
  <>
    {
      func?.stateMutability === 'payable' && (
        <InputWithLabel
          label={func.name}
          inputType='uint256'
          placeholder={'payableAmount'}
          id={'payble-amount-field'}
          onChange={e => handleChange(func.name, e.target.value)}
          // error={
          //   isInputError(schema, inputData, func.name)
          //     ? 'Invalid value for int type'
          //     : ''
          // }
          // errorIcon='alert-circle'
        />
      )
    }

    <Inputs
      inputs={func.inputs}
      handleChange={handleChange}
      schema={schema}
      inputData={inputData}
    />
  </>
)
