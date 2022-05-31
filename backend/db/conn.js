const res = require('express/lib/response');
const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017';
const databaseName = 'ProductDb';

class ProductDb {
    constructor() {
        this._connect();
        this.productModel = this.createModel();
    }

    _connect() {
        mongoose.connect(URL + '/' + databaseName)
            .then(() => console.log("Database connected successfully"))
            .catch(err => console.error(err));
    }

    createModel() {
        const productSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique: true
            },
            type: {
                type: String,
                required: true,
                unique: false,
                lowercase: true
            },
            price: {
                type: Number,
                required: true,
                unique: false
            },
            quantityInStock: {
                type: Number,
                required: true,
                unique: false
            }
        });

        return mongoose.model("Product", productSchema);
    }
}

module.exports = new ProductDb();