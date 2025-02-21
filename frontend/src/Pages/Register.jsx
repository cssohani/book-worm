import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Email: ", email);
            console.log("Password: ", password)
            const response = await axios.post("http://localhost:8080/register", { email, password })
            console.log("User registered successfully");
            navigate("/login");
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
      userRef.current.focus();
    }, []);


    
  return (
    <div>
      <form type="submit" onSubmit={handleSubmit}>
        <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)}}
            required
        />
        <input
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)}}
            required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
