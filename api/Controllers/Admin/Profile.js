const Admin = require("../../../Models/Admin")

// My profile
const MyProfile = async (req, res, next) => {
    try {
        const { id } = req.user
        const result = await Admin.findById(
            { _id: id },
            { password: 0 }
        ).exec()

        res.status(200).json({
            status: true,
            data: result || null
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    MyProfile
}