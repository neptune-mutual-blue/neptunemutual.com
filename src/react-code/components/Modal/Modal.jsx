import './Modal.scss'

import * as Dialog from '@radix-ui/react-dialog'

import { Icon } from '../Icon'

const Modal = (props) => {
  const { cross, children, visible, setVisible, title, description, trigger, className } = props

  if (!Dialog.Root) {
    return null
  }

  return (
    <Dialog.Root open={visible} onOpenChange={setVisible}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className={'DialogContent' + (className ? ' ' + className : '')}>
          {title && (
            <div className='titlebar'>
              <Dialog.Title className='DialogTitle'>
                <div className='title'>
                  {title}
                </div>
              </Dialog.Title>
              {cross && (
                <Dialog.Close asChild>
                  <button className='IconButton' aria-label='Close'>
                    <Icon variant='x-close' size='xl' />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}
          {description && (
            <Dialog.Description className='DialogDescription'>
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
