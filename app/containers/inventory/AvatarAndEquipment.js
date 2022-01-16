import React from "react";
import get from "lodash/get";
import { Flex, Box, Stack, Button, Center, Divider, Image, Text, Alert, AlertIcon, Select } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useMintContext } from "../../context/mint";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const AvatarAndEquipment = () => {
  const { currentAddress } = useWalletContext();
  const { getAvatarsByAddress, getEquipmentByAddress } = useMintContext();
  const [avatarState, setAvatarState] = React.useState({
    count: 0,
  });
  const [equipmentState, setEquipmentState] = React.useState({
    count: [],
  });

  React.useEffect(() => {
    const init = async () => {
      const avatarCount = await getAvatarsByAddress(currentAddress);
      setAvatarState(prev => ({ ...prev, count: avatarCount }));

      const equipmentCount = await getEquipmentByAddress(currentAddress);
      setEquipmentState(prev => ({ ...prev, count: equipmentCount }));
    };
    init();
  }, [currentAddress]);

  return (
    <Flex width={"100%"} flexDir={"column"}>
      <Box py={[4, null, 6]}>
        <Center mb={3}>
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xl" fontWeight={"semibold"}>You have {avatarState.count} Avatar NFT</Text>
        </Center>
        <Image src="character1.png" width={["90%", null, "auto"]} margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32}/>
      </Box>
      <Divider />
      <Box py={[4, null, 6]}>
        <Center mb={3}>
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xl" fontWeight={"semibold"}>You have {get(equipmentState, "count[0]")} Milk NFT, {get(equipmentState, "count[1]")} Corndog NFT, {get(equipmentState, "count[2]")} Hammer NFT</Text>
        </Center>
        <Stack direction='row' alignItems={"space-between"} spacing='32px'>
          <Image src="/weapons_milk.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="0"/>
          <Image src="/weapons_corndog.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="1"/>
          <Image src="/weapons_tomato.png" margin="auto" mb={[2, null, 5]} borderRadius="2xl" height={32} width={32} id="2"/>
        </Stack>
      </Box>
    </Flex>
  );
};