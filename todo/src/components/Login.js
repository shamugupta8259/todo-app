import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/notes/AlertContext';
const Login = () => {
    const navigate = useNavigate();
    const alertcontext = useContext(AlertContext);
    const [credential,setCredential]=useState({email:"",password:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5005/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
          });
          const json=await response.json();
          console.log(json)
          if (json.success) {
            localStorage.setItem('token',json.authtoken);
            // redirect karna ka liya use history ka istamal karuga 
            console.log("yoo")
            alertcontext.show("success"," You are successfully logged in ");
            navigate('/')
          }
          else{
            alertcontext.show("danger"," Invalid Credentials, Please try again");
          }
    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
        // setEmail(...email,[e.target.name]);
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange}  value={credential.email} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credential.password} name='password' id="password" />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
