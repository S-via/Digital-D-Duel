/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { JOIN_EVENT } from "../utils/mutations";
import Auth from '../utils/auth';
import { Button } from "@chakra-ui/react";

const JoinButton = ({eventId, creatorFriends}) => {
    const [joinEvent] = useMutation(JOIN_EVENT)

    const currentUser = Auth.loggedIn() ? Auth.getProfile().data._id : null;

    const isFriend = creatorFriends.some((friend) => friend._id === currentUser)

    const handleJoin = async() => {
        if(!isFriend){
            alert('You must add the event creator as a friend to join this event')
            return
        }
        try{
            await joinEvent({ variables: {eventId}})
        
        }catch(err){
            console.error('Error joining event', err)
        }
    }
    return (
        <Button onClick={handleJoin}>Join Event</Button>
    )
}
export default JoinButton