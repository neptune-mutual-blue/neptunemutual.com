import { useCallback, useEffect, useState } from 'react'
import './events.scss'
import { useGetLogs } from '../hooks/useGetLogs'
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { LogsTable } from '../components/LogsTable'
import { Icon } from '../../components/Icon'

const Events = ({ address, func, encodeInterface }) => {
  const [fromBlock, setFromBlock] = useState('')
  const [toBlock, setToBlock] = useState('')

  const fromBlockDebounced = useDebouncedValue(fromBlock, 500)
  const toBlockDebounced = useDebouncedValue(toBlock, 500)

  const [logs, setLogs] = useState([])

  const { isReady, getLogs, loading, error, resetError, noLogs } = useGetLogs({
    address,
    func,
    iface: encodeInterface
  })

  const handleSubmit = useCallback(async (from, to) => {
    try {
      const logs = await getLogs(from, to)
      setLogs(logs)
    } catch (err) {
      console.error(err)
    }
  }, [getLogs])

  useEffect(() => {
    if (!isReady || loading || !fromBlockDebounced || !toBlockDebounced) {
      return
    }

    handleSubmit(fromBlockDebounced, toBlockDebounced)
  }, [fromBlockDebounced, toBlockDebounced, isReady])

  const handleInputChange = (field, event) => {
    resetError()

    if (field === 'fromBlock') {
      setFromBlock(event.target.value)
    } else {
      setToBlock(event.target.value)
    }
  }

  return (
    <div className="events container">
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <InputWithLabel
            label={'From block'}
            placeholder={'1'}
            type={'number'}
            id={'events-input-from-block'}
            onChange={e => handleInputChange('fromBlock', e)}
            value={fromBlock}
            />

          <InputWithLabel
            label={'To block'}
            placeholder={'1200'}
            type={'number'}
            id={'events-input-to-block'}
            onChange={e => handleInputChange('toBlock', e)}
            value={toBlock}
            />
        </div>
      </form>

      {
        loading && (
          <div className='info'>
            <p>Loading...</p>
          </div>
        )
      }

      {
        noLogs && !loading && (
          <div className='info'>
            <p>No logs found</p>
          </div>
        )
      }

      {
        (!loading && error) && (
          <div className='error'>
            <Icon variant='alert-circle' size={'lg'} />

            <div>
              <p className='title'>Error getting logs</p>
              <p className='text'>{error}</p>

              <button onClick={() => handleSubmit(fromBlockDebounced, toBlockDebounced)}>
                Try Again
                <Icon variant='refresh-ccw-02' size={'lg'} />
              </button>
            </div>
          </div>
        )
      }

      {
        Boolean(!loading && logs.length) && (
          <div className='logs'>
            <LogsTable logs={logs} />
          </div>
        )
      }
    </div>
  )
}

export { Events }
