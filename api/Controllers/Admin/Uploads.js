const Images = require("../../../Models/Image")
const CheckId = require("../../Middleware/CheckId")
const { Host } = require("../../Helpers/Index")
const { RedisClient } = require("../../Cache/Index")
const { PaginateQueryParams, Paginate } = require("../../Helpers/Pagination")


// List of items
const Index = async (req, res, next) => {
    try {
        const items = []
        const { limit, page } = PaginateQueryParams(req.query)

        const totalItems = await Images.countDocuments().exec()
        const results = await Images.find({}, { tags: 0 })
            .populate("uploadedBy", "name")
            .populate("category", "name")
            .sort({ _id: -1 })
            .skip((parseInt(page) * parseInt(limit)) - parseInt(limit))
            .limit(parseInt(limit))
            .exec()

        if (results && results.length) {
            for (let i = 0; i < results.length; i++) {
                const element = results[i]
                items.push({
                    _id: element._id,
                    uploadedBy: element.uploadedBy.name || "N/A",
                    category: element.category.name || "N/A",
                    isApproved: element.isApproved,
                    image: Host(req) + "uploads/media/" + element.file
                })
            }
        }

        res.status(200).json({
            status: true,
            data: items,
            pagination: Paginate({ page, limit, totalItems })
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Update specific item approve status
const Update = async (req, res, next) => {
    try {
        const { id } = req.params
        await CheckId(id)

        // check available
        const isAvailable = await Images.findById({ _id: id })
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                message: "Content not available."
            })
        }

        const updateItem = await Images.findByIdAndUpdate(
            { _id: id },
            { $set: { isApproved: !isAvailable.isApproved } }
        ).exec()

        if (!updateItem) {
            return res.status(501).json({
                status: false,
                message: "Network error."
            })
        }

        await RedisClient.flushdb()

        res.status(201).json({
            status: true,
            message: "Successfully updated."
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index,
    Update
}