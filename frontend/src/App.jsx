import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'





function App() {
  //const [count, setCount] = useState(0)

  const fetchApi = async () => {
    const response  = await axios.get("http://localhost:8080");
    console.log("Backend connected successfully")
  }
   useEffect(() => {
    fetchApi();
   }, [])



  return (
    <div>

    </div>
  )
}

export default App
