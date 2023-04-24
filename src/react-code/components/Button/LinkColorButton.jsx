import { VanillaButton } from './_base'

const UntypedButton = VanillaButton

const LinkColorButton = (props) => {
  const { classname, children } = props

  return (
    <UntypedButton
      className={`${classname || ''} link color`.trim()}
      {...props}
    >
      {children}
    </UntypedButton>
  )
}

export { LinkColorButton }
