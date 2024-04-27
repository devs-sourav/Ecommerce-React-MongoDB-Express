const Store = require("../model/storeSchema");

let approveStoreController = async (req, res) => {
    let { isActive, id } = req.body;

    await Store.findByIdAndUpdate({_id:id},{isActive:isActive})

    res.send({success:"Status Change"})
};

module.exports = approveStoreController;