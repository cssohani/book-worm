import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/", { email, password }, {withCredentials : true});
            
            
            
            setEmail("");
            setPassword("");
            setSuccess(true);
            
            console.log("Login success");
        }catch(error){
            console.log("Error: ", error)
        }
    }
    return (
        <>
            {success ? 
                <div className="container justify-content-center">
                    <h3>You are logged in</h3>
                    <Link to="/search-books">Go To BookWorm</Link>
                </div>
                :
                <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <p className="text-center mt-3">
                            Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
            }
            
        </>
  )
}

export default Login
