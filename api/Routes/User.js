const express = require('express')
const UserRouter = express.Router()
const Account = require("../Controllers/User/Account")
const Media = require("../Controllers/User/Media")

// ----------- User Account Routes ------------
UserRouter.get("/me", Account.Profile)
UserRouter.put('/me', Account.UpdateProfile)
UserRouter.post('/me/upload-profile-image', Account.UploadProfileImage)

// ----------- User Media Routes ------------
UserRouter.get("/media", Media.Index)
UserRouter.post("/media", Media.Store)

module.exports = { UserRouter }
