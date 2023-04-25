const AnchorButton = (props) => {
  const {
    id,
    children,
    className,
    disabled,
    href,
    target,
    rel,
    size,
    state,
    destructive,
    iconOnlyMobile,
    onClick,
    iconVariant,
    iconLeading,
    ...rest
  } = props

  return (
    <a
      id={id}
      onClick={onClick}
      className={`ui ${(className || '').trim()} button`}
      data-text-size={size}
      data-disabled={(disabled || state === 'disabled') ? true : undefined}
      data-state={state}
      data-destructive={destructive}
      data-icon-only-mobile={iconOnlyMobile}
      href={href}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  )
}

export { AnchorButton }
