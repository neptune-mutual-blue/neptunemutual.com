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
  encodeData,
  getFunctionSignature
} from './helpers/solidity/methods'
import { createJoiSchema } from './helpers/web3-tools/abi-encoder'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const defaultData = type => {
  const _type = type.split('[]')[0]
  let _value = ''
  switch (_type) {
    case 'bytes32':
    case 'bytes':
      _value = '0x7465737400000000000000000000000000000000000000000000000000000000'
      break

    case 'uint256':
      _value = '1'
      break

    case 'address':
      _value = '0x0000000000000000000000000000000000000000'
      break

    case 'bool':
      _value = 'true'
      break

    default:
      _value = '0x7465737400000000000000000000000000000000000000000000000000000000'
      break
  }

  return type.endsWith('[]') ? [_value] : _value
}

const Func = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { type, func, interface: encodeInterface, count, call, isReady } = props

  const Component = TypeComponent[type]

  const [encodedFn, setEncodedFn] = useState('')
  const inputs = props?.func?.inputs?.[0]?.components || props?.func?.inputs

  useEffect(() => {
    if (type !== 'write_contract') return

    const isTupleInputs = func.inputs[0]?.type === 'tuple'
    let encodeArgs = []
    if (inputs?.length) {
      const _args = inputs.map(i => defaultData(i.type))
      encodeArgs = isTupleInputs ? [_args] : _args
    }

    const encodeName = getFunctionSignature(func)
    const _encodedFn = encodeData(encodeInterface, encodeName, encodeArgs)
    if (_encodedFn) setEncodedFn(_encodedFn.slice(0, 10))
  }, [func, encodeInterface, type, inputs])

  useEffect(() => {
    setIsOpen(false)
  }, [type])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className='func item container' id={`func-${count}`}>
      <div className='list header' onClick={toggle}>
        <div className='name'>{count}. {func.name} {type === 'write_contract' && `(${encodedFn})`}</div>

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
          inputs={inputs}
          tupleInputs={func.inputs[0]?.type === 'tuple'}
          call={call}
          isReady={isReady}
          encodeInterface={encodeInterface}
          joiSchema={createJoiSchema(inputs)}
        />}
    </div>
  )
}

export { Func }
