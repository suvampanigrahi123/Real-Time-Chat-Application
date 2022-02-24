import React from 'react';
import './Message.css'
const Message = ({user,message,Classs}) => {
    if(user==='Admin'){
        return(
            <div className='MessageBox center'>
            {message}
            </div>
        )
    }
    else if(user){
        return(
            <div className={`MessageBox`}>
         <span className='Profile'>{user.charAt(0)}</span> <span className={` ${Classs}`}> {` ${message}`}</span>
            </div>
        )
    }else{

        return(
            <div className={`MessageBox`}>
           <span className='Profile2'>Y</span> <span className={` ${Classs}`}> {` ${message}`}</span>
        </div>
    )
}
};
export default Message;