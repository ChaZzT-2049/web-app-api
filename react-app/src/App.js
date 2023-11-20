import './App.css';
import {useState, useEffect} from "react"

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    (async function () {
      const body = await( await fetch(`/api/message`)).text();
      setData(body);
    })();
  });

  return <div>
    <h1>Hola mundo, <br/> {data}</h1>  
  </div>
}

export default App;
