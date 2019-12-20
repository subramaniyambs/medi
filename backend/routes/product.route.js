const express = require('express');
const app = express();
const productRoute = express.Router();

// Product model
let Product = require('../models/product');
let Purchased = require('../models/purchased');

// Add Product
productRoute.route('/add-product').post((req, res, next) => {
    console.log("add-product", req.body)
    Product.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log("test")
            res.json(data)
        }
    })
});

// Get all Product
productRoute.route('/getAllProducts').get((req, res) => {
    // let arr = [{ _id: 1, product_name: "test", price: "20", quantity: "33", type: "Tablets" },
    //     { _id: 2, product_name: "test", price: "20", quantity: "33", type: "Tablets" },
    //     { _id: 3, product_name: "test", price: "20", quantity: "33", type: "Tablets" }
    // ]
    // res.json(arr)
    Product.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// purchased Product
productRoute.route('/purchased-product').post((req, res, next) => {
    console.log("purchased-product", req.body)
    Purchased.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log("test")
            res.json(data)
        }
    })
});

// Get single Product
productRoute.route('/read-product/:id').get((req, res) => {
    Product.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Get type Product list
productRoute.route('/typeMedi/:type').get((req, res) => {
    console.log(req.params.type)
        // let arr = [{name: 'Bank A (Switzerland)', id: 'A'},
        // {name: 'Bank B (Switzerland)', id: 'B'},
        // {name: 'Bank C (France)', id: 'C'}]
        // res.json({ data: arr })
    Product.find({ type: req.params.type }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Product
productRoute.route('/update-product/:id').put((req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('product successfully updated!')
        }
    })
})

// Delete Product
productRoute.route('/delete-product/:id').delete((req, res, next) => {
    console.log("delete", req.params.id)
    Product.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = productRoute;