import React from "react";
import { Text, Flex } from "@chakra-ui/react";

import { WalletContextProvider } from "../context/wallet";
import { NavigationBar } from "../containers/navigation";

const App = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        App
      </Flex>
    </Flex>
  );
};
export default function AppWrapper() {
  return (
    <WalletContextProvider>
      <App/>
    </WalletContextProvider>
  );
}
