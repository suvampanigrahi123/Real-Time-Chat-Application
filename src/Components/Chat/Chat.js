import React, { useEffect, useState } from 'react';
import { user} from '../join/Join'
import Send from '../../images/send.png'
import './Chat.css'
import SocketIo from 'socket.io-client'
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import BackBtn from '../../images/logo2.png'
import {Link} from 'react-router-dom'
const ENDPOINT='http://localhost:3100'
let socket;
const Chat = () => {
  const [messages, setMessage] = useState([]);
  const [Id, setId] = useState("");
  const send=()=>{
  let  message=document.getElementById('msgInput').value;
    socket.emit('message',{message,Id})
    document.getElementById('msgInput').value="";
  }
  useEffect(()=>{
     socket=SocketIo(ENDPOINT,{transports:['websocket']})
    socket.on('connect',()=>{ //data recive karna on 
      setId(socket.id);
    })
    socket.emit('joined',{user}) //data behjne keliye emit use karte he
    socket.on('welcome',(data)=>{
      console.log(data.user);
      console.log(data.message);
      setMessage([...messages,data]);
    socket.on('userJoined',(data)=>{
      console.log(data);
      setMessage([...messages,data]);
    })
    socket.on('leave',(data)=>{
      console.log(data.user);
      console.log(data.message);
      setMessage([...messages,data]);
    })
   return()=>{
     socket.emit('disconnect');
     socket.off();
   }
  })
 document.getElementById('msgInput').focus();
  },[])
  console.log(messages);
  useEffect(()=>{
    socket.on('Sendmessage',(data)=>{
      console.log(data.user,data.message,data.Id);
      setMessage([...messages,data])
    })
    return()=>{
      socket.off();
    }
  },[messages])
  return(
    <div className='ChatPage'>
          <div className='ChatContainer'>
          <div className='Header'>
            <h2>C chat</h2>
      <Link to='/' ><img src={BackBtn} alt='Btn'/></Link> 
          </div>
          <ReactScrollToBottom className='ChatBox'> 
          {messages.map((val,i)=>(
            <Message key={i} user={val.Id===Id?null:val.user} message={val.message} Classs={val.Id===Id?'right':'left'}/>
          ))}          
          </ReactScrollToBottom>
          <div className='Input'>
          <input type='text'onKeyPress={(e)=>e.key==='Enter'?send():""} placeholder='Enter Your Message' id='msgInput'    />   
          <button className='SendBtn' onClick={send}><img src={Send} alt='SendBtnimg'/></button>
          </div>
          </div>
    </div>
    )
};
export default Chat;