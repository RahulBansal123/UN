import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../../Utils/Modal';
import styled from 'styled-components';

import WalletModal from './WalletModal';
import { useWeb3React } from '@web3-react/core';

const Auth = () => {
  const [isOpen, toggle] = useState(false);
  const router = useHistory();
  const { account } = useWeb3React();

  if (account) {
    router.push('/home');
  }

  const handleClick = () => {
    toggle(true);
  };

  const ModalContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 1.6rem 0 1.6rem;
  `;

  const config = {
    supportedChainIds: [1], // 1 - ethereum mainnet
    connectors: {
      walletconnect: {
        qrcode: true,
      },
      walletlink: {
        qrcode: true,
      },
    },
  };
  return (
    <div className="relative">
      <div className="container">
        <button
          className="btn btn-danger m-b-xs p-3"
          onClick={handleClick}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          Connect to a wallet
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        width={35}
        height={80}
        title="Connect to a wallet"
      >
        <ModalContent className="flex-column">
          <WalletModal
            isOpen={isOpen}
            onClose={() => toggle(false)}
            config={config}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Auth;
