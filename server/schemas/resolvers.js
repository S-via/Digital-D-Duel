
const {User, Event, Comment} = require('../models')
const {signToken} = require('../utils/auth')

const resolvers = { 
    Query: {
        getAllEvents: async(parent, {userId})=> {
            const events = await Event.find({userId: userId})
            return events
        },
        getEvent: async(parent, {userId})=> {
            const singleEvent = await Event.findOne({userId: userId})
            return singleEvent
        },
        getUser: async(parent, {userId})=> {
            
                const user =  await User.findOne({userId: userId})
                    .populate('hostedEvents')
                    .populate('friends')

                return user
            
        },
        me: async(parent, args, context)=> {
            if(context.user){
                const user = await User.findOne({_id: context.user._id})
                    .populate('hostedEvents')
                    .populate('joinedEvents')
                    .populate('friends')

            }
            
        }
    },
    Mutation: {
        signup: async(parent, {username, email, password})=> {
            const user = await User.create({username, email, password})
            const token = signToken(user)
            console.log(token)
            return {token, user}
        },
        login: async(parent, {email, password})=> {
            const user = await User.findOne({email})

            if(!user){
                throw new Error('No user was found')
            }
            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword){
                throw new Error('Incorrect password')
            }
            const token = signToken(user);

            return {token, user}
        },
        createEvent: async(parent, {eventDetails},context)=> {
            if(!context.user){
                throw new Error('You need to be logged in to create an event')
            }

            const newEvent = new Event({eventDetails})

            await User.findOneAndUpdate(context.user._id, {
                $push: {hostedEvents: newEvent}
            })
            return newEvent

        },
        createComment: async(parent, {eventId, text}, context)=> {
            if(!context.user){
                throw new Error("You need to be logged in to comment on this event")

            }
            const newComment = await Event.findOneAndUpdate({_id: eventId}, 
                {$push: {comments: text}},
                {new: true}
            )

            return newComment
        },
        addFriend: async(parent, {username}, context)=> {
            if(!context.user){
                throw new Error('You need to be logged in to add a new friend')
            }
            const newFriend = await User.findOneAndUpdate({_id: context.user._id},
                {$push: {friends: username}},
                {new: true}
            )
            return newFriend
        },
        deleteEvent: async(parent, {_id}, context)=> {
            if(!context.user){
                throw new Error('You need to be logged in to edit events')
            }
            const updateEvent = await Event.findOneAndDelete({_id: _id})

            return updateEvent
        }


    }

}

module.exports = resolvers;

