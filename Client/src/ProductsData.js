/*
    ProductData component
*/

import ProductGrid from "./productGrid";
import React, { useState, useEffect } from 'react';

function ProductsData({addItemToCart}) {
    const [products, setProducts] = useState([]); // State to hold the products data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors during data fetching
    useEffect(() => {
        // Function to fetch products from the server
        const fetchProducts = async () => {
            setLoading(false); // Set loading to false
            try {
                // Fetch products from the server
                const response = await fetch('http://localhost:5000/home');
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }               
                setProducts(data); // Update the products state with the fetched data
            } catch (error) {
                setError(error); // Update the error state if an error occurs during fetching               
            }
        };
        fetchProducts(); // Call the fetchProducts function
    }, []); 
    if (loading) { // Render a loading message if the data is still being fetched
        return <div>Loading...</div>; 
    }
    if (error) { // Render an error message if an error occurred during data fetching
        return <div>Error: {error.message}</div>; 
    }
    // Render the ProductGrid component
    return (
        <ProductGrid items={products} addItemToCart={addItemToCart} />
    )
}
export default ProductsData;
