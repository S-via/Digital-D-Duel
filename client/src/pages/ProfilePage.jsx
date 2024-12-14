import {useState, useEffect} from 'react';
import { Box,Card, CardBody, SimpleGrid, 
    CardFooter, Button, CardHeader, Text} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import  Auth  from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';
import { REMOVE_FRIEND } from '../utils/mutations';



// const openEventDetails = function (event) {
//     //update after sinngle event page
//    window.location.assign('/singleEvent')
// }

const FollowedEventsPage = () => {
    const {username: userParam} = useParams();
    const [removeFriend] = useMutation(REMOVE_FRIEND, {
        onCompleted: () => {
            setIsFriend(false);
        },
    })

    const handleAddFriend = async()=> {
        await addFriend({
            variables: {
                username: profile.username
            }
        })
    }

    const handleRemoveFriend = async()=> {
        await removeFriend({
            variables: {
                username: profile.username
            }
        })
    }
    const [addFriend] = useMutation(ADD_FRIEND, {
        onCompleted: () => {
            setIsFriend(true);
        },
    });

    const [isFriend, setIsFriend] = useState(false)
   
    const {loading, data} = useQuery(userParam ? GET_USER : ME, 
        {
            variables: {username: userParam}
        }
    );
    
   const profile = data?.me || data?.getUser || {};

   useEffect(() => {
    if (profile?.friends?.some((friend) => friend.username === Auth.getProfile().data.username)) {
        setIsFriend(true);
    }
}, [profile]);

  
   
  
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
    <div>
        <h2>{userParam ? `${profile.username}'s` : 'My'} profile</h2>
        <p>Number of Friends: {profile.friends?.length || 0}</p>
        {userParam && !isFriend && (
            <button onClick={handleAddFriend}>Add Friend</button>
        )}
        {userParam && isFriend && (
            <button onClick={handleRemoveFriend}>Remove Friend</button>
        )}

        {!userParam && (
            profile.hostedEvents.map((event)=> {
                <div key={event._id}>
                <li>{event.home_team} vs {event.away_team}</li>
                <li>{event.description}</li>
                </div>
            })
        )}

    </div>
    
   )
};
    
    


export default FollowedEventsPage;

