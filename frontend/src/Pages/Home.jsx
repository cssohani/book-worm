import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MenuBar from '../Components/MenuBar'

const Home = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  
  return (
    <>
      <MenuBar />
      <div className="container mt-4">
        Home
      </div>
    </>
  )
}

export default Home
