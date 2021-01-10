import "./Products.css"

function Products({products}){ 

    return (
        <div className="products">
            { 
            products.map((product) => (
                <div>
                {product.visibility===true &&
                    <div className="product"> 
                        <img className="productImage" src={product.image} alt="something"/>
                        <div className="productDetails"> 
                            <h4>{product.name}</h4>
                            <h4>{product.price}</h4>
                        </div>
                    </div>
                }
                </div>
            ))}
        </div>
    ); 
}



export default Products