import React from 'react';
import Home from './Pages/Home';
import ProductsPage from './Pages/ProductsPage';
import AddProduct from './Pages/AddProduct';
import About from './Pages/About';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
    const [selectedTab, setSelectedTab] = React.useState(1);
    return (
        <div className="App">
            <Router>
                <Navbar bg="dark" expand="lg" variant="dark"> 
                    <Container>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Link className={"option" + (selectedTab === 1 ? " active" : "")} to="/" onClick={() => setSelectedTab(1)}>Home</Link>
                                <Link className={"option" + (selectedTab === 2 ? " active" : "")} to="/about" onClick={() => setSelectedTab(2)}>About</Link>
                                <Link className={"option" + (selectedTab === 3 ? " active" : "")} to="/products" onClick={() => setSelectedTab(3)}>Shop</Link>
                                <Link className={"option" + (selectedTab === 4 ? " active" : "")} to="/products/add" onClick={() => setSelectedTab(4)}>Add Product</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/" element={<Home setSelectedTab={setSelectedTab} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/add" element={<AddProduct />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
