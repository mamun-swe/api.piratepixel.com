const express = require('express')
const UserRouter = express.Router()
const Account = require("../Controllers/User/Account")

// ----------- User Account Routes ------------
UserRouter.get("/me", Account.Profile)
UserRouter.put('/me', Account.UpdateProfile)
UserRouter.post('/me/upload-profile-image', Account.UploadProfileImage)

module.exports = { UserRouter }
