import { Icon } from '../../Icon'
import { AnchorButton } from './_anchor'
import { BaseButton } from './_button'

import React, { forwardRef } from 'react'

const VanillaButton = forwardRef((props, ref) => {
  const { type, icon, iconOnlyMobile, iconVariant, iconLeading, iconTrailing, children } = props

  const UntypedElement = type === 'anchor' ? AnchorButton : BaseButton

  return (
    <UntypedElement ref={ref} {...props}>
      {iconLeading && <Icon variant={iconVariant} />}

      <span
        className={`content${icon === 'only' ? ' hidden' : ''}`}
        data-icon-only-mobile={iconOnlyMobile}
      >
        {children}
      </span>

      {
      (iconTrailing) && (
        <Icon variant={iconVariant} />
      )
    }
    </UntypedElement>
  )
})

export { VanillaButton }
