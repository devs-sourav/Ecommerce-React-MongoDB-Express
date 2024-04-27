const Store = require("../model/storeSchema");


let allStoreController = async (req, res) => {
  const { id } = req.params;
  let data = await Store.find({ ownerId: id });
  console.log(id)
  console.log(data)

  res.send(data);
};

module.exports = allStoreController;