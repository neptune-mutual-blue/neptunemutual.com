import { constants } from 'ethers'

import { parseBytes32String } from '@ethersproject/strings'

export enum Networks {
  Ethereum = 1,
  Arbitrum = 42161,
  Fuji = 43113
}

export const protocolTitles: Record<number, string> = {
  [Networks.Ethereum]: 'Neptune Mutual on Ethereum',
  [Networks.Arbitrum]: 'Neptune Mutual on Arbitrum',
  [Networks.Fuji]: 'Neptune Mutual on Fuji (Testnet)'
}

export const protocolDomains: Record<number, string> = {
  [Networks.Ethereum]: 'https://ethereum.neptunemutual.net',
  [Networks.Arbitrum]: 'https://arbitrum.neptunemutual.net',
  [Networks.Fuji]: 'https://test.neptunemutual.net'
}

export const protocolLabels: Record<string, string> = {
  contracts: 'Protocol Contracts & Tokens',
  cxTokens: 'cxTokens',
  pods: 'PODs (Vault Contracts)'
}

const baseExplorerUrl: Record<number, string> = {
  [Networks.Ethereum]: 'https://etherscan.io',
  [Networks.Arbitrum]: 'https://arbiscan.io',
  [Networks.Fuji]: 'https://testnet.snowtrace.io'
}

export const getExplorerUrl = (networkId: number, address: string): string => {
  const baseUrl = baseExplorerUrl[networkId]

  return `${baseUrl}/address/${address}`
}

interface ContractData {
  data: Array<{
    name: string
    address: string
    expired?: boolean
  }>
  expiredCount: number
  activeCount: number
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export const getContractData = (data: Array<KeyValuePair<string>> | CxToken[], type: string): ContractData => {
  const result = data.map(val => {
    let expired = false

    if (type === 'contracts') {
      return {
        name: val?.key,
        address: val?.value,
        expired
      }
    }

    let name = ''
    if (type === 'cxTokens') {
      name = bytes32ToString(val?.coverKey)
      let productName = ''
      if (val?.productKey !== constants.HashZero) {
        productName = bytes32ToString(val?.productKey)
      }

      if (productName !== '') name = `${name}:${productName}`

      const currentTimestamp = new Date().getTime()
      const expireTimestamp = parseInt(val?.expiry) * 1000
      expired = expireTimestamp < currentTimestamp

      const monthIndex = new Date(expireTimestamp).getMonth()
      const month = monthNames[monthIndex].toLowerCase()
      name = `${name}:${month}`
    }

    if (type === 'pods') {
      name = bytes32ToString(val?.key)
    }

    return {
      name,
      address: val?.value,
      expired
    }
  })

  const expiredCount = result.filter(r => r.expired).length

  return {
    data: result,
    expiredCount,
    activeCount: result.length - expiredCount
  }
}

export function bytes32ToString (bytes32Str: string): string {
  try {
    return parseBytes32String(bytes32Str)
  } catch (error) {
    console.error(error)
  }
  return ''
}
