import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import MenuBar from './Components/MenuBar';
import Login from './Pages/Login';
import SearchBooks from './Pages/SearchBooks';
import MyBooks from './Pages/MyBooks';
import Register from './Pages/Register'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SecureRoute from './Components/SecureRoute';



function App() {

  const handleLogin = async (email, password) => {
    try{
      const response = await axios.post("http://localhost:8080/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token: ", token);
      
      console.log("Login success");
  }catch(error){
      console.log("Error: ", error)
  }
  }
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<SearchBooks />} />
    //     <Route path="my-books" element={<MyBooks />} />
    //   </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" replace />} />
    //     <Route path="/login" element={<Login onLogin={handleLogin} />} />
    //     <Route path="my-books" element={<SecureRoute> <MyBooks /> </SecureRoute>} />
    //   </Routes>
    // </BrowserRouter>
    <div className="d-flex">
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-books" element={<SearchBooks />} />
        <Route path="/my-books" element={<MyBooks />} />
        
      </Routes>
      
    </BrowserRouter>
    </div>
  )
}

export default App
