import { useNavigate } from 'react-router-dom'
import MenuBar from '../Components/MenuBar';

const MyBooks = ({ books }) => {
    const navigation = useNavigate();

    


  return (
    <div className="d-flex">
      <MenuBar />
      <div className="container" style={{paddingTop: "20px", marginRight: "50px"}}>
        <h1 className="text-center">My Books</h1>

        <div className="row g-3">
          {books.map((book) => (
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
                <div className="card-body" >
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.authors || "Unknown Author"}</p>
                  <p className="card-text"><small>{book.publisheddate}</small></p>
                  <button className="btn btn-primary" onClick={() => {navigation(`/my-books/${book.id}`)}}>View Details</button>
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
