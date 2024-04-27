const Store = require("../model/storeSchema")


let idleStoreController = async (req,res)=>{
    let {id} = req.body

    await Store.findOneAndUpdate({_id:id},{ isActive: false })

    res.send({success:"Category Status is idle"})

    
}

module.exports = idleStoreController