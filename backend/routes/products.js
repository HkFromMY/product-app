const express = require('express');
const productRouter = express.Router();
const dbo = require('../db/conn');

productRouter.get('/products', (req, res) => {
    res.send("Hello world HAHAHA");
});

module.exports = productRouter;