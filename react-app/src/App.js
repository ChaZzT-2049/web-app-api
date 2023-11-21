import './App.css';
import {useState, useEffect} from "react"
import Products from './components/Products';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    (async function () {
      const body = await( await fetch(`/api/message`)).text();
      setData(body);
    })();
  });

  return <div>
    <h1>Hola mundo, {data}</h1> <br/>
    <Products />
  </div>
}

export default App;
