import { ConnectorNames } from '../../enum.js';
import { getProvider } from './provider.js';
import MetamaskLogo from '../../logos/wallets/MetamaskLogo.jsx';
const isInstalled = () => !!getProvider();
const getInstallationURL = () => `https://metamask.app.link/dapp/${typeof window === 'undefined' ? 'ethereum.neptunemutual.net' : window.location.host}`;
const Icon = MetamaskLogo;
const name = 'MetaMask';
const connectorName = ConnectorNames.MetaMask;
export const config = {
    name,
    connectorName,
    Icon,
    isInstalled,
    getInstallationURL
};
