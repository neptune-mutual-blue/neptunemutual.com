import './read.scss'

import {
  Fragment,
  useId,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'
import {
  checkInputErrors,
  getOutputResponse,
  getWriteArguments
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'

const ReadContract = (props) => {
  const { func, call, joiSchema, isReady, encodeInterface: iface } = props
  const { name, inputs, outputs } = func

  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState([])
  const [successfulResponse, setSuccessfulResponse] = useState('')
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
    setSuccessfulResponse('')
    setMakingCall(true)

    const methodName = name
    const args = getWriteArguments(func, inputData)
    const outputResponse = await call(methodName, args, undefined, iface)

    if (outputResponse && !outputResponse.error && !outputResponse.length) {
      setSuccessfulResponse('✅ Call Successfull')
    }

    if (outputResponse && !outputResponse.error) {
      const _outputData = getOutputResponse(func, outputResponse)
      setOutputData(_outputData)
    }

    if (outputResponse?.error) setError(outputResponse.error)
    else setError('')

    setMakingCall(false)
  }

  const handleInputChange = (name, value = '') => {
    setInputData(_prev => ({ ..._prev, [name]: value }))
    if (error) setError('')
    setSuccessfulResponse('')
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

      {
        outputs.length
          ? (
          <div className='output'>
            <div>L</div>
            {getOutputsSignature()}
          </div>
            )
          : <></>
      }

      {
        successfulResponse && <p className='output success text'>{successfulResponse}</p>
      }

      {
        (outputData.length > 0) && (
          <div className='output title'>
            [<span className='bold'>{getFunctionSignature()}</span> method Response]
          </div>
        )
      }

      {outputData.map((output, i) => {
        return (
          <Fragment key={`output-${i}`}>
            {
              output.value && (
                <div className='output container'>
                  <div className='result'>
                    <Icon variant='chevron-right-double' size={18} />
                    <p>
                      <b>
                        {
                          output.name
                            ? output.name
                            : <>[{output.type}]</>
                        }
                      </b>
                      : <span>{output.value}</span>
                    </p>
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
