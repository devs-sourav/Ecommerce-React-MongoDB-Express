const express = require('express')
const registrationController = require('../../controllers/registrationController')
const loginController = require('../../controllers/loginController')
const emailVerificationOtpMatch = require('../../controllers/emailVerificationOtpMatchController')
const _ = express.Router()

_.post("/registration",registrationController)
_.post("/login",loginController)
_.post("/emailVerificationOtpMatch",emailVerificationOtpMatch)

module.exports = _

