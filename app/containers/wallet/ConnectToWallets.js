import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import { ConnectMetamaskButton } from "../../components/wallet";
import { useWalletContext } from "../../context/wallet";

/**
 * All the available wallets to connect
 */
export const ConnectToWallets = () => {
  const { loading, onConnectMetamask, error, currentAddress } = useWalletContext();
  return (
    <Flex flexDir="column" alignItems="center">
      <ConnectMetamaskButton onClick={onConnectMetamask} loading={loading} disabled={!!currentAddress}/>
      {error && (
        <Text color="red" fontSize="xs" mt="4">{error}</Text>
      )}
      {currentAddress ? (
        <Text fontSize="xs" mt="4">Connected as <b>{currentAddress}</b></Text>
      ) : (
        <Text fontSize="xs" mt="4">Not connected</Text>
      )}
    </Flex>
  );
};