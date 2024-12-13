import {useState, useEffect} from 'react';
import { Box,Card, CardBody, SimpleGrid, 
    CardFooter, Button, CardHeader, Text} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_USER, ME } from '../utils/queries';
import  Auth  from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';


const FollowedEventsPage = () => {
    const {username: userParam} = useParams();
   
    const {loading, data} = useQuery(userParam ? GET_USER : ME, 
        {
            variables: {username: userParam}
        }
    );
    
   const profile = data?.me || data?.getUser || {};
  
  
console.log(profile.hostedEvents)
   if(Auth.loggedIn() && Auth.getProfile().data.username === userParam){
    return <Navigate to='/me'/>
   }

   if(loading) return <p>Profile is loading...</p>

   if(!profile?.username){
    return (
        <h2> You need to be logged in to view this page</h2>
    )
   }

        
   return (
    <Box p={4}>
      <Card>
        <CardHeader>
          <Text fontSize="2xl">Welcome, {profile.username}!</Text>
        </CardHeader>
        <CardBody>
          <Text>Email: {profile.email || 'N/A'}</Text>
          <Text>Number of Events Followed: {profile.followedEvents?.length || 0}</Text>
        </CardBody>
        <CardFooter>
          <Button onClick={() => Auth.logout()}>Log Out</Button>

        </CardFooter>
      </Card>
      {profile.hostedEvents.map((event)=> (
            <div key={event._id}>
            <li >{event.home_team} vs {event.away_team}</li>
            <li>{event.description}</li>
            </div>
          ))}
      
    </Box>
  );
};
    
    


export default FollowedEventsPage;

