import React from "react";
import { ethers } from "ethers";

import { Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useWalletContext } from "../../context/wallet";
import { useStakeContext } from "../../context/stake";


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
  const { gameContractState: game, getStakedBalance } = useStakeContext();
  const [stakedBalance, setStakedBalance] = React.useState(0);

  React.useEffect(() => {
    const _getStakedBalance = async () => {
      const b = await getStakedBalance(game.contract, currentAddress);

      if (b) {
        const _b = ethers.utils.formatUnits(b, 18);
        setStakedBalance(_b);
      }
    };

    _getStakedBalance();
  }, [currentAddress]);


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
      <NavigationLink active={pathname === "/app"} id="app" onClick={onClick} disabled={!currentAddress || stakedBalance == "0.0"}>
        Play Game
      </NavigationLink>
    </Flex>
  );
};