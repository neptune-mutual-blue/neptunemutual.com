import './History.scss'

import React, { useState } from 'react'

import { Button } from '../components/Button/Button'
import { Icon } from '../components/Icon'
import { chains } from './helpers/wallet/chains'

const STORAGE_KEY = 'abis'

const History = ({ contracts, setContracts, download, restore, restorationFailed, restoreSpecificCallback }) => {
  const [forDeletion, setForDeletion] = useState([])

  const restoreSpecificContract = (e) => {
    const { key } = e.target.dataset
    const { abi, contract_name: contractName, address, network } = contracts[key]
    restoreSpecificCallback({ abi, contractName, address, network })
  }

  const selected = (e) => {
    const { key } = e.target.dataset
    const cKeys = [...forDeletion]
    const _contracts = [...contracts]

    const index = cKeys.indexOf(key)
    index === -1 ? cKeys.push(key) : cKeys.splice(index, 1)

    _contracts[key].isSelected = e.target.checked

    setContracts(_contracts)
    setForDeletion(cKeys)
  }

  const deleteContracts = (e) => {
    const leftOverContracts = contracts.filter((_, i) => !forDeletion.includes(`${i}`))
    setContracts(leftOverContracts)
    setForDeletion([])
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leftOverContracts))
  }

  const selectAll = (e) => {
    const keysForDeletions = []

    const _contracts = contracts.map((contract, i) => {
      if (e.target.checked) {
        keysForDeletions.push(`${i}`)
      }

      return { ...contract, isSelected: e.target.checked }
    })

    setContracts(_contracts)
    setForDeletion(keysForDeletions)
  }

  const toggleItemAddress = (key) => {
    const _contracts = [...contracts]

    _contracts[key].showDetails = !(_contracts[key]?.showDetails || false)
    setContracts(_contracts)
  }

  return (
    <div className='history container'>
      <div className='history title'>Previous Contracts</div>
      <div className='cta'>
        <Button
          variant='secondary-gray'
          disabled={contracts.length === 0}
          size='sm'
          iconLeading
          iconVariant='align-bottom-01'
          onClick={download}
        >Download Backup
        </Button>
        <Button
          variant='secondary-gray'
          size='sm'
          iconLeading
          iconVariant='refresh-ccw-02'
          onClick={restore}
        >Restore
        </Button>
      </div>
      {contracts.length > 0 &&
        <div className='delete section'>
          <input type="checkbox" onClick={selectAll} />
          {forDeletion.length > 0 && (
            <button className="delete btn" onClick={deleteContracts}>
              <Icon variant='trash-01' size='sm' />
            </button>
          )}
        </div>}

      <div className='history list'>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <React.Fragment key={`contract-${i}`}>
              <div className='history list item'>
                <input type="checkbox" checked={contract?.isSelected || false} onChange={selected} data-key={i} />
                <div className='item' data-key={i} onClick={restoreSpecificContract}>{contract.contract_name || 'Untitled'}</div>

                <button onClick={() => toggleItemAddress(i)}>
                  <Icon variant={contract.showDetails ? 'chevron-up' : 'chevron-down'} size='sm' />
                </button>
              </div>
              {
                contract.showDetails && (
                  <div className='item details'>
                    <p>{contract.address || <i>No address provided</i>}</p>
                    {contract.network
                      ? (
                      <p>{contract.network}
                        ({chains[contract.network]?.name || 'Unknown Network'})
                      </p>
                        )
                      : <i>No network provided</i>}
                  </div>
                )
              }

            </React.Fragment>
          )
        })}
      </div>
      {restorationFailed && <div className='error'>Restoration failed invalid format.</div>}
    </div>
  )
}

export { History }
