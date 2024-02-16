const Category = require("../model/categorySchema")


let deleteCategoryController = async (req,res)=>{
    let {id} = req.body

    await Category.findByIdAndDelete({_id:id})

    res.send({success:"Category Delete Successfull"})

    
}

module.exports = deleteCategoryController