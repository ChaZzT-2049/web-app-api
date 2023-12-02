import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
const Products = ({newNotification}) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [dialog, setDialog] = useState(false)
    const [productDelete, setProductDelete] = useState({})
    async function getProducts(){
        const response = await fetch("/api/products-get");
        const productsApi = await response.json();
        setProducts(productsApi)
    }
    useLayoutEffect(()=>{
        getProducts()
    },[])
    return <section>
        <h3>Productos</h3>
        {products.length === 0 && <span>Agrega Productos</span>}
        <ul>
            {
                products.map((product) => <li className="item" key={product.id}>
                    <h4>{product.name}:</h4>
                    <span>{product.description} <b>{product.quantity}</b></span> 
                    <div className="buttons">
                        <button className="action" onClick={()=>{navigate("/edit", {state: product})}}>Editar</button>
                        <button className="delete" onClick={()=>{
                            setDialog(true)
                            setProductDelete(product)
                        }}>Eliminar</button>
                    </div>
                </li>)
            }
        </ul>
        <Modal open={dialog} close={()=>{setDialog(false)}}>
            <h3>¿Deseas eliminar el producto?</h3>
            <div className="info">
                <span>{productDelete.name}</span>: 
                <small> {productDelete.quantity}</small>
            </div>
            <div className="buttons">
                <button onClick={()=>{setDialog(false); setProductDelete({})}}>Cancelar</button>
                <button className="delete" onClick={async()=>{
                    const response = await fetch("/api/products-delete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: productDelete.id
                        })
                    }).catch((error) => console.error("Error:", error))
                    const status = await response.json()
                    if(status.deleted){
                        getProducts()
                        newNotification(status.message)
                    }else{
                        newNotification(status)
                    }
                    setProducts([])
                    setProductDelete({})
                    setDialog(false)
                }}>Eliminar</button>
            </div>
        </Modal>
    </section>
}
export default Products