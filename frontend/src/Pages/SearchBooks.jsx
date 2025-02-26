import { useState, useEffect } from 'react'
import axios from 'axios'
import MenuBar from '../Components/MenuBar';
import BookCard from '../Components/BookCard'

const SearchBooks = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const API_KEY = "AIzaSyBULE987RoYAruV4nn907sGkQALhFfuLUg";
    const fetchBooks = async (title) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${API_KEY}`);
            setBooks(response.data.items || []);
            setError(null);
        }catch(error){
            
            console.log(error);
        }
    }


    const addBook = async (book) => {
        try{
            
            const response = await axios.post("http://localhost:8080/my-books", {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors?.join(", ") || "Unknown Author",
                thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
                publisheddate: book.volumeInfo.publishedDate
            });
            console.log("Backend respnonse: ", response.data);
            alert("Book added successfully!");
        }catch(error){
            console.log("Failed to add book", error);
            alert("Failed to add book");
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
          fetchBooks(query);
        }
      };

    

    useEffect(() => {
        fetchBooks("all");
    }, []);

    return (
        <div className="d-flex">
          <MenuBar />
          <div className="container my-5" style={{ paddingTop: "20px", marginRight: "50px" }}>
            <h1 className="text-center">Search Books</h1>
    
            <form onSubmit={handleSearch} className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for books..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
    
            {error && <div className="alert alert-danger">{error}</div>}
    
            <div className="row g-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} addBook={addBook} />
              ))}
            </div>
          </div>
        </div>
      );
}

export default SearchBooks
