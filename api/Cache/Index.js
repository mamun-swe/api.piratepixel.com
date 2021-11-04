const redis = require("redis")

const REDIS_PORT = process.env.REDIS_PORT || 5002
const RedisClient = redis.createClient(REDIS_PORT)

// Category name list cache
const CategoryList = async (req, res, next) => {
    try {
        const key = 'categoryList'
        RedisClient.get(key, (error, results) => {
            if (results) {
                return res.status(200).json({
                    data: JSON.parse(results)
                })
            } else {
                next()
            }
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Tags list cache
const Tags = async (req, res, next) => {
    try {
        const key = 'tags'
        RedisClient.get(key, (error, results) => {
            if (results) {
                return res.status(200).json({
                    data: JSON.parse(results)
                })
            } else {
                next()
            }
        })
    } catch (error) {
        if (error) next(error)
    }
}

// List of my uploaded media
const MyMedia = async (req, res, next) => {
    try {
        const key = req.user.id
        RedisClient.get(key, (error, results) => {
            if (results) {
                return res.status(200).json({
                    status: true,
                    data: JSON.parse(results)
                })
            } else {
                next()
            }
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Cache home data
const Home = async (req, res, next) => {
    try {
        const key = "home"
        RedisClient.get(key, (error, results) => {
            if (results) {
                return res.status(200).json({
                    status: true,
                    data: JSON.parse(results)
                })
            } else {
                next()
            }
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Cache dashboard data
const Dashboard = async (req, res, next) => {
    try {
        const key = "dashboard"
        RedisClient.get(key, (error, result) => {
            if (result) {
                return res.status(200).json({
                    status: true,
                    data: JSON.parse(result)
                })
            } else {
                next()
            }
        })
    } catch (error) {
        if (error) next(error)
    }
}

module.exports = {
    RedisClient,
    CategoryList,
    Tags,
    MyMedia,
    Home,
    Dashboard
}