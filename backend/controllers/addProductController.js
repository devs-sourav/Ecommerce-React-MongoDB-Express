const Products = require("../model/productSchema");
let addProductController = (req, res) => {
    let { name, description,price,discount,category,quantity, rating,brand, status,ownerId } = req.body;

    let product = new Products({
        name: name,
        description: description,
        price: price,
        discount: discount,
        category: category,
        quantity: quantity,
        rating: rating,
        brand: brand,
        status: status,
        ownerId:ownerId
    });
    product.save();
    console.log(product);
    res.send(product)
};

module.exports = addProductController;