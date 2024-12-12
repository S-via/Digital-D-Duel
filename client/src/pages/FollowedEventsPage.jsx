import {useState, useEffect} from 'react';
import { Box,Card, CardBody, SimpleGrid, 
    CardFooter, Button, CardHeader, Text, 
    useQuery} from '@chakra-ui/react';


import { GET_ALL_EVENTS } from '../utils/queries';


const FollowedEventsPage = () => {
    const [events, setEvents] = useState([]);
    const { loading, getAllEvents} = useQuery(GET_ALL_EVENTS);
    useEffect(() => {
        async function fetchData() {
            const { data } = await getAllEvents()
            console.log('events', data);
            
            try{
                const eventList = data.map((item) => ({
                    _id: item.id,
                    homeTeam: item.homeTeam,
                    awayTeam: item.awayTeam,
                    description: item.description,
                    comment: item.comments
                }));
                
                
                setEvents(eventList)
            }catch (err){
                console.error(err);
             }
            }
            fetchData()
        }, [getAllEvents,events])
       
        return (
            <>
            blah 
                <Box
                // height='2000px'
                borderWidth="1px"
                borderRadius="md"
                maxH="350px"
                overflowY="auto"
                boxShadow="lg"
                mt={6}>
                    blah blah
                    <SimpleGrid
                    columns={[1,2,3]}
                    spacing={12}
                    mt={6}>
                        {events.map((item) => (
                            <Card width='100%' maxWidth='320px' key={item.id} mx='auto'>
                                <CardBody>
                                    <CardHeader> vs </CardHeader>
                                    <Text>
                                        blah blah blah
                                    </Text>
                                </CardBody>
                                <CardFooter justifyContent='flex-end'>
                                    <Button className="text-black">View Event</Button>
                                </CardFooter>
                            </Card>

                        ) ) }
                    </SimpleGrid>
                </Box>
            </>
        );
    

};


export default FollowedEventsPage;

