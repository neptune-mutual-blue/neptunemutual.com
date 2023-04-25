import {
  forwardRef,
  useEffect
} from 'react'

import { Icon } from './Icon'

const InputWithLabel = forwardRef(({ children, placeholder, label, error, errorIcon, inputChildren, ...props }, ref) => {
  useEffect(() => {
    return () => {
      if (typeof props.onChange === 'function') {
        props?.onChange({ target: { value: '' } })
      }
    }
  }, [])

  return (
    <div className='input container'>
      {
        label && (
          <label
            htmlFor={props.id}
          >
            {label}
          </label>
        )
      }
      <input
        data-error={(error) ? 'true' : 'false'}
        placeholder={placeholder}
        autoComplete='off'
        {...props}
        ref={ref}
      />

      {
        error && (
          <div className={'ui error initially hidden message'}>
            {errorIcon && <Icon variant={errorIcon} size={16} />}
            {error}
          </div>
        )
      }

      <p className="input hint">
        {children}
      </p>
    </div>
  )
})

InputWithLabel.displayName = 'InputWithLabel'

export { InputWithLabel }
