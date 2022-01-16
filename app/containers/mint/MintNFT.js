import React from "react";
import { Flex, Box, Stack, Button, Center, Divider, Image, Text, Alert, AlertIcon, Select } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useMintContext } from "../../context/mint";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const MintNFT = () => {
  const { currentAddress } = useWalletContext();
  const { avatarState: avatar, equipmentState: equip, mintAvatar, mintEquipment } = useMintContext();

  const [selected, setSelected] = React.useState(null);

  return (
    <Flex width={"100%"} flexDir={"column"}>
      <Box py={[4, null, 6]}>
        <Image src="character1.png" width={["90%", null, "auto"]} margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32}/>
        <Center>
          <Button disabled={!currentAddress || avatar.loading} isLoading={avatar.loading} colorScheme='pink' onClick={mintAvatar}>
            Mint Avatar
          </Button>
          {avatar.error && (
            <Text color="red" fontSize="xs" mt="4">{avatar.error}</Text>
          )}
          {avatar.transaction && (
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
          <Image src="/weapons_milk.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="0"/>
          <Image src="/weapons_corndog.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="1"/>
          <Image src="/weapons_tomato.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="2"/>
        </Stack>
        <Center>
          <Select placeholder='Select Equipment' onChange={(e) => setSelected(e.target.value)}>
            <option value='0' id="0">Milk</option>
            <option value='1' id="1">Corndog</option>
            <option value='2' id="2">Tomato</option>
          </Select>
          <Button disabled={!currentAddress || equip.loading} isLoading={equip.loading} colorScheme='pink' onClick={() => mintEquipment(parseInt(selected))} margin="auto">
            Mint
          </Button>
        </Center>
        {equip.error && (
          <Text color="red" fontSize="xs" mt="4">{equip.error}</Text>
        )}
        {equip.transaction && (
          <Alert status='success' variant='subtle'>
            <AlertIcon />
            Successfully minted!
          </Alert>
        )}
      </Box>
    </Flex>
  );
};