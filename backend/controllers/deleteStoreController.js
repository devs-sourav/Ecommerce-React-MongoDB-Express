const Store = require("../model/storeSchema")


let deleteStoreController = async (req,res)=>{
    let {id} = req.body

    await Store.findByIdAndDelete({_id:id})

    res.send({success:"Category Delete Successfull"})

    
}

module.exports = deleteStoreController