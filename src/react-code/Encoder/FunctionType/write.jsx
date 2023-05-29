import './write.scss'

import {
  useId,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import { InputWithLabel } from '../../components/InputWithLabel'
import {
  checkInputErrors,
  getWriteArguments
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'

const WriteContract = (props) => {
  const [inputData, setInputData] = useState({})
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  const { func, call, joiSchema, isReady } = props
  const { name } = func

  async function handleWrite () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = name
    const methodArgs = getWriteArguments(func, inputData)

    const hasPayableStateMutability = func?.stateMutability === 'payable'
    const value = inputData[name]

    const res = await call(methodName, methodArgs, hasPayableStateMutability && { value })

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
      <InputFields
        func={func}
        inputData={inputData}
        handleChange={handleInputChange}
        schema={joiSchema}
      />

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
