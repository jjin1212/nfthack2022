import React from "react";
import { ethers } from "ethers";
import { Flex, Box, Button, Center, Divider, Image, Text, Alert, AlertIcon, Select } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useStakeContext } from "../../context/stake";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const MintToken = () => {
  const { currentAddress } = useWalletContext();
  const { loading, error, transaction, mintToken, contract, getBalance } = useStakeContext();
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    getBalance(contract, currentAddress).then(b => {
      if (b) {
        const _b = ethers.utils.formatUnits(b, 18);
        setBalance(_b);
      }
    });
  }, [currentAddress, contract, transaction]);


  return (
    <Flex width={"100%"} flexDir={"column"}>
      <Box py={[4, null, 6]}>
        <Image src="https://ethereum.org/static/0453c88b09ddaa2c7e7552840c650ad2/3f5ec/finance_transparent.png" width={"auto"} margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32}/>
        <Center>
          <Button disabled={!currentAddress || loading} isLoading={loading} colorScheme='pink' onClick={mintToken}>
            Mint 100 Token
          </Button>
        </Center>
        <Center mt={3}>
          <Text>You have {balance} token</Text>
        </Center>
        {error && (
          <Text color="red" fontSize="xs" mt="4">{error}</Text>
        )}
        {transaction && (
          <Alert status='success' variant='subtle'>
            <AlertIcon />
            Successfully minted!
          </Alert>
        )}
      </Box>
      <Divider />
    </Flex>
  );
};