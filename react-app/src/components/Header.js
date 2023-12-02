import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
      (async function () {
        const body = await( await fetch(`/api/message`)).text();
        setMessage(body);
      })();
    });
    return <header>
      <h2>Lista de Compras <small>{message}</small></h2>
      <nav>
        <Link to="/">Productos</Link>
        <Link to="/add">Agregar</Link>
      </nav>
    </header>
}
export default Header