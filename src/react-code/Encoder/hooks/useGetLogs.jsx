import { useCallback, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { getArgs, getBlockTimestamp, getEventTopic } from '../helpers/web3-tools/events'

const useGetLogs = ({ address, func, iface }) => {
  const { library } = useWeb3React()

  const topics = useMemo(() => [getEventTopic(func)], [func])

  const [loading, setLoading] = useState(false)

  const [noLogs, setNoLogs] = useState(false)

  const [error, setError] = useState('')

  const getLogs = useCallback(async (fromBlock, toBlock) => {
    if (!library || !library.getLogs || !address || !topics) {
      return []
    }

    const fromBlockHex = '0x' + ethers.BigNumber.from(fromBlock).toNumber().toString(16)
    const toBlockHex = '0x' + ethers.BigNumber.from(toBlock).toNumber().toString(16)
    const id = 44
    const jsonrpc = '2.0'

    setNoLogs(false)
    setError('')
    setLoading(true)

    try {
      const logs = await library.getLogs({
        fromBlock: fromBlockHex,
        toBlock: toBlockHex,
        address,
        topics,
        id,
        jsonrpc
      })

      if (!logs.length) {
        setNoLogs(true)
      }

      const parsedLogs = []

      for (const log of logs) {
        const blockTimestamp = await getBlockTimestamp(library, log.blockNumber)
        parsedLogs.push({
          blockNumber: ethers.BigNumber.from(log.blockNumber).toNumber(),
          timestamp: blockTimestamp,
          blockHash: log.blockHash,
          transactionIndex: log.transactionIndex,
          removed: log.removed,
          address: log.address,
          data: log.data,
          args: getArgs(iface, log),
          topics: log.topics,
          transactionHash: log.transactionHash,
          logIndex: log.logIndex
        })
      }

      return parsedLogs
    } catch (error) {
      console.error(error)
      const errorMessage = (error.data.message || error.message).split('\n')[0]
      setError(errorMessage)
    } finally {
      setLoading(false)
    }

    return []
  }, [library, address, topics, iface])

  const isReady = useMemo(() => {
    return library && library.getLogs
  }, [library])

  return {
    isReady,
    getLogs,
    loading,

    error,
    resetError: () => {
      setError('')
      setNoLogs(false)
    },
    noLogs
  }
}

export { useGetLogs }
