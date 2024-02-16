const Subcategory = require("../model/subCategorySchema")


let deleteSubCategory = async (req,res)=>{
    let {id} = req.body

    await Subcategory.findByIdAndDelete({_id:id})

    res.send({success:"SubCategory Delete Successfull"})

    
}

module.exports = deleteSubCategory