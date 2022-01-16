import React from "react";
import { Flex } from "@chakra-ui/react";

import { StakeContextProviderWrapper } from "../context/stake";
import { NavigationBar } from "../containers/navigation";
import { MintAndStakeToken } from "../containers/mint";

const Stake = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        <MintAndStakeToken/>
      </Flex>
    </Flex>
  );
};
export default function StakeWrapper() {
  return (
    <StakeContextProviderWrapper>
      <Stake/>
    </StakeContextProviderWrapper>
  );
}
