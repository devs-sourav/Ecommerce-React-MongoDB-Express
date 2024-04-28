let Product = require("../model/productSchema")

let allProductController = async(req,res)=>{

    let productlist = await Product.find({})
    console.log(productlist)
    res.send(productlist)

}

module.exports = allProductController