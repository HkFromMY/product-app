import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Styles/Products.css';

export default function Products({ limit }) {
    const [products, setProducts] = React.useState([]);
    const [editingProduct, setEditingProduct] = React.useState({
        name: "",
        type: "",
        price: "",
        quantityInStock: ""
    });
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    React.useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(result => {
                setProducts(result);
            })
            .catch(err => console.error(err));
    }, []);

    function deleteProduct(id) {
        fetch(`http://localhost:5000/products/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                setProducts(oldProducts => {
                    return oldProducts.filter((product) => product._id !== id);
                });
                setShowDeleteModal(false);
            })
            .catch(err => console.error(err));
    }

    function handleChange(event) {
        let { name, value } = event.target;
        setEditingProduct(oldProduct => {
            return {
                ...oldProduct,
                [name]: value
            };
        });
    }

    function editProduct(event, id) {
        event.preventDefault();
        fetch(`http://localhost:5000/products/update/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editingProduct)
        })
            .then(res => res.json())
            .then(result => {
                setProducts(oldProducts => {
                    return oldProducts.map(oldProduct => {
                        if (oldProduct._id === id) 
                            return editingProduct;
                        return oldProduct;
                    });
                });
                setShowEditModal(false);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            {limit > 0 && <h1 className="product-page-title">Product List</h1>}
            <div className="product-cards">
                {
                    products.length > 0 ?
                    products.slice(0, limit).map(product => {
                        return (
                            <div className="product-card" key={product._id}>
                                <img
                                    src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/No_data_re_kwbl.svg" 
                                    alt="Empty stock"
                                    className="product-image"
                                    width="200"
                                    height="150"
                                />
                                <div className="product-info">
                                    <p className="product-title">{ product.name }</p>
                                    <div className="price-quantity">
                                        <p className="product-price">${ product.price }</p>
                                        <p className="product-quantity">{ product.quantityInStock } in stock</p>
                                    </div>
                                </div>
                                <div className="button-group">
                                    <button className="edit-button" onClick={() => {setShowEditModal(true); setEditingProduct(product)}}>Edit</button>
                                    <button className="delete-button" onClick={() => setShowDeleteModal(true)}>Delete</button>
                                </div>

                                {/* Edit Modal */}
                                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                                    <Modal.Header closeButton>
                                        Edit Form
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form className="edit-form" onSubmit={(event) => editProduct(event, product._id)}>
                                            <label htmlFor="name">New name:</label>
                                            <input type="text" name="name" id="name" value={editingProduct.name} onChange={(event) => handleChange(event)} />
                                            
                                            <label htmlFor="type">New type:</label>
                                            <input type="text" name="type" id="type" value={editingProduct.type} onChange={(event) => handleChange(event)} />
                                            
                                            <label htmlFor="price">New price:</label>
                                            <input type="text" name="price" id="price" value={editingProduct.price} onChange={(event) => handleChange(event)} />
                                            
                                            <label htmlFor="quantity">New quantity:</label>
                                            <input type="text" name="quantityInStock" id="quantity" value={editingProduct.quantityInStock} onChange={(event) => handleChange(event)} />

                                            <div className="button-group">
                                                <button type="submit" className="edit-button">Edit product</button>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>

                                {/* Delete Modal */}
                                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                    <Modal.Header closeButton>
                                        Delete confirmation
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure that you want to delete this item ({ product.name })?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                                        <Button variant="danger" onClick={() => deleteProduct(product._id)}>Confirm</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        );
                    })
                    :
                    <div className="no-stock-page">
                        <img
                            className="no-stock-img"
                            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/void_3ggu.svg" 
                            alt="no stock left in the shop"
                            width={limit > 0 ? "200" : "450"}
                            height={limit > 0 ? "200": "450"}
                        />
                        <h1 className="no-stock-text">No stocks available! Come again next time~</h1>
                    </div>
                }
            </div>
        </>
    );
}