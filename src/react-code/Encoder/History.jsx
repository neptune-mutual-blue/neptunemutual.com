import './History.scss'

import { Fragment, useEffect, useState } from 'react'

import { Icon } from '../components/Icon'
import { chains } from './helpers/wallet/chains'
import { CustomCheckbox } from '../components/Checkbox/Checkbox'
import { createContractKey } from '../../../util/string'

const STORAGE_KEY = 'abis'

const History = ({ contracts, setContracts, download, restore, restorationFailed, restoreSpecificCallback, handleNew }) => {
  const [selected, setSelected] = useState([])

  const [currentSelected, setCurrentSelected] = useState(null)

  useEffect(() => {
    setSelected([])
  }, [contracts?.length])

  const restoreSpecificContract = (e) => {
    const { key } = e.target.dataset
    const { abi, contract_name: contractName, address, network } = contracts[key]
    restoreSpecificCallback({ abi, contractName, address, network, index: key })
    setCurrentSelected(Number(key))
  }

  const handleSelect = (e) => {
    const { key } = e.target.dataset
    const cKeys = [...selected]

    const index = cKeys.indexOf(key)
    index === -1 ? cKeys.push(key) : cKeys.splice(index, 1)

    setSelected(cKeys)
  }

  const deleteContracts = () => {
    const leftOverContracts = contracts.filter((_, i) => !selected.includes(`${i}`))
    setContracts(leftOverContracts)
    setSelected([])
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leftOverContracts))
  }

  const duplicateContracts = () => {
    const newContracts = [...contracts]

    selected.forEach((key) => {
      const contract = newContracts[key]
      const duplicateContract = { ...contract, contract_name: `${contract.contract_name} - Copy` }
      const duplicateKey = createContractKey(
        duplicateContract.contract_name,
        duplicateContract.address,
        duplicateContract.network
      )

      newContracts.push({ ...duplicateContract, key: duplicateKey })
    })

    setContracts(newContracts)
    setSelected([])
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newContracts))
  }

  const handleSelectAll = (e) => {
    const keysForDeletions = []

    contracts.map((contract, i) => {
      if (e.target.checked) {
        keysForDeletions.push(`${i}`)
      }

      return { ...contract, isSelected: e.target.checked }
    })

    setSelected(keysForDeletions)
  }

  const toggleItemAddress = (key) => {
    const _contracts = [...contracts]

    _contracts[key].showDetails = !(_contracts[key]?.showDetails || false)
    setContracts(_contracts)
  }

  return (
    <div className='history container'>
      <div className='title'>
        <div className='history title'>Previous Contracts</div>
        <div className='cta'>
          <button
            variant='secondary-gray'
            disabled={contracts.length === 0}
            size='sm'
            onClick={download}
            data-tooltip='Download all contracts'
          >
            <Icon variant='folder-download' size='md' />
          </button>
          <button
            variant='secondary-gray'
            size='sm'
            onClick={restore}
            data-tooltip='Restore contracts from file'
          >
            <Icon variant='refresh-ccw-01' size='md' />
          </button>
        </div>
      </div>

      <div className='action section'>
        {
          contracts.length > 0 && (
            <>
              <CustomCheckbox
                onChange={handleSelectAll}
                checked={selected.length === contracts.length}
                data-variant='minus'
              />

              {selected.length > 0 && (
                <>
                  <button
                    className="duplicate btn"
                    onClick={duplicateContracts}
                    data-tooltip='Duplicate selected contracts'
                  >
                    <Icon variant='file-plus' size='md' />
                  </button>

                  <button
                    className="delete btn"
                    onClick={deleteContracts}
                    data-tooltip='Delete selected contracts'
                  >
                    <Icon variant='trash-01' size='md' />
                  </button>
                </>
              )}
            </>
          )
        }

        <button
          className='new'
          onClick={() => {
            setCurrentSelected(null)
            handleNew()
          }}
          data-tooltip='Add new contract'
        >
          <Icon variant='plus' size='md' />
        </button>
      </div>

      <div className='history list'>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <Fragment key={`contract-${i}`}>
              <div className={`item wrapper ${currentSelected === i ? 'selected' : ''}`}>
                <div className='item title'>
                  <CustomCheckbox
                    checked={selected.includes(`${i}`)}
                    onChange={handleSelect}
                    data-key={i}
                  />

                  <button
                    className='item'
                    data-key={i}
                    onClick={restoreSpecificContract}
                  >
                    {contract.contract_name || 'Untitled'}
                  </button>

                  <button onClick={() => toggleItemAddress(i)}>
                    <Icon variant={contract.showDetails ? 'chevron-up' : 'chevron-down'} size='sm' />
                  </button>
                </div>
                {
                  contract.showDetails && (
                    <div className='item details'>
                      <p>
                        <span>Address: </span>{contract.address || <i>No address provided</i>}</p>
                      {contract.network
                        ? (
                          <p>
                            <span>Network: </span>{contract.network}
                            ({chains[contract.network]?.name || 'Unknown Network'})
                          </p>
                          )
                        : <i>No network provided</i>}
                    </div>
                  )
                }

              </div>

              {i < contracts.length - 1 && <hr />}
            </Fragment>
          )
        })}
      </div>
      {restorationFailed && <div className='error'>Restoration failed invalid format.</div>}
    </div>
  )
}

export { History }
