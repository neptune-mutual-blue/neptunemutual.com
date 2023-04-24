import './ConnectWallet.scss'

import {
  useEffect,
  useState
} from 'react'

import { Popover } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'

import { Button } from '../components/Button/Button'
import { Icon } from '../components/Icon'
import { handleCopy } from '../helpers'
import useAuth from '../lib/connect-wallet/hooks/useAuth'
import { Popup } from '../lib/connect-wallet/Popup'
import { chains } from './helpers/wallet/chains'
import { truncateAddress } from './helpers/wallet/methods'

export const ConnectWallet = () => {
  const [copied, setCopied] = useState()
  const [popupOpen, setPopupOpen] = useState(false)
  const { logout } = useAuth()
  const { account, chainId } = useWeb3React()

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  const handleWalletButtonClick = () => {
    if (!account) {
      return setPopupOpen(true)
    }
    logout()
  }

  return (
    <>
      {
        !account
          ? (
            <Button onClick={handleWalletButtonClick} iconVariant="wallet-04" iconLeading>
              Connect Wallet
            </Button>
            )
          : (
            <Popover className="connect wallet popover">
              {({ open }) => (
                <>
                <Popover.Button>

                  <Button iconVariant="wallet-04" iconLeading>
                    <div className="connected btn contents">
                      {truncateAddress(account)}
                      <Icon variant={open ? 'chevron-up' : 'chevron-down'} size={16} />
                    </div>
                  </Button>
                </Popover.Button>

                  <Popover.Panel className="panel">
                    <div className='details container'>
                      <div className='details'>
                        <div>
                          <div className='title text'>Wallet</div>
                          <div className='info text'>
                            <span>{truncateAddress(account)}</span>
                            <button className='copy btn'
                              onClick={() => {
                                handleCopy(account, () => setCopied(true))
                              }}
                              aria-label='Copy Address button'
                            >
                              <Icon variant={copied ? 'check' : 'copy-01'} size={'md'} />
                            </button>
                          </div>
                        </div>

                        {
                          chains[chainId] && (
                            <div>
                              <div className='title text2'>Network</div>
                              <div className='info text'>
                                <span>{chains[chainId].name}</span>
                              </div>
                            </div>
                          )
                        }
                      </div>

                      <button className='disconnect btn' onClick={handleWalletButtonClick}>
                        <Icon variant='log-out-01' size={'md'} />
                        <span>Disconnect Wallet</span>
                      </button>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
            )
      }

      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}
