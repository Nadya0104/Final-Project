/*
    CartList component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import './App.css';
import { Link } from 'react-router-dom';

function CartList({ cartItems, addItemToCart, decreaseItem, removeItem, totalCartPrice, dropdown }) {
    return (
        <div className="cart-dropdown">
            <ul className="ul-style">
                <h3>Shopping Cart</h3>
                {/* Map over cart items to display each item in the cart */}
                {cartItems.map(item => (                    
                    <li key={item._id} className="list-style"> 
                        {/* Display the item's image */}
                        <img src={item.image} alt={item.name} />
                        {/* Display the item's name */}
                        <p>{item.name}</p>
                        <div>
                            {/* Display the quantity of the item */}
                            <p>{item.quantity}</p>
                            <div className="counter">  
                                {/* Button to increase the quantity of the item */}
                                <button onClick={() => addItemToCart(item)}>+</button>
                                {/* Button to decrease the quantity of the item */}
                                <button onClick={() => decreaseItem(item)}>-</button>
                            </div>
                        </div> 
                        {/* Display the price of the item */}
                        <p>{item.price}$</p>
                        {/* Display the total price for this item (quantity * price) */}
                        <p>Total price: {item.totalPrice}$ </p>
                        {/* Button to remove the item from the cart */}
                        <button onClick={() => removeItem(item)}>Remove</button>
                    </li>
                ))}
                {/* Display the total price of the cart */}
                <p><b>Total Price: {totalCartPrice}$</b></p>
                {/* Link to the OrderPage component, with a function to close the dropdown menu */}
                <Link to="/orderPage" className="MakeAnOrder" onClick={() => dropdown()}>Make An Order</Link>
            </ul>
        </div>
    )
}
export default CartList;
