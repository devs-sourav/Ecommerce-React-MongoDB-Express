const express = require('express')
const addCategory = require('../../controllers/addCategory')
const viewCategoryController = require('../../controllers/viewCategoryController')
const subCategoryController = require('../../controllers/subCategoryController')
const addProductController = require('../../controllers/addProductController')
const _ = express.Router()

_.post("/addcategory", addCategory)
_.post("/viewcategory", viewCategoryController)
_.post("/addproduct", addProductController)
_.post("/subcategory", subCategoryController);


module.exports = _