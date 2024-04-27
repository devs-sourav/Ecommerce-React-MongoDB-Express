const Products = require("../model/productSchema");
let addProductController = (req, res) => {
    let { name, description, regularprice, salesprice, quantity } = req.body;

    let product = new Products({
        name: name,
        description: description,
        image: `/uploads/${req.file.filename}`,
        regularprice: regularprice,
        salesprice: salesprice,
        quantity: quantity,
    });
    product.save();
    res.send({ success: "Product Created" });
};

module.exports = addProductController;