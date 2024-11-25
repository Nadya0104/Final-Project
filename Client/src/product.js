/*
    Product component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import './App.css';

function Product({ item, addItemToCart }) {
    return (
        <div className='product'>
            {/* Display the product's image */}
            <img src={item.image} alt={item.name} />
            {/* Display the product's name */}
            <h2 className="headline">{item.name}</h2>
            {/* Display the product's description and price */}
            <p>{item.text}<br></br><br></br><b>Price: {item.price}$</b></p>
            {/* Button to add the product to the cart */}
            <button onClick={() => addItemToCart(item)}>Add to cart</button>    
        </div>
    )
}
export default Product;
