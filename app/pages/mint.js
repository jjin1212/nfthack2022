import React from "react";
import { Text, Flex } from "@chakra-ui/react";

import { WalletContextProvider } from "../context/wallet";
import { NavigationBar } from "../containers/navigation";

const Mint = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        Mint
      </Flex>
    </Flex>
  );
};
export default function MintWrapper() {
  return (
    <WalletContextProvider>
      <Mint/>
    </WalletContextProvider>
  );
}
