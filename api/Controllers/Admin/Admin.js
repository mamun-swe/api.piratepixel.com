
const bcrypt = require("bcryptjs")
const Admin = require("../../../Models/Admin")
const Validator = require('../../Validator/Admin')

// List of all Admin
const Index = async (req, res, next) => {
    try {
        const { id } = req.user
        const admins = await Admin.find(
            { _id: { $ne: id } },
            { name: 1, email: 1, phone: 1, role: 1 }
        ).exec()

        res.status(200).json({
            status: true,
            data: admins
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Create account
const Create = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body

        // validate check
        const validate = await Validator.Create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        // Check email
        const existEmail = await Admin.findOne({ email })
        if (existEmail)
            return res.status(422).json({
                status: false,
                message: 'Email already used.'
            })

        // Check phone
        const existPhone = await Admin.findOne({ phone })
        if (existPhone)
            return res.status(422).json({
                status: false,
                message: 'Phone already used.'
            })

        // Password Hash
        const hashPassword = await bcrypt.hash(password, 10)
        const newAdmin = new Admin({
            name,
            email,
            phone,
            password: hashPassword
        })

        const saveAdmin = await newAdmin.save()
        if (!saveAdmin)
            return res.status(501).json({
                status: false,
                message: 'Network error.'
            })

        res.status(201).json({
            status: true,
            message: 'Successfully admin created.'
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    Index,
    Create
}