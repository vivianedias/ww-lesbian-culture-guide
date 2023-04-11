import {
  Box,
  VStack,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MapIcon from "./MapIcon";

export default function Logo() {
  const logoTextColor = useColorModeValue(
    "textDarkMode",
    "textLightMode"
  );
  return (
    <Box fontFamily={"heading"}>
      <VStack
        spacing={0}
        color={logoTextColor}
        fontSize={{ base: "sm", md: "lg" }}
      >
        <HStack>
          <MapIcon boxSize={{ base: 8, md: 10 }} />
          <Text>lesbian culture guide</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
