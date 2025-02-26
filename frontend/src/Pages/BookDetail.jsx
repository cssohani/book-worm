import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BookDetail = ({ books, setBooks}) => {
    

    const { id } = useParams();
    const navigate = useNavigate();

    const book = books.find((b) => b.id.toString() === id);
    if (!book) return <h2>Book Not Found</h2>

    const [status, setStatus] = useState(book.status || "");
    const [review, setReview] = useState(book.review || "");
    

    const handleSave = async() => {
        try{
            const response = await axios.put(`http://localhost:8080/my-books/${book.id}`, {status, review}, {withCredentials : true});
            if (response.stats === 200){
                const bookUpdate = books.map((b) => {
                    b.id === book.id ? {...b, status, review} : b
                })
            setBooks(bookUpdate);
            console.log("Book updated")
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try{
            const response = await axios.delete(`http://localhost:8080/my-books/${book.id}`);
            alert("Book deleted");
            navigate("/my-books")
        }catch(err){
            console.log(err);
        }        
    }


  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card shadow-lg">
                <div className="card-body">
                    <img src={book.thumbnail} />
                    <h2 className="card-title text-center mb-3">{book.title}</h2>
                    <h5 className="text-muted text-center">by {book.authors}</h5>
                    <p className="text-center"><strong>Published:</strong> {book.publishedDate}</p>

                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Currently Reading">Currently Reading</option>
                            <option value="Want to Read">Want to Read</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Review</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </div>

                    
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Remove Book
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/my-books')}>
                            Back to My Books
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
};



export default BookDetail
