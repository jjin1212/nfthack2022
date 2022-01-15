import React from "react";
import { Text, Flex } from "@chakra-ui/react";

import { WalletContextProvider } from "../context/wallet";
import { ConnectToWallets } from "../containers/wallet";
import { NavigationBar } from "../containers/navigation";

const Home = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        <Flex justifyContent="center" alignItems={"center"} pb="4">
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xl" fontWeight={"semibold"}>Select wallet</Text>
        </Flex>
        <ConnectToWallets/>
      </Flex>
    </Flex>
  );
};
export default function HomeWrapper() {
  return (
    <WalletContextProvider>
      <Home/>
    </WalletContextProvider>
  );
}
