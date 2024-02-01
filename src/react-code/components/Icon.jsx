import { AlignBottomIcon } from './icons/AlignBottomIcon'
import { CheckIcon } from './icons/CheckIcon'
import { ChevronDown } from './icons/ChevronDown'
import { ChevronRight } from './icons/ChevronRight'
import { ChevronRightDouble } from './icons/ChevronRightDouble'
import { ChevronUp } from './icons/ChevronUp'
import { CloseIcon } from './icons/CloseIcon'
import { CloudDownloadIcon } from './icons/CloudDownloadIcon'
import { CoinbaseDarkIcon } from './icons/CoinbaseDarkIcon'
import { CoinbaseIcon } from './icons/CoinbaseIcon'
import { CopyIcon } from './icons/CopyIcon'
import { FolderIcon } from './icons/FolderIcon'
import { GnosisDarkIcon } from './icons/GnosisDarkIcon'
import { GnosisIcon } from './icons/GnosisIcon'
import { LogoutIcon } from './icons/LogoutIcon'
import { MetamaskDarkIcon } from './icons/MetamaskDarkIcon'
import { MetamaskIcon } from './icons/MetamaskIcon'
import { OkxWalletDarkIcon } from './icons/OkxWalletDarkIcon'
import { OkxWalletIcon } from './icons/OkxWalletIcon'
import { RefreshIcon } from './icons/RefreshIcon'
import { TrashIcon } from './icons/TrashIcon'
import { WalletIcon } from './icons/WalletIcon'
import { PlusIcon } from './icons/PlusIcon'
import { SwitchHorizontalIcon } from './icons/SwitchHorizontal'

const icons = {
  'chevron-right': <ChevronRight />,
  'chevron-down': <ChevronDown />,
  'chevron-up': <ChevronUp />,
  'wallet-04': <WalletIcon />,
  check: <CheckIcon />,
  'copy-01': <CopyIcon />,
  'log-out-01': <LogoutIcon />,
  'x-close': <CloseIcon />,
  metamask: <MetamaskIcon />,
  'metamask-dark': <MetamaskDarkIcon />,
  'okx-wallet': <OkxWalletIcon />,
  'okx-wallet-dark': <OkxWalletDarkIcon />,
  'gnosis-wallet': <GnosisIcon />,
  'gnosis-wallet-dark': <GnosisDarkIcon />,
  'refresh-ccw-02': <RefreshIcon />,
  'align-bottom-01': <AlignBottomIcon />,
  'trash-01': <TrashIcon />,
  'download-cloud-01': <CloudDownloadIcon />,
  folder: <FolderIcon />,
  'chevron-right-double': <ChevronRightDouble />,
  coinbase: <CoinbaseIcon />,
  'coinbase-dark': <CoinbaseDarkIcon />,
  plus: <PlusIcon />,
  'switch-horizontal-01': <SwitchHorizontalIcon />
}

export const Icon = ({ variant, size }) => {
  return Object.prototype.hasOwnProperty.call(icons, variant)
    ? <i data-size={size}>
        {icons[variant]}
      </i>
    : <></>
}
