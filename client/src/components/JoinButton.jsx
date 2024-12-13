/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { JOIN_EVENT } from "../utils/mutations";

import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const JoinButton = ({eventId, creatorFriends, currentUser}) => {
    const [joinEvent] = useMutation(JOIN_EVENT)
    const navigate = useNavigate()

   

    const isFriend = creatorFriends.some((friend) => friend._id === currentUser?._id)

    const handleJoin = async() => {
        if(!isFriend){
            alert('You must add the event creator as a friend to join this event')
            return
        }
        try{
            await joinEvent({ variables: {eventId}})
            navigate(`/event/${eventId}`)
            
        }catch(err){
            console.error('Error joining event', err)
            
        }
    }
    return (
        <Button className="text-white" onClick={handleJoin}>Join Event</Button>
    )
}
export default JoinButton