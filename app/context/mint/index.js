/* eslint-disable no-empty-function */
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import AvatarContract from "../../../artifacts/contracts/AvatarOwnership.sol/AvatarOwnership.json";
import EquipmentContract from "../../../artifacts/contracts/Equipment.sol/EquipmentContract.json";

import { WalletContextProvider, useWalletContext } from "../wallet";
import { config } from "../../config";

export const MintContext = React.createContext({
  loading: false,
  mintAvatar: () => {},
  mintEquipment: () => {},
  transaction: null,
  error: null,
});

export const useMintContext = () => React.useContext(MintContext);

export const MintContextProvider = ({ children }) => {
  const [loading, toggleLoading] = useState(false);
  const [avatarContract, setAvatarContract] = useState(null);
  const [equipmentContract, setEquipmentContract] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  const { currentAddress } = useWalletContext();

  useEffect(() => {
    const _provider = new ethers.providers.WebSocketProvider(config.alchemy);
    const _avatarContract = new ethers.Contract(
      config.contractAddress,
      AvatarContract.abi,
      _provider,
    );
    console.log(config);
    const _equipmentContract = new ethers.Contract(
      config.equipmentContractAddress,
      EquipmentContract.abi,
      _provider,
    );

    setAvatarContract(_avatarContract);
    setEquipmentContract(_equipmentContract);

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

    _avatarContract.on("Transfer", listenToMint);
    _equipmentContract.on("TransferSingle", listenToMint);

    return function cleanup() {
      _avatarContract.removeListener("Transfer", listenToMint);
      _equipmentContract.removeListener("TransferSingle", listenToMint);
    };
  }, []);

  const _reset = () => {
    setTransaction(null);
    setError(null);
  };

  const mintAvatar = async () => {
    if (!currentAddress) return;

    _reset();
    toggleLoading(true);

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = avatarContract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mint().catch((e) => {
      // if user denies, or other errors
      setError(e.message);
      toggleLoading(false);
    });
  };

  const mintEquipment = async (id) => {
    if (!currentAddress) return;

    _reset();
    toggleLoading(true);

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = equipmentContract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mintWithAddress(currentAddress, id, 1).catch((e) => {
      // if user denies, or other errors
      setError(e.message);
      toggleLoading(false);
    });
  };

  return (
    <MintContext.Provider value={{
      loading,
      mintAvatar,
      mintEquipment,
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