import './ConnectWallet.scss'

import {
  useEffect,
  useState
} from 'react'

import { useWeb3React } from '@web3-react/core'

import { wallets } from '../../lib/connect-wallet/config/wallets'
import useAuth from '../../lib/connect-wallet/hooks/useAuth'
import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import { Modal } from '../Modal/Modal'
import { ConnectedDropdown } from './ConnectedDropdown'

const ConnectWallet = ({ networkId }) => {
  const [popupOpen, setPopupOpen] = useState(false)

  const { login, logout } = useAuth()

  const [isConnecting, setIsConnecting] = useState(false)

  const { active } = useWeb3React()

  useEffect(() => {
    logout()
  }, [networkId])

  const handleWalletButtonClick = () => {
    logout()
  }

  useEffect(() => {
    if (!popupOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      setPopupOpen(false)
    }
  }, [popupOpen, active, setPopupOpen])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName, networkId)
  }

  return active
    ? <ConnectedDropdown />
    : (
      <Modal
        title={
          <>
            <div className='wallet icon'>
              <Icon variant='wallet-04' size='xl' />
            </div>
            Connect Wallet
          </>
        }
        visible={popupOpen} setVisible={setPopupOpen}
        trigger={
          <Button data-text-size="xs" onClick={handleWalletButtonClick} iconVariant='wallet-04' iconLeading size='md'>Connect Wallet</Button>
    }
        description={
          <>By connecting a wallet, you agree to Neptune Mutual <a target='_blank' href={'/policies/standard-terms-and-conditions/'}>Terms & Conditions</a> and acknowledge that you have read and understand the Neptune Mutual <a target='_blank' href={'/docs/usage/disclaimer/'}>Protocol Disclaimer</a>.</>
    }
        className='connect wallet modal'
        cross
      >
        {wallets.map(wallet => wallet.isAvailable() || !wallet.downloadURL
          ? (
            <Button key={wallet.id} variant='secondary-gray' size='lg' onClick={() => onConnect(wallet.id)} disabled={isConnecting}>
              <span className='light only'><Icon variant={wallet.iconVariant} size='sm' /></span>
              <span className='dark only'><Icon variant={wallet.iconVariantDark} size='sm' /></span>
              {wallet.name}
            </Button>
            )
          : (
            <a
              key={wallet.id} href={wallet.downloadURL()}
              target='_blank'
              rel='noreferrer noopener nofollow'
            >
              <Button key={wallet.id} variant='secondary-gray' size='lg' disabled={isConnecting}>
                <span className='light only'><Icon variant={wallet.iconVariant} size='sm' /></span>
                <span className='dark only'><Icon variant={wallet.iconVariantDark} size='sm' /></span>
                Install {wallet.name}
              </Button>
            </a>
            ))}
      </Modal>

      )
}

export { ConnectWallet }
