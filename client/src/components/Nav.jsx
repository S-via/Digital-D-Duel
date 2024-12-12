import { Flex, Box, HStack, Button, Spacer } from '@chakra-ui/react';
import{ Link} from 'react-router-dom';
import Auth from '../utils/auth'

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
  {Auth.loggedIn() ? (
    <Button onClick={Auth.logout}>Logout</Button>
  ): (
    <Link to="/login"><Button>Login</Button></Link>
  )}
  </HStack>
  <Spacer />
  <HStack spacing={6}>
    <Link to="/joinEvents"><Button>Join Event</Button></Link>
  </HStack>
</Flex>
</Box>

)}


export default Nav;