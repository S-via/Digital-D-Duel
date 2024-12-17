import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  CardHeader,
  Text,
  Heading,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  // FormControl,
  // FormLabel,
  // Input,
  // useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, ME } from '../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND, } from '../utils/mutations'; //Add UPDATE_PASSWORD
import Auth from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';

const FollowedEventsPage = () => {
  const { username: userParam } = useParams();

  const [isFriend, setIsFriend] = useState(false);

  const { loading, data } = useQuery(userParam ? GET_USER : ME, {
    variables: { username: userParam },
  });

  const profile = data?.me || data?.getUser || {};

  const [addFriend] = useMutation(ADD_FRIEND, {
    onCompleted: () => {
      setIsFriend(true);
    },
  });

  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    onCompleted: () => {
      setIsFriend(false);
    },
  });
  // const [newPassword, setNewPassword] = useState('');
  // const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const handleAddFriend = async () => {
    await addFriend({
      variables: {
        username: profile.username,
      },
    });
  };

  const handleRemoveFriend = async () => {
    await removeFriend({
      variables: {
        username: profile.username,
      },
    });
  };

  // const handleUpdatePassword = async () => {
  //   try {
  //     await updatePassword({
  //       variables: { password },
  //     });
  //     onClose();
  //     setNewPassword('');
  //   } catch (err) {
  //     console.error('Error updating password:', err);
  //   }
  // };
  // const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      profile?.friends?.some(
        (friend) => friend.username === Auth.getProfile().data.username
      )
    ) {
      setIsFriend(true);
    }
  }, [profile]);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) return <Text>Loading profile...</Text>;

  if (!profile?.username) {
    return (
      <Box textAlign="center" mt="4">
        <Heading size="md" color="red.500">
          You need to be logged in to view this page
        </Heading>
      </Box>
    );
  }

  return (
    <Box 
    mt={12}
    maxHeight="600px" 
    overflowY="auto"
    p={2}
    backgroundColor={'grey'}
    color={'white'}
    border="1px solid"
    borderColor="#10e875d0"
    borderRadius="md">
      <Heading className='heading' size="lg" mb="4">
        {userParam ? `${profile.username}'s` : 'My'} Profile
      </Heading>

      <Text className='text' mb="4">Number of Friends: {profile.friends?.length || 0}</Text>

      {/* {userParam && (
        <Button colorSchema="blue" onClick={onOpen} mb="4">
          Update Password
        </Button>
      )} */}

      {userParam && !isFriend && (
        <Button colorScheme="green" onClick={handleAddFriend}>
          Add Friend
        </Button>
      )}
      {userParam && isFriend && (
        <Button colorScheme="red" onClick={handleRemoveFriend}>
          Remove Friend
        </Button>
      )}

      {/* Hosted Events */}
      <Box mt="6">
        <Heading className='heading' size="lg" mb="4">
          Hosted Events
        </Heading>
        {profile.hostedEvents?.length > 0 ? (
          <SimpleGrid columns={[1, 2]} spacing="4">
            {profile.hostedEvents.map((event) => (
              <Card key={event._id}>
                <CardHeader>
                  <Heading size="sm">
                    {event.home_team} vs {event.away_team}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box
                   maxHeight="150px"
                   overflowY="auto"
                   p={2}
                   border="1px solid"
                   borderColor=" #10e875d0"
                   borderRadius="md"
                   mb={4}>
                  <Text>{event.description}</Text></Box>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No hosted events available.</Text>
        )}
      </Box>

      {/* Joined Events */}
      {!userParam && (
        <Box mt="6"
          maxHeight="150px"
          overflowY="auto"
          p={2}
          border="1px solid"
          borderColor=" #10e875d0"
          borderRadius="md"
          mb={4}>
          <Heading className="heading" size="md" mb="4">
            Joined Events
          </Heading>
          {profile.joinedEvents?.length > 0 ? (
            <SimpleGrid columns={[1, 2]} spacing="4">
              {profile.joinedEvents.map((event) => (
                <Card key={event._id}>
                  <CardHeader>
                    <Heading size="sm">
                      {event.home_team} vs {event.away_team}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{event.description}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text className='text'>No joined events available.</Text>
          )}
        </Box>
      )}
              {/* <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Update Password</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleUpdatePassword}>
          Update
        </Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal> */}

    </Box>
  );
};

export default FollowedEventsPage;