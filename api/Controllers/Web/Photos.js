const Images = require("../../../Models/Image")
const CheckId = require("../../Middleware/CheckId")
const { Host } = require("../../Helpers/Index")

// List images
const Index = async (req, res, next) => {
    try {
        const items = []
        let { page } = req.query
        if (!page) page = 1

        const results = await Images.find(
            { isApproved: true },
            { isApproved: 1, file: 1 }
        )
            .sort({ _id: -1 })
            .skip((parseInt(page || 1) * 20) - 20)
            .limit(20)

        if (results && results.length) {
            for (let i = 0; i < results.length; i++) {
                const element = results[i]
                items.push({
                    _id: element._id,
                    image: Host(req) + "uploads/media/" + element.file
                })
            }
        }

        res.status(200).json({
            status: true,
            data: items
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Show specific photo
const Show = async (req, res, next) => {
    try {
        let item = {}
        const { id } = req.params
        await CheckId(id)

        const result = await Images.findOne({
            $and: [
                { _id: id },
                { isApproved: true }
            ]
        },
            {
                tags: 1,
                file: 1,
                category: 1,
                uploadedBy: 1
            }
        )
            .populate("category", "name")
            .populate("uploadedBy", "name image uploads")
            .exec()

        if (result) {
            item = {
                _id: result._id,
                category: result.category,
                tags: result.tags,
                image: Host(req) + "uploads/media/" + result.file,
                uploadedBy: {
                    _id: result.uploadedBy._id,
                    name: result.uploadedBy.name,
                    total: result.uploadedBy.uploads.length,
                    image: result.uploadedBy.image ? Host(req) + "uploads/users/" + result.uploadedBy.image : null
                }
            }
        }

        res.status(200).json({
            status: true,
            data: item
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index,
    Show
}