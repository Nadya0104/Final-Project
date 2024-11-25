/*
    Server side JS file
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

// Import necessary modules and packages
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const mongojs = require("mongojs");
const cors = require('cors');
const app = express();
require('dotenv').config();
// Connect to the MongoDB database and specify the collections to use
const productsDB = mongojs(process.env.MONGO_URI, ['final_Nadya_Ron_products']);
const ordersDB = mongojs(process.env.MONGO_URI, ['final_Nadya_Ron_orders']);
// Enable CORS for requests from the specified origin
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json()); // Middleware to parse JSON bodies in incoming requests

// Endpoint to retrieve all products from the database
app.get('/home', (req, res) => {
    productsDB.final_Nadya_Ron_products.find((err, docs) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(docs); // Send the retrieved documents as JSON response
        }
    });
});

// Endpoint to handle order submissions
app.post('/orderPage', (req, res) => {
    // Regular expressions for validating input fields
    const nameRegex = /^[A-Za-z\s]+$/; // Matches only letters
    const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Matches standard email format
    // Validate the 'Name' field
    if (!nameRegex.test(req.body.name)) {
        return res.status(400).json({ error: 'Name should contain letters only.' });
    }
    // Validate the 'Phone' field 
    if (!phoneRegex.test(req.body.phone)) {
        return res.status(400).json({ error: 'Phone number should be exactly 10 digits.' });
    }
    // Validate the 'Email' field 
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email format. The correct format is : username@domain' });
    }
    // Create a new order object with the validated data
    const newOrder = {
        'orderID': uuidv4(), // Generate a unique ID for the order
        'Name': req.body.name,
        'phone': req.body.phone,
        'email': req.body.email,
        'address': req.body.address,
    }
    // Insert the new order into the database
    ordersDB.final_Nadya_Ron_orders.insert(newOrder, (err, doc) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add user.' });
        }
        else {
            res.status(201).json(doc);
        }
    });
});

// Start the server and listen on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
