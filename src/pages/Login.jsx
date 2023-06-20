import React from 'react';
import Add from '../images/add icon.jpg';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import { useNavigate,Link } from "react-router-dom";

const Login = () => {

  const [error,set] = useState(false)
  const navigate = useNavigate()

  const handle = async(e) => {
    e.preventDefault()

    const email = e.target[0].value;
    const password = e.target[1].value;


    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    }
    catch(error)
    {
      set(true)
    }

  }
  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>WE CHAT</h1>
        <h3>Login</h3>
        <form onSubmit={handle}>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button>Login</button>
          {error && <span>Something went wrong!!</span>}
          <p className='abc'>Don't have an account? <Link to = "/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;