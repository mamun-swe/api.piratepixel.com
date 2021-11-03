const { Schema, model } = require("mongoose")

const ImageSchema = new Schema({
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{
        type: String,
        default: null
    }],
    isApproved: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    file: {
        type: String,
        trim: true,
        required: true
    },
    tags: [{
        type: String,
        required: true,
        trim: true
    }],
}, {
    timestamps: true
})

const Image = model('Image', ImageSchema)

module.exports = Image;