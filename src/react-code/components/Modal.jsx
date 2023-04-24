import './Modal.scss'

import { Fragment } from 'react'

import {
  Dialog,
  Transition
} from '@headlessui/react'

export const Modal = ({ isOpen = false, children, onClose }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog onClose={onClose}>
      <div className="overlay wrapper">

        <div className="styled overlay" />
        {/* This element is to trick the browser into centering the modal contents. */}
        <div className='fix span' aria-hidden='true'>
          &#8203;
        </div>

        {children}
      </div>
    </Dialog>
  </Transition>
)
