import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
const { default: Resolution } = require('@unstoppabledomains/resolution');
const resolution = new Resolution();

const COVALENT_URL = 'https://api.covalenthq.com/v1';

const value = (quote) => {
  return parseFloat(quote.toFixed(2));
};

const holdings = (balance, decimal) => {
  const quantity = balance * Math.pow(10, -decimal);
  return parseFloat(quantity.toFixed(4));
};

const resolve = async (domain, currency) => {
  try {
    const address = await resolution.addr(domain, currency);
    return address;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Home = () => {
  const router = useHistory();
  const [data, setData] = useState(null);
  const { account } = useWeb3React();
  const [address, setAddress] = useState(account);

  useEffect(() => {
    fetchDetails(account);
  }, [account]);

  if (!account) {
    router.push('/');
    return null;
  }

  const fetchDetails = async (address) => {
    let newAddress = address.trim();
    if (!web3.utils.isAddress(address)) {
      const temp = await resolve(address, 'ETH');
      if (!temp) {
        alert('Invalid address');
        return;
      }
      newAddress = temp;
    }

    const res = await fetch(
      `${COVALENT_URL}/1/address/${newAddress}/balances_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}`
    );
    if (res.status !== 200) {
      console.log('error');
    }
    const data = await res.json();
    setData(data.data.items);
  };

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <p className="text-center" style={{ fontWeight: '500' }}>
          Wallet Address: {address}
        </p>
        <button
          className="btn btn-danger m-b-xs"
          onClick={() => fetchDetails(address)}
          style={{ width: 'fit-content' }}
        >
          Fetch Details
        </button>
      </div>
      <div className="row mx-auto mt-5" style={{ width: '30%' }}>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Track wallet on Ethereum"
          className="p-2"
        />
      </div>
      {data && (
        <div className="row mx-auto mt-5" style={{ width: '50%' }}>
          <table>
            <tr>
              <th>Token</th>
              <th>Holdings</th>
              <th>Price</th>
              <th>Current Value</th>
            </tr>
            {data?.map((item) => (
              <tr>
                <td>{item.contract_name}</td>
                <td>{holdings(item.balance, item.contract_decimals)}</td>
                <td>{item.quote_rate?.toFixed(4)}</td>
                <td>{value(item.quote)}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
