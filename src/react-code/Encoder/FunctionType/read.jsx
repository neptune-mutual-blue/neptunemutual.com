import './read.scss'

import {
  Fragment,
  useCallback,
  useId,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'
import {
  checkInputErrors,
  getOutputResponse,
  getWriteArguments,
  updateObjectByArrayOfKeys
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'
import { JSONPopup } from '../../components/JSONPopup/JSONPopup'

const ReadContract = (props) => {
  const { func, call, joiSchema, isReady, encodeInterface: iface } = props
  const { name, inputs, outputs } = func

  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState([])
  const [successfulResponse, setSuccessfulResponse] = useState('')
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  const [parsedJSON, setParsedJSON] = useState(null)

  function getFunctionSignature () {
    return `${name}(${inputs.map(_inp => _inp.type).join(', ')})`
  }

  function getOutputsSignature () {
    return `${outputs.map(_inp => _inp.type).join(', ')}`
  }

  const handleQuery = useCallback(async (_inputData) => {
    setError('')
    setSuccessfulResponse('')
    setMakingCall(true)

    const methodName = name
    const args = getWriteArguments(_inputData, inputs)
    const { data, error: _error } = await call(methodName, args, undefined, iface)

    if (!_error && !data.length) {
      setSuccessfulResponse('✅ Call Successfull')
    }

    if (!_error) {
      const _outputData = getOutputResponse(func, data)
      setOutputData(_outputData)
    }

    if (_error) setError(_error)
    else setError('')

    setMakingCall(false)
  }, [name, call, iface, func, inputs])

  const handleInputChange = (value = '', keyArray) => {
    const updatedObject = updateObjectByArrayOfKeys(inputData, keyArray, value)
    setInputData({ ...updatedObject })
    setError('')
    setSuccessfulResponse('')
  }

  const handleJSON = (json) => {
    handleQuery(json)
  }

  return (
    <div className='read container'>
      {
        inputs.length > 0 && (
          <JSONPopup
            handleJSON={handleJSON}
            parsedJSON={parsedJSON}
            setParsedJSON={setParsedJSON}
            label={`Enter JSON for querying ${name} function`}
            btnProps={{ label: 'Query', disabled: !isReady || makingCall }}
          />
        )
      }

      <InputFields
        func={func}
        inputData={inputData}
        handleChange={handleInputChange}
        schema={joiSchema}
      />

      <div className='btn wrapper'>
        <Button
          variant='secondary-gray'
          onClick={() => handleQuery(inputData)}
          // disabled={!isReady || checkInputErrors(joiSchema, inputData) || makingCall}
          disabled={!isReady || makingCall}
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
