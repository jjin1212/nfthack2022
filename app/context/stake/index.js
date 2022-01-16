/* eslint-disable no-empty-function */
import React from "react";
import { ethers } from "ethers";

import TokenContract from "../../../artifacts/contracts/Token.sol/TokenContract.json";
import GameContract from "../../../artifacts/contracts/Game.sol/Game.json";

import { WalletContextProvider, useWalletContext } from "../wallet";
import { config } from "../../config";

export const StakeContext = React.createContext({
  mintToken: () => {},
  stakeToken: () => {},
  unstakeToken: () => {},
  getBalance: () => {},
  getStakedBalance: () => {},
  tokenContractState: {},
  gameContractState: {},
});


export const useStakeContext = () => React.useContext(StakeContext);

export const StakeContextProvider = ({ children }) => {
  const [tokenContractState, setTokenContractState] = React.useState({
    contract: null,
    loading: false,
    error: null,
    transaction: null,
  });
  const [gameContractState, setGameContractState] = React.useState({
    contract: null,
    loading: false,
    error: null,
    transaction: null,
  });

  const { currentAddress } = useWalletContext();

  React.useEffect(() => {
    const _provider = new ethers.providers.WebSocketProvider(config.alchemy);
    const _tokenContract = new ethers.Contract(
      config.tokenContractAddress,
      TokenContract.abi,
      _provider,
    );
    const _gameContract = new ethers.Contract(
      config.gameContractAddress,
      GameContract.abi,
      _provider,
    );

    setTokenContractState(prev => ({
      ...prev,
      contract: _tokenContract,
    }));

    setGameContractState(prev => ({
      ...prev,
      contract: _gameContract,
    }));

    const listenToTokenMint = (from, to, tokenId, event) => {
      console.log(`${ from } sent ${ tokenId } to ${ to}`);
      // The event object contains the verbatim log data
      console.log(event);
      setTokenContractState(prev => ({
        ...prev,
        loading: false,
        error: null,
        transaction: event,
      }));
    };

    _tokenContract.on("Transfer", listenToTokenMint);

    return function cleanup() {
      _tokenContract.removeListener("Transfer", listenToTokenMint);
    };
  }, []);

  const getBalance = async (contract, address) => {
    if (!address || !contract) return;
    const tokenBalanceBN = await contract.balanceOf(address);
    return tokenBalanceBN;
  };

  const getStakedBalance = async (contract, address) => {
    if (!address || !contract) return;
    const stakedBalanceBN = await contract.stakedTokens(address);
    return stakedBalanceBN;
  };

  const mintToken = async () => {
    if (!currentAddress) return;
    setTokenContractState(prev => ({
      ...prev,
      loading: true,
      error: null,
      transaction: null,
    }));

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = tokenContractState.contract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mint(ethers.BigNumber.from("100000000000000")).catch((e) => {
      // if user denies, or other errors
      setTokenContractState(prev => ({
        ...prev,
        loading: false,
        error: e.message,
      }));
    });
  };

  const stakeToken = async () => {
    if (!currentAddress) return;
    setGameContractState(prev => ({
      ...prev,
      loading: true,
      error: null,
      transaction: null,
    }));

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = gameContractState.contract.connect(signer);

    await tokenContractState.contract.connect(signer).approve(config.gameContractAddress, ethers.BigNumber.from("100000000000000"));

    // call the mint function of the smart contract
    withSigner.stake(ethers.BigNumber.from("100000000000000")).catch((e) => {
      // if user denies, or other errors
      setGameContractState(prev => ({
        ...prev,
        loading: false,
        error: e.message,
      }));
    });
  };

  return (
    <StakeContext.Provider value={{
      mintToken,
      getBalance,
      stakeToken,
      getStakedBalance,
      tokenContractState,
      gameContractState,
    }}>
      {children}
    </StakeContext.Provider>
  );
};

export const StakeContextProviderWrapper = ({ children }) => {

  return (
    <WalletContextProvider>
      <StakeContextProvider>
        {children}
      </StakeContextProvider>
    </WalletContextProvider>
  );
};