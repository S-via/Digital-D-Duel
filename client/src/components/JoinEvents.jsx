import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../utils/queries";
import JoinButton from "./JoinButton";
import Auth from '../utils/auth'
import { Card, CardHeader, SimpleGrid, CardBody, Heading, Box, CardFooter, Text } from '@chakra-ui/react';

const JoinEvents = () => {
    const { data, loading, error } = useQuery(GET_ALL_EVENTS);
    const currentUser = Auth.loggedIn() ? Auth.getProfile().data : null;


    if (loading) return <p>Loading events...</p>;


    if (error) return <p>Error fetching events: {error.message}</p>;


    if (!data || !data.getAllEvents || data.getAllEvents.length === 0) {
        return <p>No events available at the moment.</p>;
    }
    console.log(data)



    return (
        <Box
        >

            <h1 className="join-events">Available Events

            </h1>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={12}
                mt={6}
            >

                {data.getAllEvents.map((event) => (
                    <Card className="card-container" key={event._id} >
                        <div >
                            <CardBody className="card-body">
                                <CardHeader className="card-header">
                                    <ul>
                                        {event.home_team}</ul>
                                    vs
                                    <ul>{event.away_team}</ul>
                                    {event.eventId}
                                </CardHeader>
                                <Heading size="xs">{event.eventDate}</Heading>
                                <Box
                                    maxHeight="150px"
                                    overflowY="auto"
                                    p={2}
                                    border="1px solid"
                                    borderColor=" #10e875d0"
                                    borderRadius="md"
                                    mb={4}>
                                    <Text>{event.description}</Text></Box>
                                <Heading size="sm">{event.creator?.username || "Unknown"} 's Participants: {event.creator.friends?.length || ""}</Heading>
                                <ul>
                                    {event.friends?.map((user) => (
                                        <li key={user._id}>{user.username}</li>
                                    )) || <li>No friends available</li>}
                                </ul>
                            </CardBody>
                            <CardFooter className="card-footer" justifyContent="flex-end">
                                <JoinButton
                                    eventId={event._id}
                                    creatorFriends={event.creator?.friends || []}
                                    currentUser={currentUser}
                                />
                            </CardFooter>
                        </div>

                    </Card>

                ))}
            </SimpleGrid>

        </Box>
    );
};

export default JoinEvents;