import { chains } from '../../../Encoder/helpers/wallet/chains'
import { ConnectorNames } from '../config/connectors'

/**
 * Asynchronously load the selected connector only
 *
 * @param {string} name
 */
export const getConnectorByName = async (name, networkId = undefined) => {
  switch (name) {
    case ConnectorNames.Injected: {
      const c = await import('./injected/connector')

      return c.getConnector(networkId)
    }

    case ConnectorNames.OKXWallet: {
      const c = await import('./okx-wallet/connector')

      return c.getConnector()
    }

    // case ConnectorNames.BSC: {
    //   const c = await import('./binance-wallet/connector')

    //   return c.getConnector()
    // }

    case ConnectorNames.Gnosis: {
      const c = await import('./gnosis-safe/connector')

      return c.getConnector()
    }

    case ConnectorNames.CoinbaseWallet: {
      const c = await import('./coinbase-wallet/connector')

      return c.getConnector()
    }

    default:
      return null
  }
}

function handleUserRejected(error) {
  if (error.code === 4001) {
    return {
      success: false,
      message: 'User rejected the request'
    }
  }
}

export const addNetwork = async (network) => {
  try {
    const provider = window.ethereum
    const rpcUrls = chains[network].rpcUrls
    const chainId = `0x${network.toString(16)}`
    const chainName = chains[network].name
    const explorer = chains[network].explorer
  
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName,
          rpcUrls,
          blockExplorerUrls: [explorer]}
      ]
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    
    if(handleUserRejected(error)) return handleUserRejected(error)

    return {
      success: false,
      message: 'Failed to add network. Please add it manually.'
    }
  }
}


export const switchNetwork = async (networkId) => {
  try {
    const provider = window.ethereum
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${networkId.toString(16)}` }]
    })

    return { success: true}
  } catch (error) {
    console.error(error)

    if(handleUserRejected(error)) return handleUserRejected(error)

    if (error.code === 4902) {
      const response = await addNetwork(networkId)
      return response
    }

    return {
      success: false,
      message: 'Failed to switch network. Please switch it manually.'
    }
  }
}