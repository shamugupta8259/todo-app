import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/notes/AlertContext';
const SignUp = () => {
    const navigate = useNavigate();
    const alertcontext = useContext(AlertContext);
    const [credential,setCredential]=useState({name: "",email:"",password:""});

    const handleSubmit=async (e)=>{     
        e.preventDefault();
        const {name,email,password}=credential;
        const response = await fetch("http://localhost:5005/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
          });
          const json=await response.json();
          console.log(json)
          if (json.success) {
            localStorage.setItem('token',json.authtoken);
            // redirect karna ka liya use history ka istamal karuga 
            console.log("yoo")
            alertcontext.show("success","You have created your account successfully");
       
            navigate('/login')
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" onChange={onChange} name='name' id="name" aria-describedby="emailHelp"  required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onChange} id="password" required minLength={5}/>
                </div>

               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
 
export default SignUp
