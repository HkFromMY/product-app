import React from 'react';
import './Styles/AddProduct.css';

export default function AddProduct() {
    const [newProduct, setNewProduct] = React.useState({
        name: "",
        type: "",
        price: "",
        quantityInStock: ""
    });

    function handleChange(event) {
        setNewProduct(oldProduct => {
            return {
                ...oldProduct,
                [event.target.name]: event.target.value
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/products/add', {
            headers: {
                "content-type": "application/json" // this is important
            },
            method: 'POST',
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(result => {
                setNewProduct({
                    name: "",
                    type: "",
                    price: "",
                    quantityInStock: ""
                });
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="add-product-page">
            <div className="form-container">
                <form className="product-form" onSubmit={(event) => handleSubmit(event)}>
                    <h1 className="form-title">Product Form</h1>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Enter product's name here" 
                        value={newProduct.name} 
                        onChange={(event) => handleChange(event)} 
                    />

                    <label htmlFor="type">Type: </label>
                    <input 
                        type="text" 
                        name="type" 
                        id="type" 
                        placeholder="Enter product's type here" 
                        value={newProduct.type} 
                        onChange={(event) => handleChange(event)} 
                    />

                    <label htmlFor="price">Price: </label>
                    <input 
                        type="text" 
                        name="price" 
                        id="price" 
                        placeholder="Enter product's price here" 
                        value={newProduct.price} 
                        onChange={(event) => handleChange(event)} 
                    />

                    <label htmlFor="quantity">Quantity: </label>
                    <input 
                        type="text" 
                        name="quantityInStock" 
                        id="quantity" 
                        placeholder="Enter product's quantity here" 
                        value={newProduct.quantityInStock} 
                        onChange={(event) => handleChange(event)} 
                    />
                    
                    <div className="product-button-group">
                        <button type="submit" className="add-button">Add product</button>
                    </div>
                </form>
            </div>
        </div>
    );
}