const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Valid Email Required'],
        },
        password: {
            type: String,
            required: true,

        },
        hostedEvents: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }],
        joinedEvents: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],


    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next()
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

// userSchema.methods.updatePassword = async function (password){
//     const saltRounds = 10;
//     const newPassword = await bcrypt.hash(password, saltRounds);
//     return newPassword 
// }
const User = model('User', userSchema)

module.exports = User;
