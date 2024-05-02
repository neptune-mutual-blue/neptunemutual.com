import { VanillaButton } from './_base'

const SecondaryGrayButton = (props) => {
  const { classname, children } = props

  return (
    <VanillaButton
      type='button'
      className={`${classname || ''} secondary gray`.trim()}
      {...props}
    >
      {children}
    </VanillaButton>
  )
}

export { SecondaryGrayButton }
