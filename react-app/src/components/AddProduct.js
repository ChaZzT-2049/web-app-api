import { useState } from "react"
import {useNavigate} from "react-router-dom"

const AddProduct = ({newNotification}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(1);

    return <div>
        <form onSubmit={async(e)=>{
            e.preventDefault()
            const response = await fetch("/api/products-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    quantity
                })
            }).catch((error) => console.error("Error:", error))
            const status = await response.json()
            if(status.created){
                newNotification(status.message)
                navigate("/")
            }
        }}>
            <fieldset>
                <legend>Agregar Producto</legend>
                <label htmlFor="name">Nombre</label> <br/>
                <input onChange={(e)=>{setName(e.target.value)}} value={name} required type="text" id="name" placeholder="Escribe el nombre"/><br/>
                <label htmlFor="description">Descripcion</label><br/>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} required id="description" placeholder="Escribe una descripcion"></textarea><br/>
                <label htmlFor="quantity">Cantidad</label><br/>
                <input onChange={(e)=>{setQuantity(e.target.value)}} value={quantity} required type="number" id="quantity" placeholder="Ingresa la cantidad" /><br/>
            </fieldset>
            <button type="submit">Agregar</button>
        </form>
    </div>
}
export default AddProduct