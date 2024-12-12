const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const User = require('./User');

const eventSchema = new Schema(
    {
        home_team: {
            type: String,
            required: true,
        },
        away_team: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        eventDate: {
            type: String, 
            required: true, 
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: {
            type: [commentSchema],
            default: [], 
        },
        friends: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
            default: [], 
        },
    },
    {
        toJSON: {
            virtuals: true, 
        },
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;