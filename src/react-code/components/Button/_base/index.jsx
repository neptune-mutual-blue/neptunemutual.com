import { Icon } from '../../Icon'
import { AnchorButton } from './_anchor'
import { BaseButton } from './_button'

const VanillaButton = (props) => {
  const { type, icon, iconOnlyMobile, iconVariant, iconLeading, iconTrailing, children } = props

  const UntypedElement = type === 'anchor' ? AnchorButton : BaseButton

  return (
    <UntypedElement {...props}>
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
}

export { VanillaButton }
