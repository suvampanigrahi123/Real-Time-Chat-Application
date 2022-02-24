const express=require('express');
const http=require('http')
const socketIo=require('socket.io')
const cors=require('cors')
const port=3100 ||process.env.PORT;

const app=express();
app.use(cors())
const server=http.createServer(app);
let users=[];
const io=socketIo(server);
io.on('connection',(socket)=>{
    console.log('New Connection');
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        // console.log(`${user} has Joined`);
        socket.broadcast.emit('userJoined',{user:'Admin',message:`${users[socket.id]} has Joined`,Id:socket.id})
        socket.emit('welcome',{user:'Admin',message:`Welcome to the chat ${users[socket.id]}`})
    })
    socket.on('message',({message,Id})=>{
        io.emit('Sendmessage',{user:users[Id],message,Id})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]} has left`,Id:socket.id})
        console.log('user Left');
    })
})
app.get('/',(req,res)=>{
    res.send('<h1>Hello World<h1>')
})

server.listen(port,'localhost',()=>{
    console.log(`Server is Working At http://localhost:${port}`);
})