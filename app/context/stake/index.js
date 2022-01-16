/* eslint-disable no-empty-function */
import React from "react";
import { ethers } from "ethers";

import TokenContract from "../../../artifacts/contracts/Token.sol/TokenContract.json";

import { WalletContextProvider, useWalletContext } from "../wallet";
import { config } from "../../config";

export const StakeContext = React.createContext({
  loading: false,
  mintToken: () => {},
  stakeToken: () => {},
  unstakeToken: () => {},
  transaction: null,
  error: null,
  getBalance: () => {},
});


export const useStakeContext = () => React.useContext(StakeContext);

export const StakeContextProvider = ({ children }) => {
  const [tokenState, setTokenState] = React.useState({
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

    setTokenState(prev => ({
      ...prev,
      contract: _tokenContract,
    }));


    const listenToTokenMint = (from, to, tokenId, event) => {
      console.log(`${ from } sent ${ tokenId } to ${ to}`);
      // The event object contains the verbatim log data
      console.log(event);
      setTokenState(prev => ({
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

  const mintToken = async () => {
    if (!currentAddress) return;
    setTokenState(prev => ({
      ...prev,
      loading: true,
      error: null,
      transaction: null,
    }));

    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metamaskProvider.getSigner();
    const withSigner = tokenState.contract.connect(signer);

    // call the mint function of the smart contract
    withSigner.mint(ethers.BigNumber.from("100000000000000")).catch((e) => {
      // if user denies, or other errors
      setTokenState(prev => ({
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
      ...tokenState,
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