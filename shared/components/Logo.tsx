import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import MapIcon from "./MapIcon";

export default function Logo() {
  const logoTextColor = useColorModeValue(
    "textDarkMode",
    "textLightMode"
  );
  return (
    <HStack
      color={logoTextColor}
      fontSize={{ base: "sm", md: "lg" }}
      fontFamily={"heading"}
      minW={"200px"}
    >
      <MapIcon boxSize={{ base: 8, md: 10 }} />
      <Text>lesbian culture guide</Text>
    </HStack>
  );
}
