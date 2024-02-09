import './ConnectedDropdown.scss'

import {
  useRef,
  useState
} from 'react'

import { useWeb3React } from '@web3-react/core'

import { chains } from '../../Encoder/helpers/wallet/chains'
import { useOnClickOutside } from '../../Encoder/hooks/useOnOutsideClick'
import {
  abbreviateAccount,
  handleCopy
} from '../../helpers'
import useAuth from '../../lib/connect-wallet/hooks/useAuth'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton/IconButton'

const ConnectedDropdown = () => {
  const [open, setOpen] = useState(false)

  const { account, chainId } = useWeb3React()

  const { logout } = useAuth()

  const ref = useRef()

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className='wallet connected dropdown' ref={ref}>
      <button
        className='trigger' onClick={() => {
          setOpen(!open)
        }}
      >
        <div className='account'>{abbreviateAccount(account)}</div>
        <Icon variant='chevron-down' className={(open ? 'inverted' : '')} size='lg' />
      </button>

      <div className={'dropdown content' + (open ? ' visible' : '')}>

      <div className='level and account'>
          <div className='level'>
            <div>
              {abbreviateAccount(account)}
            </div>
            <div>
              <IconButton
                variant='copy-01' size='sm' showFeedback noWrapper onClick={() => {
                  handleCopy(account)
                }}
              />
            </div>
          </div>
        </div>

        {chains[chainId] && (
          <div className='info'>
            <div className='key'>Network</div>
            <div>{chains[chainId]?.name || 'Unknown Network'}</div>
          </div>
        )}

        <button
          className='logout' onClick={() => {
            logout()
            setOpen(false)
          }}
        >
          <div className='text'>
            <Icon variant='log-out-01' size='md' />
            <span className='text'>
              Logout
            </span>
          </div>
        </button>
      </div>
    </div>

  )
}

export { ConnectedDropdown }
