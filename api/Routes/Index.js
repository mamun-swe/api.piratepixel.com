const express = require('express')
const router = express.Router()
const { Admin, User } = require("../Middleware/Permission")

// const { webRouter } = require("./Web")
const { AuthRouter } = require("./Auth")
const { AdminRouter } = require("./Admin")
const { UserRouter } = require("./User")

// router.use("/web", webRouter)
router.use("/auth", AuthRouter)
router.use("/admin", Admin, AdminRouter)
router.use("/user", User, UserRouter)

module.exports = router