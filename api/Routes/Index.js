const express = require('express')
const router = express.Router()
const { Admin, User } = require("../Middleware/Permission")

// const { webRouter } = require("./Web")
const { AuthRouter } = require("./Auth")
const { AdminRouter } = require("./Admin")
// const { customerRouter } = require("./Customer")

// router.use("/web", webRouter)
router.use("/auth", AuthRouter)
router.use("/admin", Admin, AdminRouter)
// router.use("/customer", Customer, customerRouter)

module.exports = router