const Images = require("../../../Models/Image")
const { Host } = require("../../Helpers/Index")

// Search Result
const SearchResults = async (req, res, next) => {
    try {
        const items = []
        const { query } = req.query

        // Find products using text search
        const results = await Images.find(
            {
                $and: [
                    { $text: { $search: query } },
                    { isApproved: true }
                ]
            },
            { isApproved: 1, file: 1 }
        )
            .sort({ _id: -1 })
            .exec()

        // Modify results
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
        if (error) next(error)
    }
}

module.exports = {
    SearchResults
}