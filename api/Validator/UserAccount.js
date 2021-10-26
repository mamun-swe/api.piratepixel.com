
const UpdateAccount = data => {
    let error = {}

    if (!data.name) error.name = "Name is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = {
    UpdateAccount
}