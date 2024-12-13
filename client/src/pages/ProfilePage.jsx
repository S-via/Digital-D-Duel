import {useState, useEffect} from 'react';
import { Box,Card, CardBody, SimpleGrid, 
    CardFooter, Button, CardHeader, Text,
    useQuery} from '@chakra-ui/react';


import { GET_ALL_EVENTS } from '../utils/queries';
import  Auth  from '../utils/auth';

// const openEventDetails = function (event) {
//     //update after sinngle event page
//    window.location.assign('/singleEvent')
// }

const FollowedEventsPage = () => {
    const [events, setEvents] = useState([]);
    const user = Auth.getProfile();
    console.log('user',user);
    const userId = user.data._id;
    const { loading, data} = useQuery(GET_ALL_EVENTS,{
        variables: {userId}
    });
    useEffect(() => {
        async function fetchData() {
            console.log('events', data);
            
            try{
                const joinedEventList = data?.map((item) => ({
                    _id: item.id,
                    homeTeam: item.homeTeam,
                    awayTeam: item.awayTeam,
                    description: item.description,
                })) || [{
                    _id: '12355dshdsfjd',
                    homeTeam: 'Packers',
                    awayTeam: 'Sharks',
                    description: 'football',
                },{
                    _id: '12355dshdsfjd',
                    homeTeam: 'Packers',
                    awayTeam: 'Sharks',
                    description: 'football',
                },{
                    _id: '12355dshdsfjd',
                    homeTeam: 'Packers',
                    awayTeam: 'Sharks',
                    description: 'football',
                },{
                    _id: '12355dshdsfjd',
                    homeTeam: 'Packers',
                    awayTeam: 'Sharks',
                    description: 'football',
                }];
                
                
                setEvents(joinedEventList)
            }catch (err){
                console.error(err);
             }
            }
            fetchData()
        }, [data])
       
        
        return (
            <>
                <Text mt={-5} mb={10} fontSize={'30px'}> {user.data.username} </Text>
                
                <Text mt={3} mb={2} fontSize={'30px'}>Hosted Events</Text>
                <Box
                borderWidth="1px"
                borderRadius="md"
                maxH="350px"
                overflowY="auto"
                boxShadow="lg"
                mt={6}>
                    
                    <SimpleGrid
                    columns={[1,2,3]}
                    spacing={12}
                    mt={6} 
                    mb={5}
                    ml={2}
                    mr={2}>
                        {events.map((item) => (
                            <Card width='100%' maxWidth='320px' key={item.id} mx='auto'>
                                <CardBody>
                                    <CardHeader> {item.homeTeam} vs {item.awayTeam} </CardHeader>
                                    <Text>
                                        {item.description}
                                    </Text>
                                </CardBody>
                                <CardFooter justifyContent='flex-end'>
                                    <Button mr={6} className="text-black" onClick={() => openEventDetails(item.id)}>View Event</Button>
                                </CardFooter>
                            </Card>

                        ) ) }
                    </SimpleGrid>
                </Box>
                <Text mt={3} mb={2} fontSize={'30px'}>Joined Events</Text>
                <Box
                borderWidth="1px"
                borderRadius="md"
                maxH="350px"
                overflowY="auto"
                boxShadow="lg"
                mt={6}>
                    
                    <SimpleGrid
                    columns={[1,2,3]}
                    spacing={12}
                    mt={6} 
                    mb={5}
                    ml={2}
                    mr={2}>
                        {events.map((item) => (
                            <Card width='100%' maxWidth='320px' key={item.id} mx='auto'>
                                <CardBody>
                                    <CardHeader> {item.homeTeam} vs {item.awayTeam} </CardHeader>
                                    <Text>
                                        {item.description}
                                    </Text>
                                </CardBody>
                                <CardFooter justifyContent='flex-end'>
                                    <Button mr={6} className="text-black" /*onClick={() => openEventDetails(item.id)}*/>View Event</Button>
                                </CardFooter>
                            </Card>

                        ) ) }
                    </SimpleGrid>
                </Box>
            </>
        );
    

};


export default FollowedEventsPage;

