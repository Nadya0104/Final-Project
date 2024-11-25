/*
    OrderPage component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import RegistrationForm from "./RegistrationForm";

function OrderPage({cartItems, totalCartPrice, setTotalCartPrice, setCartItems, setOrderID, setSuccessOrder}) {
    return (
        <div>
            <div className="order_page">
                <ul className="ul-style">
                    {/* Display the heading for the order list */}
                    <h1 className="headline"><b>Order List</b></h1>
                    {/* Map over cartItems and display each item in the order list */}
                    {cartItems.map(item => (
                        <li key={item._id} className="list-style">
                            {/* Display the item's image */}
                            <img src={item.image} alt={item.name} />
                            {/* Display the item's name */}
                            <p>{item.name}</p>
                            {/* Display the quantity of the item */}
                            <p>Quantity: {item.quantity}</p>
                            {/* Display the price per unit of the item */}
                            <p>Price per unit: {item.price}$</p>
                            {/* Display the total price for the item (quantity * price) */}
                            <p>Total price: {item.totalPrice}$ </p>
                        </li>
                    ))}                    
                </ul>
            </div>
            {/* Render the RegistrationForm component */}
            <RegistrationForm totalCartPrice={totalCartPrice} setTotalCartPrice={setTotalCartPrice} setCartItems={setCartItems} setOrderID={setOrderID} setSuccessOrder={setSuccessOrder} />
        </div>        
    )
}
export default OrderPage;
