import { Box, VStack, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import MapIcon from './MapIcon'

export default function Logo() {
  const logoTextColor = useColorModeValue("gray.600", "gray.50")
  return (
    <Box fontFamily={'"Comfortaa", cursive'}>
      <VStack align={"flex-end"} spacing={0} color={logoTextColor} fontSize={"lg"}>
        <HStack>
          <MapIcon boxSize={6} />
          <Text>lesbian</Text>
        </HStack>
        <Text>culture guide</Text>
      </VStack>
    </Box>
  )
}
