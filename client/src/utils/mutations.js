import {gql} from '@apollo/client'

export const  CREATE_EVENT = gql`
mutation createEvent($eventDetails: EventInput!){
    createEvent(eventDetails: $eventDetails){
        homeTeam
        awayTeam
        description
    }
}
`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
        user{
            _id 
        }
    }
}
`

export const SIGNUP = gql `
mutation Signup($username: String!, $email: String!, $password: String!){
    signup(username: $username, email: $email, password: $password){
        user
        {
            _id
        }
    }
}
`
export const CREATE_COMMENT = gql`
mutation createComment($eventId: ID!, $text: String!){
    createComment(eventId: $eventId, text: $text){
        user{
            username
        }
        text
        timestamp
    }
}
`

export const ADD_FRIEND = gql`
mutation addFriend($username: String!){
    addFriend(username: $username){
        username
        hostedEvents
    }
}
`

export const DELETE_EVENT = gql`
mutation deleteEvent($_id: ID!){
    deleteEvent(_id: $id){
        _id
    }
}
`

