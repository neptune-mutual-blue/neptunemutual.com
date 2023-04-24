import { forwardRef } from 'react'

import { LinkColorButton } from './LinkColorButton'
import { LinkGrayButton } from './LinkGrayButton'
import { PrimaryButton } from './PrimaryButton'
import SecondaryGrayButton from './SecondaryGrayButton'

const Button = forwardRef((props, forwardedRef) => {
  const { variant, children } = props

  let BtnComponent = PrimaryButton

  switch (variant) {
    case 'link-color':
      BtnComponent = LinkColorButton
      break
    case 'link-gray':
      BtnComponent = LinkGrayButton
      break
    case 'secondary-gray':
      BtnComponent = SecondaryGrayButton
  }

  return (
    <BtnComponent ref={forwardedRef} {...props}>
      {children}
    </BtnComponent>
  )
})

export { Button }
