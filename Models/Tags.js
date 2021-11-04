const { Schema, model } = require("mongoose")

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

const Tag = model('Tag', tagSchema)

module.exports = Tag;