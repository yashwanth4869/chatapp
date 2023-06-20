import React, { useContext } from 'react'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {curruser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>
        WE CHAT
      </span>
      <div className="user">
        <img src = {curruser.photoURL} alt = ""/>
        <span>{curruser.name}</span>
        <button onClick = {()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar