import React, { useContext, useEffect, useState } from 'react'
import Ap from '../images/logo192.png'
import { doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore"; 
import {auth,storage,db} from '../firebase'
import { AuthContext } from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext'

const Chats = () => {

  const [chats,setchats] = useState([])

  const {curruser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  useEffect(()=>{
    const getchats = () =>{
      const unsub = onSnapshot(doc(db, "userchats", curruser.uid), (doc) => {
        doc.exists() && setchats(doc.data())
      });
      return ()=>{
        unsub();
      };
    };

    curruser?.uid && getchats()

  },[curruser?.uid]);

  const handleselect = (u)=>{
    dispatch({type:"CHANGE-USER",payload:u})
  };

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map(chat=>(
        <div className="uchat" key={chat[0]} onClick={()=>handleselect(chat[1].userinfo)}>
        <img src = {chat[1].userinfo.photoURL} alt = ""/>
        <div className="uchatinfo">
          <span>{chat[1].userinfo.name}</span>
          <p>{chat[1].lastmessage?.text}</p>
        </div>
      </div>
      ))}
     
    </div>
  )
}

export default Chats