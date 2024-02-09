import './encode.scss'

import {
  useCallback,
  useEffect,
  useId,
  useState
} from 'react'

import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { TextArea } from '../../components/TextArea'
import {
  encodeData

} from '../helpers/solidity/methods'
import {
  getFunctionSignature,
  getWriteArguments,
  updateObjectByArrayOfKeys
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'
import { JSONPopup } from '../../components/JSONPopup/JSONPopup'

const EncodeData = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState('')
  const [outputError, setOutputError] = useState('')

  const [parsedJSON, setParsedJSON] = useState(null)

  const { encodeInterface, func, joiSchema } = props
  const { inputs, name } = func

  useEffect(() => {
    if (inputs?.length === 0) {
      const encoded = encodeData(encodeInterface, name)
      if (encoded) setOutputData(encoded)
    }
  }, [name, encodeInterface, inputs])

  const handleEncode = useCallback((_inputData) => {
    const encodeSignature = getFunctionSignature(func)
    const encodeArgs = getWriteArguments(_inputData, inputs)
    console.log({ encodeArgs })

    const encoded = encodeData(encodeInterface, encodeSignature, encodeArgs, (error) => {
      if (error) setOutputError(error)
      setOutputData('')
    })

    if (encoded) {
      setOutputData(encoded)
      setOutputError('')
    }
  }, [encodeInterface, func, inputs])

  const handleChange = (value, keyArray) => {
    const updatedObject = updateObjectByArrayOfKeys(inputData, keyArray, value)
    setInputData({ ...updatedObject })

    handleEncode(updatedObject)
  }

  useEffect(() => {
    if (!parsedJSON) handleEncode(inputData)
  }, [parsedJSON])

  const handleJSON = (json) => {
    handleEncode(json)
  }

  return (
    <div className='encode container'>
      {
        inputs.length > 0 && (
          <JSONPopup
            handleJSON={handleJSON}
            parsedJSON={parsedJSON}
            setParsedJSON={setParsedJSON}
            label={`Enter JSON for encoding ${name} function`}
            btnProps={{ label: 'Encode' }}
          />
        )
      }

      <InputFields
        func={func}
        inputData={inputData}
        handleChange={handleChange}
        schema={joiSchema}
      />

      <div className='output container'>
        <TextArea
          label='Result'
          placeholder='0x'
          id={`${id}-result`}
          rows={5}
          value={outputData}
          onChange={() => {}}
          disabled
        />
        <span>{outputError}</span>
      </div>

    </div>
  )
}

export { EncodeData }
