
const Category = require('../model/categorySchema')
let addCategory = async(req,res)=>{
    let {name,ownerId} = req.body

    let category = new Category({
        name:name,
        ownerId:ownerId
    })

    category.save()
    

    res.send({success:"Successfully Created"})

}

module.exports = addCategory