import './Func.scss'

import {
  useEffect,
  useState
} from 'react'

import { Icon } from '../components/Icon'
import { EncodeData } from './FunctionType/encode'
import { ReadContract } from './FunctionType/read'
import { WriteContract } from './FunctionType/write'
import {
  encodeData

} from './helpers/solidity/methods'
import { createJoiSchema, getDefaultEncodeData, getFunctionSignature } from './helpers/web3-tools/abi-encoder'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const Func = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { type, func, interface: encodeInterface, count, call, isReady, abi } = props
  const { inputs, name } = func

  const Component = TypeComponent[type]

  const [encodedFn, setEncodedFn] = useState('')

  useEffect(() => {
    if (type !== 'write_contract') return

    const encodeSignature = getFunctionSignature(func)
    const encodeArgs = getDefaultEncodeData(func)
    const _encodedFn = encodeData(encodeInterface, encodeSignature, encodeArgs, (err) => {
      console.log(`Error in encoding ${name} method with signature: ${encodeSignature} and args:`, encodeArgs)
      console.error(err)
    })
    if (_encodedFn) setEncodedFn(_encodedFn.slice(0, 10))
  }, [func, encodeInterface, type])

  useEffect(() => {
    setIsOpen(false)
  }, [type, abi])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className='func item container' id={`func-${count}`}>
      <div className='list header' onClick={toggle}>
        <div className='name'>
          {count}. {name} {type === 'write_contract' && `(${encodedFn})`}
        </div>

        <div className='cta'>
          <button title='Toggle'>
            <Icon size={'md'} variant={isOpen ? 'chevron-up' : 'chevron-down'} />
          </button>
        </div>
      </div>
      {isOpen &&
        <Component
          type={type}
          func={func}
          call={call}
          isReady={isReady}
          encodeInterface={encodeInterface}
          joiSchema={createJoiSchema(func)}
          itemIndex={count}
        />}
    </div>
  )
}

export { Func }
