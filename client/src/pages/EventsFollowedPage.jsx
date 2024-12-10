import {useState, useEffect} from 'react';
// import { Box, Card, SimpleGrid } from '@chakra-ui/react';
// import { Button } from '../components/ui/button'
// import { EventsList } from '../components/EventsList';


import { GET_ALL_EVENTS } from '../utils/queries';


const EventsFollowedPage = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await GET_ALL_EVENTS();
            const data = await response.json();
       
            try{
                const eventList = data.map((item) => ({
                    _id: item.id,
                    homeTeam: item.homeTeam,
                    awayTeam: item.awayTeam,
                    description: item.description,
                    odds: item.odds,
                    comment: item.comments
                }));
                setEvents(eventList)
            }catch (err){
                console.error(err);
             }
            }
            fetchData()
        }, [events])
       
        return (
            <>
                <h1>test</h1>
            </>
        );
    

};


export default EventsFollowedPage;

