import './App.css';
import {useState} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Notifications from './components/Notifications';
import EditProduct from "./components/EditProduct"

function App() {
  const [notification, setNotification] = useState("")
  const newNotification = (message) =>{
    setNotification(message)
    const timeout = setTimeout(()=>{
      setNotification("")
    }, 3000)
    return () => clearTimeout(timeout);
  }
  return <Router>
    <Notifications notification={notification}/>
    <Header />
    <Routes>
      <Route path='/' element={<Products newNotification={newNotification}/>}/>
      <Route path="/add" element={<AddProduct newNotification={newNotification}/>} />
      <Route path='/edit' element={<EditProduct newNotification={newNotification}/>}/>
    </Routes>
  </Router>
}

export default App;
