import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    useLayoutEffect(()=>{
        async function getProducts(){
            const response = await fetch("/api/products-get");
            const productsApi = await response.json();
            setProducts(productsApi)
        }
        getProducts()
    },[])
    return <section>
        <h3>Products</h3>
        <ul>
            {
                products.map((product) => <li key={product.id}>
                    {product.name}: <br />
                    {product.description} <b>{product.quantity}</b> 
                    <button onClick={()=>{navigate("/edit", {state: product})}}>Editar</button>
                </li>)
            }
        </ul>
    </section>
}
export default Products