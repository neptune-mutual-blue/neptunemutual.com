import { VanillaButton } from './_base'

import React, { forwardRef } from 'react'

const PrimaryButton = forwardRef((props, ref) => {
  const { classname, children, ...rest } = props
  return (
    <VanillaButton
      ref={ref}
      type='button'
      className={`${classname || ''} primary`.trim()}
      {...rest}
    >
      {children}
    </VanillaButton>
  )
})

export { PrimaryButton }
