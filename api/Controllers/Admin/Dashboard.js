const Admin = require("../../../Models/Admin")
const Users = require("../../../Models/User")
const Category = require("../../../Models/Category")
const Images = require("../../../Models/Image")
const { RedisClient } = require("../../Cache/Index")

// Index of dashboard
const Index = async (req, res, next) => {
    try {
        const admin = await Admin.countDocuments()
        const users = await Users.countDocuments()
        const category = await Category.countDocuments()
        const images = await Images.countDocuments()
        const pendingImages = await Images.countDocuments({ isApproved: false })
        const approvedImages = await Images.countDocuments({ isApproved: true })

        const result = {
            admin,
            users,
            category,
            images,
            pendingImages,
            approvedImages
        }

        // set data to cache
        RedisClient.setex("dashboard", 3600, JSON.stringify(result))

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Index
}