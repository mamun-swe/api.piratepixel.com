const Tags = require("../../../Models/Tags")
const { RedisClient } = require("../../Cache/Index")

// List of items
const Index = async (req, res, next) => {
    try {
        const results = await Tags.find().sort({ name: 1 }).exec()

        res.status(200).json({
            data: results
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Store new tag
const Store = async (req, res, next) => {
    try {
        const { title } = req.body

        // validate check
        if (!title) {
            return res.status(422).json({
                title: "title is required."
            })
        }

        let isExist = await Tags.findOne({ title }).exec()
        if (isExist) {
            return res.status(409).json({
                status: false,
                message: 'This tag already exist'
            })
        }

        const newTag = new Tags({
            title
        })

        await newTag.save()
        await RedisClient.flushdb()

        res.status(201).json({
            status: true,
            message: 'Successfully tag cretaed'
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index,
    Store
}