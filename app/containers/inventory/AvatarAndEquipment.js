import React from "react";
import { Flex, Box, Stack, Button, Center, Divider, Image, Text, Alert, AlertIcon, Select } from "@chakra-ui/react";

import { useWalletContext } from "../../context/wallet";
import { useMintContext } from "../../context/mint";

/**
 * Mint button to get current wallet to approve the transaction
 */
export const AvatarAndEquipment = () => {
  const { currentAddress } = useWalletContext();
  const { getAvatarsByAddress } = useMintContext();
  const [avatarState, setAvatarState] = React.useState({
    count: 0,
  });

  React.useEffect(() => {
    const init = async () => {
      const avatarCount = await getAvatarsByAddress(currentAddress);
      setAvatarState(prev => ({ ...prev, count: avatarCount }));
    };
    init();
  }, [currentAddress]);

  return (
    <Flex width={"100%"} flexDir={"column"}>
      <Box py={[4, null, 6]}>
        <Center>
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xl" fontWeight={"semibold"}>You have {avatarState.count} Avatar NFT</Text>
        </Center>
      </Box>
      <Divider />
    </Flex>
  );
};