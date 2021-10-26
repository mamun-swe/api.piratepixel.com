
const User = require("../../../Models/User")

// List of users
const Index = async (req, res, next) => {
    try {
        const results = await User.find({}, { name: 1, email: 1, uploads: 1 })
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


module.exports = {
    Index
}