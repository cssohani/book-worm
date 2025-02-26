import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/register", { email, password })
            console.log("User registered successfully");
            alert("User registered successfully!");
            navigate("/");
        }catch(err){
            console.log(err);
        }

    }




    
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-5">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center mb-4">Register</h2>
                    {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
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
                        
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <a href="/" className="text-decoration-none">Login</a>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Register
