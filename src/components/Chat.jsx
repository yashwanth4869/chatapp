import React, { useContext } from 'react'
import dot from '../images/k59em.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user.name}</span>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat