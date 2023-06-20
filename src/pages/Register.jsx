import React, { useState } from 'react';
import Add from '../images/add icon.jpg';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from "react-router-dom";
import Home from './Home'



const Register = () => {

  const [error,set] = useState(false)
  const navigate = useNavigate()

  const handle = async(e) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{

      const res = await createUserWithEmailAndPassword(auth, email, password)


      const storageRef = ref(storage, name);

      await uploadBytesResumable(storageRef, file).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL) => {
          // try{
            console.log(res.user)
            await updateProfile(res.user,{
              displayName:name,photoURL:downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid),{
              name, email,photoURL:downloadURL,
            });
  
            await setDoc(doc(db, "userchats",res.user.uid),{});
            navigate("/");
          // }
          // catch(err){
          //   console.log(err)
          //  set(err)
          // }
         })
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>WE CHAT</h1>
        <h3>Register here</h3>
        <form onSubmit={handle}>
          <input type='text' placeholder='username' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder=' password' />
          <div className='profile'>
            <label htmlFor='dp' padding-bottom = '5px'>
              Add Profile Photo
              <img src={Add} width='30px' alt='' margin-left = '5px'/>
            </label>
            <input type='file' id='dp' style={{ display: 'none' }} />
          </div>
          <button onClick={()=>navigate(<Home/>)}>Register</button>
          {error && <span>Something went wrong!!</span>}
          <p className='abc'>Have an account? <Link to = "/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
