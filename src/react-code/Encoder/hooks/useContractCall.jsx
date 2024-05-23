import {
  useEffect,
  useState
} from 'react'

import { getContract } from '../helpers/solidity/contract'
import {
  calculateGasMargin,
  getErrorMessage
} from '../helpers/solidity/methods'
import { useConnectWallet } from '../../packages/web3-core'

export const useContractCall = ({ abi, address }) => {
  const { account, signerOrProvider } = useConnectWallet()

  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !account) {
      setContract(null)
      return
    }

    try {
      const _c = getContract(address, abi, signerOrProvider)
      setContract(_c)
    } catch (error) {
      console.log('Error in creating contract: ', error)
      setContract(null)
    }
  }, [abi, address, account])

  // eslint-disable-next-line no-restricted-syntax
  async function callMethod (methodName, args = [], overrides = {}, iface = null) {
    if (!contract || !methodName) {
      return
    }

    let methodArgs = [...args]
    let estimatedGas = null

    try {
      estimatedGas = await contract.estimateGas[methodName](...args, { ...overrides })

      try {
        methodArgs = [...args, { gasLimit: calculateGasMargin(estimatedGas), ...overrides }]

        const res = await contract[methodName](...methodArgs)

        if (res.wait) {
          await res.wait()
        }

        const data = Array.isArray(res) ? Array.from(res) : [res]
        return { hash: res.hash, data }
      } catch (error) {
        console.log(`Error in calling ${methodName} function: ${error}`)
        return { error: getErrorMessage(error, iface) }
      }
    } catch (e) {
      console.log(`Could not estimate gas for ${methodName}(${methodArgs})`)
      return { error: getErrorMessage(e, iface) }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
