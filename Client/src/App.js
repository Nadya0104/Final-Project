/*
    Client side main component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import OrderPage from './OrderPage';
import SuccessOrder from './SuccessOrder';

function App() {
    const [cartItems, setCartItems] = useState([]); // State to manage items in the cart
    const [totalCartPrice, setTotalCartPrice] = useState(0); // State to manage the total price of items in the cart
    const [successOrder, setSuccessOrder] = useState(false); // State to manage whether an order submission was successful
    const [orderID, setOrderID] = useState(0); // State to store the order's ID    
    // Function to add an item to the cart
    const addItemToCart = (item) => {
        // Check if the item is already in the cart
        const itemExists = cartItems.find(cartItem => cartItem._id === item._id);
        if (itemExists) { // If item is already in the cart, update its quantity and total price
            setCartItems(
                cartItems.map(cartItem =>
                    cartItem._id === item._id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                            totalPrice: cartItem.totalPrice + cartItem.price
                        } 
                        : cartItem

                )
            );
        } else { // If item is not in the cart, add it as a new item with quantity 1
            setCartItems([...cartItems, {
                ...item,
                quantity: 1,
                totalPrice: item.price
            }]);
        }
    };

    // Function to decrease the quantity of an item in the cart
    const decreaseItem = (item) => {
        if (item.quantity > 1) { // If more than one of the item is in the cart, decrease its quantity and total price
            setCartItems(
                cartItems.map(cartItem =>
                    cartItem._id === item._id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                            totalPrice: cartItem.totalPrice - cartItem.price
                        }
                        : cartItem
                )
            );
        } else { // If only one of the item is in the cart, remove it
            removeItem(item);
        }
    };

    // Function to remove an item from the cart
    const removeItem = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
    };

    // useEffect to calculate and update the total cart price whenever cart items change
    useEffect(() => {
        const calculateTotalCartPrice = () => {
            return cartItems.reduce((total, item) => total + item.totalPrice, 0);
        };
        setTotalCartPrice(calculateTotalCartPrice());
        if (cartItems.length > 0) { // Save cart items to localStorage if there are any items in the cart
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        console.log(localStorage.getItem('cartItems'));
    }, [cartItems]);

    // useEffect to load cart items from localStorage when the component mounts
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    return (      
        <Router>
            {/* Render the Navbar component and pass down the necessary props */}
            < Navbar cartItems={cartItems} addItemToCart={addItemToCart} decreaseItem={decreaseItem} removeItem={removeItem} totalCartPrice={totalCartPrice} successOrder={successOrder} setSuccessOrder={setSuccessOrder} />
            {/* Define the routes for different pages */}
            <Routes>
                {/* Route for the Home page */}
                <Route path="/home" element={<Home addItemToCart={addItemToCart} />} />
                {/* Route for the OrderPage, conditionally rendering SuccessOrder if order was successful */}
                <Route path="/orderPage" element={successOrder ? (<SuccessOrder orderID={orderID} />) : (<OrderPage cartItems={cartItems} totalCartPrice={totalCartPrice} setTotalCartPrice={setTotalCartPrice} setCartItems={setCartItems} setOrderID={setOrderID} setSuccessOrder={setSuccessOrder} />)} />
            </Routes>
        </Router>                                         
    );
}
export default App;
