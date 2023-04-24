import { VanillaButton } from './_base'

const LinkGrayButton = (props) => {
  const { classname, children } = props
  return (
    <VanillaButton
      type='anchor'
      className={`${classname || ''} link gray`.trim()}
      {...props}
    >
      {children}
    </VanillaButton>
  )
}

export { LinkGrayButton }
