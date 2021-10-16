
const Store = data => {
    let errors = {}

    if (!data.name) errors.name = "Name is required"

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

const Update = data => {
    let errors = {}

    if (!data.name) errors.name = "Name is required"

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    Store,
    Update
}