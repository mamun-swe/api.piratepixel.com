const Category = require("../../../Models/Category")
const Validator = require("../../Validator/Category")
const CheckId = require("../../Middleware/CheckId")
const { Slug } = require("../../Helpers/Index")
const { RedisClient } = require("../../Cache/Index")

// Index of categories
const Index = async (req, res, next) => {
    try {
        const results = await Category.find({}, { name: 1 })
            .sort({ _id: -1 })
            .exec()

        res.status(200).json({
            status: true,
            data: results
        })

    } catch (error) {
        if (error) next(error)
    }
}

// Show specific category
const Show = async (req, res, next) => {
    try {
        const { id } = req.params
        await CheckId(id)

        const result = await Category.findById({ _id: id }, { name: 1 }).exec()

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Store new category
const Store = async (req, res, next) => {
    try {
        const { name } = req.body

        // validate check
        const validate = await Validator.Store(req.body)
        if (!validate.isValid) return res.status(422).json(validate.errors)

        let category = await Category.findOne({ name }).exec()
        if (category) {
            return res.status(409).json({
                status: false,
                message: 'This category already exist'
            })
        }

        const newCategory = new Category({
            name: name,
            slug: Slug(name)
        })

        await newCategory.save()
        await RedisClient.flushdb()

        res.status(201).json({
            status: true,
            message: 'Successfully category cretaed'
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Update Category
const Update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        await CheckId(id)

        // validate check
        const validate = await Validator.Update(req.body)
        if (!validate.isValid) {
            return res.status(422).json(validate.errors)
        }

        // Check available
        const category = await Category.findOne({ _id: id }).exec()
        if (!category) {
            return res.status(404).json({
                status: false,
                message: 'Category not found'
            })
        }

        // Check name exist
        let exist = await Category.findOne({ $and: [{ _id: { $ne: id } }, { name: name }] })
        if (exist) {
            return res.status(409).json({
                status: false,
                message: 'This category already exist'
            })
        }

        const updateCategory = await Category.findOneAndUpdate(
            { _id: id },
            { $set: { name } },
            { new: true })
            .exec()

        if (!updateCategory) {
            return res.status(422).json({
                status: false,
                message: 'Network error.'
            })
        }

        await RedisClient.flushdb()

        return res.status(201).json({
            status: false,
            message: 'Successfully category updated'
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index,
    Show,
    Store,
    Update
}