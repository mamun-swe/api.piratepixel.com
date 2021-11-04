const Tags = require("../../../Models/Tags")
const { RedisClient } = require("../../Cache/Index")

// List of items
const Index = async (req, res, next) => {
    try {
        const results = await Tags.find({}, { title: 1 }).sort({ title: 1 }).exec()

        // set data to cache
        RedisClient.setex("tags", 3600, JSON.stringify(results))

        res.status(200).json({
            data: results
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index
}