import { VanillaButton } from './_base'

const PrimaryButton = (props) => {
  const { classname, children } = props
  return (
    <VanillaButton
      type='button'
      className={`${classname || ''} primary`.trim()}
      {...props}
    >
      {children}
    </VanillaButton>
  )
}

export { PrimaryButton }
