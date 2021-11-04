const express = require("express")
const path = require("path")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const nocache = require('nocache')
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config()

const app = express()
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(nocache())

app.use('/uploads/users', express.static('uploads/users/'))
app.use('/uploads/media', express.static('uploads/media/'))

// Routes
const Route = require('./api/Routes/Index')

// API URL's
app.use("/api/v1/", Route)

app.get('/', async (req, res) => {
    res.send("Wow!😯 are you here🙃🙃 but you have no access!!! 😜😜😜")
})

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message: error.message
        })
    }
    if (error.status == 400) {
        return res.status(400).json({
            message: "Bad request"
        })
    }
    if (error.status == 401) {
        return res.status(401).json({
            message: "You have no permission"
        })
    }
    return res.status(500).json({
        message: "Internal Server Error"
    })
})

// DB Connection here
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
    useFindAndModify: false
})
    .then(() => console.log("Database connected"))
    .catch(error => {
        if (error) console.log('Failed to connect DB')
    })

// App Port
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`App running on ${port} port`)
})
