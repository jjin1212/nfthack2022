import React from "react";
import { Flex } from "@chakra-ui/react";

import { MintContextProviderWrapper } from "../context/mint";
import { NavigationBar } from "../containers/navigation";
import { AvatarAndEquipment } from "../containers/inventory";

const Inventory = () => {
  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        <AvatarAndEquipment/>
      </Flex>
    </Flex>
  );
};
export default function MintWrapper() {
  return (
    <MintContextProviderWrapper>
      <Inventory/>
    </MintContextProviderWrapper>
  );
}
