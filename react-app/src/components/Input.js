const Input = ({id,label,setValue,value,required,type,placeholder}) =>{
    return <label htmlFor={id}>
        {label}
        <input onChange={(e)=>{setValue(e.target.value)}}
            value={value} required={required} type={type} placeholder={placeholder} id={id}
        />
    </label>
}
export default Input