const { User, Event, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllEvents: async () => {
            const events = await Event.find()
                .populate('creator')
                .populate('friends');
            return events;
        },
        getEvent: async (parent, { eventId }) => {
            const singleEvent = await Event.findById(eventId);
            return singleEvent;
        },
        getUser: async (parent, { username }) => {
            const user = await User.findOne(username ? {username}: {})
                .populate('hostedEvents')
                .populate('friends');
            return user;
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({_id: context.user._id})
                    .populate('hostedEvents')
                    .populate('joinedEvents')
                    .populate('friends');
                    return user;
            }
            


        },
        getUsers: async (parent, { searchTerm }, context) => {

            const Users = await User.find({
                username: {$regex: searchTerm,  $options: 'i'}})
            if (!Users) {
                throw new Error('You need to be logged in!');
            }

            return Users;
        },

    },


    Mutation: {

        signup: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No user was found');
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new Error('Incorrect password');
            }
            const token = signToken(user);

            return { token, user };
        },
        createEvent: async (parent, { eventDetails }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in to create an event');
            }

            const { home_team, away_team, description, friends = [], eventDate } = eventDetails;

            const sortedFriends = friends.filter((id) => id && id.trim() !== '')

            const newEvent = await Event.create({
                home_team,
                away_team,
                description,
                comments: [],
                competitors: sortedFriends,
                creator: context.user._id,
                eventDate,
            });

            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { hostedEvents: newEvent._id } },
                { new: true }
            );

            return newEvent;
        },
        createComment: async (parent, { eventId, text }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in to comment on this event');
            }
            if (!text || text.trim() === "") {
                throw new Error("Comment text cannot be empty.");
            }
            const event = await Event.findById(eventId)

            const comment = {
                user: context.user._id,
                text: text.trim(),
                timestamp: new Date().toISOString()
            }

            event.comments.push(comment)
            await event.save()

            return comment
        },
        addFriend: async (parent, { username }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in to add a new friend');
            }
            const friend = await User.findOne({ username });

            const user = await User.findById(context.user._id)

            if(user.friends.includes(friend._id)){
                throw new Error('Already friends')
            }
            if (!friend) {
                throw new Error('User not found');
            }

           user.friends.push(friend._id)
           friend.friends.push(context.user._id)

           await user.save()
           await friend.save()

            const updatedUser = await User.findById(context.user._id).populate('friends')

            return updatedUser;
        },
        joinEvent: async (parent, { eventId }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in to join an event')
            }
            const event = await Event.findById(eventId)

            event.friends.push(context.user._id)
            await event.save()
            const updatedEvent = await Event.findById(eventId).populate('friends')
            return updatedEvent
        },
        deleteEvent: async (parent, { eventId }, context) => {
            if (!context.user) {
                throw new Error('You need to be logged in to delete events');
            }

            const event = await Event.findById(eventId);

            if (!event) {
                throw new Error('Event not found');
            }

            if (event.creator.toString() !== context.user._id) {
                throw new Error('You are not authorized to delete this event');
            }

            await Event.findByIdAndDelete(eventId);

            return event;
        },


    }
};

module.exports = resolvers;
