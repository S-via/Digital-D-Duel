import {gql} from "@apollo/client"

export const GET_ALL_EVENTS = gql`
query GetAllEvents {
    getAllEvents {
        _id
        home_team
        away_team
        description
        eventDate
        creator {
            _id
            username
            friends { 
                _id
                username
            }
        }
    }
}
`;

export const GET_SINGLE_EVENT = gql`
query getEvent($eventId: ID!){
    getEvent(eventId: $eventId) {
        home_team
        away_team
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
        hostedEvents
        friends
    }
}
`

export const ME = gql`
query me{
    me{
        username
        email
        hostedEvents
        joinedEvents
        friends
    }
}
`
