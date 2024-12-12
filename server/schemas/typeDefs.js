const typeDefs = `
    type User { 
        _id: ID!
        username: String!
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
        homeTeam: String!
        awayTeam: String!
        description: String!
        odds : Int!
        comments: [Comment]!
    }
    
    

    type Comment {
        _id: ID!
        user: User
        text: String!
        timestamp: String!
    }

    type Query {
        getAllEvents(userId: ID!): [Event!]!
        getEvent(userId: ID!): Event
        getUser(userId: ID!): User
        me: User
        getUsers(searchTerm: String!): [User]
    }

    input EventInput {
        FirstTeam: String!
        SecondTeam: String!
        description: String!
        odds: Int!
    }

    type Mutation { 
        createEvent(eventDetails: EventInput!): Event
        login(email: String!, password: String!): Auth
        signup(username: String!, email: String!, password: String!): Auth
        createComment(eventId: ID!, text: String!): Comment
        addFriend(username: String!): [User]
        deleteEvent(_id: ID!): Event
    }

    
    
`

module.exports = typeDefs

