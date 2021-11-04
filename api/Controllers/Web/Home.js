const Images = require("../../../Models/Image")
const { Host } = require("../../Helpers/Index")
const { RedisClient } = require("../../Cache/Index")

// List images
const Index = async (req, res, next) => {
    try {
        const items = []
        const results = await Images.find(
            { isApproved: true },
            { isApproved: 1, file: 1 }
        )
            .sort({ _id: -1 })
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

        // set data to cache
        RedisClient.setex("home", 3600, JSON.stringify(items))

        res.status(200).json({
            status: true,
            data: items
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index
}