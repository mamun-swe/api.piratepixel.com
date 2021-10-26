const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image',
        default: null
    }]
}, {
    timestamps: true
})

const Category = model('Category', categorySchema)

module.exports = Category;