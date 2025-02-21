
const BookCard = ({ book, addBook }) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card h-100" style={{ width: "100%" }}>
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              className="card-img-top"
              alt={book.volumeInfo.title}
              style={{ height: "150px", width: "100%", objectFit: "contain" }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{book.volumeInfo.title}</h5>
            <p className="card-text">
              {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
            </p>
            <p className="card-text">{book.volumeInfo.publishedDate}</p>
            <button
              className="btn btn-success"
              onClick={() => addBook(book)}
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default BookCard;