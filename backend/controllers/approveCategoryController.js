const Category = require("../model/categorySchema");

let approveCategoryController = async (req, res) => {
    let { isActive, id } = req.body;

    await Category.findByIdAndUpdate({_id:id},{isActive:isActive})

    res.send({success:"Status Change"})
};

module.exports = approveCategoryController;