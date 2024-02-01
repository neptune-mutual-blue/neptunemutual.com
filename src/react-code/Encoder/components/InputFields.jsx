import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { getIndex, getPlaceholder, isInputError } from '../helpers/web3-tools/abi-encoder'

const Inputs = ({ inputs, handleChange, schema, inputData, prevIndex }) => {
  if (!inputs.length) return null

  return (
    <div>
      {
        inputs.map((input, i) => {
          if (input.type === 'tuple' && Array.isArray(input.components)) {
            return (
            <div className='tuple container' key={getIndex(i, prevIndex)}>
              <label>{input.name || '<input>'}</label>
              <Inputs
                inputs={input.components}
                handleChange={handleChange}
                schema={schema}
                inputData={inputData}
                prevIndex={getIndex(i, prevIndex)}
              />
              </div>
            )
          }

          return (
            <InputWithLabel
              key={`input-${getIndex(i, prevIndex)}`}
              label={`${input.name || '<input>'} (${input.type})`}
              placeholder={getPlaceholder(input.type)}
              inputType={input.type}
              id={i}
              onChange={e => handleChange(getIndex(i, prevIndex), e.target.value)}
              error={
                isInputError(schema, inputData, getIndex(i, prevIndex))
                  ? `Invalid value for type: ${input.type}`
                  : ''
              }
              errorIcon='alert-circle'
            />
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
          error={
            isInputError(schema, inputData, func.name)
              ? 'Invalid value for int type'
              : ''
          }
          errorIcon='alert-circle'
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
