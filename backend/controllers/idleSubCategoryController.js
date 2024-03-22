const SubCategory = require("../model/subCategorySchema");


let idleSubCategoryController = async (req,res)=>{
    let {id} = req.body

    await SubCategory.findOneAndUpdate({_id:id},{ isActive: false })

    res.send({success:"Category Status is idle"})

    
}

module.exports = idleSubCategoryController