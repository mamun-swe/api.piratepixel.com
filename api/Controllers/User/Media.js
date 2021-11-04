const User = require("../../../Models/User")
const Category = require("../../../Models/Category")
const Image = require("../../../Models/Image")
const Validator = require("../../Validator/Media")
const CheckId = require("../../Middleware/CheckId")
const { FileUpload, Host } = require("../../Helpers/Index")
const { RedisClient } = require("../../Cache/Index")

// List of my uploads
const Index = async (req, res, next) => {
    try {
        const items = []
        const { id } = req.user
        const results = await Image.find(
            { uploadedBy: id },
            { file: 1, isApproved: 1 }
        )
            .sort({ _id: -1 })

        if (results && results.length) {
            for (let i = 0; i < results.length; i++) {
                const element = results[i]
                items.push({
                    isApproved: element.isApproved,
                    image: Host(req) + "uploads/media/" + element.file
                })
            }
        }

        // set data to cache
        RedisClient.setex(id, 3600, JSON.stringify(items))

        res.status(200).json({
            status: true,
            data: items
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Store new media
const Store = async (req, res, next) => {
    try {
        const { id } = req.user
        const file = req.files
        const { category, tags } = req.body

        // validate check
        const validate = await Validator.Store({ image: file, category, tags })
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        await CheckId(category)

        // upload file
        const uploadedFile = await FileUpload(file.image, './uploads/media/')
        if (!uploadedFile) {
            return res.status(501).json({
                status: false,
                message: 'Failed to upload image'
            })
        }

        const newImage = new Image({
            uploadedBy: id,
            category,
            file: uploadedFile,
            tags: JSON.parse(tags)
        })

        // store media
        const storedMedia = await newImage.save()
        if (!storedMedia) {
            return res.status(501).json({
                status: false,
                message: "Internal server error."
            })
        }

        // store in category
        await Category.findByIdAndUpdate(
            { _id: category },
            { $push: { images: storedMedia._id } },
            { new: true, multi: false }
        )

        // store in user
        await User.findByIdAndUpdate(
            { _id: id },
            { $push: { uploads: storedMedia._id } },
            { new: true, multi: false }
        )

        await RedisClient.flushdb()

        res.status(201).json({
            status: true,
            message: "Successfully media uploaded."
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Store
}