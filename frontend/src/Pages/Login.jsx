import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/", { email, password }, {withCredentials : true});
            const token = response.data;
            
            console.log(token);
            //localStorage.setItem("token: ", token);
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
                <div>
                    <h3>You are logged in</h3>
                    <Link to="/home">Go Home</Link>
                </div>
                :
                <div>
                    
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        <button type="submit">Login</button>
                    </form>
                </div>
            }
            
        </>
  )
}

export default Login
