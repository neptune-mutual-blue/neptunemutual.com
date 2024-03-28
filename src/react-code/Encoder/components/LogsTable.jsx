import { useMemo, useState } from 'react'
import { fromNow } from '../../../../util/relative-time'
import { chains } from '../helpers/wallet/chains'
import { useWeb3React } from '@web3-react/core'
import { Icon } from '../../components/Icon'

const LogsTable = ({ logs }) => {
  const { chainId } = useWeb3React()

  const [sortType, setSortType] = useState('desc')

  const sortedLogs = useMemo(() => {
    return logs.sort((a, b) => {
      if (sortType === 'desc') {
        return b.timestamp - a.timestamp
      } else {
        return a.timestamp - b.timestamp
      }
    })
  }, [logs, sortType])

  const explorerUrl = useMemo(() => {
    return chains[chainId]?.explorer
  }, [chainId])

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              onClick={() => setSortType(sortType === 'desc' ? 'asc' : 'desc')}
              data-sort={sortType}
            >
              When
              <Icon variant={'arrow-down'} />
            </button>
          </th>
          <th>Block</th>
          <th>Hash</th>
          {
            Object.keys(sortedLogs[0].args).map(key => (
              <th key={key}>{key}</th>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          sortedLogs.map((log, i) => (
            <tr key={i}>
              <td className='when'
                title={new Date(Number(log.timestamp) * 1000).toLocaleString()}
              >{fromNow(log.timestamp)}</td>
              <td className='block number'>
                {
                  explorerUrl ? <a href = {`${explorerUrl}/block/${log.blockNumber}`} target="_blank" rel="noreferrer">{log.blockNumber}</a> : log.blockNumber
                }
              </td>
              <td className='tx hash'>
                {
                  explorerUrl ? <a href = {`${explorerUrl}/tx/${log.transactionHash}`} target="_blank" rel="noreferrer">{log.transactionHash.slice(0, 6)}</a> : log.transactionHash
                }
              </td>
              {
                Object.entries(log.args).map(([key, value]) => (
                  <td className={`arg ${key}`} key={key}>
                    <span>{value}</span>
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
    </table>
  )
}

export { LogsTable }
