import { Network } from '../../types/enum'

const getVerticalTabItems = (networkId: number): TabItem[] => {
  return [
    {
      text: 'Main Ethereum Network',
      icon: 'ethereum-round',
      href: '/protocol/ethereum/contracts',
      active: networkId === Network.Ethereum
    },
    {
      text: 'Arbitrum One',
      icon: 'arbitrum-round',
      href: '/protocol/arbitrum/contracts',
      active: networkId === Network.Arbitrum
    },
    {
      text: 'Polygon Mumbai',
      icon: 'mumbai',
      href: '/protocol/mumbai/contracts',
      active: networkId === Network.Mumbai
    },
    {
      text: 'BNB Smart Chain',
      icon: 'bnbchain',
      href: '/protocol/bsc/contracts',
      active: networkId === Network.BSC
    }
  ]
}

const getTabItems = (networkId: number, type: string): TabItem[] => {
  const networkSlugs: Record<number, string> = {
    [Network.Ethereum]: 'ethereum',
    [Network.Arbitrum]: 'arbitrum',
    [Network.BaseGoerli]: 'base-goerli',
    [Network.Mumbai]: 'mumbai',
    [Network.BSC]: 'bsc'
  }

  return [
    {
      text: 'Contracts',
      href: `/protocol/${networkSlugs[networkId]}/contracts`,
      active: type === 'contracts'
    },
    {
      text: 'cxTokens',
      href: `/protocol/${networkSlugs[networkId]}/cx-tokens`,
      active: type === 'cxTokens'
    },
    {
      text: 'PODs',
      href: `/protocol/${networkSlugs[networkId]}/pods`,
      active: type === 'pods'
    }
  ]
}

const config: Record<number, NetworkConfig> = {
  [Network.Ethereum]: {
    id: Network.Ethereum,
    title: 'Neptune Mutual on Ethereum',
    app: 'https://ethereum.neptunemutual.net',
    explorer: 'https://etherscan.io/address/'
  },
  [Network.Arbitrum]: {
    id: Network.Arbitrum,
    title: 'Neptune Mutual on Arbitrum',
    app: 'https://arbitrum.neptunemutual.net',
    explorer: 'https://arbiscan.io/address/'
  },
  [Network.BaseGoerli]: {
    id: Network.BaseGoerli,
    title: 'Neptune Mutual on Base Goerli (Testnet)',
    app: 'https://test.neptunemutual.net',
    explorer: 'https://goerli.basescan.org/address/'
  },
  [Network.Mumbai]: {
    id: Network.Mumbai,
    title: 'Neptune Mutual on Mumbai (Testnet)',
    app: 'https://test.neptunemutual.net',
    explorer: 'https://mumbai.polygonscan.com/address/'
  },
  [Network.BSC]: {
    id: Network.BSC,
    title: 'Neptune Mutual on BNB Smart Chain',
    app: 'https://bsc.neptunemutual.net',
    explorer: 'https://bscscan.com/address/'
  }
}

const labels: Record<string, string> = {
  contracts: 'Protocol Contracts & Tokens',
  cxTokens: 'cxTokens',
  pods: 'PODs (Vault Contracts)'
}

export { config, getTabItems, getVerticalTabItems, labels }
