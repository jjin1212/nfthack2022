/* eslint-disable no-empty-function */
// Metamask doc https://docs.metamask.io/guide/ethereum-provider.html

import React, { useState } from "react";

export const WalletContext = React.createContext({
  loading: false,
  error: null,
  currentWallet: null,
  currentAddress: null,
  currentNetwork: null,
  onConnectMetamask: () => {},
  toggleLoading: () => {},
  setError: () => {},
});

export const useWalletContext = () => React.useContext(WalletContext);

export const WalletContextProvider = ({ children }) => {
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);

  React.useEffect(() => {
    const { ethereum } = window;

    const handleChainChanged = (_chainId) => {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    };

    if (_isMetaMaskInstalled() && ethereum.isConnected()) {
      const handleAccountChanged = (accounts) => {
        setCurrentAddress(accounts[0]);
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountChanged);
    }
    return function cleanup() {
      if (_isMetaMaskInstalled()) {
        ethereum.removeListener("accountsChanged", handleChainChanged);
      }
    };
  }, []);

  const _isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return !!(ethereum && ethereum.isMetaMask);
  };

  const onConnectMetamask = async () => {
    if (!_isMetaMaskInstalled()) {
      setError("Metamask not installed.");
    }

    try {
      toggleLoading(true);
      // open metamask ui
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // set current account
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      setCurrentWallet("metamask");
      setCurrentAddress(accounts[0]);
      toggleLoading(false);
      setError(null);
    } catch (e) {
      setError(e.message);
      toggleLoading(false);
    }
  };

  return (
    <WalletContext.Provider value={{
      loading,
      toggleLoading,
      error,
      setError,
      currentWallet,
      onConnectMetamask,
      currentAddress,
    }}>
      {children}
    </WalletContext.Provider>
  );
};