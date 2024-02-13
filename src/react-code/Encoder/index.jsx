import './index.scss'

import {
  useEffect,
  useRef,
  useState
} from 'react'

import { isAddress } from '@ethersproject/address'
import { Web3ReactProvider } from '@web3-react/core'

import { Breadcrumbs } from '../components/BreadCrumbs'
import { Button } from '../components/Button/Button'
import { InputWithLabel } from '../components/InputWithLabel/InputWithLabel'
import { TextArea } from '../components/TextArea'
import { getLibrary } from '../lib/connect-wallet/utils/web3'
import {
  isArray,
  isJSON,
  isValidAbi
} from './helpers'
import { History } from './History'
import { Result } from './Result'

import { createContractKey } from '../../../util/string'

const STORAGE_KEY = 'abis'

const POSSIBLE_ABIS = [
  'IAaveV2LendingPoolLike',
  'IBondPool',
  'IClaimsProcessor',
  'ICompoundERC20DelegatorLike',
  'ICover',
  'ICoverReassurance',
  'ICoverStake',
  'ICxToken',
  'ICxTokenFactory',
  'IERC20',
  'IERC20Detailed',
  'IFinalization',
  'IGovernance',
  'ILendingStrategy',
  'ILiquidityEngine',
  'IMember',
  'IPausable',
  'IPolicy',
  'IPolicyAdmin',
  'IPriceOracle',
  'IProtocol',
  'IRecoverable',
  'IReporter',
  'IResolution',
  'IResolvable',
  'IStakingPools',
  'IStore',
  'IUniswapV2FactoryLike',
  'IUniswapV2PairLike',
  'IUniswapV2RouterLike',
  'IUnstakable',
  'IVault',
  'IVaultDelegate',
  'IVaultFactory',
  'IWitness'
]

