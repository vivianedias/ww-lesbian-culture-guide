import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import {
  Box,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IS_IN_MAINTENANCE } from "shared/utils";

export default function Footer() {
  const { t } = useTranslation("footer");
  const boxBgColor = useColorModeValue("gray.50", "gray.900");
  const boxTextColor = useColorModeValue("gray.700", "gray.200");
  const currentYear = new Date().getFullYear();

  if (IS_IN_MAINTENANCE) {
    return null;
  }

  return (
    <Box
      bg={boxBgColor}
      color={boxTextColor}
      justifyItems={"start"}
      fontFamily={"heading"}
    >
      <Flex
        py={{ base: 4 }}
        px={{ base: 4 }}
        justify={{ base: "center", md: "flex-end" }}
        align={{ base: "center", md: "center" }}
        fontSize={"sm"}
      >
        <Text>{t("developedBy")}</Text>
        <Link
          p={2}
          href={"https://www.medusalab.tech/en"}
          isExternal
          fontWeight={500}
          color={"medusalab"}
          _hover={{
            textDecoration: "none",
          }}
        >
          {"<medusa.lab />"}
        </Link>
      </Flex>
    </Box>
  );
}
