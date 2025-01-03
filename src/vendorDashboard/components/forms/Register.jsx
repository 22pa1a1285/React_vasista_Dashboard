import React,{useState} from 'react'
import {API_URL} from '../../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] =useState("")

  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body:JSON.stringify({username,email,password})
      })
      const data = await response.json()

      if(response.ok){
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert(" vendor registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("registration failed");
      alert(error);
    }
  }
  return (
    <div className="registerSection">
        <form className='authForm'onSubmit={handlesubmit}>
        <h3>vendor Register</h3>
            <label>username</label>
            <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='enter your username' /><br/>
            <label>Email</label>
            <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter your email' /><br/>
            <label>password</label>
            <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value) }placeholder='enter your password' /><br/>
            <div className="btnsubmit">
                <button type="submit">submit</button>
            </div>

        </form>
    </div>
  )
}

export default Register