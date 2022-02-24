import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../join/Join.css'
import logo from '../../images/logo.png'
let user;
const Join = () => {
  function getUser(e){
    user=document.querySelector('#Input').value;
    if(Name===""){
      e.preventDefault();
     const ele= document.querySelector('#Input')
     ele.style.border="2px solid red";
     ele.placeholder="*Name is Mandotory";
     ele.style.color="red";
    }
  }
  useEffect(() => {
    document.getElementById('Input').focus();
  
  },[]);
  
  
 const[Name,setName]=useState("");
  return (
 <div className='JoinPage'>
  <div className='JoinContainer'>
 <Link to='/'><img src={logo} alt='logo'/></Link>
      <h1>C Chat</h1>
      <input placeholder='Enter Your Name' onKeyPress={(e)=>e.key==='Enter'?document.getElementById('btn').click():''} id='Input' onChange={(e)=>setName(e.target.value)} />
    <Link to='/chat'><button id='btn' onClick={(e)=>getUser(e)} >Enter in</button></Link> 
  </div>
      </div>
  )};

export default Join;
export {user};