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
const multer  = require('multer')
const allStoreController = require('../../controllers/allStoreController')
const createStoreController = require('../../controllers/createStoreController')
const viewStoreController = require('../../controllers/viewStoreController')
const approveStoreController = require('../../controllers/approveStoreController')
const idleStoreController = require('../../controllers/idleStoreController,js')
const deleteStoreController = require('../../controllers/deleteStoreController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log("file", file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    }
})
  
const upload = multer({ storage: storage })

_.get("/viewcategory", viewCategoryController)
_.get("/allsubcategory", allSubCategoryController);
_.get("/allstore/:id", allStoreController);
_.get("/viewstore", viewStoreController);



_.post("/addcategory", addCategory)
_.post("/addproduct", upload.single("avatar"), addProductController)
_.post("/subcategory", subCategoryController);
_.post("/editcategory", editCategoryController);
_.post("/editsubcategory", editSubCategory);
_.post("/deletecategory", deleteCategoryController);
_.post("/deletesubcategory", deleteSubCategory);
_.post("/deletestore", deleteStoreController);
_.post("/approvecategory", approveCategoryController);
_.post("/approvestore", approveStoreController);
_.post("/idlecategory", idleCategoryController);
_.post("/idlestore", idleStoreController);
_.post("/idlesubcategory", idleSubCategoryController);
_.post("/createstore", createStoreController);


module.exports = _