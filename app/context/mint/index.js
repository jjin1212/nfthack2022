/* eslint-disable no-empty-function */
import React from "react";
import { ethers } from "ethers";

import AvatarContract from "../../../artifacts/contracts/AvatarOwnership.sol/AvatarOwnership.json";
import EquipmentContract from "../../../artifacts/contracts/Equipment.sol/EquipmentContract.json";

import { WalletContextProvider, useWalletContext } from "../wallet";
import { config } from "../../config";

export const MintContext = React.createContext({
  loading: false,
  mintAvatar: () => {},
  mintEquipment: () => {},
  getAvatarsByAddress: () => {},
  transaction: null,
  error: null,
});

export const useMintContext = () => React.useContext(MintContext);

export const MintContextProvider = ({ children }) => {
  const [avatarState, setAvatarState] = React.useState({
    contract: null,
    loading: false,
    error: null,
    transaction: null,
  });

  const [equipmentState, setEquipmentState] = React.useState({
    contract: null,
    loading: false,
    error: null,
    transaction: null,
  });

  const { currentAddress } = useWalletContext();

  React.useEffect(() => {
    const _provider = new ethers.providers.WebSocketProvider(config.alchemy);
    const _avatarContract = new ethers.Contract(
      config.contractAddress,
      AvatarContract.abi,
      _provider,
    );

    const _equipmentContract = new ethers.Contract(
      config.equipmentContractAddress,
      EquipmentContract.abi,
      _provider,
    );

    setAvatarState(prev => ({
      ...prev,
      contract: _avatarContract,
    }));
    setEquipmentState(prev => ({
      ...prev,
      contract: _equipmentContract,
    }));

    const listenToAvatarMint = (from, to, tokenId, event) => {
      console.log(`${ from } sent ${ tokenId } to ${ to}`);
      // The event object contains the verbatim log data
      console.log(event);
      setAvatarState(prev => ({
        ...prev,
        loading: false,
        error: null,
        transaction: event,
      }));
    };


    const listenToEquipmentMint = (operator, from, to, tokenId, amount, event) => {
      console.log(`${ from } sent ${ tokenId } to ${ to}`);
      // The event object contains the verbatim log data
      console.log(event);
      setEquipmentState(prev => ({
        ...prev,
        loading: false,
        error: null,
        transaction: event,
      }));
    };

    _avatarContract.on("Transfer", listenToAvatarMint);
    _equipmentContract.on("TransferSingle", listenToEquipmentMint);

    return function cleanup() {
      _avatarContract.removeListener("Transfer", listenToAvatarMint);
      _equipmentContract.removeListener("TransferSingle", listenToEquipmentMint);
    };
  }, []);

  const mintAvatar = async () => {
    if (!currentAddress) return;
    setAvatarState(prev => ({
      ...prev,
      loading: true,
      error: null,
      transaction: null,
    }));

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = avatarState.contract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mint().catch((e) => {
      // if user denies, or other errors
      setAvatarState(prev => ({
        ...prev,
        loading: false,
        error: e.message,
      }));
    });
  };

  const getAvatarsByAddress = async (address) => {
    if (!address) return;
    const total = await avatarState.contract.balanceOf(address);
    return ethers.BigNumber.from(total).toString();
  };

  const getEquipmentByAddress = async (address) => {
    if (!address) return;
    const totalOne = equipmentState.contract.balanceOf(address, 0);
    const totalTwo = equipmentState.contract.balanceOf(address, 1);
    const totalThree = equipmentState.contract.balanceOf(address, 2);
    const total = await Promise.all([totalOne, totalTwo, totalThree]);
    return total.map(t => ethers.BigNumber.from(t).toString());
  };

  const mintEquipment = async (id) => {
    if (!currentAddress) return;
    setEquipmentState(prev => ({
      ...prev,
      loading: true,
      error: null,
      transaction: null,
    }));

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = equipmentState.contract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mintWithAddress(currentAddress, id, 1).catch((e) => {
      // if user denies, or other errors
      setEquipmentState(prev => ({
        ...prev,
        loading: false,
        error: e.message,
      }));
    });
  };

  return (
    <MintContext.Provider value={{
      mintAvatar,
      mintEquipment,
      avatarState,
      equipmentState,
      getAvatarsByAddress,
      getEquipmentByAddress,
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