const Encoder = () => {
  const formRef = useRef()

  const [contracts, setContracts] = useState([])
  const [abiInvalidFormat, setAbiInvalidFormat] = useState(false)
  const [isSaveable, setIsSaveable] = useState(false)
  const [restorationFailed, setRestorationFailed] = useState(false)
  const [contractNameExist, setContractNameExist] = useState(false)

  const [contractName, setContractName] = useState('')
  const [address, setAddress] = useState('')
  const [abi, setAbi] = useState('[]')
  const [networkId, setNetworkId] = useState('')

  const [updateIndex, setUpdateIndex] = useState(null)

  useEffect(() => {
    const storageData = window.localStorage.getItem(STORAGE_KEY)
    if (isJSON(storageData)) {
      setContracts(JSON.parse(storageData) || [])
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (contractNameExist) {
      setTimeout(() => {
        setContractNameExist(false)
      }, 5000)
    }
  }, [contractNameExist])

  const restoreSpecificCallback = (data) => {
    const { abi, contractName, address, network, index } = data
    const form = formRef.current
    form.abi.value = abi || ''
    form.contract_name.value = contractName || ''
    form.address.value = address || ''
    form.network.value = network || ''

    setContractName(contractName)
    setAddress(address)
    setNetworkId(network)
    setAbi(abi)
    setIsSaveable(true)
    validateABI({ target: { value: abi } })
    setUpdateIndex(index)
  }

  const saveToStorage = (e) => {
    e.preventDefault()
    let abis = []
    const form = formRef.current

    const isAbiJson = isJSON(form.abi.value)

    if (!isAbiJson) {
      return true
    }

    const storageData = window.localStorage.getItem(STORAGE_KEY)

    if (isJSON(storageData)) {
      abis = JSON.parse(storageData) || []
    }

    const newContractKey = createContractKey(
      form.contract_name.value,
      form.address.value,
      form.network.value
    )

    const data = {
      key: newContractKey,
      abi: form.abi.value,
      contract_name: form.contract_name.value,
      address: form.address.value,
      network: form.network.value
    }

    if (updateIndex) {
      abis[updateIndex] = { ...abis[updateIndex], ...data }
    } else {
      abis.push(data)
    }

    setContracts(abis)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(abis))
  }

  const download = (e) => {
    e.preventDefault()

    const file = new window.Blob([JSON.stringify(contracts)], { type: 'text/json;charset=utf-8' })

    const element = document.createElement('a')
    element.href = URL.createObjectURL(file)
    element.download = 'contracts.json'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const restore = (e) => {
    e.preventDefault()
    const element = document.createElement('input')
    element.type = 'file'
    element.onchange = processFile
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const processFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setRestorationFailed(false)

    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.onload = (evt) => {
      try {
        const newContracts = JSON.parse(evt.target.result)
        const updatedContracts = [...contracts, ...newContracts]
        setContracts(updatedContracts)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContracts))
      } catch (error) {
        // Show an error
        setRestorationFailed(true)
        console.log(error)
      }
    }

    reader.readAsText(file)
  }

  const validateABI = (e) => {
    const abi = e.target.value

    if (abi === '') {
      return setAbiInvalidFormat(false)
    }

    const isValidAbiString = isJSON(abi) && isArray(abi) && isValidAbi(abi)

    if (isValidAbiString && typeof JSON.parse(abi) === 'object') {
      setAbi(abi)
    }
    setIsSaveable(isValidAbiString)
    setAbiInvalidFormat(!isValidAbiString)
  }

  // Consume and auto-fill values when available in URL
  useEffect(() => {
    consumeAndFill()
  }, [])

  const consumeAndFill = async () => {
    const search = window.location.search

    if (search) {
      const params = new URLSearchParams(search.slice(1))

      if (params.has('name') && params.has('address') && params.has('abi')) {
        const name = params.get('name')
        const address = params.get('address')
        const abi = params.get('abi')

        if (!isAddress(address)) {
          return console.error('Address is invalid')
        }

        if (!name) {
          return console.error('Name was not provided.')
        }

        if (!POSSIBLE_ABIS.includes(abi)) {
          return console.error('Provided ABI was invalid')
        }

        try {
          document.querySelector('#address').value = address
          document.querySelector('#contract_name').value = name

          const response = await fetch(`/abis/${abi}.json`).then(res => res.text())

          if (isJSON(response) && isArray(response) && isValidAbi(response)) {
            const abiTextField = document.querySelector('#abi')

            abiTextField.value = response

            validateABI({ target: abiTextField })
            setContractName(name)
            setAddress(address)
          } else {
            console.error('Unable to load ABI from file')
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        console.error('Query params not provided in valid format')
      }
    }
  }

  const handleNew = () => {
    setContractName('')
    setAddress('')
    setAbi('[]')
    setNetworkId('')
    setUpdateIndex(null)

    const form = formRef.current
    form.abi.value = ''
    form.contract_name.value = ''
    form.address.value = ''
    form.network.value = ''
  }

  return (
    <div className='encoder container'>
      <div className='form container'>
        <div>
          <Breadcrumbs
            crumbs={[
              { name: 'Home', link: '/' },
              { name: 'Web3 Tools', link: '/web3-tools' },
              { name: 'ABI Encoder', link: null }
            ]}
          />

          <form className='form content' ref={formRef}>
            <TextArea
              required
              label='What is your contract ABI?'
              placeholder='Paste your smart contract or interface ABI code here'
              onChange={validateABI}
              error={abiInvalidFormat ? 'ABI format is invalid.' : ''}
              rows={5}
              id='abi'
            />

            <InputWithLabel
              required
              label='Enter the name of the contract:'
              placeholder='Contract or interface name'
              id='contract_name'
              onChange={(e) => { return setContractName(e.target.value) }}
              error={contractNameExist ? 'Contract name already exist!' : ''}
            >
                Give a name to the contract. This will be used to identify the contract in the history.
            </InputWithLabel>

            <InputWithLabel
              required
              label='Enter the deployment address of the contract:'
              placeholder='0x'
              id='address'
              onChange={(e) => { return setAddress(e.target.value) }}
            >
                If you’d like to perform read and write operations on this contract, paste it's address.
            </InputWithLabel>

            <InputWithLabel
              required
              label='Enter the network of the deployed contract'
              placeholder='1'
              id='network'
              onChange={(e) => { return setNetworkId(e.target.value) }}
            >
                Give the chain id of the network where the contract is deployed.
            </InputWithLabel>

            <div className='form action'>
              <Button
                variant="secondary-gray"
                hierarchy='secondary'
                disabled={!isSaveable}
                size='sm'
                iconLeading
                iconVariant='folder'
                onClick={saveToStorage}
              >
                Save to Local Storage
              </Button>
              <Button
                variant="secondary-gray"
                disabled={contracts.length === 0}
                size='sm'
                iconLeading
                iconVariant='download-cloud-01'
                onClick={download}
              >
                Save All to Your Computer
              </Button>
              <Button
               variant="secondary-gray"
                size='sm'
                type='file'
                iconLeading
                iconVariant='refresh-ccw-02'
                onClick={restore}
              >
                Restore from Your Computer
              </Button>
            </div>
          </form>
        </div>

        <History
          contracts={contracts}
          setContracts={setContracts}
          download={download}
          restore={restore}
          restorationFailed={restorationFailed}
          restoreSpecificCallback={restoreSpecificCallback}
          handleNew={handleNew}
        />
      </div>

      <Web3ReactProvider getLibrary={getLibrary}>
        <Result
          title={contractName}
          address={address}
          abi={JSON.parse(abi)}
          networkId={networkId}
        />
      </Web3ReactProvider>

    </div>
  )
}

export { Encoder }
