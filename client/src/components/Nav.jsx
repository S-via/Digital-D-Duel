import { Flex, Box, HStack, Button, Spacer } from '@chakra-ui/react';
import{ Link} from 'react-router-dom';

function Nav (){
    return (

<Box
as="header"
position="fixed"
top={0}
left={0}
right={0}
zIndex={1000}
boxShadow="md"

>
<Flex
p={3}

>
  <HStack spacing={4}>
    <Link to="/loginsign"><Button>Signup | Login</Button></Link>
  </HStack>
  <Spacer />
  <HStack spacing={6}>
    <Link to="/joinevent"><Button>Join Event</Button></Link>
  </HStack>
</Flex>
</Box>

)}


export default Nav;