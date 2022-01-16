import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useWalletContext } from "../../context/wallet";


const NavigationLink = ({ active, disabled, children, onClick, id }) => {
  return (
    <Button disabled={disabled} variant={"link"} onClick={() => onClick(id)} color={active ? "blue.500" : "gray.500"}>
      {children}
    </Button>
  );
};
/**
 * The Top Navigation Bar Menu
 */
export const NavigationBar = () => {
  const { currentAddress } = useWalletContext();
  const router = useRouter();

  const { pathname } = router;

  const onClick = (id) => {
    router.push(`/${id}`);
  };
  return (
    <Flex justifyContent="space-around" padding={4}>
      <NavigationLink active={pathname === "/"} id="" onClick={onClick}>
        Connect
      </NavigationLink>
      <NavigationLink active={pathname === "/mint"} disabled={!currentAddress} id="mint" onClick={onClick}>
        Mint
      </NavigationLink>
      <NavigationLink active={pathname === "/stake"} disabled={!currentAddress} id="stake" onClick={onClick}>
        Stake
      </NavigationLink>
      <NavigationLink active={pathname === "/inventory"} disabled={!currentAddress} id="inventory" onClick={onClick}>
        Inventory
      </NavigationLink>
      <NavigationLink active={pathname === "/app"} disabled={!currentAddress} id="app" onClick={onClick}>
        Play Game
      </NavigationLink>
    </Flex>
  );
};