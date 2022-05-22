import { getAddress } from '@ethersproject/address';

import metamaskIcon from '../assets/metamask.png';
import walletconnectIcon from '../assets/walletConnectIcon.svg';
import coinbaseWalletIcon from '../assets/coinbaseWalletIcon.svg';
import fortmaticIcon from '../assets/fortmaticIcon.png';
import portisIcon from '../assets/portisIcon.png';
import injectedIcon from '../assets/arrow-right.svg';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
};

export function getEtherscanLink(chainId, data, type) {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function getWalletIcon(wallet) {
  switch (wallet) {
    case 'metamask':
      return metamaskIcon;
    case 'walletconnect':
      return walletconnectIcon;
    case 'walletlink':
      return coinbaseWalletIcon;
    case 'coinbaselink':
      return coinbaseWalletIcon;
    case 'fortmatic':
      return fortmaticIcon;
    case 'portis':
      return portisIcon;
    case 'injected':
    default:
      return injectedIcon;
  }
}
