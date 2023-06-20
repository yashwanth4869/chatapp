import ap from '../images/46159.png'
import bp from '../images/icon.png'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {

  const {curruser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);

  return (
    <div ref={ref}
    className={`message ${message.senderid === curruser.uid && "owner"}`}>
      <div className="messageinfo">
        <img src = {message.senderid === curruser.uid ? curruser.photoURL : data.user.photoURL}/>
        <span>just now</span>
      </div>
      {message.img && <div className="messagecontent">
        <p>{message.text}</p>
        <img src = {message.img}/>
      </div>}
    </div>
  )
}

export default Message