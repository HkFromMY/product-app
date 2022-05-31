const express = require('express');
const productRouter = express.Router();
const dbo = require('../db/conn');

productRouter.get('/products', (req, res) => {
    dbo.productModel
        .find()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.error(err));
});

productRouter.get('/products/:id', (req, res) => {
    dbo.productModel
        .find({ _id: req.params.id })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.error(err));
});

productRouter.post('/products/add', (req, res) => {
    let newProduct = dbo.productModel({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        quantityInStock: req.body.quantityInStock
    });

    newProduct.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.error(err));
});

productRouter.patch('/products/update/:id', (req, res) => {
    let newProduct = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        quantityInStock: req.body.quantityInStock
    };

    dbo.productModel
        .updateOne(
            {
                _id: req.params.id
            },
            newProduct,
            {
                new: true,
                runValidators: true
            }
        )
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.error(err));
});

productRouter.delete('/products/delete/:id', (req, res) => {
    dbo.productModel
        .deleteOne({ _id: req.params.id })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.error(err));
});

module.exports = productRouter;