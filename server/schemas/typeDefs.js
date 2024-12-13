const typeDefs = `
    type User { 
        _id: ID!
        username: String
        email: String!
        password: String!
        hostedEvents: [Event]!
        joinedEvents: [Event]!
        friends: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

   type Event {
    _id: ID!
    home_team: String!
    away_team: String!
    description: String!
    eventDate: String
    comments: [Comment]!
    friends: [User]
    creator: User!
}
    
    

    type Comment {
        _id: ID!
        user: User
        text: String!
        timestamp: String!
    }

    type Query {
        getAllEvents: [Event!]!
        getEvent(eventId: ID!): Event
        getUser(username: String!): User
        me: User
        getUsers(searchTerm: String!): [User]
    }

    input EventInput {
        eventId: ID!
        home_team: String!
        away_team: String!
        description: String!
        friends: [ID]
        eventDate: String!

    }

    type Mutation { 
        createEvent(eventDetails: EventInput!): Event
        login(email: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        createComment(eventId: ID!, text: String!): Comment
        addFriend(username: String!): User
        deleteEvent(_id: ID!): Event
        joinEvent(eventId: ID!): Event
        updatePassword(password: String!): User
    }

    
    
`

module.exports = typeDefs

