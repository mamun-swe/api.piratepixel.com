
const User = require("../../../Models/User")
const Validator = require("../../Validator/UserAccount")
const { Host, FileUpload, DeleteFile } = require("../../Helpers/Index")

// My profile
const Profile = async (req, res, next) => {
    try {
        const { id } = req.user
        let result = await User.findById(
            { _id: id },
            {
                name: 1,
                city: 1,
                country: 1,
                image: 1
            }
        ).exec()

        if (result) result.image = result.image ? Host(req) + "uploads/users/" + result.image : null

        res.status(200).json({
            status: true,
            data: result || null
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Update Profile
const UpdateProfile = async (req, res, next) => {
    try {
        const { id } = req.user
        const { name, city, country } = req.body

        // validate check
        const validate = await Validator.UpdateAccount(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                message: validate.error
            })
        }

        const isUpdateAccount = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { name, city, country } },
            { $multi: false }
        ).exec()

        if (!isUpdateAccount) {
            return res.status(404).json({
                status: false,
                message: 'Failed to update account.'
            })
        }

        res.status(201).json({
            status: true,
            message: "Successfully account updated."
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Upload Profile Image
const UploadProfileImage = async (req, res, next) => {
    try {
        const { id } = req.user
        const file = req.files

        // validate check
        if (!file) {
            return res.status(422).json({
                status: false,
                image: "Image is required."
            })
        }

        // Check & remove old file
        const isExistAccount = await User.findById({ _id: id }, { image: 1 })
        if (!isExistAccount) {
            return res.status(404).json({
                status: false,
                message: "Account not found."
            })
        }

        if (isExistAccount && isExistAccount.image) {
            await DeleteFile('./uploads/users/', isExistAccount.image)
        }

        const uploadFile = await FileUpload(file.image, './uploads/users/')
        if (!uploadFile) {
            return res.status(501).json({
                status: false,
                message: 'Failed to upload image'
            })
        }

        const isUpdateAccount = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { image: uploadFile } },
            { $multi: false }
        ).exec()

        if (!isUpdateAccount) {
            return res.status(404).json({
                status: false,
                message: 'Failed to upload.'
            })
        }

        res.status(201).json({
            status: true,
            message: 'Successfully profile updated'
        })
    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    Profile,
    UpdateProfile,
    UploadProfileImage
}