import React, { forwardRef } from 'react'

const BaseButton = forwardRef((props, ref) => {
  const {
    id,
    className,
    disabled,
    size,
    state,
    destructive,
    iconOnlyMobile,
    onClick,
    children,
    iconVariant,
    iconLeading,
    ...rest
  } = props

  return (
    <button
      ref={ref}
      id={id}
      onClick={onClick}
      className={`ui ${(className || '').trim()} button`}
      data-text-size={size}
      disabled={(disabled || state === 'disabled')}
      data-state={state}
      data-destructive={destructive}
      data-icon-only-mobile={iconOnlyMobile}
      {...rest}
    >
      {children}
    </button>
  )
})

export { BaseButton }
