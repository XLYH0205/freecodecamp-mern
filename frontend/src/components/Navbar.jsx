import { Button, Container, Flex, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useColorMode } from './ui/color-mode';

import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Container maxW={"1140px"} px={4}>
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={
        {
          base: "column",
          sm: "row"
        }
      }
    >
      <Text
        fontSize={{base:"22", sm:"28"}}
        fontWeight='bold'
        textTransform={"uppercase"}
        textAlign={'center'}
      >
        <Link to="/">Product Store 🛒</Link>
      </Text>

      <HStack gap={2} alignItems={"center"}>
        <Link to={"/create"}>
          <Button>
            <FaRegPlusSquare fontSize={20} />
          </Button>
        </Link>

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <FaRegMoon/> : <FaRegSun/>}
        </Button>
      </HStack>
    </Flex>

  </Container>

}

// const Navbar = () => {
//   return <Container maxW={"1140px"} px={4}>
//     <Flex
//       h={16}
//       alignItems={"center"}
//       justifyContent={"space-between"}
//       flexDirection={"row"}
//     >
//       <Text>HELLO</Text>
//       <Text>HELLO</Text>
//     </Flex>
//   </Container>

// }

export default Navbar