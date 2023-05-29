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
import { InputFields } from '../components/InputFields'

const ReadContract = (props) => {
  const { func, call, joiSchema, isReady } = props
  const { name, inputs, outputs } = func

  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState(outputs)
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  function getFunctionSignature () {
    return `${name}(${inputs.map(_inp => _inp.type).join(', ')})`
  }

  function getOutputsSignature () {
    return `${outputs.map(_inp => _inp.type).join(', ')}`
  }

  async function handleQuery () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = name
    const args = Object.values(inputData)
    const outputs = await call(methodName, args)

    if (outputs && !outputs.error) {
      const _outputData = outputs.map((o, i) => ({
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
      <InputFields
        func={func}
        inputData={inputData}
        handleChange={handleInputChange}
        schema={joiSchema}
      />

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
        <div>L</div>
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
