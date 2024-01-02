import {
  useEffect,
  useState
} from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../helpers/solidity/contract'
import {
  calculateGasMargin,
  getErrorMessage
} from '../helpers/solidity/methods'

export const useContractCall = ({ abi, address }) => {
  const { library, account } = useWeb3React()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !library?.getSigner || !account) {
      setContract(null)
      return
    }

    try {
      const _c = getContract(address, abi, library?.getSigner())
      setContract(_c)
    } catch (error) {
      console.log('Error in creating contract: ', error)
      setContract(null)
    }
  }, [abi, address, library, account])

  async function callMethod (methodName, args = [], overrides = {}, iface = null) {
    if (!contract || !methodName) return

    let methodArgs = [...args]
    let estimatedGas = null
    try {
      estimatedGas = await contract.estimateGas[methodName](...args, { ...overrides })

      try {
        methodArgs = [...args, { gasLimit: calculateGasMargin(estimatedGas), ...overrides }]

        const res = await contract[methodName](...methodArgs)

        if (res.wait) await res.wait()

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
