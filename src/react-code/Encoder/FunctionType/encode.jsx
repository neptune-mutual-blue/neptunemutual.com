import './encode.scss'

import {
  useEffect,
  useId,
  useState
} from 'react'

import { InputWithLabel } from '../../components/InputWithLabel'
import { TextArea } from '../../components/TextArea'
import {
  encodeData

} from '../helpers/solidity/methods'
import {
  getFunctionSignature,
  getWriteArguments
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'

const EncodeData = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState('')
  const [outputError, setOutputError] = useState('')

  const { encodeInterface, func, joiSchema } = props
  const { inputs, name } = func

  useEffect(() => {
    if (inputs?.length === 0) {
      const encoded = encodeData(encodeInterface, name)
      if (encoded) setOutputData(encoded)
    }
  }, [name, encodeInterface, inputs])

  const checkNonEmptyInputs = (_inputData) => {
    const nonEmptyInput = Object.values(_inputData).find(Boolean)

    return Boolean(nonEmptyInput)
  }

  const handleChange = (name, value) => {
    const _inputData = ({ ...inputData, [name]: value })

    setInputData(_prev => ({ ..._prev, [name]: value }))

    const encodeSignature = getFunctionSignature(func)
    const encodeArgs = getWriteArguments(func, _inputData)

    const encoded = encodeData(encodeInterface, encodeSignature, encodeArgs, (error) => {
      setOutputData('')

      if (checkNonEmptyInputs({ ..._inputData })) setOutputError(error)
      else setOutputError('')
    })

    if (encoded) {
      setOutputData(encoded)
      setOutputError('')
    }
  }

  return (
    <div className='encode container'>
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
