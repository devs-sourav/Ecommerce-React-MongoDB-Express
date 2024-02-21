const Category = require("../model/categorySchema")


let idleCategoryController = async (req,res)=>{
    let {id} = req.body

    await Category.findOneAndUpdate({_id:id},{ isActive: false })

    res.send({success:"Category Status is idle"})

    
}

module.exports = idleCategoryController