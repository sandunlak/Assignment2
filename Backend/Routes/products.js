const express = require("express");
const router = express.Router();
const Product = require("../Models/ProductModel");

// Add a new product
router.route("/addproduct").post((req, res) => {
    const { name, price, quantity } = req.body;

    const newProduct = new Product({
        name,
        price,
        quantity,
    });

    newProduct
        .save()
        .then(() => {
            res.json({ message: "Your Product Added" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding Product", details: err.message });
        });
});

// Fetch all products
router.route("/showproduct").get((req, res) => {
    Product.find() 
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error("Error fetching Product details:", err);
            res.status(500).json({ error: "Error fetching Product details", details: err.message });
        });
});

// Delete a product
router.route("/delete/:id").delete(async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).send({ message: "Your Product deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Error deleting Product", error: err.message });
    }
});

// Update a product
router.route("/update/:id").put(async (req, res) => {
    const productId = req.params.id;
    const { name, price, quantity } = req.body; 

    const updateProduct = {
        name,
        price,
        quantity,
    };

    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            updateProduct,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).send({ message: "Product details updated", product });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Error updating Product details", error: err.message });
    }
});

module.exports = router;