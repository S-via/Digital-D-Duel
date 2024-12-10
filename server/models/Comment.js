const {Schema} = require('mongoose')
const User = require('./User')

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        timestamps: true
    }
)


module.exports = commentSchema

