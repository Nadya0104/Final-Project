/*
    Navbar component
*/

import React, { useState } from 'react';
import './App.css';
import CartList from './CartList';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';

function Navbar({ cartItems, addItemToCart, decreaseItem, removeItem, totalCartPrice, successOrder, setSuccessOrder }) {
    const [isOpen, setDropdown] = useState(false); // State to manage the visibility of the dropdown menu
    // Toggle the dropdown menu visibility
    const dropdown = () => {
        setDropdown(!isOpen);
    };
    // Reset the success order status when navigating to the home page
    const checkSuccessOrder = () => {
        if (successOrder) {
            setSuccessOrder(false)
        }
    }
    return (
        <nav className="navbar">
            <div className="navbar_left">
                {/* Display the logo image */}
                <img src={logo} alt="logo" />
                {/* Link to the Home page */}
                <Link to="/home" className="homeLink" onClick={() => checkSuccessOrder()}>Home Page</Link>
                
            </div>
            {/* Button to toggle the shopping cart dropdown menu */}
            <button className="shoppingCart" onClick={dropdown} >
                {/* Display the number of items in the cart */}
                <span className="cart-quantity">{cartItems.length}</span>
                {/* Display the total price of items in the cart */}
                <span className="cart-total">{totalCartPrice}$</span>
            </button>
            {/* Conditionally render the CartList component if the dropdown menu is open */}
            {isOpen && (
                <CartList cartItems={cartItems} addItemToCart={addItemToCart} decreaseItem={decreaseItem} removeItem={removeItem} totalCartPrice={totalCartPrice} dropdown={dropdown} />
            )}
        </nav >
    ) 
}
export default Navbar;
