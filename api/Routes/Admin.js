const express = require('express')
const AdminRouter = express.Router()
const AdminController = require("../Controllers/Admin/Admin")
const CategoryController = require("../Controllers/Admin/Category")
const ProfileController = require("../Controllers/Admin/Profile")
const UserController = require("../Controllers/Admin/User")
const TagController = require("../Controllers/Admin/Tags")

// const DashboardController = require("../Controllers/Admin/Dashboard")


// ----------- Admin Routes ------------
AdminRouter.get("/", AdminController.Index)
AdminRouter.post("/", AdminController.Create)
AdminRouter.get("/me", ProfileController.MyProfile)

//  ---------- Category Routes -----------
AdminRouter.get("/category", CategoryController.Index)
AdminRouter.get("/category/:id", CategoryController.Show)
AdminRouter.post("/category", CategoryController.Store)
AdminRouter.put("/category/:id", CategoryController.Update)

//  --------- User Routes ------------ 
AdminRouter.get("/user", UserController.Index)

//  --------- Tag Routes ------------ 
AdminRouter.get("/tag", TagController.Index)
AdminRouter.post("/tag", TagController.Store)

// //  ---------- Dashboard Route -----------
// AdminRouter.get("/dashboard", DashboardController.Index)


module.exports = { AdminRouter }
