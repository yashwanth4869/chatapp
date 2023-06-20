import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, setDoc, serverTimestamp} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import {db, storage} from '../firebase';
import {v4 as uuid} from 'uuid';
import img from '../images/46159.png'

const Input = () => {

  const[text,settext] = useState("")
  const[img,setimg] = useState(null)

  const {curruser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handlesend = async()=>{
      if(img){
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            // set(true)
          }, 
          () => {
  
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              await updateDoc(doc(db,"chats",data.chatid),{
                messages: arrayUnion({
                  id: uuid(),
                  text, senderid:curruser.uid,date:Timestamp.now(),img:downloadURL
                }),
              });
            });
          }
        );
      }
      else{
        await updateDoc(doc(db,"chats",data.chatid),{
          messages: arrayUnion({
            id: uuid(),
            text, senderid:curruser.uid,date:Timestamp.now()
          }),
        });
      }

      await updateDoc(doc(db,"userchats",curruser.uid),{
        [data.chatid+".lastmessage"]:{
          text
        },
        [data.chatid+".date"]:serverTimestamp()
      });

      await updateDoc(doc(db,"userchats",data.user.uid),{
        [data.chatid+".lastmessage"]:{
          text
        },
        [data.chatid+".date"]:serverTimestamp()
      });

      settext("")
      setimg(null)
  };

  return (
    <div className='input' >
      <input type='text' placeholder='Message...' onChange={e=>settext(e.target.value)} value={text}/>
      <div className='send'>
        <input type='file' style={{display : 'none'}} id = 'media' onChange={e=>setimg(e.target.files[0])}/>
        <label htmlFor='media'>
          <img src = {img} alt='jgh' height = '25px'/>
        </label>
      <button onClick={handlesend}>send</button>
      </div>
    </div>
  )
}

export default Input