const express = require('express')
const AuthRouter = express.Router()
const AdminAuth = require("../Controllers/Auth/Admin")
const UserAuth = require("../Controllers/Auth/User")

// Admin auth
AuthRouter.post("/admin/login", AdminAuth.Login)
AuthRouter.post("/admin/reset", AdminAuth.Reset)

// User auth
AuthRouter.post("/user/login", UserAuth.Login)
AuthRouter.post("/user/register", UserAuth.Register)

module.exports = { AuthRouter }
