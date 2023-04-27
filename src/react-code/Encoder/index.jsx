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
import { InputWithLabel } from '../components/InputWithLabel'
import { TextArea } from '../components/TextArea'
import { getLibrary } from '../lib/connect-wallet/utils/web3'
import {
  isArray,
  isJSON,
  isValidAbi
} from './helpers'
import { History } from './History'
import { Result } from './Result'

const STORAGE_KEY = 'abis'

const Encoder = () => {
  const formRef = useRef()

  const [contracts, setContracts] = useState([])
  const [abiInvalidFormat, setAbiInvalidFormat] = useState(false)
  const [isSaveable, setIsSaveable] = useState(false)
  const [restorationFailed, setRestorationFailed] = useState(false)
  const [contractNameExist, setContractNameExist] = useState(false)
  const [forUpdate, setForUpdate] = useState(false)

  const [contractName, setContractName] = useState('')
  const [address, setAddress] = useState('')
  const [abi, setAbi] = useState('[]')

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
    const { abi, contractName, address } = data
    const form = formRef.current
    form.abi.value = abi
    form.contract_name.value = contractName
    form.address.value = address
    setContractName(contractName)
    setAddress(address)
    setAbi(abi)
    setIsSaveable(true)
    setForUpdate(true)
    validateABI({ target: { value: abi } })
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

    const existingContractKey = abis.findIndex(abi => {
      return abi.contract_name.toLowerCase() === form.contract_name.value.toLowerCase()
    })

    if (!forUpdate && existingContractKey >= 0) {
      setContractNameExist(true)
      return true
    }

    const data = {
      abi: form.abi.value,
      contract_name: form.contract_name.value,
      address: form.address.value
    }

    if (existingContractKey >= 0) {
      abis[existingContractKey] = { ...abis[existingContractKey], ...data }
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
        const contracts = JSON.parse(evt.target.result)
        setContracts(contracts)
        window.localStorage.setItem(STORAGE_KEY, evt.target.result)
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

      if (params.has('name') && params.has('address') && params.has('type')) {
        const name = params.get('name')
        const address = params.get('address')
        const type = params.get('type')

        if (isAddress(address) && name && type) {
          try {
            document.querySelector('#address').value = address
            document.querySelector('#contract_name').value = name

            const fileName = type === 'cxTokens' ? 'ICxToken.json' : type === 'pods' ? 'IVault.json' : `I${name}.json`
            const abi = await fetch(`/abis/${fileName}`).then(res => res.text())

            if (isJSON(abi) && isArray(abi) && isValidAbi(abi)) {
              const abiTextField = document.querySelector('#abi')

              abiTextField.value = abi

              validateABI({ target: abiTextField })
              setContractName(name)
              setAddress(address)
            }
          } catch (err) {
            console.error(err)
          }
        }
      }

      window.history.replaceState({}, undefined, window.location.pathname)
    }
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
              label='How would you want to remember your contract name in the future?'
              placeholder='Contract or interface name'
              id='contract_name'
              onChange={(e) => { return setContractName(e.target.value) }}
              error={contractNameExist ? 'Contract name already exist!' : ''}
            >
                Enter the contract name or an easy way to remember name for this contract
            </InputWithLabel>

            <InputWithLabel
              required
              label='Have you deployed this contract on a blockchain network?'
              placeholder='0x'
              id='address'
              onChange={(e) => { return setAddress(e.target.value) }}
            >
                If you’d like to perform read and write operations on this contract, paste its address.
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
        />
      </div>

      <Web3ReactProvider getLibrary={getLibrary}>
        <Result
          title={contractName}
          address={address}
          abi={JSON.parse(abi)}
        />
      </Web3ReactProvider>

    </div>
  )
}

export { Encoder }
