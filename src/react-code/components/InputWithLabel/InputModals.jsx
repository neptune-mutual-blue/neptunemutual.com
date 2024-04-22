import { useMemo, useState } from 'react'
import { Modal } from '../Modal/Modal.jsx'

const options = [
  { label: '10¹⁸', value: '18' },
  { label: '10⁶', value: '6' },
  { label: '10³', value: '3' },
  { label: 'Custom', value: 'custom' }
]

const AddZeroesModal = ({ show, handleClose, handleAddZeroes }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value)
  const [value, setValue] = useState(options[0].value)

  const handleAddClick = () => {
    handleAddZeroes(Number(value))
    handleClose()
  }

  const disabled = useMemo(() => {
    return Boolean(!value) || isNaN(Number(value)) || Number(value) < 0
  }, [value])

  const handleSwitch = (e) => {
    setSelectedOption(e.target.value)
    const selectedOption = options.find(option => option.value === e.target.value)

    if (selectedOption.value !== 'custom') {
      setValue(selectedOption.value)
    }
  }

  return (
    <Modal
      visible={show}
      setVisible={handleClose}
      title={'Add Zeroes'}
      description={'Add zeroes to the end of the number'}
      className={'add-zeroes-modal'}
      cross
    >
      <form className='content' onSubmit={e => e.preventDefault()}>
        <select
          className='input container'
          value={selectedOption.value}
          onChange={handleSwitch}
          autoFocus
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {
          selectedOption === 'custom' && (
            <input
              type='number'
              min={0}
              autoFocus
              onChange={
                e => setValue(e.target.value)
              }
              value={value}
            />
          )
        }

        <button
          disabled={disabled}
          onClick={handleAddClick}
        >
          Add
        </button>
      </form>
    </Modal>
  )
}

const StringToBytesModal = ({ show, handleClose, handleStringToBytes }) => {
  const [value, setValue] = useState('')

  const handleConvertClick = () => {
    handleStringToBytes(value)
    handleClose()
  }

  return (
    <Modal
      visible={show}
      setVisible={handleClose}
      title={'string to bytes32'}
      description={'Convert string to bytes32'}
      className={'string-to-bytes-modal'}
      cross
    >
      <form className='content' onSubmit={e => e.preventDefault()}>
        <input
          className='input container'
          type='text'
          onChange={
            e => setValue(e.target.value)
          }
          value={value}
          autoFocus
        />

        <button onClick={handleConvertClick}>
          Convert
        </button>
      </form>
    </Modal>
  )
}

export { AddZeroesModal, StringToBytesModal }
