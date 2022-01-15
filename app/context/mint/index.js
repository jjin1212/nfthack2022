/* eslint-disable no-empty-function */
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import myContract from "../../../artifacts/contracts/AvatarOwnership.sol/AvatarOwnership.json";
const contractInterface = myContract.abi;

import { WalletContextProvider, useWalletContext } from "../wallet";
import { config } from "../../config";

export const MintContext = React.createContext({
  loading: false,
  mintNft: () => {},
  transaction: null,
  error: null,
});

export const useMintContext = () => React.useContext(MintContext);

export const MintContextProvider = ({ children }) => {
  const [loading, toggleLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const { currentAddress } = useWalletContext();

  useEffect(() => {
    const _provider = new ethers.providers.WebSocketProvider(config.alchemy);
    const _contract = new ethers.Contract(
      config.contractAddress,
      contractInterface,
      _provider,
    );

    setContract(_contract);

    const listenToMint = (from, to, tokenId, event) => {
      console.log(`${ from } sent ${ tokenId } to ${ to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
      console.log(event);
      toggleLoading(false);
      setError(null);
      setTransaction(event);
    };

    _contract.on("Transfer", listenToMint);

    return function cleanup() {
      _contract.removeListener("Transfer", listenToMint);
    };
  }, []);

  const _reset = () => {
    setTransaction(null);
    setError(null);
  };

  const mintNft = async () => {
    if (!currentAddress) return;

    _reset();
    toggleLoading(true);

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = contract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mint(currentAddress).catch((e) => {
      // if user denies, or other errors
      setError(e.message);
      toggleLoading(false);
    });
  };

  return (
    <MintContext.Provider value={{
      loading,
      mintNft,
      transaction,
      error,
    }}>
      {children}
    </MintContext.Provider>
  );
};

export const MintContextProviderWrapper = ({ children }) => {

  return (
    <WalletContextProvider>
      <MintContextProvider>
        {children}
      </MintContextProvider>
    </WalletContextProvider>
  );
};