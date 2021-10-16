
const Login = user => {
    let error = {}

    if (!user.email) error.email = "Email is required"
    if (!user.password) error.password = "Password is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

const Create = data => {
    let error = {}

    if (!data.name) error.name = "Name is required"
    if (!data.email) error.email = "Email is required"
    if (!data.phone) error.phone = "Phone Number is Required"
    if (!data.password) error.password = "Password is required"

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = {
    Login,
    Create
}