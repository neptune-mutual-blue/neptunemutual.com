import { Fragment, useCallback, useState } from 'react'
import { decodeData, parseEncoded } from '../helpers/solidity/methods'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button/Button'

import './decode.scss'
import { getTypeInfo } from '../helpers/web3-tools/abi-encoder'

const DecodeData = ({ encodeInterface }) => {
  const [encodedData, setEncodedData] = useState('')
  const [error, setError] = useState('')

  const [decodedData, setDecodedData] = useState(null)

  const handleQuery = useCallback(async () => {
    setError('')
    setDecodedData(null)

    const { parsed, _error } = parseEncoded(encodedData)

    if (_error) {
      setError(_error)
      return
    }

    const _decodedData = decodeData(encodeInterface, parsed, (errorMessage) => {
      setError(errorMessage)
    })
    if (_decodedData) setDecodedData(_decodedData)
  }, [encodedData])

  const ArgList = ({ args, firstParent = true }) => {
    return (
      <div className={`list ${firstParent ? '' : 'inner'}`}>
        {
          args.map((arg, index) => {
            const name = arg.name
            const type = arg.type
            const value = arg.value

            const isArray = arg.isArray
            const isArrayOfTuples = arg.type === 'tuple[]'

            let valueElement = null

            if (typeof value === 'string') {
              valueElement = <p className='kv'><span>Value:</span> {value}</p>
            }

            if (typeof value !== 'string' && !isArray) {
              valueElement = (
                <div key={index}>
                  <p className='kv'><span>Value:</span></p>
                  <ArgList args={value} firstParent={false} />
                </div>
              )
            }

            if (isArray && isArrayOfTuples) {
              valueElement = (
                <div className='array values'>
                  <p className='kv'><span>Value:</span> {!value.length ? <>[]</> : null}</p>
                  <div className='tuples array'>
                    {
                      value.map((tuple, index) => (
                        <div key={index}>
                          <p><b>{index}:</b></p>
                          <ArgList args={tuple} firstParent={false} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }

            if (isArray && !isArrayOfTuples) {
              valueElement = (
                <div className='array values'>
                  <p className='kv'><span>Value:</span> {!value.length ? <>[]</> : null}</p>
                  <div>
                    {
                      value.map((string, index) => (
                        <p key={index} className='kv'><b>{index}:</b> {string}</p>
                      ))
                    }
                  </div>
                </div>
              )
            }

            return (
              <div className="card" key={index}>
                <p className='kv'><span>Name:</span> {name}</p>
                <p className='kv'><span>Type:</span> {type}</p>

                {valueElement}
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className='decode section container'>
        <TextArea
          label='Encoded Data'
          placeholder='0x'
          id={'decode-data-input'}
          rows={5}
          value={encodedData}
          onChange={(e) => setEncodedData(e.target.value)}
          error={error}
        />

        <div className='btn wrapper'>
          <Button
            variant='secondary-gray'
            onClick={handleQuery}
            disabled={!encodedData}
          >
            Query
          </Button>
        </div>

        {
          decodedData && (
            <div className='decoded data container'>
              <p className='title'>Decoded Data:</p>

              <p className='func name kv'><span>Function name:</span> {decodedData.name}</p>
              <p className='func signature kv'><span>Signature:</span> {decodedData.signature}</p>

              {
                decodedData.inputs.length
                  ? (
                  <div className='args container'>
                    <p className='title'>Function Arguments</p>

                    <ArgList args={decodedData.inputs} />
                  </div>
                    )
                  : <></>
              }
            </div>
          )
        }
      </div>
  )
}

export { DecodeData }
