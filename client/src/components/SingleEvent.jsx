import { useState } from 'react'
import { GET_SINGLE_EVENT } from '../utils/queries'
import { CREATE_COMMENT } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Textarea, Button } from '@chakra-ui/react';
// test push///



const SingleEvent = () => {
    const { eventId } = useParams();
    const { data, loading, error } = useQuery(GET_SINGLE_EVENT, {
        variables: { eventId }
    })
    const [createComment] = useMutation(CREATE_COMMENT)
    const event = data?.getEvent;
    const [commentText, setCommentText] = useState('')





    if (loading) return <p className='par'> Loading event...</p>

    if (error) return <Box className='par'>Error fetching this event: {error.message}</Box>

    if (!data || !data.getEvent || data.getEvent.length === 0) {
        return <p className='par'> Cannot fetch event</p>
    }

    console.log(event)
    const handleCreateComment = async () => {
        if (!commentText.trim()) {
            return
        }
        try {
            await createComment({
                variables: {
                    eventId,
                    text: commentText
                }
            })
            setCommentText('')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Box>

                <Heading className='heading' size="lg" mb={4}>{event.home_team} vs {event.away_team}</Heading>
                <Box maxHeight="150px"
                    overflowY="auto"
                    p={2}
                    border="1px solid"
                    borderColor="hsla(222, 89.20%, 7.30%, 0.82)"
                    borderRadius="md"
                    mb={4}>
                    <Text className="text" fontSize="md">{event.description}</Text></Box>
                {event.comments.map((comment) => (
                    <div className="Box" key={comment._id}>
                        <Text className="text">By: {comment.user.username}</Text>
                        <Box maxHeight="150px"
                            overflowY="auto"
                            p={2}
                            border="1px solid"
                            backgroundColor={'grey'}
                            color={'white'}
                            borderColor="#10e875d0"


                            borderRadius="md"
                            mb={4} className="text">{comment.text}</Box>

                    </div>
                ))}

                <Box>
                    <Textarea
                        backgroundColor="white"
                        color="black"
                        mb={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder='Add a comment'
                    >
                    </Textarea>
                    <Button onClick={handleCreateComment}>Add Comment</Button>
                </Box>

            </Box>
        </>
    )
}

export default SingleEvent;

