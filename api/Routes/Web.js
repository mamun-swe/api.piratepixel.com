const express = require("express");
const WebRouter = express.Router();

const Category = require("../Controllers/Web/Category");
const Tags = require("../Controllers/Web/Tags");
const Home = require("../Controllers/Web/Home");
const Photos = require("../Controllers/Web/Photos");
const User = require("../Controllers/Web/User");
const Search = require("../Controllers/Web/Search");

// ------ Home -------
WebRouter.get("/home", Home.Index);

// ------ Category -------
WebRouter.get("/category", Category.Index);
WebRouter.get("/category/:id", Category.Show);

// ------ Tags -------
WebRouter.get("/tags", Tags.Index);

// ------ Photos -------
WebRouter.get("/photos", Photos.Index);
WebRouter.get("/photos/:id", Photos.Show);

// ------ User -------
WebRouter.get("/user/:id", User.PublicProfile);
WebRouter.get("/user/uploads/:id", User.Uploads);

// ------ Search -------
WebRouter.get("/search-results", Search.SearchResults);

module.exports = { WebRouter };
