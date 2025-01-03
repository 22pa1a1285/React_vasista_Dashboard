import React,{useState}from 'react'
import {API_URL} from '../../../data/apiPath'

const Login = ({showWelcomeHandler}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginHandler = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })
      const data = await response.json();
      if(response.ok){
        alert('login success')
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken',data.token)
        showWelcomeHandler()
      }
      const vendorId = data.vendorId;
      console.log(vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId  =vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <div className="loginsection">
        <form className='authForm'onSubmit={loginHandler}>
        <h3>vendor Login</h3>
            <label>Email</label>
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' /><br/>
            <label>password</label>
            <input type="password"name="password" value={password} onChange={(e)=>setPassword (e.target.value)} placeholder='enter your password' /><br/>
            <div className="btnsubmit">
                <button type="submit">submit</button>
            </div>

        </form>
    </div>
    
  )
}

export default Login