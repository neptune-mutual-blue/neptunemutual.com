import { useCallback, useEffect } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { getConnectorByName, switchNetwork } from '../utils/connectors'

const activateConnector = async (
  connectorName,
  activate,
  networkId = undefined,
  notify
) => {
  const connector = await getConnectorByName(connectorName, Number(networkId))

  if (!connector) {
    console.info('Invalid Connector Name', connectorName)
    return
  }

  activate(connector, async (error) => {
    notify(error)

    if (error instanceof UnsupportedChainIdError) {
      try {
        const switched = await switchNetwork(Number(networkId))
        if (switched) {
          activate(connector)
        }
      } catch (error) {
        notify(error)
      }
    }
  })
}

const useAuth = (notify = console.log) => {
  const { activate, deactivate, connector } = useWeb3React()

  useEffect(() => {
    if (!connector) {
      return
    }

    connector?.addListener('Web3ReactDeactivate', connector => console.log({ connector }))
    return () => {
      connector?.removeListener('Web3ReactDeactivate', connector => console.log({ connector }))
    }
  }, [connector])

  const login = useCallback(
    (connectorName, networkId) =>
      activateConnector(connectorName, activate, networkId, notify),
    [activate, notify]
  )

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { logout, login }
}

export default useAuth
