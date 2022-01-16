import React from "react";
import { Image, Flex, Box, Text, Button, Center } from "@chakra-ui/react";

import { WalletContextProvider } from "../context/wallet";
import { NavigationBar } from "../containers/navigation";

const App = () => {
  const [state, setState] = React.useState("idle");
  const videoRef = React.useRef(null);

  const onAttackClick = () => {
    setState("animation");
    if (videoRef && videoRef.current) {
      videoRef.current.play();
    }
  };


  return (
    <Flex height="100vh" flexDir={"column"} maxWidth={["100%", null, "640px"]} margin="auto">
      <NavigationBar/>
      <Flex justifyContent="center" m="auto" flexDir={"column"}>
        <Box position={"relative"} width="640px" height="408px">
          <Image src="/background.png" position={"absolute"} width="100%" height="auto"/>
          <Image src="/character.png" position={"absolute"} width="100%" height="auto"/>
          <Image src="/monster.png" position={"absolute"} width="100%" height="auto"/>
          <Image src="/info-cards.png" position={"absolute"} width="100%" height="auto"/>
          <video type="video/mp4" src="/animation-test.mp4" ref={videoRef} style={{ zIndex: 99, position: "absolute", display: state === "idle" ? "none" : "inherit" }}/>
          {/* <Image src="/attack-window.png" position={"absolute"} width="100%" height="auto"/> */}
        </Box>
        <Box p={3} width="100%" backgroundColor={"gray.500"} border="3px solid" borderRadius={"2xl"}>
          <Center p={3}><Text color="black" fontWeight={"bold"}>Your turn</Text></Center>
          <Flex direction="column">
            <Button backgroundColor={"orange.400"} mb={3} onClick={onAttackClick}>Attack</Button>
            <Button backgroundColor={"orange.400"}>Weapon</Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
export default function AppWrapper() {
  return (
    <WalletContextProvider>
      <App/>
    </WalletContextProvider>
  );
}
