import {gql} from "@apollo/client"

export const GET_ALL_EVENTS = gql`
query getAllEvents{
    getAllEvents{
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
`

export const GET_SINGLE_EVENT = gql`
query getEvent($eventId: ID!){
    getEvent(eventId: $eventId) {
        _id
        home_team
        away_team
        description
        comments {
            _id
            user{
                username
            }
            text
        }
    }
}
`

export const GET_USER = gql`
query getUser($username: String!){
    getUser(username: $username){
        _id
        username
        email
        hostedEvents{
            _id
            home_team
            away_team
            description
        }
        friends {
            _id 
            username
        }
    }
}
`

export const ME = gql`
query me{
    me{
        _id
        username
        email
        hostedEvents{
            _id
            home_team
            description
            away_team
        }
        joinedEvents{
            _id
            home_team
            away_team
            description
        }
        friends {
            _id 
            username
        }
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