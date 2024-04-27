
const Store = require('../model/storeSchema')

let viewStoreController = async(req,res)=>{

    let data = await Store.find({}).populate("ownerId");

    res.send(data)

}

module.exports = viewStoreController