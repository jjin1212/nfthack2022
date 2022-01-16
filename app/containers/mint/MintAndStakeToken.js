import React from "react";
import { ethers } from "ethers";
import { Flex, Box, Button, Center, Divider, Image, Text, Alert, AlertIcon } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useStakeContext } from "../../context/stake";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const MintAndStakeToken = () => {
  const { currentAddress } = useWalletContext();
  const { tokenContractState: token, gameContractState: game, mintToken, stakeToken, getBalance, getStakedBalance } = useStakeContext();
  const [balance, setBalance] = React.useState(0);
  const [stakedBalance, setStakedBalance] = React.useState(0);

  React.useEffect(() => {
    getBalance(token.contract, currentAddress).then(b => {
      if (b) {
        const _b = ethers.utils.formatUnits(b, 18);
        setBalance(_b);
      }
    });
    getStakedBalance(game.contract, currentAddress).then(b => {
      if (b) {
        const _b = ethers.utils.formatUnits(b, 18);
        setStakedBalance(_b);
      }
    });
  }, [currentAddress, token.contract, token.transaction]);


  return (
    <Flex width={"100%"} flexDir={"row"} alignItems={"center"}>
      <Box p={[4, null, 6]} px={[6, null, 8]}>
        <Image src="https://ethereum.org/static/0453c88b09ddaa2c7e7552840c650ad2/3f5ec/finance_transparent.png" width={"auto"} margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32}/>
        <Center>
          <Button disabled={!currentAddress || token.loading} isLoading={token.loading} colorScheme='pink' onClick={mintToken}>
            Mint 100 Token
          </Button>
        </Center>
        <Center mt={3}>
          <Text>You have {balance} token</Text>
        </Center>
        {token.error && (
          <Text color="red" fontSize="xs" mt="4">{token.error}</Text>
        )}
        {token.transaction && (
          <Alert status='success' variant='subtle'>
            <AlertIcon />
            Successfully minted!
          </Alert>
        )}
      </Box>
      <Divider orientation="vertical"/>
      <Box py={[4, null, 6]} px={[6, null, 8]}>
        <Center height={32}>
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xl" fontWeight={"semibold"}>Stake Token</Text>
        </Center>
        <Center mt={3}>
          <Button disabled={!currentAddress || game.loading} isLoading={game.loading} colorScheme='pink' onClick={stakeToken}>
            Stake 100 Token
          </Button>
        </Center>
        <Center mt={3}>
          <Text>You have {stakedBalance} staked token</Text>
        </Center>
      </Box>
    </Flex>
  );
};