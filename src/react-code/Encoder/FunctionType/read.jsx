import './read.scss'

import {
  Fragment,
  useId,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'
import { InputWithLabel } from '../../components/InputWithLabel'
import {
  checkInputErrors,
  getPlaceholder,
  isInputError
} from '../helpers/web3-tools/abi-encoder'

const ReadContract = (props) => {
  const id = useId()

  const { func, call, inputs, joiSchema, isReady } = props

  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState(func.outputs)
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  function getFunctionSignature () {
    const _func = func
    return `${_func.name}(${_func.inputs.map(_inp => _inp.type).join(', ')})`
  }

  function getOutputsSignature () {
    const _func = func
    return `${_func.outputs.map(_inp => _inp.type).join(', ')}`
  }

  async function handleQuery () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = func.name
    const args = Object.values(inputData)
    const outputs = await call(methodName, args)

    if (outputs && !outputs.error) {
      const _outputData = func.outputs.map((o, i) => ({
        ...o,
        value: outputs[i]?.toString()
      }))
      setOutputData(_outputData)
    }

    if (outputs?.error) setError(outputs.error)
    else setError('')

    setMakingCall(false)
  }

  const handleInputChange = (name, value = '') => {
    setInputData(_prev => ({ ..._prev, [name]: value }))
    if (error) setError('')
  }

  return (
    <div className='read container'>
      {inputs.map((input, i) => {
        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name} (${input.type})`}
            placeholder={getPlaceholder(input.type)}
            id={`${id}-${i}`}
            onChange={e => handleInputChange(input.name, e.target.value)}
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
          variant='secondary-gray'
          onClick={handleQuery}
          disabled={!isReady || checkInputErrors(joiSchema, inputData) || makingCall}
        >
          Query
        </Button>
        <span className='error'>{error}</span>
      </div>

      <div className='output'>
        <Icon variant='L' size={10} />
        {getOutputsSignature()}
      </div>
      {outputData.map((output, i) => {
        return (
          <Fragment key={`output-${i}`}>
            {
              output.value && (
                <div className='output container'>
                  <div className='result title'>
                    [<span className='bold'>{getFunctionSignature()}</span> method Response]
                  </div>
                  <div className='result'>
                    <Icon variant='chevron-right-double' size={18} />
                    <span>{(output.type)}: {output.value}</span>
                  </div>
                </div>
              )
            }
          </Fragment>
        )
      })}

    </div>
  )
}

export { ReadContract }
