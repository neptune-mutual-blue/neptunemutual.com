import './Popup.scss'

import {
  useEffect,
  useState
} from 'react'

import { Dialog } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'

import { Icon } from '../../components/Icon'
import { Modal } from '../../components/Modal'
import { wallets } from './config/wallets'
import { Disclaimer } from './Disclaimer'
import useAuth from './hooks/useAuth'
import { WalletList } from './WalletList'

export const Popup = ({ isOpen, onClose, notifier = console.log }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { active } = useWeb3React()

  const { login } = useAuth((_error) => {
    setIsConnecting(false)
    notifier(_error)
  })

  useEffect(() => {
    if (!isOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      onClose()
    }
  }, [isOpen, active, onClose])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='popup wrapper'>
        <div className='wallet icon'>
          <Icon variant='wallet-04' size={"xl"} />
        </div>

        <Dialog.Title className="dialog title" as='h3'>
          Connect Wallet
        </Dialog.Title>

        <button className='close button'
          onClick={onClose}
        >
          <span className='sr-only'>Close</span>
          <Icon variant='x-close' size={"xl"} />
        </button>

        <Disclaimer />
        <WalletList
          wallets={wallets}
          onConnect={onConnect}
          isConnecting={isConnecting}
        />

      </div>
    </Modal>
  )
}


