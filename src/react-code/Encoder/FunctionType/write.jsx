import './write.scss'

import {
  useId,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import { InputWithLabel } from '../../components/InputWithLabel'
import {
  checkInputErrors,
  getPlaceholder,
  isInputError
} from '../helpers/web3-tools/abi-encoder'

const WriteContract = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  const { func, inputs, tupleInputs, call, joiSchema, isReady } = props

  async function handleWrite () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = func.name
    const _inputData = JSON.parse(JSON.stringify(inputData))
    inputs.map(i => {
      const _val = inputData[i.name]
      if (i.type.endsWith('[]')) {
        try {
          const _parsed = JSON.parse(_val)
          if (_parsed && Array.isArray(_parsed)) _inputData[i.name] = _parsed
        } catch {}
      }
      return true
    })
    const args = tupleInputs ? [_inputData] : Object.values(_inputData)

    const res = await call(methodName, args)

    if (res.error) setError(res.error)
    else setError('')

    setMakingCall(false)
  }

  const handleInputChange = (name, value = '') => {
    setInputData(_prev => ({ ..._prev, [name]: value }))
    if (error) setError('')
  }

  return (
    <div className='write container'>
      {inputs.map((input, i) => {
        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name} (${input.type})`}
            placeholder={getPlaceholder(input.type)}
            id={`${id}-${i}`}
            onChange={e => handleInputChange(input.name, e.target.value, input.type)}
            error={
              isInputError(joiSchema, inputData, input.name)
                ? `Invalid value for type: ${input.type}`
                : ''
            }
            errorIcon='alert-circle'
          />
        )
      })}

      <div className='btn wrapper'>
        <Button
          variant='primary'
          size='sm'
          onClick={handleWrite}
          disabled={!isReady || checkInputErrors(joiSchema, inputData) || makingCall}
        >
          Write
        </Button>
        <span className='error'>{error}</span>
      </div>

    </div>
  )
}

export { WriteContract }
