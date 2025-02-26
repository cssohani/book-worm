import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Login from './Pages/Login';
import SearchBooks from './Pages/SearchBooks';
import MyBooks from './Pages/MyBooks';
import Register from './Pages/Register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import BookDetail from './Pages/BookDetail';



function App() {
  const [myBooks, setMyBooks] = useState([]);
  const getBooks = async () => {
    try{
        const response = await axios.get("http://localhost:8080/books");
        setMyBooks(response.data);   
        console.log(response.data);
    }catch(error){
        console.log("failed to get books", error)
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (

    <div className="d-flex justify-content-center">
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-books" element={<SearchBooks />} />
        <Route path="/my-books" element={<MyBooks books={myBooks} />} />
        <Route path="/my-books/:id" element={<BookDetail books={myBooks} setBooks={setMyBooks}/>} />
      </Routes>
      
    </BrowserRouter>
    </div>
  )
}

export default App
