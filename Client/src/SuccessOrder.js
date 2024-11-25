/*
    SuccessOrder component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import './App.css';

function SuccessOrder({ orderID }) {
    // Message indicating successful order and displaying the order ID 
    return (
        <h2 className="successMessage">Your Order Accepted Successfully! Thanks for buying <br></br> Your Order's ID Number Is : {orderID}</h2>
    )   
}
export default SuccessOrder;
