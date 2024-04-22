import { useState } from 'react'
import { Button } from '../Button/Button'
import { TextArea } from '../TextArea'
import { Modal } from '../Modal/Modal'

import './JSONPopup.scss'

const JSONPopup = ({ handleJSON, label, parsedJSON, setParsedJSON, btnProps = { disabled: false, label: 'Update' } }) => {
  const [JSONInput, setJSONInput] = useState('')

  const [visible, setVisible] = useState(false)

  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  const handleInputChange = (e) => {
    setShowError(false)
    setError('')

    const value = e.target.value
    setJSONInput(value)

    try {
      const parsed = JSON.parse(value)
      if (typeof parsed === 'object') {
        setParsedJSON(parsed)
        return
      }
    } catch {
      // console.error(e)
      setParsedJSON(null)
    }

    setError('Invalid JSON format')
  }

  const handleUpdateClick = () => {
    setShowError(true)

    if (Array.isArray(parsedJSON)) return setError('JSON must be an object')

    setVisible(false)
    handleJSON(parsedJSON)
  }

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      cross
      title='Update With JSON'
      className='json popup'
      trigger={
        <div>
          <Button variant='primary' className="json trigger">{btnProps.label} With JSON</Button>
        </div>
      }
    >
      <div className='json-popup'>
        <TextArea
          className='json-input'
          id='json-input'
          placeholder='{"key1": "value1", "key2": "value2"}'
          label={label}
          value={JSONInput}
          onChange={handleInputChange}
          error={(showError && error)}
        />

      <Button
        disabled={error || !parsedJSON || btnProps.disabled}
        variant='secondary-gray'
        onClick={handleUpdateClick}
        {...btnProps}
      >
          {btnProps.label}
        </Button>
      </div>
    </Modal>
  )
}

export { JSONPopup }
