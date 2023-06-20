import React, { useContext, useState } from 'react'
import Ap from '../images/logo192.png'
import { collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import {auth,storage,db} from '../firebase'
import {AuthContext} from "../context/AuthContext"
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; 


const Search = () => {

  const [username,setusername] = useState("")
  const [user,setuser] = useState(null)
  const [error,set] = useState(false)

  const {curruser} = useContext(AuthContext)

  const handlesearch = async()=>{
      const q = query(collection(db,"users"),where("name", "==", username));

      try{

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setuser(doc.data())
        });
      }
      catch(error)
      {
        set(true);
      }
  }

  const handlekey = e=>{
    e.code === "Enter" && handlesearch();
  };

  const handleselect = async()=>{
    const combinedid = curruser.uid > user.uid ? curruser.uid + user.uid : user.uid + curruser.uid
    try{

      const res = await getDoc(doc(db,"chats",combinedid));
      if(!res.exists()){
        await setDoc(doc,(db,"chats",combinedid),{messages:[]});

       await updateDoc(doc(db,"userchats",curruser.uid),{
        [combinedid+"userinfo"]:{
          uid:user.uid,
          name:user.name,
          photoURL:user.photoURL
        },
        [combinedid+".date"]:serverTimestamp()
       });
       await updateDoc(doc(db,"userchats",user.uid),{
        [combinedid+"userinfo"]:{
          uid:curruser.uid,
          name:curruser.name,
          photoURL:curruser.photoURL
        },
        [combinedid+".date"]:serverTimestamp()
       });
      }
    }
    catch(error){}
    setuser(null)
    setusername("")
  }

  return (
    <div className='search'>
      <div className="sform">
        <input type = "text" placeholder='search' onKeyDown={handlekey} />
      </div>
  
      </div>
        
      
      
        
     
    
  )
}

export default Search