import { useState } from "react"
import {useNavigate} from "react-router-dom"
import Input from "./Input";

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
                <Input id="name" label="Nombre" 
                setValue={setName} value={name} required={true} type="text" placeholder="Escribe el nombre"/>
                <Input id="description" label="Description" 
                setValue={setDescription} value={description} required={true} type="text" placeholder="Escribe una descripcion"/>
                <Input id="quantity" label="Cantidad" 
                setValue={setQuantity} value={quantity} required={true} type="number" placeholder="Ingresa la cantidad"/>
            </fieldset>
            <button type="submit">Agregar</button>
        </form>
    </div>
}
export default AddProduct