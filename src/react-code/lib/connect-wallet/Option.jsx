import './Option.scss'

import { Icon } from '../../components/Icon'
import { Loader } from './Loader'

export const Option = (props) => {
  const { id, name, onClick, iconVariant, iconVariantDark, connectingId } = props
  const WalletIconLight = <Icon variant={iconVariant} size={20} />
  const WalletIconDark = <Icon variant={iconVariantDark} size={20} />

  if (name.toLowerCase() === 'metamask wallet') {
    if (!(window.web3 || window.ethereum)) {
      return (
        <a
          className='connect option'
          href='https://metamask.io/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install Metamask</p>
        </a>
      )
    }
  }

  if (name.toLowerCase() === 'okx wallet') {
    if (!(window.okxwallet)) {
      return (
        <a className='connect option'
          href='https://chrome.google.com/webstore/detail/okex-wallet/mcohilncbfahbmgdjkbpemcciiolgcge'
          target='_blank'
          rel='noreferrer noopener nofollow'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install OKX Wallet</p>
        </a>
      )
    }
  }

  if (name.toLowerCase() === 'binance wallet') {
    if (!window.BinanceChain) {
      return (
        <a
        className='connect option'
          href='https://docs.binance.org/smart-chain/wallet/binance.html'
          target='_blank'
          rel='noreferrer noopener'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install Binance Wallet</p>
        </a>
      )
    }
  }

  return (
    <button
      className='connect option'
      key={id}
      onClick={onClick}
      type='button'
      disabled={connectingId}
    >
      <i className='icon light'>
        {WalletIconLight}
      </i>
      <i className='icon dark'>
        {WalletIconDark}
      </i>
      <p>{name}</p>

      {connectingId === id && <Loader />}
    </button>
  )
}

