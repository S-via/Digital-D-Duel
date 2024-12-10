const { Schema, model } = require('mongoose')

const commentSchema = require('./Comment')

const eventSchema = new Schema(
    {
        FirstTeam: {
            type: String,
            required: true,
        },
        SecondTeam: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        odds: {
            type: Number,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Event = model('Event', eventSchema);

module.exports = Event