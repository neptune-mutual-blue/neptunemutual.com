import { forwardRef, useEffect, useState, useRef } from 'react'
import { Icon } from '../Icon'
import { Modal } from '../Modal/Modal'
import { AddZeroesModal, StringToBytesModal } from './InputModals'
import { transformWeb3Types } from '../../../scripts/web3-tools/converter/transform'

import './InputWithLabel.scss'

const InputWithLabel = forwardRef(
  (
    { children, placeholder, label, error, errorIcon, inputType, ...props },
    ref
  ) => {
    const [modalOpen, setModalOpen] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
      return () => {
        if (typeof props.onChange === 'function') {
          props?.onChange({ target: { value: '' } })
        }
      }
    }, [])

    const handleUpdateInput = (value) => {
      if (typeof props.onChange !== 'function') return

      let newValue = inputRef.current.value

      if (inputType === 'uint256') {
        newValue = `${inputRef.current.value || 1}${'0'.repeat(value)}`
      }
      if (inputType === 'bytes32') {
        newValue = transformWeb3Types(value, 'string', 'bytes32', true)
      }

      props.onChange({ target: { value: newValue } })
      inputRef.current.focus()
    }

    return (
      <div className="input container">
        {label && (
          <div className='label'>
            <label htmlFor={props.id}>{label}</label>

            {['uint256', 'bytes32'].includes(inputType) && (
              <button
                className='helper'
                onClick={() => setModalOpen(true)}
                data-tooltip={inputType === 'uint256' ? 'Add Zeroes' : 'Convert String to Bytes'}
              >
                {inputType === 'uint256' && <Icon variant={'plus'} size={'md'} /> }
                {inputType === 'bytes32' && <Icon variant={'switch-horizontal-01'} size={'md'} /> }
              </button>
            )}
          </div>
        )}
        <input
          data-error={error ? 'true' : 'false'}
          placeholder={placeholder}
          autoComplete="off"
          {...props}
          ref={inputRef}
        />

        {error && (
          <div className={'ui error initially hidden message'}>
            {errorIcon && <Icon variant={errorIcon} size={16} />}
            {error}
          </div>
        )}

        <p className="input hint">{children}</p>

        {
          modalOpen && inputType === 'uint256' && (
            <AddZeroesModal
              show={modalOpen}
              handleClose={() => setModalOpen(false)}
              handleAddZeroes={(value) => handleUpdateInput(value)}
            />
          )
        }

        {
          modalOpen && inputType === 'bytes32' && (
            <StringToBytesModal
              show={modalOpen}
              handleClose={() => setModalOpen(false)}
              handleStringToBytes={(value) => handleUpdateInput(value)}
            />
          )
        }

      </div>
    )
  }
)

InputWithLabel.displayName = 'InputWithLabel'

export { InputWithLabel }
