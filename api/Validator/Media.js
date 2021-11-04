
const Store = data => {
    let error = {}

    if (!data.image) error.image = "Image is required"
    if (!data.category) error.category = "Category is required"
    if (!data.tags) error.tags = "Tags is required"
    if (data.tags && !data.tags.length) error.tags = "Tags is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = {
    Store
}