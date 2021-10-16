
const Login = data => {
    let error = {}

    if (!data.email) error.email = "Email is required"
    if (!data.password) error.password = "Password is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

const Create = data => {
    let error = {}

    if (!data.name) error.name = "Name is required"
    if (!data.email) error.email = "Email Number is Required"
    if (!data.password) error.password = "Password is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

const Update = data => {
    let error = {}

    if (!data.name) error.name = "Name is required"
    if (!data.email) error.email = "Email is required"
    if (!data.password) error.password = "Password is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = {
    Login,
    Create,
    Update
}