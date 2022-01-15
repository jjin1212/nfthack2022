import React from "react";
import { Button, Image, Text, Alert, AlertIcon } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useMintContext } from "../../context/mint";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const MintNFT = () => {
  const { currentAddress } = useWalletContext();
  const { loading, mintNft, transaction, error } = useMintContext();
  return (
    <>
      <Image src="https://media4.giphy.com/media/ICOgUNjpvO0PC/giphy.gif" width={["90%", null, "auto"]} margin="auto" mb={[2, null, 5]} borderRadius="2xl"/>
      <Button disabled={!currentAddress || loading} isLoading={loading} colorScheme='pink' onClick={mintNft}>
        Mint Purr Purr NFT
      </Button>
      {error && (
        <Text color="red" fontSize="xs" mt="4">{error}</Text>
      )}
      {transaction && (
        <Alert status='success' variant='subtle'>
          <AlertIcon />
          Successfully minted!
        </Alert>
      )}
    </>
  );
};