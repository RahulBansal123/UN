import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import getLibrary from './Utils/getLibrary';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'development') console.log = () => {};
