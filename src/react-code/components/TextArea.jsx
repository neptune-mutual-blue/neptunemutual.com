import './TextArea.scss'

const TextArea = ({ children, placeholder, label, error, ...props }) => {
  return (
    <div className={'textarea container' + (props.className ? ' ' + props.className : '')}>
      <label htmlFor={props.id}>
        {label}
      </label>

      <textarea
        data-error={(error) ? 'true' : 'false'}
        rows='4'
        placeholder={placeholder}
        {...props}
      />

      {(error) && <p className='error text'>{error}</p>}
      {children}
    </div>
  )
}

export { TextArea }
