import {useState, useEffect} from 'react';
import { Box,Card, CardBody, SimpleGrid, 
    CardFooter, Button, CardHeader, Text, 
    useQuery} from '@chakra-ui/react';


import { GET_ALL_EVENTS } from '../utils/queries';
import  Auth  from '../utils/auth';

const openEventDetails = function (event) {
    
}

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
                const eventList = data?.map((item) => ({
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
                
                
                setEvents(eventList)
            }catch (err){
                console.error(err);
             }
            }
            fetchData()
        }, [data])
       
        
        return (
            <>
                {user.data.username} 
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
                                    <Button className="text-black" onClick={() => openEventDetails(item.id)}>View Event</Button>
                                </CardFooter>
                            </Card>

                        ) ) }
                    </SimpleGrid>
                </Box>
            </>
        );
    

};


export default FollowedEventsPage;

