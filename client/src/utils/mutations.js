import {gql} from '@apollo/client'

export const  CREATE_EVENT = gql`
mutation createEvent($eventDetails: EventInput!){
    createEvent(eventDetails: $eventDetails){
        _id
        home_team
        away_team
        description
        eventDate
        friends {
            _id 
            username
        }
    }
}
`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}
`

export const SIGNUP = gql `
mutation Signup($username: String!, $email: String!, $password: String!){
    signup(username: $username, email: $email, password: $password){
        token
        user{
            _id
            username
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
    }
}
`

export const DELETE_EVENT = gql`
mutation deleteEvent($eventId: ID!){
    deleteEvent(eventId: $eventId){
        _id
    }
}
`
export const JOIN_EVENT = gql`
mutation JoinEvent($eventId: ID!){
    joinEvent(eventId: $eventId){
        _id
        home_team
        away_team
        description
        friends{
            _id 
            username
        }
    }
}
`

