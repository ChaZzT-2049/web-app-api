import './App.css';
import {useState, useEffect} from "react"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Notifications from './components/Notifications';
import EditProduct from "./components/EditProduct"

function App() {
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState("")
  const newNotification = (message) =>{
    setNotification(message)
    setTimeout(()=>{
      setNotification("")
    }, 2000)
  }
  useEffect(() => {
    (async function () {
      const body = await( await fetch(`/api/message`)).text();
      setMessage(body);
    })();
  });
  return <Router>
    <h1>Lista de compras, {message}</h1> <br/>
    <Notifications notification={notification}/>
    <nav>
      <Link to="/">Productos</Link> | 
      <Link to="/add">Agregar</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Products newNotification={newNotification}/>}/>
      <Route path="/add" element={<AddProduct newNotification={newNotification}/>} />
      <Route path='/edit' element={<EditProduct newNotification={newNotification}/>}/>
    </Routes>
  </Router>
}

export default App;
