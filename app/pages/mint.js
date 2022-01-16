import React from "react";
import { Flex } from "@chakra-ui/react";

import { MintContextProviderWrapper } from "../context/mint";
import { StakeContextProvider } from "../context/stake";
import { NavigationBar } from "../containers/navigation";
import { MintNFT } from "../containers/mint";

const Mint = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        <MintNFT/>
      </Flex>
    </Flex>
  );
};
export default function MintWrapper() {
  return (
    <MintContextProviderWrapper>
      <StakeContextProvider>
        <Mint/>
      </StakeContextProvider>
    </MintContextProviderWrapper>
  );
}
