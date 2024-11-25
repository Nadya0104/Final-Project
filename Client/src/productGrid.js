/*
    ProductGrid component
    Submitted by:
    Ambartzumov Nadezda 207267113
    Ohana Ron 206815557
*/

import Product from "./product";
import './App.css'

function ProductGrid({ items, addItemToCart }) {
    return (
        <div className='product-grid'>
            {/* Map over the items array and render a Product component for each item */}
            {
                items.map(item => (
                    <Product key={item._id} item={item} addItemToCart={addItemToCart} />
                ))}
        </div>
    )
}
export default ProductGrid;
