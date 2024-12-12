import {useState} from 'react'
import { GET_SINGLE_EVENT } from '../utils/queries'
import { CREATE_COMMENT } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'

const SingleEvent = ()=> {
    const [singleEvent] = useQuery(GET_SINGLE_EVENT)

    


    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default SingleEvent;