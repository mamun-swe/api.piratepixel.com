
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../../../Models/User")
const Validator = require("../../Validator/User")

// Login to account
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate check
        const validate = await Validator.Login(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        // Account find using email 
        const account = await User.findOne({ email }).exec()
        if (!account) {
            return res.status(404).json({
                status: false,
                message: 'Invalid email or password'
            })
        }

        // Compare with password
        const result = await bcrypt.compare(password, account.password)
        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'Invalid phone or password'
            })
        }

        // Generate JWT token
        const token = await jwt.sign(
            {
                id: account._id,
                name: account.name,
                role: account.role,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        )

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Create an account
const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Validate check
        const validate = await Validator.Create(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        // Check account is exist
        const isExistAccount = await User.findOne({ email }).exec()
        if (isExistAccount) {
            return res.status(422).json({
                status: false,
                message: "Email already used."
            })
        }

        // Password Hash
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        const saveUser = await newUser.save()
        if (!saveUser)
            return res.status(501).json({
                status: false,
                message: 'Failed to create account.'
            })

        res.status(201).json({
            status: true,
            message: 'Successfully account created.'
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Reset password
const Reset = async (req, res, next) => {
    try {

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Login,
    Register,
    Reset
}