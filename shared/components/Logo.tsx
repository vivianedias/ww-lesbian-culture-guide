import {
  Box,
  VStack,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MapIcon from "./MapIcon";

export default function Logo() {
  const logoTextColor = useColorModeValue("gray.600", "gray.50");
  return (
    <Box fontFamily={'"Comfortaa", cursive'}>
      <VStack spacing={0} color={logoTextColor} fontSize={"lg"}>
        <HStack align={"flex-end"}>
          <MapIcon boxSize={10} />
          <Text>lesbian culture guide</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
