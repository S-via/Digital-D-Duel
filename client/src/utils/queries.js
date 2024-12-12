import {gql} from "@apollo/client"

export const GET_ALL_EVENTS = gql `
query GetAllEvents($user: ID!) {
    getAllEvents(userId: $userId){
        homeTeam
        awayTeam
        description
    }
}
`

export const GET_SINGLE_EVENT = gql`
query getEvent($user: ID!){
    getEvent(userId: $userId) {
        homeTeam
        awayTeam
        description
        comments
    }
}
`

export const GET_USER = gql`
query getUser($userId: ID!){
    getUser(userId: $userId){
        username
        email
        password
        hostedEvents
        friends
    }
}
`

export const ME = gql`
query me($userId: ID!){
    me(userId: $userId){
        username
        email
        hostedEvents
        joinedEvents
        friends
    }
}
`
export const GET_USERS = gql `
query getUsers($searchTerm: String!){
        getUsers(searchTerm: $searchTerm){
            username
            _id
    }

        
    }`