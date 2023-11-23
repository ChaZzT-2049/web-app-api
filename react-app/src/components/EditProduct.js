import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Input from "./Input"
const EditProduct = ({newNotification}) =>{
    const navigate = useNavigate()
    const {state} = useLocation()
    const id = state.id
    const [name, setName] = useState(state.name);
    const [description, setDescription] = useState(state.description)
    const [quantity, setQuantity] = useState(state.quantity)
    return <div>
        <form onSubmit={async(e)=>{
            e.preventDefault()
            const response = await fetch("/api/products-put", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    name,
                    description,
                    quantity
                })
            }).catch((error) => console.error("Error:", error))
            const status = await response.json()
            if(status.edited){
                newNotification(status.message)
                navigate("/")
            }
        }}>
            <fieldset>
                <legend>Editar Producto {state.name}</legend>
                <Input id="name" label="Nombre" 
                setValue={setName} value={name} required={true} type="text" placeholder="Escribe el nombre"/>
                <Input id="description" label="Description" 
                setValue={setDescription} value={description} required={true} type="text" placeholder="Escribe una descripcion"/>
                <Input id="quantity" label="Cantidad" 
                setValue={setQuantity} value={quantity} required={true} type="number" placeholder="Ingresa la cantidad"/>
            </fieldset>
            <button type="submit">Editar</button>
        </form>
    </div>
}
export default EditProduct