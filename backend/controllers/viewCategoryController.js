const Category = require('../model/categorySchema')

let viewCategoryController = async(req,res)=>{

    let data = await Category.find({}).populate("ownerId");

    res.send(data)

}

module.exports = viewCategoryController