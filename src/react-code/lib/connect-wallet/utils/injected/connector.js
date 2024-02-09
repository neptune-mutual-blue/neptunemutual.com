import { InjectedConnector } from '@web3-react/injected-connector'

export const getConnector = (networkID) => {
  return new InjectedConnector({ supportedChainIds: networkID ? [networkID] : undefined })
}
