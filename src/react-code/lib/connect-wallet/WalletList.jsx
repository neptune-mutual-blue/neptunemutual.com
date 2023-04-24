import './WalletList.scss'

import { useState } from 'react'

import { Option } from './Option'

export const WalletList = ({ wallets, onConnect, isConnecting }) => {
  const [connectingId, setConnectingId] = useState('')

  return (
    <div className='wallet list container'>
      {wallets.map((wallet) => (
        <Option
          key={wallet.id}
          onClick={() => {
            setConnectingId(wallet.id)
            onConnect(wallet.id)
          }}
          connectingId={(isConnecting && connectingId) ? connectingId : ''}
          {...wallet}
        />
      ))}
    </div>
  )
}
