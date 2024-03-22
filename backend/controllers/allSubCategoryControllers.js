const subCategory = require("../model/subCategorySchema");

let allSubCategoryController = async (req, res) => {
  try {
      let data = await subCategory.find({})
          .populate({
              path: 'categoryId',
              populate: {
                  path: 'ownerId'
              }
          });

      res.send(data);
      console.log(data);
  } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = allSubCategoryController;