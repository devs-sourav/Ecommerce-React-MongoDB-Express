const express = require('express')
const addCategory = require('../../controllers/addCategory')
const viewCategoryController = require('../../controllers/viewCategoryController')
const subCategoryController = require('../../controllers/subCategoryController')
const addProductController = require('../../controllers/addProductController')
const allSubCategoryController = require('../../controllers/allSubCategoryControllers')
const editCategoryController = require('../../controllers/editCategoryController')
const editSubCategory = require('../../controllers/editSubCategory')
const deleteCategoryController = require('../../controllers/deleteCategoryController')
const deleteSubCategory = require('../../controllers/deleteSubCategory')
const approveCategoryController = require('../../controllers/approveCategoryController')
const idleCategoryController = require('../../controllers/idleCategoryController')
const approveSubcategoryController = require('../../controllers/approveSubcategoryController')
const idleSubCategoryController = require('../../controllers/idleSubCategoryController')
const _ = express.Router()

_.post("/addcategory", addCategory)
_.get("/viewcategory", viewCategoryController)
_.post("/addproduct", addProductController)
_.post("/subcategory", subCategoryController);
_.get("/allsubcategory", allSubCategoryController);
_.post("/editcategory", editCategoryController);
_.post("/editsubcategory", editSubCategory);
_.post("/deletecategory", deleteCategoryController);
_.post("/deletesubcategory", deleteSubCategory);
_.post("/approvecategory", approveCategoryController);
_.post("/approvesubcategory", approveSubcategoryController);
_.post("/idlecategory", idleCategoryController);
_.post("/idlesubcategory", idleSubCategoryController);


module.exports = _