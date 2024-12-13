import {useState} from 'react'
import { GET_SINGLE_EVENT } from '../utils/queries'
import { CREATE_COMMENT } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'

const SingleEvent = ({eventId})=> {
    const [data, loading, error] = useQuery(GET_SINGLE_EVENT, {
        variables: {id: eventId}
    })
    const [createComment] = useMutation(CREATE_COMMENT)
    const event = data?.getEvent;



    if(loading) return <p> Loading event...</p>

    if(error) return <p>Error fetching this event: {error.message}</p>

    if(!data || !data.getEvent || data.getEvent.length === 0){
        return <p> Cannot fetch event</p>
    }
    
    console.log(event)


    return (
        <div>
        <h1>{event.home_team} vs {event.away_team}</h1>
        <h2>{event.description}</h2>
        {event.comments.map((comment)=> (
            <div key={comment._id}>
            <p>{comment.text}</p>
            <p>By: {comment.user.username}</p>
            
            </div>
            
        ))}
        </div>
    )
}

export default SingleEvent;

