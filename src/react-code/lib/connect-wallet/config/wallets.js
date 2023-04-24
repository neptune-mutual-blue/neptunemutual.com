import { ConnectorNames } from './connectors'

export const wallets = [
  {
    id: '1',
    name: 'Metamask Wallet',
    connectorName: ConnectorNames.Injected,
    iconVariant: 'metamask',
    iconVariantDark: 'metamask-dark'
  },
  // {
  //   id: '2',
  //   name: 'Binance Wallet',
  //   connectorName: ConnectorNames.BSC,
  //   iconVariant: 'bnbchain',
  //   iconVariantDark: 'bnbchain-dark'
  // },
  {
    id: '3',
    name: 'OKX Wallet',
    connectorName: ConnectorNames.OKXWallet,
    iconVariant: 'okx-wallet',
    iconVariantDark: 'okx-wallet-dark'
  },
  {
    id: '4',
    name: 'Gnosis Safe Wallet',
    connectorName: ConnectorNames.Gnosis,
    iconVariant: 'gnosis-wallet',
    iconVariantDark: 'gnosis-wallet-dark'
  },
  // {
  //   id: '5',
  //   name: 'Wallet Connect',
  //   connectorName: ConnectorNames.WalletConnect,
  //   iconVariant: 'wallet-connect',
  //   iconVariantDark: 'wallet-connect-dark'
  // }
]
