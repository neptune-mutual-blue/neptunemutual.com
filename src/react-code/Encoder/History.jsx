import './History.scss'

import { Fragment, useEffect, useState } from 'react'

import { Icon } from '../components/Icon'
import { chains } from './helpers/wallet/chains'
import { CustomCheckbox } from '../components/Checkbox/Checkbox'
import { generateRandomString } from '../../../util/string'

const STORAGE_KEY = 'abis'

const History = ({
  contracts,
  setContracts,
  download,
  restore,
  restorationFailed,
  handleNew,
  currentKey,
  setCurrentKey,
  selected,
  setSelected
}) => {
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false)
  const [showSelectDropdown, setShowSelectDropdown] = useState(false)

  const [selectionMode, setSelectionMode] = useState(false)

  useEffect(() => {
    setSelected([])
  }, [contracts?.length])

  const restoreSpecificContract = (e) => {
    const { key } = e.currentTarget.dataset

    if (selectionMode) {
      return handleSelect({ target: { dataset: { key } } })
    }

    if (currentKey === key) {
      handleNew()
      return
    }

    setCurrentKey(key)
  }

  const handleSelect = (e) => {
    const { key } = e.target.dataset
    const cKeys = [...selected]

    const index = cKeys.indexOf(key)
    index === -1 ? cKeys.push(key) : cKeys.splice(index, 1)

    setSelected(cKeys)

    if (cKeys.length === 0) setSelectionMode(false)
  }

  const deleteContracts = () => {
    const _selected = selectionMode ? [...selected] : [currentKey]
    const leftOverContracts = contracts.filter(c => !_selected.includes(c.key))
    setContracts(leftOverContracts)

    if (_selected.includes(currentKey)) setCurrentKey('')

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leftOverContracts))
  }

  const duplicateContracts = () => {
    const duplicates = []

    const _selected = selectionMode ? selected : [currentKey]
    _selected.forEach((key) => {
      const contract = contracts.find(c => c.key === key)

      const duplicateContract = {
        ...contract,
        contract_name: `${contract.contract_name} - Copy`,
        showDetails: false
      }
      const duplicateKey = generateRandomString(6)

      duplicates.unshift({ ...duplicateContract, key: duplicateKey })
    })

    setContracts([...duplicates, ...contracts])

    handleNew()
    if (!selectionMode) setCurrentKey(duplicates[0].key)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...duplicates, ...contracts]))
  }

  const handleSelectAll = (e) => {
    const checked = e.target.checked
    const keysForDeletions = checked ? contracts.map((contract) => contract.key) : []

    setSelected(keysForDeletions)
    setSelectionMode(e.target.checked)

    if (e.type === 'click') {
      setSelectionMode(true)
      const _selected = contracts.map((contract) => contract.key)
      setSelected(_selected)
    }
    setShowSelectDropdown(false)
  }

  const handleSelectMultiple = () => {
    setSelectionMode(true)
    setShowSelectDropdown(false)
  }

  const handleClear = () => {
    setSelectionMode(false)
    setShowSelectDropdown(false)
    setSelected([])
  }

  const toggleItemDetails = (key) => {
    const _contracts = [...contracts]

    _contracts[key].showDetails = !(_contracts[key]?.showDetails || false)
    setContracts(_contracts)
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.cta')) {
        setShowOptionsDropdown(false)
      }

      if (!e.target.closest('.select.all')) {
        setShowSelectDropdown(false)
      }
    }

    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  const CtaDropdown = () => {
    return (
      <div className='cta'>
        <button className='dots trigger' onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>
          <Icon variant='dots-vertical' />
        </button>

        {
          showOptionsDropdown && (
            <div className='dropdown'>
              <button onClick={download}>
                <span>Download Backup</span>
                <Icon variant='download-02' />
              </button>

              <button onClick={restore}>
                <span>Restore</span>
                <Icon variant='clock-rewind' />
              </button>
            </div>
          )
        }
      </div>
    )
  }

  const SelectDropdown = () => {
    return (
      <div className='select all'>
        <CustomCheckbox
          onChange={handleSelectAll}
          checked={selected.length > 0}
          data-variant='minus'
        />

        <button
          className='trigger'
          onClick={() => setShowSelectDropdown(prev => !prev)}
        >
          <Icon variant={'chevron-down'} size='sm' />
        </button>

        {
          showSelectDropdown && (
            <div className='dropdown'>
              {
                selectionMode
                  ? (
                    <button onClick={handleClear}>
                      Clear Selection
                    </button>
                    )
                  : (
                    <>
                      <button onClick={handleSelectAll}>
                        Select All
                      </button>

                      <button onClick={handleSelectMultiple}>
                        Select Multiple
                      </button>
                    </>
                    )
              }
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className='history container'>
      <div className='title'>
        <div className='history title'>Previous Contracts</div>
          <button
            className='new'
            onClick={() => {
              setSelected([])
              handleNew()
            }}
            data-tooltip='Add new contract'
            data-flow="left"
          >
            <Icon variant='plus' size='md' />
          </button>
      </div>

      <div className='action section'>
        {
          contracts.length > 0 && (
            <>
              <SelectDropdown />

              <div className='buttons'>
                {(selected.length > 0 || currentKey) && (
                  <>
                    <button
                      className="duplicate btn"
                      onClick={duplicateContracts}
                      data-tooltip='Duplicate selected contract(s)'
                    >
                      <Icon variant='file-plus' />
                    </button>

                    <button
                      className="delete btn"
                      onClick={deleteContracts}
                      data-tooltip='Delete selected contract(s)'
                    >
                      <Icon variant='trash-01' />
                    </button>
                  </>
                )}

                <CtaDropdown />
              </div>
            </>
          )
        }
      </div>

      <div className='history list'>
        {contracts.length > 0 && contracts.map((contract, i) => {
          const key = contract.key
          return (
            <Fragment key={`contract-${key}`}>
              <div
                className={`item wrapper ${
                  selectionMode ? (selected.includes(key) ? 'selected' : '') : (currentKey === key ? 'selected' : '')
                }`}
                data-key={key}
                >
                <div className='item title'>
                  {
                    selectionMode && (
                      <CustomCheckbox
                        checked={selected.includes(key)}
                        onChange={handleSelect}
                        data-key={key}
                      />
                    )
                  }

                  <button
                    className='item'
                    data-key={key}
                    onClick={restoreSpecificContract}
                  >
                    <span>{contract.contract_name || 'Untitled'}</span>
                    {/* {contract.network && <span>[{contract.network}]</span>} */}
                  </button>

                  <button className='toggle' onClick={() => toggleItemDetails(i)}>
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
                            <span>Network: </span>{chains[contract.network]?.name || 'Unknown Network'}{' '}({contract.network})
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
