import { getCoinbaseWalletProvider } from '../utils/coinbase-wallet/package'
import { ConnectorNames } from './connectors'

const isNotFrame = () => {
  return typeof window !== 'undefined' && ((window === null || window === undefined ? undefined : window.parent) === window)
}

export const wallets = [
  {
    id: '1',
    name: 'Metamask Wallet',
    connectorName: ConnectorNames.Injected,
    iconVariant: 'metamask',
    iconVariantDark: 'metamask-dark',
    isAvailable: () => typeof window !== 'undefined' && !!(window.web3 || window.ethereum),
    downloadURL: () => `https://metamask.app.link/dapp/${typeof window === 'undefined' ? 'ethereum.neptunemutual.net' : window.location.host}`
  },
  {
    id: '2',
    name: 'Coinbase Wallet',
    connectorName: ConnectorNames.CoinbaseWallet,
    iconVariant: 'coinbase',
    iconVariantDark: 'coinbase-dark',
    isAvailable: () => !!getCoinbaseWalletProvider(),
    downloadURL: () => 'https://www.coinbase.com/wallet/downloads'
  },
  {
    id: '3',
    name: 'OKX Wallet',
    connectorName: ConnectorNames.OKXWallet,
    iconVariant: 'okx-wallet',
    iconVariantDark: 'okx-wallet-dark',
    isAvailable: () => typeof window !== 'undefined' && !!window.okxwallet,
    downloadURL: () => 'https://www.okx.com/download'
  },
  {
    id: '4',
    name: 'Gnosis Safe Wallet',
    connectorName: ConnectorNames.Gnosis,
    iconVariant: 'gnosis-wallet',
    iconVariantDark: 'gnosis-wallet-dark',
    isAvailable: () => !isNotFrame()
  }
]