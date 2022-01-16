import React from "react";
import { Flex, Box, Stack, Button, Center, Divider, Image, Text, Alert, AlertIcon, Select } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useMintContext } from "../../context/mint";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const MintNFT = () => {
  const { currentAddress } = useWalletContext();
  const { loading, mintAvatar, mintEquipment, transaction, error } = useMintContext();

  const [selected, setSelected] = React.useState(1);

  return (
    <Flex width={"100%"} flexDir={"column"}>
      <Box py={[4, null, 6]}>
        <Image src="https://i.pinimg.com/736x/78/75/13/787513e1c0e5abe576350998ca659414.jpg" width={["90%", null, "auto"]} margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32}/>
        <Center>
          <Button disabled={!currentAddress || loading} isLoading={loading} colorScheme='pink' onClick={mintAvatar}>
            Mint Avatar
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
        </Center>
      </Box>
      <Divider />
      <Box py={[4, null, 6]}>
        <Stack direction='row'>
          <Image src="/sword.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="1"/>
          <Image src="/bow.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="2"/>
          <Image src="/hammer.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="3"/>
        </Stack>
        <Center>
          <Select placeholder='Select Equipment' onChange={(e) => setSelected(e.target.value)}>
            <option value='1' id="1">Sword</option>
            <option value='2' id="2">Bow</option>
            <option value='3' id="3">Hammer</option>
          </Select>
          <Button disabled={!currentAddress || loading} isLoading={loading} colorScheme='pink' onClick={() => mintEquipment(parseInt(selected))} margin="auto">
            Mint
          </Button>
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
    </Flex>
  );
};