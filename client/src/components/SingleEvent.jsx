import {useState} from 'react'
import { GET_SINGLE_EVENT } from '../utils/queries'
import { CREATE_COMMENT } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'


const SingleEvent = ()=> {
    const {eventId} = useParams();
    const {data, loading, error} = useQuery(GET_SINGLE_EVENT, {
        variables: { eventId}
    })
    const [createComment] = useMutation(CREATE_COMMENT)
    const event = data?.getEvent;
    const [commentText, setCommentText] = useState('')

    



    if(loading) return <p> Loading event...</p>

    if(error) return <p>Error fetching this event: {error.message}</p>

    if(!data || !data.getEvent || data.getEvent.length === 0){
        return <p> Cannot fetch event</p>
    }
    
    console.log(event)
    const handleCreateComment = async() => {
        if(!commentText.trim()){
            return
        }
        try{
            await createComment({
                variables: {
                    eventId,
                    text: commentText
                }
            })
            setCommentText('')
        }catch(err){
            console.error(err)
        }
    }

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
        <div>
            <textarea
            value={commentText}
            onChange={(e)=> setCommentText(e.target.value)}
            placeholder='Add a comment'
            >
            </textarea>
            <button onClick={handleCreateComment}>Add Comment</button>
        </div>

        </div>
    )
}

export default SingleEvent;

