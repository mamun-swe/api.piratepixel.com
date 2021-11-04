const Category = require("../../../Models/Category")
const CheckId = require("../../Middleware/CheckId")
const { RedisClient } = require("../../Cache/Index")
const { Host } = require("../../Helpers/Index")


// List of items
const Index = async (req, res, next) => {
    try {
        const results = await Category.find({}, { name: 1, slug: 1 }).sort({ name: 1 }).exec()

        // set data to cache
        RedisClient.setex("categoryList", 3600, JSON.stringify(results))

        res.status(200).json({
            data: results
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Show specific category
const Show = async (req, res, next) => {
    try {
        let item = {}
        const { id } = req.params
        await CheckId(id)

        const result = await Category.findById(
            { _id: id },
            { name: 1, images: 1 }
        )
            .populate({
                path: "images",
                match: { isApproved: true }
            })
            .exec()

        if (result) {
            const categoryImages = []
            item._id = result._id
            item.name = result.name
            item.images = categoryImages

            if (result.images && result.images.length) {
                for (let i = 0; i < result.images.length; i++) {
                    const element = result.images[i]
                    categoryImages.push({
                        _id: element._id,
                        image: Host(req) + "uploads/media/" + element.file
                    })
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