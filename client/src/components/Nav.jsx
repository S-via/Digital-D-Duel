import React, { useState } from 'react';
import { Flex, Box, HStack, Button, Spacer, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';

function Nav (){
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
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
  <InputGroup size="md" width="300px" mr={4}>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
  <HStack spacing={6}>
    <Link to="/joinEvents"><Button>Join Event</Button></Link>
  </HStack>
</Flex>
</Box>

)}


export default Nav;