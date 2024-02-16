const subCategory = require("../model/subCategorySchema");

let allSubCategoryController = async (req, res) => {
    let data = await subCategory.find({}).populate({
        path: 'categoryId',
        populate: { path: 'ownerId' } // Populate the ownerId field in the category document
      });

    res.send(data);
    console.log(data);
};

module.exports = allSubCategoryController;