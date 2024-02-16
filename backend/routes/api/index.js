const express = require('express')
const _ = express.Router()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoute')

_.use("/auth",authRoutes)
_.use("/product",productRoutes)


module.exports = _