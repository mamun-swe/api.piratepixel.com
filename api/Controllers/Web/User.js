const Users = require("../../../Models/User")
const Images = require("../../../Models/Image")
const CheckId = require("../../Middleware/CheckId")
const { Host } = require("../../Helpers/Index")

// Show specific user public profile
const PublicProfile = async (req, res, next) => {
    try {
        const { id } = req.params
        await CheckId(id)

        let result = await Users.findById({ _id: id }, { name: 1, image: 1 }).exec()
        if (result) result.image = result.image ? Host(req) + "uploads/users/" + result.image : null

        res.status(200).json({
            status: true,
            data: result || null
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Uploaded images
const Uploads = async (req, res, next) => {
    try {
        const items = []
        const { id } = req.params
        await CheckId(id)

        const results = await Images.find(
            { $and: [{ uploadedBy: id }, { isApproved: true }] },
            { isApproved: 1, file: 1 }
        )
            .sort({ _id: -1 })

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
        if (error) console.log(error)
    }
}

module.exports = {
    PublicProfile,
    Uploads
}