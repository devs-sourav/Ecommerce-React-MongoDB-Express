const express = require('express')
const registrationController = require('../../controllers/registrationController')
const loginController = require('../../controllers/loginController')
const emailVerificationOtpMatch = require('../../controllers/emailVerificationOtpMatchController')
const forgetPasswordController = require('../../controllers/forgetPasswordController')
const changePasswordController = require('../../controllers/changePasswordController')
const allUserController = require('../../controllers/allUserController')
const _ = express.Router()

_.post("/registration",registrationController)
_.post("/login",loginController)
_.post("/emailVerificationOtpMatch",emailVerificationOtpMatch)
_.post("/forgetpassword",forgetPasswordController)
_.post("/changepassword",changePasswordController)
_.get("/alluserlist",allUserController)

module.exports = _

