import './Result.scss'

import { useState } from 'react'

import { ethers } from 'ethers'

import { Button } from '../components/Button/Button'
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet'
import { Func } from './Func'
import { useContractCall } from './hooks/useContractCall'
import { DecodeData } from './FunctionType/decode'

const filter = {
  encode_data: {
    stateMutability: '[a-z]'
  },
  read_contract: {
    stateMutability: '(view|pure)'
  },
  write_contract: {
    stateMutability: '^(?!(view|pure))'
  },
  decode_data: {
    stateMutability: '[a-z]'
  }
}

const Result = (props) => {
  const [type, setType] = useState('encode_data')

  const { abi, address, title, networkId } = props

  const { callMethod, isReady } = useContractCall({
    abi,
    address
  })

  const handleType = (e) => {
    e.preventDefault()
    const _type = e.currentTarget.getAttribute('data-value')
    setType(_type)
  }

  const validateStateMutability = (stateMutability) => {
    const re = new RegExp(filter[type].stateMutability)
    return re.test(stateMutability)
  }

  const ethersInterface = new ethers.utils.Interface(abi)

  return (
    <div className='result container'>
      <div>
        {title && <div className='result title'>{title}</div>}
        {address && <div className='result address'>{address}</div>}
      </div>

      {Array.isArray(abi) && abi.length > 0 && (
        <div className='result cta'>
          <div className='left group'>
            <Button
              variant='secondary-gray'
              data-active={type === 'encode_data'}
              size='sm'
              data-value='encode_data'
              onClick={handleType}
            >
              Encode Data
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'decode_data'}
              size='sm'
              data-value='decode_data'
              onClick={handleType}
            >
              Decode Data
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'read_contract'}
              size='sm'
              data-value='read_contract'
              onClick={handleType}
            >
              Read Contract
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'write_contract'}
              size='sm'
              data-value='write_contract'
              onClick={handleType}
            >
              Write Contract
            </Button>
          </div>
          <div className='right group'>
            {
              !['encode_data', 'decode_data'].includes(type) && (
                <ConnectWallet networkId={networkId} />
              )
            }
          </div>
        </div>
      )}

      <div className='result list container'>
        {
          type === 'decode_data'
            ? <DecodeData encodeInterface={ethersInterface} />
            : (
                Array.isArray(abi) &&
            abi.filter(func => (
              func.type === 'function' && validateStateMutability(func.stateMutability)
            )).map((func, i) => (
              <Func
                type={type}
                key={`func-${i}`}
                func={func}
                count={i + 1}
                call={callMethod}
                isReady={isReady}
                interface={ethersInterface}
                abi={abi}
              />
            ))
              )
        }
      </div>
    </div>
  )
}

export { Result }
