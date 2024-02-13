import React from 'react'
import './Checkbox.scss'

const CustomCheckbox = ({ children, ...rest }) => {
  return (
    <div className="custom checkbox component">
      <label className="container">
        <input type="checkbox" {...rest} />
        <span className="checkmark"></span>
        {children}
      </label>
    </div>
  )
}

export { CustomCheckbox }
