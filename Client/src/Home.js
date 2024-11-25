/*
    Home component
*/

import ProductsData from './ProductsData';
import image from './images/image.png'

function Home({ addItemToCart }) {
    return (
        <div>
            <div className="homePage">
                {/* Display the cover image */}
                <img src={image} alt="Shoes & fashion Store" />
                {/* Display the slogen */}
                <h2 className="headline">Shoes for Every Journey</h2>
                {/* Display a paragraph with store description */}
                <p className="paragraph">Welcome to Leh-Leha, your go-to destination for stylish and comfortable footwear. From trendy heels to cozy sneakers, we have the perfect pair for every occasion. Discover quality and style at Leh-Leha today!</p>
            </div>
            {/* Render the ProductsData component and pass down the addItemToCart function */}
            < ProductsData addItemToCart={addItemToCart} />
        </div>       
    )
}
export default Home;
