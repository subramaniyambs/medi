const express = require('express');
const app = express();
const productRoute = express.Router();

// Product model
let Product = require('../models/product');

// Add Product
productRoute.route('/add-product').post((req, res, next) => {
    console.log("add-product")
    Product.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Product
productRoute.route('/').get((req, res) => {
    Product.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json({ msg: "hello" })
                //res.json(data)
        }
    })
})

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