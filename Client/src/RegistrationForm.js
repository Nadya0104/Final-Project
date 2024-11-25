/*
    RegistrationForm component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import React, { useState } from 'react';
import './App.css';

function RegistrationForm({ totalCartPrice, setTotalCartPrice, setCartItems, setOrderID, setSuccessOrder }) {
    const [error, setError] = useState(null); // State to handle general errors
    const [errors, setErrors] = useState({}); // State to hold validation errors
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        shipping: 'standard', // Default shipping option
    });
    const [isCorrect, setIsCorrect] = useState(true); // State to track form validity

    // Handle changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle changes in shipping option
    const handleShippingChange = (e) => {
        const selectedShipping = e.target.value;
        let updatedTotalPrice = totalCartPrice;
        // Update total price based on shipping option
        if (selectedShipping === 'express') {
            updatedTotalPrice += 10;
        }
        else {
            updatedTotalPrice -= 10;
        }
        setFormData({
            ...formData,
            shipping: selectedShipping,
        });
        setTotalCartPrice(updatedTotalPrice);
    };

    // Validate form data and handle submission
    const checkForm = (event) => {
        event.preventDefault();
        let tempErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/; // Matches only letters
        const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Matches email address pattern
        // Validate name
        if (!nameRegex.test(formData.name)) {
            tempErrors.name = "Name should contain only letters";
            setIsCorrect(false);    
        }
        // Validate phone number
        if (!phoneRegex.test(formData.phone)) {
            tempErrors.phone = "Phone should contain 10 digits";
            setIsCorrect(false);
        }
        // Validate email
        if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Email is not correct";
            setIsCorrect(false);
        }
        // Check if cart is empty
        if (totalCartPrice === 0) {
            tempErrors.totalCartPrice = "Empty cart";
            setIsCorrect(false);
        }
        setErrors(tempErrors); // Set validation errors
        if (isCorrect) { // If no validation errors, proceed with form submission
            submitRegistration();
        }
    };

    // Handle form submission
    const submitRegistration = async () => {
        try {
            const response = await fetch('http://localhost:5000/orderPage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address
                })
            });
            const data = await response.json(); 
            if (!response.ok) {
                throw new Error(data.error);
            }
            setOrderID(data.orderID); // Set the order ID
            setCartItems([]); // Clear the cart items
            setSuccessOrder(true); // Set success state to true
        } catch (error) {
            setError(error); // Set error state if an error occurs
        }
    };

    // Display error message if there's an error
    if (error) { 
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="registration-form-container">
            <form className="registration-form" onSubmit={checkForm}>
                <h2>Registration</h2>
                {/* Input for full name */}
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                />  
                {errors.name && <p>{errors.name}</p>}
                {/* Input for email address */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                />
                {errors.email && <p>{errors.email}</p>}
                {/* Input for phone number */}
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                />
                {errors.phone && <p>{errors.phone}</p>}
                {/* Input for residential address */}
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Residential Address"
                />
                {/* Shipping options */}
                <select id="shipping" name="shipping" value={formData.shipping} onChange={handleShippingChange}>
                    <option value="standard">Standard Shipping (14 business days) - Free</option>
                    <option value="express">Express Shipping (3 business days) - $10</option>                    
                </select>
                <h3>Total Price: {totalCartPrice}$</h3>
                {/* Display cart validation error */}
                {errors.totalCartPrice && <p>{errors.totalCartPrice}</p>}
                {/* Submit button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default RegistrationForm;

