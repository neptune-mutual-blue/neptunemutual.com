import { InputWithLabel } from '../../components/InputWithLabel'
import { getPlaceholder, isInputError } from '../helpers/web3-tools/abi-encoder'

export const InputFields = ({ func, schema, inputData, handleChange }) => (
  <>
    {
      func?.stateMutability === 'payable' && (
        <InputWithLabel
          label={func.name}
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

    {
      func.inputs.map((input, i) => {
        if (input.components) {
          return input.components.map((component, idx) => (
            <InputWithLabel
              key={`input-${i}-${idx}`}
              label={`${component.name || '<input>'} (${component.type})`}
              placeholder={getPlaceholder(component.type)}
              id={`${i}-${idx}`}
              onChange={e => handleChange(`${input.name || i}-${component.name || idx}`, e.target.value)}
              error={
                isInputError(schema, inputData, `${input.name || i}-${component.name || idx}`)
                  ? `Invalid value for type: ${component.type}`
                  : ''
              }
              errorIcon='alert-circle'
            />
          ))
        }

        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name || '<input>'} (${input.type})`}
            placeholder={getPlaceholder(input.type)}
            id={i}
            onChange={e => handleChange(input.name || i, e.target.value)}
            error={
              isInputError(schema, inputData, input.name || i)
                ? `Invalid value for type: ${input.type}`
                : ''
            }
            errorIcon='alert-circle'
          />
        )
      })
    }
  </>
)
