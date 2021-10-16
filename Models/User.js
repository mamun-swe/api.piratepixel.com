const { Schema, model } = require("mongoose")

const validateEmail = function (email) {
    if (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    return true
}

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please provide a valid email address"],
        required: true
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    role: {
        type: String,
        trim: true,
        default: 'User',
        enum: ['User']
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: 'Image',
        default: null
    }]
}, {
    timestamps: true
})


const User = model("User", userSchema)
module.exports = User
