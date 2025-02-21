import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MenuBar from '../Components/MenuBar';

const MyBooks = () => {
    const [myBooks, setMyBooks] = useState([]);
    const navigation = useNavigate();

    const getBooks = async () => {
        try{
            const response = await axios.get("http://localhost:8080/books");
            setMyBooks(response.data);   
            console.log(response.data);
        }catch(error){
            console.log("failed to get books", error)
        }
    };

    const sendToBookDetails = () => {
      
    }

    useEffect(() => {
        getBooks();
    }, []);

  return (
    <div className="d-flex">
      <MenuBar />
      <div className="container my-5" style={{ paddingTop: "100px" }}>
        <h1 className="text-center">My Books</h1>

        <div className="row g-3">
          {myBooks.map((book) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book.id}>
              <div className="card h-100" style={{ width: "100%" }}>
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body" onCick={() => {navigation.navigate('/books/${book.id}', {title : book.title, authors: book.authors, thumbnail: book.thumbnail, publisheddate: book.publisheddate})}}>
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.authors || "Unknown Author"}</p>
                  <p className="card-text"><small>{book.publisheddate}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}

export default MyBooks
